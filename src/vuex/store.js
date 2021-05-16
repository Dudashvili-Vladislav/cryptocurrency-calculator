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
            chartData: [], 
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
                console.log("item",item[1])
                const key = Object.keys(item[1])
                const parsedX = parseInt(key[0])
                return {
                
                  x: parsedX,
                  y: item[1][key]
                }
              })

            console.log("RESULT",result)
            state.chartData.push(result)
            
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

                    const yStruct = store.state.fullDataList[5]["chart"]["y_struct"]
                    const yPortf = store.state.fullDataList[5]["chart"]["y_portf"]
                    const value = store.state.fullDataList[5]["chart"]["x"]

                    const structData = yStruct.map((data, i) => {
                        return {
                          [data]: value[i],
                        };
                      });
                    commit('setStatiscticsForChart_mutations',structData)
                    
                    const portfData = yPortf.map((data, i) => {
                        return {
                          [data]: value[i],
                        };
                      });
                    commit('setStatiscticsForChart_mutations',portfData)

                    console.log("structData",structData)
                    console.log("portfData",portfData)
                    console.log(store.state.chartData)

                    console.log("yPortf",yPortf)
                    console.log("yStruct",yStruct)

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
        underlyingChoice: state => state.underlying,
    }
})

export default store;