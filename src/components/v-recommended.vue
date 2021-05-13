<template>
  <div class="v-recommended pt-6 container mx-auto">
    <v-header-forms />

    <div class="chart" v-if="fullDataList">
      <vChartsStatisctics :dataForChart="fullDataList[5]" /> 
    </div>
    <v-call-spread-right />

    <div class="table" v-if="fullDataList">
      <vTable
        v-for="information in fullDataList"
        :key="information"
        :tableData="information['table']"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import vHeaderForms from "./header/v-header-forms";
import vCallSpreadRight from "./menu-right/v-call-spread-right";
import vChartsStatisctics from "./v-charts-statistics";
import vTable from "./tables/v-table-statistics";

export default {
  name: "v-recommended",
  components: {
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
    ...mapGetters(["fullDataList"]),
  },
};
</script>

<style></style>
