<template>
  <div class="v-checkbox">
    <label class="ml-8 flex justify-start items-start pt-7">
      <div
        class="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500"
      >
        <input
          type="checkbox"
          v-model="checkFutures"
  
          @input="throttledSave"
        />
        <svg
          class="fill-current hidden w-4 h-4 text-green-500 pointer-events-none"
          viewBox="0 0 20 20"
        >
          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
        </svg>
      </div>
      <div class="select-none"><slot></slot></div>
    </label>
  </div>
</template>

<script>
import throttle from "../../../throttle.js";

export default {
  name: "v-checkbox",

  emits: ["checked", "update:modelValue", "upAmount"],

  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      checkFutures: this.modelValue,
      timerId: null,
    };
  },

  watch: {
    checkFutures() {
      this.$emit("update:modelValue", Boolean(this.checkFutures));
    },

    modelValue(newValue) {
      this.checkFutures = newValue;
    },
  },

  methods: {

    throttledSave() {
      let DELAY = 1000; // Задержка

      clearTimeout(this.timerId);
      this.timerId = setTimeout(() => {
        this.$emit("checked", this.checkFutures);
      }, DELAY);
    },
  },
};
</script>
