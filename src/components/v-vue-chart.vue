<script>
import {Line  } from "vue3-chart-v2";
import watch from "vue";

export default {
  extends: Line ,
  props: {
    dataset: {
      type: Object,
      default: () => {},
    },
    title:{
      type: String,
      default: "",
    }
  },

  watch: {
    dataset: {
      handler(newValue, oldValue) {
        console.log("newValue",newValue)
        if (newValue ) {
          let chartData = {
            labels: 
              this.dataset["x"]
            ,
            datasets: [
              {
                label: "First Y Data 1",
                showLine:true,
                backgroundColor :"rgb(185, 223, 250, 1)",
                borderColor: "rgb(57, 86, 204, 1)",
                data: this.dataset["y_portf"]
   
              },
                 {
                label: "Second Y Data 2",
                showLine:true,
                backgroundColor :"rgb(247, 173, 186, 1)",
                borderColor: "rgba(201, 26, 41, 1)",
                data: this.dataset["y_struct"]
              },

             

            ],
          };
          this.$nextTick().then(() => {
            console.log("chartDataAAAAAAAAAAAAAAAAAAAAAAAAA",chartData)
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
      immediate: true,
    },
  },


  mounted() {
    console.log("Данные data: ", this.dataset)
    
  },
};
</script>
