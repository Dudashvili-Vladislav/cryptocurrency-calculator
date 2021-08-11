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

<style>
.v-recommended {
  background: linear-gradient(210.96deg, rgba(55, 36, 88, 0.61) 0.01%, rgba(43, 35, 83, 0.7) 42.05%, rgba(63, 59, 115, 0) 104.81%);
  filter: drop-shadow(0px 48px 69px rgba(23, 18, 43, 0.845335));
  backdrop-filter: blur(20px);
  border-radius: 0px 10px 10px 10px;
  padding-left: 45px;
  padding-right: 45px;
}
</style>
