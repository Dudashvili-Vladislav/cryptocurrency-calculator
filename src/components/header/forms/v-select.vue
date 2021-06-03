<template>
  <div class="v-select-underlying">
      <label class="block" for="Underlying">{{ label }}</label>

      <select
        class="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
        id="select"
        v-model="selected"
        @change="onChangeSelect"
      >
        <option 
          v-for="item in options" 
          :value="item" 
          :key="item"
        >
          {{ item }}
        </option>
      </select>
    </div>
</template>

<script>
export default {
  name: "v-select",

  emits: ['change', 'input'],

  data() {
    return {
      selected: this.modelValue
    }
  },

  watch: {
    modelValue(newValue) {
      this.selected = newValue
    }
  },

  props: {
    modelValue: {
      type: String,
      default: ''
    },

    options: {
      type: Array,
      default: () => []
    },

    label: {
      type: String,
      default: ''
    },
  },

  methods: {
    onChangeSelect() {
      this.$emit('update:modelValue', this.selected)
      this.$emit('change', this.selected)
    }
  },
};
</script>
