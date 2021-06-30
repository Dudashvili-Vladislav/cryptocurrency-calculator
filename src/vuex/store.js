import { createStore } from "vuex";
import axios from "axios";
import { setInterval } from "core-js";
import auth from './modules/auth'

axios.defaults.baseURL = "http://localhost:5000";

let store = createStore({
  state() {
    return {
      maturityList: [],
      maturity: null,
      underlying: null,
      amount: 0,
      futHedgeFlag: false,
      fullDataList: null,
      result: null,
      value: null,
      key: 0,
      timerId: null,
      loading: false,
      flagQaStruct: false,
      selectedDirection: null,
      message: null,
      
    };
  },

  mutations: {
    setMessage(state, message) {
      state.message = message
    },

    clearMessage(state) {
      state.message = null
    },

    setMaturityList_mutations(state, maturityList) {
      state.maturityList = maturityList;
    },

    setMaturity_mutations(state, maturity) {
      // Получаем дату которую выбрали
      state.maturity = maturity;
      console.log("maturity", maturity);
    },

    setUnderlying_mutations(state, underlying) {
      state.underlying = underlying;
             console.log('underlying', underlying) 
    },

    setAmount_mutations(state, count) {
      state.amount = count;
    },

    setFlagFutures_mutations(state, flag) {
      state.futHedgeFlag = flag;
    },

    setFullData_mutations(state, data) {
      state.fullDataList = data;
      /*       console.log("data",data);  */
    },

    setTable_mutations(state, table) {
      /*       console.log('setTable_mutations', table) */
      for (const key in state.fullDataList) {
        const element = state.fullDataList[key];
        element.table = table[key].table;
      }
    },

    setTimerId(state, timerId) {
      state.timerId = timerId;
    },

    setLoading(state, value) {
      state.loading = value;
    },

    /*     selectedDirection(state, selectedDirection) {
      state.selectedDirection = selectedDirection;
    }, */
  },

  actions: {
    setMessage({commit}, message) {
      commit('setMessage', message)
      setTimeout( () => {
        commit('clearMessage')
      }, 3000)
    },

    async getMaturity_actions({ commit }, underlying) {
      // Получаем все даты
      try {
        const url = "/maturities";
        const options = {
          params: { currency: underlying },
        };
        commit("setLoading", true);
        const response = await axios.get(url, options);
        const data = response.data.data[underlying];
        commit("setLoading", false);
        commit("setMaturityList_mutations", data);

        return data;
      } catch (error) {
        return error;
      }
    },

    async getStatisctics_actions({ commit, rootState }) {
      // Получаем все графики
      try {
        const flag = String(rootState.futHedgeFlag);
        const url = "/recStructs";
        const options = {
          params: {
            currency: rootState.underlying,
            maturity: rootState.maturity,
            amount: rootState.amount,
            fut_hedge_flag: flag.charAt(0).toUpperCase() + flag.slice(1),
          },
        };
        /*         console.log('options 1', options) */
        const response = await axios.get(url, options);
        commit("setFullData_mutations", response.data.data);
        /*         console.log('RESPONCE', rootState.fullDataList) */
        return response.data.data;
      } catch (error) {
        return error;
      }
    },

    getTableStaticsics_actions({ commit, rootState }) {
      try {
        const flag = String(rootState.futHedgeFlag);
        const url = "/recStructs";
        const options = {
          params: {
            currency: rootState.underlying,
            maturity: rootState.maturity,
            amount: rootState.amount,
            fut_hedge_flag: flag.charAt(0).toUpperCase() + flag.slice(1),
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
      console.log("data_sendOrder", data);
      const url = "/sendOrder";
      axios.post(url, data);
    },

    async getStrikes_actions(context, selectedCoin) {
      try {
        const url = "/strikes";
        const options = {
          params: {
            currency: selectedCoin,
          },
        };

        const response = await axios.get(url, options);
        return response.data.data;
      } catch (error) {
        return false;
      }
    },

    async getQaStructs_actions(context, params) {
      console.log("params", params);
      try {
        const url = `/qaStructs?currency=${params.currency}&maturity=${params.maturity}&amount=${params.amount}&fut_hedge_flag=${params.fut_hedge_flag}&main_direction=${params.main_direction}&main_range=[${params.main_range}]&sub_direction_flag=${params.sub_direction_flag}&sub_range=[${params.sub_range}]`;
        const response = await axios.get(url);
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
  },
  modules: {
    auth,
  },
});

export default store;
