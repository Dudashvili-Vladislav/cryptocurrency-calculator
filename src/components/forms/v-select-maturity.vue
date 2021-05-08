<template>
  <div class="form-control text-gray-700 pointer-events-auto w-1/6 ml-8">
    <label class="block" for="Underlying">Maturity</label>
    <select
      class="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
      x-cloak
      id="select"
    >
      <option value="large" v-for="maturityItem in maturityData" :key="maturityItem"> {{ maturityItem }} </option>

      <option value="" disabled selected style="display: none">
        Select...
      </option>
    </select>
  </div>
</template>

<script>
export default {
    name: "v-select-maturity",

    props: {
        maturityData: {
            type: Object,
            default() {
                return {}
            }
        }
    }
}
</script>
