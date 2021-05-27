<template>
  <div class="v-send-order">
    <div class="tables pt-10 mx-auto px-10 w-full">
      <div class="flex">
        <button
          type="submit"
          @click.prevent="this.$emit('upGetStatisctics')"
          class="mt-2 focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-gray-500 hover:bg-gray-600 hover:shadow-lg"
        >
          SendOrder
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'v-send-order',
    emits: ["upGetStatisctics"]
};
</script>
