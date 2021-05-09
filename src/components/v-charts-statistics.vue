<template>
  <div class="v-charts-statistics">
    <vScatterStatistics :chartData="test" />
  </div>
</template>

<script>
import vScatterStatistics from "./charts/v-scatter-statistics";

export default {
  name: "v-charts-statistics",

  data() {
    return {
      test: {
        datasets: [
          {
            label: "GitHub Commits",
            showLine: true,
            color: "red",
            borderColor: "red",
            backgroundColor: "rgba(0, 0, 0, 0)",
            data: [
              {
                x: -10,
                y: 0,
              },
              {
                x: 0,
                y: 10,
              },
              {
                x: 10,
                y: 5,
              },
              {
                x: 0.5,
                y: 5.5,
              },
            ],
          },
        ],
      },
    };
  },

  components: {
    vScatterStatistics,
  },
};
</script>
