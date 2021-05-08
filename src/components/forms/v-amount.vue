<template>
  <div class="v-amount">
    <label for="money">Amount of BTC</label>
    <input
      type="number"
      min="0"
      name="money"
      placeholder="0"
      class="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
      x-cloak
    />
    <div class="absolute top-0 left-0 mt-3 ml-1 text-gray-400"></div>
    <span class="text-sm text-red-600 hidden" id="error"></span>
  </div>
</template>

<script>
export default {
  name: "v-amount",
};
</script>
