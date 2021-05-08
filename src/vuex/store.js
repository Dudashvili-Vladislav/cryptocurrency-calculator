import { createStore } from 'vuex'
import axios from 'axios'

let store = createStore({

    state() {
        return {
            maturity: []
        }
    },

    mutations: {
        setMaturity_mutations(state, maturity) {
            state.maturity = maturity
        }
    },

    actions: {
        getMaturity_actions({ commit }, underlying) {
            return new Promise(( resolve, reject) => {
                axios({ url: 'http://localhost:5000/maturities', params: {currency: underlying}, method: 'GET'})
                .then(resp => {
                    const data = resp.data.data[underlying]
                    console.log(data)
                    commit('setMaturity_mutations', data)
                    resolve(resp)
                })
            })
        }
    },

    getters: {
        maturity: state => state.maturity
    }
})

export default store;