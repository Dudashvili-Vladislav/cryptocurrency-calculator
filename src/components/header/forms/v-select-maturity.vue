<template>
  <div class="v-select-maturity">
      <label class="block" for="Underlying">Underlying</label>

      <select
        class="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
        id="select"
        v-model="underlying"
      >
        <option v-for="maturityItem in maturityData" :value="maturityItem" :key="maturityItem">{{ maturityItem }}</option>
      </select>
    </div>
</template>

<script>
export default {
  name: "v-select-maturity",
  emits: ['upMaturity'],

  props: {
    maturityData: {
      type: Array
    }
  },

  data() {
    return {
      underlying: ''
    }
  },

  watch: {
    underlying() {
      this.$emit('upMaturity', this.underlying)
    }
  }
};
</script>
