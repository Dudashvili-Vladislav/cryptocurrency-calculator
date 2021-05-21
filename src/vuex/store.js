import { createStore } from 'vuex'
import axios from 'axios'



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
            console.log("teststtststs")
        },
        setFlagFutures_mutations(state, flag) {
            state.futHedgeFlag = flag
            console.log("flaggggggggggggg",flag)
        },
        setFullData_mutations(state, data) {
            state.fullDataList = data

        },

    },

    actions: {
        getMaturity_actions({ commit }, underlying) {
            return new Promise(( resolve, reject) => {
                axios({ url: 'http://localhost:5000/maturities', params: {currency: underlying}, method: 'GET'})
                .then(resp => {

                    const data = resp.data.data[underlying]
                    console.log("data", data)
                    commit('setMaturityList_mutations', data)
                    resolve(resp)
                })
                .catch(resp => {
                    reject(resp)
                })
            })
        },

        getStatisctics_actions({ commit }) {
            console.log("getStatisctics_actions",this.state.amount)
            return new Promise(( resolve, reject) => {
                axios({ url: 'http://localhost:5000/recStructs', params: {currency: this.state.underlying, maturity: this.state.maturity, amount: this.state.amount, fut_hedge_flag: this.state.futHedgeFlag}, method: 'GET'})
                .then(resp => {
                    commit('setFullData_mutations', resp.data.data) // Получаем все графики
                    console.log("resp resp.data.data",resp.data.data) 
                    console.log("resp",resp) 
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
        underlyingChoice: state => state.underlying,
    }
})

export default store;