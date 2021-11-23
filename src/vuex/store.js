import { createStore } from "vuex";
import axios from "axios";
import $api from "../api/requests/index";
import { setInterval } from "core-js";
import auth from "./modules/auth";
import calculator from "./modules/calculator";

let store = createStore({
  state() {
    return {
      user: {},
      maturityList: [],
      maturity: null,
      underlying: null,
      amount: 0,
      futHedgeFlag: false,
      fullDataList: null,
      fullDataListLang: null,
      result: null,
      value: null,
      key: 0,
      timerId: null,
      loading: false,
      flagQaStruct: false,
      selectedDirection: null,
      message: null,
      users: null,
      users_site_admin: [],
    };
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
    },

    setMessage(state, message) {
      state.message = message;
    },

    clearMessage(state) {
      state.message = null;
    },

    setMaturityList_mutations(state, maturityList) {
      state.maturityList = maturityList;
    },

    setMaturity_mutations(state, maturity) {
      // Получаем дату которую выбрали
      state.maturity = maturity;
    },

    setUnderlying_mutations(state, underlying) {
      state.underlying = underlying;
    },

    setAmount_mutations(state, count) {
      state.amount = count;
    },

    setFlagFutures_mutations(state, flag) {
      state.futHedgeFlag = flag;
    },

    setFullData_mutations(state, data) {
      state.fullDataList = data;

      console.log("data", data);
    },
    setFullData_mutations_lang(state, data) {
      state.fullDataListLang = data;
    },

    setTable_mutations(state, table) {
      for (const key in state.fullDataList) {
        const element = state.fullDataList[key];
        element.table = table[key].table;
        element.description = table[key].description;
      }
    },

    setTimerId(state, timerId) {
      state.timerId = timerId;
    },

    setLoading(state, value) {
      state.loading = value;
    },
    setUsers(state, value) {
      state.users = value;
    },
    setUsersAdmin_mutations(state, users_site_admin) {
      console.log("users_site_admin", users_site_admin);
      state.users_site_admin = users_site_admin;
    },

    /*     selectedDirection(state, selectedDirection) {
          state.selectedDirection = selectedDirection;
        }, */
  },

  actions: {
    async initApp({ dispatch }) {
      try {
        await dispatch("auth/checkAuth");

        dispatch("auth/initTokenRefresher");

        // можно получить другие данные нужные для приложения
      } catch (err) {
        console.log(err);
        throw err;
      }
    },

    setMessage({ commit }, message) {
      commit("setMessage", message);
      setTimeout(() => {
        commit("clearMessage");
      }, 3000);
    },

    async getUsers() {
      try {
        const response2 = await axios.get("/user/clients");
        console.log("response", response2);
        return response2.data.data;
      } catch (error) {
        console.log("error", error);
        return error;
      }
    },

    async getMaturity_actions({ commit, rootState }) {
      // Получаем все даты
      try {
        const url = "data/maturities";
        const options = {
          params: { currency: rootState.calculator.selectedUnderlying },
        };
        commit("setLoading", true);
        const response = await axios.get(url, options);
        const data = response.data.data;
        commit("setLoading", false);
        commit(
          "setMaturityList_mutations",
          data[rootState.calculator.selectedUnderlying]
        );

        return data;
      } catch (error) {
        return error;
      }
    },

    async fetchCleintTableInfoByTab({ commit, rootState }, { userId, url }) {
      // Получение данных для siteadmin
      try {
        const options =
          userId && userId != " "
            ? {
                params: { client_id: userId },
              }
            : {};
        const response = await axios.get(url, options);

        return response.data.data;
      } catch (error) {
        console.error("Ошибка запроса", url, error);
        return {};
      }
    },

    async getStatisctics_actions({ commit, rootState }) {
      // Получаем все графики
      try {
        const flag = String(rootState.futHedgeFlag);
        const url = "data/recStructs";
        const options = {
          params: {
            currency: rootState.calculator.selectedUnderlying,
            maturity: rootState.calculator.selectedMaturity,
            amount: rootState.calculator.coinAmount,
            fut_hedge_flag: flag.charAt(0).toUpperCase() + flag.slice(1),
            lang: rootState.calculator.lang.toLowerCase(),
          },
        };
        const response = await axios.get(url, options);
        commit("setFullData_mutations", response.data.data);
        return response.data.data;
      } catch (error) {
        return error;
      }
    },

    getTableStaticsics_actions({ commit, rootState }) {
      try {
        const flag = String(rootState.futHedgeFlag);
        const url = "data/recStructs";
        const options = {
          params: {
            currency: rootState.calculator.selectedUnderlying,
            maturity: rootState.calculator.selectedMaturity,
            amount: rootState.calculator.coinAmount,
            fut_hedge_flag: flag.charAt(0).toUpperCase() + flag.slice(1),
            lang: rootState.calculator.lang.toLowerCase(),
          },
        };

        clearInterval(rootState.timerId);
        const timerId = setInterval(async () => {
          const response = await axios.get(url, options);
          commit("setTable_mutations", response.data.data);
        }, 2000);

        commit("setTimerId", timerId);
      } catch (error) {
        return error;
      }
    },

    async sendOrder({ commit }, data) {
      const url = "order/sendOrder";
      console.log("data-SENT-ORDER", data);
      console.log("window.localStorage", window.localStorage);
      axios.post(url, data);
    },

    async sendOrderOrders({ commit }, { client_id, table_json }) {
      if (!Array.isArray(table_json)) return; // Возвращаем если не массив
      let keys_match = {
        // Собираем соответствие полей у нас, и полей которые просит сервеник
        Deal_Id: "Deal Id",
        Client_Id: "Client Id",
        Datetime: "Datetime",
        ProductName: "Product Name",
        Fut_Hedge_flag: "Fut Hedge flag",
        Max_Slippage: "Max Slippage",
        Price_USD: "Price USD",
        Total_Margin_USD: "Total Margin USD",
        Maintenance_Margin_USD: "Maintenance Margin USD",
        Exchange_Position: "Exchange Position",
        Status: "Status",
        Comment: "Comment",
      };
      let data = {};
      console.log("DATA-ORDER", data);
      table_json.map((row, index) => {
        Object.keys(row).map((key) => {
          let req_key = keys_match[key]; // находим новый ключ для значения
          if (!req_key) return; // если ключа нет, уходим

          if (data[req_key] === undefined) {
            // создаем объект в данных на каждый ключ
            data[req_key] = {};
          }
          if (
            [
              "Price_USD",
              "Slippage",
              "Total_Margin_USD",
              "Maintenance_Margin_USD",
            ].indexOf(key) > -1
          ) {
            // данные, которые должны быть числами, агрессивно приводим к числам
            data[req_key][index] = Number(row[key]);
          } else {
            data[req_key][index] = row[key];
          }
        });
      });
      data = JSON.stringify(data);
      data = data.replaceAll("true", "True").replaceAll("false", "False");
      console.log("DATA-REQUEST-DATA", data);
      console.log("DATA-REQUEST-table_json-ORDER", table_json);
      let res = await $api.admin.orders.create(client_id, data);
      /*
            console.log("/admin/orders", { client_id, table_json });
            console.log("RES", res);
            console.log("API-ORDERS", $api);
            console.log("AN IMPORTANT RES", res.data.data);  */
    },

    async sendOrderDeals({ commit }, { client_id, table_json }) {
      if (!Array.isArray(table_json)) return; // Возвращаем если не массив
      let keys_match = {
        // Собираем соответствие полей у нас, и полей которые просит сервеник
        Deal_Id: "Deal Id",
        Client_Id: "Client Id",
        Datetime: "Datetime",
        ProductName: "Product Name",
        Fut_Hedge_flag: "Fut Hedge flag",
        Max_Slippage: "Max Slippage",
        Price_USD: "Price USD",
        Total_Margin_USD: "Total Margin USD",
        Maintenance_Margin_USD: "Maintenance Margin USD",
        Exchange_Position: "Exchange Position",
        Status: "Status",
        Comment: "Comment",
      };
      let data = {};
      console.log("DATA-DEALS", data);
      table_json.map((row, index) => {
        Object.keys(row).map((key) => {
          let req_key = keys_match[key]; // находим новый ключ для значения
          if (!req_key) {
            console.log("KEYS NOT MATTCH", key, keys_match);
            return;
          } // если ключа нет, уходим

          if (data[req_key] === undefined) {
            // создаем объект в данных на каждый ключ
            data[req_key] = {};
          }
          if (
            [
              "Price_USD",
              "Slippage",
              "Total_Margin_USD",
              "Maintenance_Margin_USD",
            ].indexOf(key) > -1
          ) {
            // данные, которые должны быть числами, агрессивно приводим к числам
            data[req_key][index] = Number(row[key]);
          } else {
            data[req_key][index] = row[key];
          }
        });
      });
      data = JSON.stringify(data);
      data = data.replaceAll("true", "True").replaceAll("false", "False"); //.replaceAll('"', "'")

      console.log("DATA-REQUEST-DATA-DEALS", data);
      console.log("DATA-REQUEST-table_json-DEALS", table_json);
      let res = await $api.admin.deals.create(client_id, data);

      // let res = await $api.admin.deals.create({
      //   "client_id": 'test_user_01',
      //   'table_json':{'Deal Id': {'0': '4aa01e04-a868-4ee4-91af-d58157a6b5a6'}, 'Client Id': {'0': 'test_user_01'}, 'Datetime': {'0': '2021-09-30 17:04:40.678232'},'Product Name': {'0': 'Call-spread'},'Fut Hedge flag': {'0': 'True'},'Max Slippage': {'0': 300},'Price USD': {'0': -117.77057712328406},'Total Margin USD': {'0': 708.9630541213185}, 'Maintenance Margin USD': {'0': 591.1924769980344},'Exchange Position': {'0': 'BTC-8OCT21-43000-C: 1, BTC-8OCT21-50000-C: -1'},'Status': {'0': 'done'},'Comment': {'0': ''}}
      // });
      /*       console.log("API-DEALS", $api);
            console.log("AN IMPORTANT RES sendOrderDeals", res.data.data); */
    },

    async getStrikes_actions(context) {
      try {
        const url = "data/strikes";
        const options = {
          params: {
            currency: context.rootState.calculator.selectedUnderlying,
          },
        };

        const response = await axios.get(url, options);
        return response.data.data;
      } catch (error) {
        console.log(error);
        return false;
      }
    },

    async getQaStructs_actions(context, params) {
      try {
        let query = {
          currency: context.rootState.calculator.selectedUnderlying,
          maturity: context.rootState.calculator.selectedMaturity,
          amount: context.rootState.calculator.coinAmount,
          fut_hedge_flag: params.fut_hedge_flag,
          main_direction: params.main_direction,
          main_range: `[${
            Array.isArray(params.main_range)
              ? params.main_range.join(",")
              : params.main_range
          }]`,
          sub_direction_flag: params.sub_direction_flag,
          sub_range: `[${
            Array.isArray(params.sub_range)
              ? params.sub_range.join(",")
              : params.sub_range
          }]`,
          max_slippage: params.max_slippage,
        };

        const url = `data/qaStructs?${Object.entries(query)
          .map((r) => `${r[0]}=${r[1]}`)
          .join("&")}`;
        console.log("url", url);
        let response = await axios.get(url);
        return response.data.data;
      } catch (error) {
        return false;
      }
    },
  },

  getters: {
    maturityList: (state) => state.maturityList,
    fullDataList: (state) => state.fullDataList,
    underlyingChoice: (state) => state.underlying,
    tableList: (state) => state.key,
    maturity: (state) => state.maturity,
    userFirebase: (state) => state.user,
  },

  modules: {
    auth,
    calculator,
  },
});

export default store;
