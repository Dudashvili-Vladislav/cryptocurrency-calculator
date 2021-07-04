<template>
  <div>
    <div id="chart">
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

  watch: {
    dataset: {
      handler(newValue, oldValue) {
        if (newValue) {
          let chartData = {
            datasets: {
              chartOptions: {
                series: [
                  {
                    name: "First Y Data 1",
                    data: [
                      {
                        x: this.dataset["x"],
                        y: this.dataset["y_portf"],
                      },
                    ],
                  },
                  {
                    name: "Second Y Data 2",
                    data: [
                      {
                        x: this.dataset["x"],
                        y: this.dataset["y_struct"],
                      },
                    ],
                  },
                ],
                chart: {
                  height: 350,
                  type: "line",
                  zoom: {
                    enabled: false,
                  },
                },
                dataLabels: {
                  enabled: false,
                },
                stroke: {
                  curve: "straight",
                },
                title: {
                  text: "TEST №1",
                  align: "left",
                },
                grid: {
                  row: {
                    colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                    opacity: 0.5,
                  },
                },
                xaxis: {
                  type: "numeric",
                },
              },
            },
          };
          this.$nextTick().then(() => {
            this.renderChart(chartData, {
              responsive: true,
              maintainAspectRatio: false,
              title: {
                display: true,
                text: this.title,
              },
            });
          });
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
