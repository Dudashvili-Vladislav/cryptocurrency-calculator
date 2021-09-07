import { createStore } from "vuex";
import axios from "axios";
import { setInterval } from "core-js";
import auth from "./modules/auth";
import calculator from "./modules/calculator";

axios.defaults.baseURL = "http://213.79.122.13:50805";

let store = createStore({
  state() {
    return {
      user: null,
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
        return response2.data;
      } catch (error) {
        console.log("error", error);
        return error;
      }
    },
    highAndLow(numbers){
      let arr = numbers.split(' ');
      let max = arr[0],min = arr[0];
      for(var i = 0;i<arr.length;i++){
        if(parseInt(arr[i]) > max){
          max = arr[i];
        }
        if(parseInt(arr[i]) < min){
          min = arr[i]
        }
      }
      let result = max + ' ' + min;
      console.log("RESULT",result);
      return result;

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
      const url = "data/sendOrder";
      axios.post(url, data);
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
