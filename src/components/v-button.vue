<template>
  <div class="v-button">
    <div class="tables pt-10 mx-auto px-10 w-full">
      <div class="flex">
        <button
          type="submit"
          @click.prevent="this.$emit('upGetStatisctics')"
          class="mt-2 focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-gray-500 hover:bg-gray-600 hover:shadow-lg"
          :class="size"
        >Send Order
          <slot></slot>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'v-button',

    emits: ["upGetStatisctics"],

    props: {
      size: {
        type: String,
        default: ''
      },
    },
};
</script>
