<template>
  <div class="v-select-underlying">
      <label class="block" for="Underlying">Underlying</label>

      <select
        class="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
        id="select"
        v-model="underlying"
      >
        <option value="BTC" selected>BTC</option>
        <option value="ETH">ETH</option>
      </select>
    </div>
</template>

<script>
export default {
  name: "v-select-underlying",
  emits: ['receiveMaturity'],

  data() {
    return {
      underlying: ''
    }
  },

  watch: {
    underlying() {
      this.$emit('receiveMaturity', this.underlying)
    }
  }
};
</script>
