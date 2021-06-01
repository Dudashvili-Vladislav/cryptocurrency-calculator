import { createStore } from "vuex";
import axios from "axios";
import { setInterval } from "core-js";

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
    };
  },

  mutations: {
    setMaturityList_mutations(state, maturityList) {
      state.maturityList = maturityList;
    },

    setMaturity_mutations(state, maturity) {
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
    },

    setTable_mutations(state, table) {
      for (const key in state.fullDataList) {
        const element = state.fullDataList[key];
        element.table = table[key].table;
      }
    },
  },

  actions: {
    async getMaturity_actions({ commit }, underlying) { // Получаем все даты
      try {
        const url = "/maturities";
        const options = {
          params: { currency: underlying },
        };

        const response = await axios.get(url, options);
        const data = response.data.data[underlying];
        commit("setMaturityList_mutations", data); 
      }
       catch (error) {
        return error;
      }
    },



    async getStatisctics_actions({ commit }) { // Получаем все графики
      try {
        const url = "/recStructs";
        const options = {
          params: {
            currency: this.state.underlying,
            maturity: this.state.maturity,
            amount: this.state.amount,
            fut_hedge_flag: this.state.futHedgeFlag,
          },
        };
        const response = await axios.get(url, options);
        if (response.status === 200) {
          commit("setFullData_mutations", response.data.data); 
        }
      }

       catch (error) {
        return error;
      }
    },

    


    getTableStaticsics_actions({ commit }) {
      try {
        const url = "/recStructs";
        const options = {
          params: {
            currency: this.state.underlying,
            maturity: this.state.maturity,
            amount: this.state.amount,
            fut_hedge_flag: this.state.futHedgeFlag,
          },
        };

        setInterval(async () => {
          const response = await axios.get(url, options);
          commit("setTable_mutations", response.data.data);
        }, 2000);
      }
       catch (error) {
        return error;
      }
    },



    async sendOrder({ commit }, data) {
      console.log("data_sendOrder", data);
      const url = "/sendOrder";
      axios.post(url, data);
    },
  },



  getters: {
    maturityList: (state) => state.maturityList,
    fullDataList: (state) => state.fullDataList,
    underlyingChoice: (state) => state.underlying,
    tableList: (state) => state.key,
  },
});

export default store;
