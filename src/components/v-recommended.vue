<template>
  <div class="v-recommended pt-6 container mx-auto">
    <v-header-forms />

    <div class="text-center pt-6">
      <Spiner v-if="loading"></Spiner>
    </div>

    <div class="tabe-wrapper flex justify-between w-full">
      <div class="table w-full " v-if="fullDataList">
        <vTable
          v-for="information in fullDataList"
          :key="information"
          :tableData="information['table']"
          :description="information.description"
          :title="information.title"
          :chartData="information['chart']"
          :tableList="information['table']"
          :slippage="information['max_slippage']"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import vHeaderForms from "./header/v-header-forms";
import vTable from "./tables/v-table-statistics";
import Spiner from '@/components/Spiner.vue';

export default {
  name: "v-recommended",

  components: {
    Spiner,
    vHeaderForms,
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
