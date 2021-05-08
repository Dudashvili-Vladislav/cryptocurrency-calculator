<template>
  <div class="v-header-forms">
    
    <div class="containet mx-auto px-10 text-sm">
      <div class="header flex justify-start">
        <div
          class="form-control text-gray-700 pointer-events-auto w-1/6 justify-start"
        >
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
        <div class="form-control text-gray-700 pointer-events-auto w-1/6 ml-8">
          <label class="block" for="Underlying">Maturity</label>
          <select
            class="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
            x-cloak
            id="select"
          >
            <option value="large"></option>
            <option value="large"></option>
            <option value="large"></option>
            <option value="large"></option>
            <option value="large"></option>
            <option value="large"></option>
            <option value="large"></option>
            <option value="large"></option>
            <option value="large"></option>
            <option value="large"></option>
            <option value="large"></option>
            <option value="" disabled selected style="display: none">
              Select...
            </option>
          </select>
        </div>
        <div class="form-control text-gray-700 pointer-events-auto w-1/6 ml-8">
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
export default {
  components: {
    name: "v-header-forms",
  },
};
</script>

<style scoped>
</style>