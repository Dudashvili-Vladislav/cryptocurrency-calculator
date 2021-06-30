<template>

  <div v-if="$store.state.message" class="container" id="alertbox">
    <div
      class="container bg-red-500 flex items-center text-white text-sm font-bold px-4 py-3 relative"
      role="alert"
    >
      <p>{{ $store.state.message.value }}</p>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3 closealertbutton">
      </span>
    </div>
  </div>
  
</template>

<script>

import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    const message = computed(() => store.state.message);

    return { message };
  },
};
</script>

<style lang="scss" scoped></style>
