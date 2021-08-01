export default {
    namespaced: true,

    state: {
        selectedUnderlying: null,
        selectedMaturity: null,
        coinAmount: 123,
        hedgeFunding: false,

        maturityList: {
            btc: [],
            eth: []
        }
    },

    mutations: {
        setUnderlying(state, value) {
            state.selectedUnderlying = value
        },
        setMaturity(state, value) {
            state.selectedMaturity = value
        },
        setCoinAmount(state, value) {
            state.coinAmount = value
        },
        setHedgeFunding(state, value) {
            state.hedgeFunding = value
        },

        clearForm(state) {
            state.selectedUnderlying = null
            state.selectedMaturity = null
            state.coinAmount = 0
            state.hedgeFunding = false
        }
    }
}
