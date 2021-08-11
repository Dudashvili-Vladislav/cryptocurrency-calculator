<template>
  <div class="v-button">
    <div class="tables mr-10 w-full">
      <div class="flex">
        <button
          type="submit"
          @click.prevent="this.$emit('upGetStatisctics')"
          class="button focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-gray-500 hover:bg-gray-600 hover:shadow-lg"
          :class="size"
        >
          SEND ORDER
          <slot></slot>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-button",

  emits: ["upGetStatisctics"],

  props: {
    size: {
      type: String,
      default: "",
    },
  },
};
</script>
<style scoped>
.button {
  font-size: 12px;
  line-height: 14px;

  padding: 16px 24px;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.1em;

  background: linear-gradient(270deg, #8743ff 0%, #4136f1 100%);
  border-radius: 5px;
  font-family: Gilroy;
  font-style: normal;
  font-weight: 400;
}
</style>
