<template>
  <div class="v-recommended pt-6 container mx-auto">
    <v-header-forms />

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
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import vHeaderForms from "./header/v-header-forms";
import vTable from "./tables/v-table-statistics";

export default {
  name: "v-recommended",

  components: {
    vHeaderForms,
    vTable,
  },

  computed: {
    ...mapGetters(["fullDataList", "tableList"]),

  },

  

  watch: {
    test() {
      console.log("tableListRECOMMMMMMMMMMM", this.tableList);
    },
  },
};
</script>

<style></style>
