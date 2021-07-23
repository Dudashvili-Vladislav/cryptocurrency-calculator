<template>
  <div class="v-button">
    <div class="tables pt-10 mr-10 w-full">
      <div class="flex">
        <button
          type="submit"
          @click.prevent="this.$emit('upGetStatisctics')"
          class="button mt-2 focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-gray-500 hover:bg-gray-600 hover:shadow-lg"
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
<style scoped>
.button{
  font-weight: 600;
  font-size: 14px;
line-height: 16px;
  font-family: Gilroy;
  width: 131px;
  height: 46px;
  padding: 16px 24px;
  left: 48px;
top: 724px;
background: linear-gradient(270deg, #8743FF 0%, #4136F1 100%);
border-radius: 5px;
}
</style>
