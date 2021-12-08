<template>
  <label class="v-select-underlying">
    <div class="label-select-header block">
      {{ label }}
    </div>

    <div class="select__wrapper">
      <select
        class="select w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
        id="select"
        v-model="valueSetter"
      >
        <slot>
          <option v-if="placeholder" disabled hidden>
            {{ placeholder }}
          </option>
          <option
            class="option"
            v-for="item in options"
            :value="item"
            :key="item"
          >
            {{ item }}
          </option>
        </slot>
      </select>

      <!--                @change="onChangeSelect"-->
      <!--                @input="throttledSave"-->
    </div>
  </label>
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

    placeholder: {
      type: String,
      default: "",
    },
  },

  emits: ["change", "input", "upAmount", "update:modelValue"],

  data() {
    return {
      selected: this.placeholder ? this.placeholder : this.modelValue,
      timerId: null,
    };
  },

  computed: {
    valueSetter: {
      get() {
        return this.modelValue ? this.modelValue : this.placeholder;
      },
      set(v) {
        this.$emit("input", v);
        this.$emit("update:modelValue", String(v));
      },
    },
  },

  watch: {
    modelValue(newValue) {
      this.selected = newValue;
    },
  },

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
  margin-bottom: 10px;
  font-size: 16px;
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

.select-gradient .select__wrapper:after {
  display: flex;
  top: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  border: none;
  width: 44px;
  height: 44px;
  background-image: url("../../../assets/images/select-arrow.svg");
  background-repeat: no-repeat;
  background-position: 50%;
  margin: 0;
}

.select-gradient .select__wrapper:before {
  position: absolute;
  content: "";
  top: 0;
  right: 0;
  width: 44px;
  height: 44px;
  background: linear-gradient(270deg, #8743ff 0%, #4136f1 100%);
}

.select {
  background: none;
  border: 1px solid rgba(65, 54, 241, 1);
  color: #ffffff;
  opacity: 0.5;
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;
  border-radius: 4px;
  height: 44px;
}

@media (min-width: 768px) {
  .select {
    font-size: 18px;
  }
}
</style>
