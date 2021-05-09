<template>
  <div class="v-header-forms">
    
    <div class="containet mx-auto px-10 text-sm">
      <div class="header flex justify-start">
        <div class="form-control text-gray-700 pointer-events-auto w-1/6 justify-start">
          <vSelectUnderlying @receiveMaturity="getMaturity" />
        </div>

        <vSelectMaturity :maturityData="maturityList" @upMaturity="setMaturity"/>
        
        <div class="form-control text-gray-700 pointer-events-auto w-1/6 ml-8">
          <vAmount @upAmount="setAmount" />
        </div>
        <vCheckbox />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import vSelectMaturity from './forms/v-select-maturity'
import vSelectUnderlying from './forms/v-select-underlying'
import vAmount from './forms/v-amount'
import vCheckbox from './forms/v-checkbox'

export default {
  name: "v-header-forms",

  computed: {
    ...mapGetters(["maturityList"]),
  },

  methods: {
    ...mapActions(["getMaturity_actions"]),

    getMaturity(underlying) {
      this.$store.commit('setUnderlying_mutations', underlying);
      this.getMaturity_actions(underlying)
    },

    setMaturity(event) {
      this.$store.commit('setMaturity_mutations', event);
    },
    
    setAmount(count) {
      this.$store.commit('setAmount_mutations', count);
    }
  },

  components: {
    vSelectMaturity,
    vSelectUnderlying,
    vAmount,
    vCheckbox
  }
};
</script>