<template>
  <div class="v-header-forms">
    <div class="containet mx-auto px-10 text-sm">
      <div class="header flex justify-start">
        <div
          class="form-control text-gray-700 pointer-events-auto w-1/6 justify-start"
        >
          <vSelectUnderlying @receiveMaturity="getMaturity" />
        </div>
        <div
          class="form-control text-gray-700 pointer-events-auto w-1/6 justify-start ml-8"
        >
          <vSelectMaturity
            :maturityData="maturityList"
            @upMaturity="setMaturity"
          />
        </div>
        <div class="form-control text-gray-700 pointer-events-auto w-1/6 ml-8">
          <vAmount @click.prevent="this.$emit('upGetStatisctics')"  @upAmount="setAmount"  />
        </div>
        <vCheckbox />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";

import vSelectMaturity from "./forms/v-select-maturity";
import vSelectUnderlying from "./forms/v-select-underlying";
import vAmount from "./forms/v-amount";
import vCheckbox from "./forms/v-checkbox";

export default {
  emits: ["upGetStatisctics"],
  name: "v-header-forms",
  data() {
    return {
      msg: "waiting",


    }
  },

  computed: {
    ...mapGetters(["maturityList"]),
    ...mapState({
      amount: state => state.amount,
      selectedCoin: state => state.underlying,
      selectedHedg: state => state.maturity,
    }) 
  },
  watch: {
    amount(newValue, oldValue) {
      console.log(this.selectedCoin)
      console.log(this.selectedHedg)

    },
     selectedCoin(newValue, oldValue) {
       this.FieldsCheck()
    },
     selectedHedg(newValue, oldValue) {
      console.log(this.selectedCoin)
      console.log(this.selectedHedg)
    }
  },

  methods: {
    ...mapActions(["getMaturity_actions"]),

    getMaturity(underlying) {
      this.$store.commit("setUnderlying_mutations", underlying);
      this.getMaturity_actions(underlying);
    },

    setMaturity(event) {
      this.$store.commit("setMaturity_mutations", event);
    },

    setAmount(count) {
      this.$store.commit("setAmount_mutations", count);
    },

    FieldsCheck(){
      if (this.amount != 0  &&  this.selectedHedg !=  null && this.selectedCoin != null){
        console.log("amount",this.amount)
      }
      
    },
       
      
 

  },
  

  

  components: {
    vSelectMaturity,
    vSelectUnderlying,
    vAmount,
    vCheckbox,
  },
};
</script>
