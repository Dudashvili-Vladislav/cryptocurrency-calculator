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
          labels: {
            rotate: 0,
          },
        },
        theme: {
          palette: "palette7", // upto palette10
        },
        tickAmount: 'dataPoints',
        
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
              name: "First Y Data 1",
              data: this.dataset["y_portf"].map((item, index) => {
                return {
                  x: this.dataset["x"][index],
                  y: item.toFixed(2),
                };
              }),
            },
            {
              name: "Second Y Data 2",
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
};
</script>

<style lang="scss" scoped></style>
