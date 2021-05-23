<script>
import { Scatter } from "vue3-chart-v2";
import watch from "vue";

export default {
  extends: Scatter,
  props: {
    dataset: {
      type: Object,
      default: () => {},
    },
    title: {
      type: String,
      default: "",
    },
    ChartGraph: {
      type: Array,
      default: () => [],
    },
  },

  watch: {
    dataset: {
      handler(newValue, oldValue) {
        console.log("newValue", newValue);
        if (newValue) {
          const ChartGraph = this.ChartGraph;
          const ResultChart = ChartGraph.map((dataMap) => {
            console.log('dataResultChartResultChart', dataMap)
            return (dataMap = {
              labels: this.dataset["x"],
              datasets: [
                {
                  label: "First Y Data 1",
                  showLine: true,
/*                   backgroundColor: "rgb(185, 223, 250, 1)", */
                  borderColor: "rgb(57, 86, 204, 1)",
                  data: dataMap,
                },
                
/*                 {
                  label: "Second Y Data 2",
                  showLine: true,

                  borderColor: "rgba(201, 26, 41, 1)",
                  data: data,
                }, */
              ],
            });
          });

          this.$nextTick().then(() => {
            console.log("chartDataAAAAAAAAAAAAAAAAAAAAAAAAA", ResultChart);
            ResultChart.forEach((data) =>
              this.renderChart(data, {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                  display: true,
                  text: this.title,
                },
              })
            );
          });
        }
      },
      immediate: true,
    },
  },

  mounted() {
    console.log("Данные data: ", this.dataset);
  },
};
</script>
