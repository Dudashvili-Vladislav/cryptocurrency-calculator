<template>
  <label class="checkbox__label pt-5 sm:pt-12 sm:ml-8 flex justify-start items-start">
    <div class="wrapper-checkbox">
      <input
        class="input-check"
        type="checkbox"
        v-model="checkFutures"
        @input="throttledSave"
        id="checkbox__label"
      />
      <span class="checkbox__label"><slot></slot></span>
      <svg
        class="fill-current hidden w-4 h-4 text-green-500 pointer-events-none"
        viewBox="0 0 20 20"
      >
        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
      </svg>
    </div>
  </label>
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

.wrapper-checkbox {
  height: 44px;
}

.wrapper-checkbox>input {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

/* для элемента label, связанного с .wrapper-checkbox */
.wrapper-checkbox>span {
  display: inline-flex;
  align-items: center;
  user-select: none;
  font-family: Gilroy;
  font-size: 17px;
  color: #fff;
}

/* создание в label псевдоэлемента before со следующими стилями */
.wrapper-checkbox>span::before {
  content: '';
  display: inline-block;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  flex-grow: 0;
  border-radius: 0.25em;
  margin-right: 0.5em;
  background: rgba(0, 186, 6, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(245, 241, 241, 0.562);
}

@media (min-width: 768px) {
  .wrapper-checkbox>span::before {
    width: 44px;
    height: 44px;
  }
}


/* стили при наведении курсора на checkbox */
.wrapper-checkbox>input:not(:disabled):not(:checked)+span:hover::before {

}

/* стили для активного чекбокса (при нажатии на него) */
.wrapper-checkbox>input:not(:disabled):active+span::before {
  /* background-color: #b3d7ff;
  border-color: #b3d7ff; */
}

/* стили для чекбокса, находящегося в фокусе */
.wrapper-checkbox>input:focus+span::before {
  /* box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); */
}

/* стили для чекбокса, находящегося в фокусе и не находящегося в состоянии checked */
.wrapper-checkbox>input:focus:not(:checked)+span::before {
  border-color: #80bdff;
}

/* стили для чекбокса, находящегося в состоянии checked */
.wrapper-checkbox>input:checked+span::before {
  background: rgba(0, 186, 6, 0.1) url("checkbox.png") 50% no-repeat;
}

/* стили для чекбокса, находящегося в состоянии disabled */
.wrapper-checkbox>input:disabled+span::before {
  background-color: #e9ecef;
}


</style>
