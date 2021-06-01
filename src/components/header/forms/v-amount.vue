<template>
  <div class="v-amount">
    <label for="money">Amount of BTC</label>
    <input
      type="number"
      min="0"
      name="money"
      placeholder="0"
      
      @input="debounce(() => { state.filterText = $event.target.value })"
      class="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
      v-model="amountCount"
    />
    <div class="absolute top-0 left-0 mt-3 ml-1 text-gray-400"></div>
    <span class="text-sm text-red-600 hidden" id="error"></span>
  </div>
</template>

<script>
export default {
  name: "v-amount",

  data() {
    return {
      amountCount: 0,
    };
  },
 /*  methods: {
     debounce = (fn, ms) => {
       let timeout;
       return function () {

         const fnCall = () => {fn.apply(this, arguments)}
         clearTimeout(timeout);
         timeout = setTimeout(fnCall, ms)

       };
    }
     
  },
 */
  watch: {
    amountCount() {
      this.$emit("upAmount", this.amountCount); 
/*       amountCount = this.debounce(amountCount, 2000) */
    },
  },
};
</script>
