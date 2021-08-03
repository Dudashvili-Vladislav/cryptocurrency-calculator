<template>
  <div class="v-recommended pt-6 container mx-auto">
    <div class="text-center pt-6">
      <Spiner v-if="loading"></Spiner>
    </div>

    <div class="tabe-wrapper flex justify-between w-full">
      <div class="table w-full " v-if="fullDataList">
        <vTable
          v-for="(information, index) in fullDataList"
          :key="index"
          :tableData="information['table']"
          :description="information.description"
          :title="information.title"
          :chartData="information['chart']"
          :tableList="information['table']"
          :slippage="information['max_slippage']"
          class="mb-20"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import vTable from "./tables/v-table-statistics";
import Spiner from '@/components/Spiner.vue';

export default {
  name: "v-recommended",

  components: {
    Spiner,
    vTable,
  },

  computed: {
    ...mapGetters(["fullDataList", "tableList"]),
    ...mapState({
      loading: state => state.loading
    })
  },

  

  watch: {
    test() {
      console.log("tableListRECOMMMMMMMMMMM", this.tableList);
    },
  },
};
</script>

<style></style>
