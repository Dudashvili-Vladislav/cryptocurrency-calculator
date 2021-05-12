import { createStore } from 'vuex'
import axios from 'axios'

let store = createStore({

    state() {
        return {
            maturityList: [],
            maturity: null,
            underlying: null,
            amount: null,
            futHedgeFlag: false,
            fullDataList: null, 
            chartData: null, 
        }
    },

    mutations: {
        setMaturityList_mutations(state, maturityList) {
            state.maturityList = maturityList
        },

        setMaturity_mutations(state, maturity) {
            state.maturity = maturity
        }, 

        setUnderlying_mutations(state, underlying) {
            state.underlying = underlying
        },

        setAmount_mutations(state, count) {
            state.amount = count
        },
        setFlagFutures_mutations(state, flag) {
            state.futHedgeFlag = flag
        },
        setFullData_mutations(state, data) {
            state.fullDataList = data
        },
        setStatiscticsForChart_mutations(state, statistic) {
            state.chartData = statistic
        }
    },

    actions: {
        getMaturity_actions({ commit }, underlying) {
            return new Promise(( resolve, reject) => {
                axios({ url: 'http://localhost:5000/maturities', params: {currency: underlying}, method: 'GET'})
                .then(resp => {
                    const data = resp.data.data[underlying]
                    commit('setMaturityList_mutations', data)
                    resolve(resp)
                })
                .catch(resp => {
                    reject(resp)
                })
            })
        },

        getStatisctics_actions({ commit }) {
            return new Promise(( resolve, reject) => {
                axios({ url: 'http://localhost:5000/recStructs', params: {currency: this.state.underlying, maturity: this.state.maturity, amount: this.state.amount, fut_hedge_flag: this.state.futHedgeFlag}, method: 'GET'})
                .then(resp => {
                    commit('setFullData_mutations', resp.data.data)
                    // Этот запрос возвращает всю дату, поэтому, напиши здесь код соединения двух списков
                    // А после передай получившийся список сюда: commit('setStatiscticsForChart_mutations', Твоя переменная)
                    resolve(resp)
                })
                .catch(resp => {
                    reject(resp)
                })
            })
        }
    },

    getters: {
        maturityList: state => state.maturityList,
        fullDataList: state => state.fullDataList
    }
})

export default store;