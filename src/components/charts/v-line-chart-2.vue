<template>
  <div>
    <div id="chart">
      <h2 class="text-lg text-center font-semibold" v-if="title">
        {{ title }}
      </h2>

      <apexchart
        type="line"
        height="350"
        :options="chartOptions"
        :series="series"
        ref="chart"
      ></apexchart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    dataset: {
      type: Object,
      default: () => {},
    },
    title: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      series: [],
      chartOptions: {
        xaxis: {
          type: "numeric",
          labels: {
            rotate: 0,
          },
        },
        theme: {
          palette: "palette7", // upto palette10
        },
        tickAmount: "dataPoints",
        grid: {

          show: true,
          borderColor: "#90A4AE",
          strokeDashArray: 0,
          position: "back",
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
          row: {
            colors: undefined,
            opacity: 0.5,
          },
          column: {
            colors: undefined,
            opacity: 0.5,
          },
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
    };
  },

  watch: {
    title(val) {
      console.log("val", val);
    },

    dataset: {
      handler: function(newValue, oldVal) {
        console.log("nununununun", newValue);
        if (newValue && newValue["x"]) {
          let series = [
            {
              name: "First Y Data 1 - portfolio pnl",
                        
              data: this.dataset["y_portf"].map((item, index) => {
                return {
                  x: this.dataset["x"][index],
                  y: item.toFixed(2),
                };
              }),
            },
            {
              name: "First Y Data 2 - structure pnl",
              data: this.dataset["y_struct"].map((item, index) => {
                return {
                  x: this.dataset["x"][index],
                  y: item.toFixed(2),
                };
              }),
            },
          ];

          this.series = series;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
  this.$nextTick(() => {
    this.$refs.chart.hideSeries('First Y Data 1 - portfolio pnl');
  });
},
};
</script>

<style lang="scss" scoped></style>
