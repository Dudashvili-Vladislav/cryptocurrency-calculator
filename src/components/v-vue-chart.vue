<script>
import { Line } from "vue3-chart-v2";
import watch from "vue";

export default {
  extends: Line,
  props: {
    dataset: {
      type: Array,
      default: () => [],
    },
  },

  watch: {
    dataset: {
      handler(newValue, oldValue) {
        if (newValue && newValue.length) {
          let chartData = {
            labels: [],
            datasets: [
              {
                label: "Data 1",
                /* backgroundColor: "red", */
                showLine:true,
                data: this.dataset[0]
              },
   
               
            ],
          };
          this.$nextTick().then(() => {
            this.dataset.forEach((item) => {
              chartData.labels.push(item.x);
              chartData.datasets[0].data.push(item.y);
            });
            this.renderChart(chartData, {
              responsive: true,
              maintainAspectRatio: false,
              title: {
                display: true,
                text: "My Data",
              },
            });
          });
        }
      },
      immediate: true,
    },
  },

  mounted() {},
};
</script>
