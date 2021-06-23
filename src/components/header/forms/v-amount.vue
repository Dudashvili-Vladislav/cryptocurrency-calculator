<template>
  <div class="v-amount">
    <label for="money">{{ label }} </label>
    <input
      type="number"
      min="0"
      name="money"
      placeholder="0"
      @input="throttledSave"
      class="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
      v-model="amountCount"
    />
    <div class="absolute top-0 left-0 mt-3 ml-1 text-gray-400"></div>
    <span class="text-sm text-red-600 hidden" id="error"></span>
  </div>
</template>

<script>
import throttle from "../../../throttle.js";

export default {
  name: "v-amount",

  emits: ["upAmount", "update:modelValue"],

  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
    label: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      amountCount: this.modelValue,
      timerId: null,
    };
  },

  watch: {
    amountCount() {
      this.$emit("update:modelValue", Number(this.amountCount));
    },

    modelValue(newValue) {
      this.amountCount = newValue;
    },
  },

  methods: {
    throttledSave() {
      let DELAY = 1000; // Задержка

      clearTimeout(this.timerId);
      this.timerId = setTimeout(() => {
        this.$emit("upAmount", this.amountCount);
      }, DELAY);
    },
  },
};
</script>
