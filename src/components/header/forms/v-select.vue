<template>
  <div class="v-select-underlying">
    <label class="block" for="Underlying">{{ label }}</label>

    <select
      class="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
      id="select"
      v-model="selected"
      @change="onChangeSelect"
      @input="throttledSave"
    >
      <option v-for="item in options" :value="item" :key="item">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script>
import throttle from "../../../throttle.js";

export default {
  name: "v-select",

  props: {
    modelValue: {
      type: String,
      default: "",
    },

    options: {
      type: Array,
      default: () => [],
    },

    label: {
      type: String,
      default: "",
    },
  },

  emits: ["change", "input"],

  data() {
    return {
      selected: this.modelValue,
      timerId: null,
    };
  },

  watch: {
    selected() {
      this.$emit("update:modelValue", String(this.selected));

      
    },

    modelValue(newValue) {
      this.selected = newValue;
      console.log("throttleSELECT", this.throttledSave); 
    },
  },

  methods: {
    onChangeSelect() {
      this.$emit("change", String(this.selected));
    },

    throttledSave() {
      let DELAY = 1000; // Задержка

      clearTimeout(this.timerId);
      this.timerId = setTimeout(() => {
        this.$emit("upAmount", this.selected);
      }, DELAY);
    },
  },
};
</script>
