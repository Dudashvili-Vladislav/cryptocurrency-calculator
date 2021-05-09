<script>
import { defineComponent } from "vue";
import { Scatter } from "vue3-chart-v2";

export default defineComponent({
  name: "v-scatter-statistics",
  extends: Scatter,
  props: {
    chartData: {
      type: Object, 
      default() {
        return {}
      }
    }
  },

  mounted() {
    this.renderChart(this.chartData);
  },
})
</script>