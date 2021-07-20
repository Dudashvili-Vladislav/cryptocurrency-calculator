<template>
  <div class="v-header-forms">
    <div
      class="form-control text-gray-700 pointer-events-auto w-1/6 justify-start"
    >
      <vSelect 
        v-model="selectedunderlying"
        :label="'Underlying'"
        :options="underlyingList"
        @change="getMaturity"
      >
      </vSelect>
    </div>

    <div
      class="form-control text-gray-700 pointer-events-auto w-1/6 justify-start ml-8"
    >

      <vSelect 
        v-model="selectedMaturity"
        :label="'Maturity'"
        :options="maturityList"
        @change="setMaturity"
      >
      </vSelect>


    </div>
    <div class="form-control text-gray-700 pointer-events-auto w-1/6 ml-8">
      <vAmount 
      v-model="coinAmount" 
      @click.prevent="$emit('upGetStatisctics')"  
      @upAmount="setAmount"
      :label="'Amount ' + $store.state.underlying"
        />
    </div>
    <vCheckbox v-model="Checkbox"  @checked="handleCheckbox">
      Futures hedge funding
    </vCheckbox>
  </div>
</template>
<script>

import { mapGetters, mapActions, mapState } from "vuex";

import vSelect from "./forms/v-select";
import vAmount from "./forms/v-amount";
import vCheckbox from "./forms/v-checkbox";

export default {
  name: "v-header-forms",

  components: {
    vAmount,
    vSelect,
    vCheckbox,
  },

  emits: ["upGetStatisctics"],

  data() {
    return {
      msg: "waiting",
      underlyingList: ['BTC', 'ETH'],
      selectedMaturity: null,
      selectedunderlying: null,
      coinAmount: 0,
      Checkbox: false,
      timerId: null,
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
       this.fieldsCheck()

    },
 


    selectedunderlying() {
      this.selectedMaturity = null;
    },

  },

  methods: {
    ...mapActions(["getMaturity_actions"]),
 

    handleCheckbox(value) {
      console.log('valueeeeeeeeeeeee', value)
      this.$store.commit('setFlagFutures_mutations', value);
      this.fieldsCheck()
    },

    getMaturity(underlying) {
      this.$store.commit("setUnderlying_mutations", underlying);
      this.getMaturity_actions(underlying);
      this.selectedMaturity = null,
      this.selectedunderlying = null,
      this.coinAmount = 0,
      this.Checkbox = false,
      this.$store.commit("setFullData_mutations", null), // обнуляем объект с графиками
      this.$store.commit('setAmount_mutations', 0) // обнуляем количество валюты
      
    },

    setMaturity(event) {
      setTimeout(()=>{
      this.$store.commit("setMaturity_mutations", event);
      this.fieldsCheck()
      },1000)


    },

    setAmount(count) {
      this.$store.commit("setAmount_mutations", count);
    },

    fieldsCheck(){
      if (this.amount !== 0  &&  this.selectedHedg !== null && this.selectedCoin !== null){
          this.$store.dispatch('getStatisctics_actions');
          this.$store.dispatch('getTableStaticsics_actions'); 
          console.log('amount',this.amount);
      }
    },


  },

};
</script>
<style>
.v-header-forms {
  display: flex;
  justify-content: space-between;
  flex: 1 1;
}

.v-select-underlying {
  min-width: 275px;
}

.v-checkbox .select-none{
  font-size: 18px;
  line-height: 21px;
  color: #FFFFFF;
}

</style>