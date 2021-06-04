<template>
  <div class="v-charts-statistics">
    {{ dataForChart['chart'] }}
    <hr>
    {{ dataForChart }}
    <vScatterStatistics :chartData="test" />
  </div>
</template>

<script>
import vScatterStatistics from "./charts/v-scatter-chart";

export default {
  name: "v-charts-statistics",
  props: {
    dataForChart: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  data() {
    return {
    };
  },

  components: {
    vScatterStatistics,
  },
};
</script>
