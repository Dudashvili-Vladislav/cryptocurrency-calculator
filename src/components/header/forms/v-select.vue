<template>
  <div class="v-select-underlying">
    <label class="label-select-header block" for="Underlying">{{
      label
    }}</label>

    <div class="select__wrapper">
      <select
        class="select w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
        id="select"
        v-model="selected"
        @change="onChangeSelect"
        @input="throttledSave"
      >
        <option
          class="option"
          v-for="item in options"
          :value="item"
          :key="item"
        >
          {{ item }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import throttle from "../../../throttle.js";

import { mapState } from "vuex";

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

  emits: ["change", "input", "upAmount", "update:modelValue"],

  data() {
    return {
      selected: this.modelValue,
      timerId: null,
    };
  },

  watch: {
    modelValue(newValue) {
      this.selected = newValue;
    },
  },

  ...mapState({
    underlying: (state) => state.underlying,
    maturity: (state) => state.maturity,
  }),

  methods: {
    onChangeSelect() {
      this.$emit("update:modelValue", String(this.selected));
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
<style scoped>
.label-select-header {
    font-family: Gilroy;
}
.select__wrapper {
  
  position: relative;
}
.select__wrapper:after {
  content: "";
  display: block;
  position: absolute;
  margin-top: 3px;
  border-style: solid;
  border-width: 6px 5px 0 5px;
  border-color: white transparent transparent transparent;
  top: 50%;
  right: 1rem;
  z-index: 1;
  pointer-events: none;


  
}
.select {
  background: none;
  border: 1px solid rgba(65, 54, 241, 1);
  color: #ffffff;
  opacity: 0.5;
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  border-radius: 4px;
  margin-top: 10px;
    font-family: Gilroy;
}
.select .option {
  background: rgba(2, 3, 14, 0.226);
  color: #ffffff;
  
}
</style>
