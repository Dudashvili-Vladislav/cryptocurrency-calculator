export default {
    namespaced: true,

    state: {
        selectedUnderlying: null,
        selectedMaturity: null,
        coinAmount: 0,
        hedgeFunding: false,
        lang: "en",
        

        maturityList: {
            btc: [],
            eth: []
        }
    },

    mutations: {
        setLang(state, value) {
            state.lang = value
        },
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
        },
        clearFormCustomQa(state) {
            state.selectedMaturity = null
            state.coinAmount = 0
            state.hedgeFunding = false
        },

        clearFormRecomended(state) {
            state.selectedMaturity = null
            state.coinAmount = 0
            state.hedgeFunding = false
        },
    }
}
