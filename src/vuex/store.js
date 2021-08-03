import { createStore } from "vuex";
import axios from "axios";
import { setInterval } from "core-js";
import auth from './modules/auth'
import calculator from "./modules/calculator";

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

    async getMaturity_actions({ commit,rootState}, ) {
      // Получаем все даты
      try {
        console.log("rootState",rootState);
        const url = "/maturities";
        console.log("options",options);
        const options = {
          params: { currency: rootState.calculator.selectedUnderlying },
        };
        commit("setLoading", true);
        const response = await axios.get(url, options);
        const data = response.data.data;
        commit("setLoading", false);
        commit("setMaturityList_mutations", data[rootState.calculator.selectedUnderlying]);

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
            currency: rootState.calculator.selectedUnderlying,
            maturity: rootState.calculator.selectedMaturity,
            amount: rootState.calculator.coinAmount,
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
            currency: rootState.calculator.selectedUnderlying,
            maturity: rootState.calculator.selectedMaturity,
            amount: rootState.calculator.coinAmount,
            fut_hedge_flag: flag.charAt(0).toUpperCase() + flag.slice(1),
          },
        };
        console.log("params",options.params);

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

    async getStrikes_actions(context) {
      try {
        const url = "/strikes";
        const options = {
          params: {
            currency: context.rootState.calculator.selectedUnderlying,
          },
        };

        const response = await axios.get(url, options);
        return response.data.data;
      } catch (error) {
        console.log(error)
        return false;
      }
    },

    async getQaStructs_actions(context, params) {
      console.log("params", params);
      try {
        let query = {
          currency: context.rootState.calculator.selectedUnderlying,
          maturity: context.rootState.calculator.selectedMaturity,
          amount: context.rootState.calculator.coinAmount,
          fut_hedge_flag: params.fut_hedge_flag,
          main_direction: params.main_direction,
          main_range: `[${ Array.isArray(params.main_range) ? params.main_range.join(',') : params.main_range }]`,
          sub_direction_flag: params.sub_direction_flag,
          sub_range: `[${ Array.isArray(params.sub_range) ? params.sub_range.join(',') : params.sub_range }]`,
          max_slippage: params.max_slippage
        }

        const url = `/qaStructs?${ Object.entries(query).map(r => `${ r[0] }=${ r[1] }`).join('&') }`;
        console.log("url",url);
        let response = await axios.get(url);

        console.log("response",response);
        return response.data.data;
      }

       catch (error) {
        console.log("error",error);
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
    calculator
  },
});

export default store;
