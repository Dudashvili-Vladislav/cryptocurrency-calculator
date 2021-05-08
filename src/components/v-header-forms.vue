<template>
  <div class="v-header-forms">
    
    <div class="containet mx-auto px-10 text-sm">
      <div class="header flex justify-start">
        <div class="form-control text-gray-700 pointer-events-auto w-1/6 justify-start">
          <vSelectUnderlying />
        </div>

        <vSelectMaturity :maturityData="maturity" />
        
        <div class="form-control text-gray-700 pointer-events-auto w-1/6 ml-8">
          <vAmount />
        </div>

        <label class="ml-8 flex justify-start items-start pt-7">
          <div
            class="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500"
          >
            <input type="checkbox" class="opacity-0 absolute" />
            <svg
              class="fill-current hidden w-4 h-4 text-green-500 pointer-events-none"
              viewBox="0 0 20 20"
            >
              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
            </svg>
          </div>
          <div class="select-none">Futures hedge funding</div>
        </label>
      </div>
    </div>
  </div>
</template>




<script>
import { mapGetters, mapActions } from 'vuex'

import vSelectMaturity from './forms/v-select-maturity'
import vSelectUnderlying from './forms/v-select-underlying'
import vAmount from './forms/v-amount'

export default {
  name: "v-header-forms",

  computed: {
    ...mapGetters(["maturity"]),
  },

  methods: {
    ...mapActions(["getMaturity_actions"]),
  },

  mounted() {
    this.getMaturity_actions('BTC');
  },

  components: {
    vSelectMaturity,
    vSelectUnderlying,
    vAmount
  }
};
</script>

<style scoped>
</style>