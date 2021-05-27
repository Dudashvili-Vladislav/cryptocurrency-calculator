<template>
  <div class="v-checkbox">
    <label class="ml-8 flex justify-start items-start pt-7">
      <div
        class="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500"
      >
        <input type="checkbox"  v-model="checkFutures"/>
        <svg
          class="fill-current hidden w-4 h-4 text-green-500 pointer-events-none"
          viewBox="0 0 20 20"
        >
          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
        </svg>
      </div>
      <div class="select-none">Futures hedge funding</div>
    </label>
  </div>
</template>

<script>
export default {
    name: 'v-checkbox',

    data() {
        return {
            checkFutures: false,
        }
    },

    watch: {
      checkFutures() {
        this.$store.commit('setFlagFutures_mutations', this.checkFutures);
      }
    },
/*     methods: {
      changeFlag(){

      }
    }, */
}
</script>
