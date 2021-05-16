<template>
  <div class="v-recommended pt-6 container mx-auto">
    <v-header-forms />

    <div class="wrapper flex items-center w-full">
      <div class="chart ml-10 flex-auto min-w-1/3 ">
        <!--    CHARTDATA {{ chartData}} -->
        <vChart  class="chart-v w-full" :dataset="chartData" />
      </div>

      <v-call-spread-right class="call min-w-1/4 ml-5  " />
    </div>

<div class="tabe-wrapper flex justify-between w-full">
    <div class="table w-full " v-if="fullDataList">
      
      <vTable
        
        v-for="information in fullDataList"
        :key="information"
        :tableData="information['table']"
  
      />
    </div>
    </div>
  </div>
</template>

<script>
import watch from "vue"
import vChart from "./v-vue-chart";
import { mapGetters } from "vuex";
import vHeaderForms from "./header/v-header-forms";
import vCallSpreadRight from "./menu-right/v-call-spread-right";
import vChartsStatisctics from "./v-charts-statistics";
import vTable from "./tables/v-table-statistics";

export default {
  name: "v-recommended",
  components: {
    vChart,
    vHeaderForms,
    vCallSpreadRight,
    vChartsStatisctics,
    vTable,
  },

  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["fullDataList", "chartData"]),
  },
  watch: {
    dataset: {
      handler(newVal, oldVal) {},
      immediate: true
    }
},
};
</script>

<style></style>
