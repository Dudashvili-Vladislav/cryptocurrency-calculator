<template>
  <div class="v-select-underlying">
      <label class="block" for="Underlying">Underlying</label>

      <select
        class="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
        x-cloak
        id="select"
      >
        <option value="large">BTC</option>
        <option value="medium">ETH</option>
        <option value="" disabled selected style="display: none">
          Select...
        </option>
      </select>
    </div>
</template>

<script>
export default {
  name: "v-select-underlying",
};
</script>
