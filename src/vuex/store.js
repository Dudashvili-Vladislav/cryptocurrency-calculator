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
            result: null,
            value: null,
           
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
            const result = Object.entries(statistic).map(item => {
                return {
                  x: item[1],
                  y: item[0]
                }
              })
            state.chartData = result
            
            console.log(state.chartData) 
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

                    const key = store.state.fullDataList[5]["chart"]["y_struct"]
                    const value = store.state.fullDataList[5]["chart"]["x"]
                    const result = key.reduce((acc,n,i) => ({...acc, [n]: value[i] }), {})

                    console.log(result)
                    commit('setStatiscticsForChart_mutations',result)

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
        fullDataList: state => state.fullDataList,
        chartData: state => state.chartData,
        underlyingChoice: state => state.underlying 
    }
})

export default store;