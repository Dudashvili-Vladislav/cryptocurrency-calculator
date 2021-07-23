<template>
  <div class="v-checkbox mt-3">
    <label class="checkbox__label ml-8 flex justify-start items-start pt-7 ">
      <div class="wrapper-input-check ">
        <input
          class="input-check"
          type="checkbox"
          v-model="checkFutures"
          @input="throttledSave"
          id="checkbox__label"
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
<style scoped>
.input-check {
  display: none;
  position: absolute;
}
.v-checkbox {
  position: relative;
}
.checkbox__label {
  font-size: 1rem;
  color: #444;
      font-family: Gilroy;
}
.checkbox__label::before {
  content: "";
  display: block;
  width: 44px;
  height: 44px;
  background: rgba(0, 186, 6, 0.1);
  border-radius: 12px;
  margin-right: 10px;
  z-index: 1;
}
.checkbox__label:after {
  content: '';
  display: block;
    width: 44px;
  height: 44px;
  background: url('checkbox.svg') no-repeat;
  background-size: 20px 17px;
  position: absolute;
  right: 176px;
  bottom: -11px;
  z-index: 2;
  opacity: 0;
}
.input-check:checked + .checkbox__label:after {
  opacity: 1;
  transition: opacity 1s linear; ;
}
</style>
