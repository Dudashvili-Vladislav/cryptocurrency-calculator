
<script>
import { Scatter } from "vue3-chart-v2";

export default {
  extends: Scatter,
  props: {
    dataset: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    dataset(newValue, oldValue) {
      if (newValue && newValue.length) {
        console.log(this.dataset);
        let chartData = {
          labels: [],
          datasets: [
            {
              label: "Data 1",
              backgroundColor: 'red',
              /* showLine:true, */
              data: this.dataset,
            },
          ],
        };
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
      }
    },
  },

  mounted() {},
};
</script>