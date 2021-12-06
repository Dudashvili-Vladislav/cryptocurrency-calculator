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
        :series="seriesResult"
        @legendClick="handleLineChange"
        ref="chart"
      />
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
    chart_id: {
      required: true,
      default: "default",
    },
  },

  data() {
    return {
      linesSettings: {
        portfolio: false,
        structure: true,
      },
      // настройки
      seriesResult: [], // Тут хранятся графики полученные из пропсов, но к каждой линии добавлен параметр show отвечающий за отображение. В компонент чарта отдаются только те, где show = true

      chartOptions: {
        tooltip: {
          enabled: true,
          enabledOnSeries: undefined,
          shared: true,
          followCursor: false,
          intersect: false,
          inverseOrder: false,
          custom: undefined,
          fillSeriesColor: false,
          theme: false,
          style: {
            fontSize: "12px",
            fontFamily: undefined,
          },
          onDatasetHover: {
            highlightDataSeries: false,
          },
          x: {
            show: true,
            format: "dd MMM",
            formatter: undefined,
          },
          y: {
            formatter: undefined,
            title: {
              formatter: (seriesName) => seriesName,
            },
          },
          z: {
            formatter: undefined,
            title: "Size: ",
          },
          marker: {
            show: true,
          },

          fixed: {
            enabled: false,
            position: "topRight",
            offsetX: 0,
            offsetY: 0,
          },
        },
        legend: {
          show: true,
          position: "left",
          horizontalAlign: "center",
          width: 300,
          offsetY: 110,
          fontSize: "20px",
          labels: {
            colors: "#ffffff",
          },
          itemMargin: {
            vertical: 10,
          },
        },
        responsive: [
          {
            breakpoint: 1030,
            options: {
              legend: {
                position: "top",
              },
            },
          },
        ],
        xaxis: {
          type: "numeric",

          labels: {
            rotate: 0,
            style: {
              colors: [
                "#72858a",
                "#72858a",
                "#72858a",
                "#72858a",
                "#72858a",
                "#72858a",
                "#72858a",
              ],
              fontSize: "12px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 400,
              cssClass: "apexcharts-xaxis-label",
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: [
                "#72858a",
                "#72858a",
                "#72858a",
                "#72858a",
                "#72858a",
                "#72858a",
                "#72858a",
              ],
            },
          },
        },

        colors: ["#31afd6", "#c416b9"],
        tickAmount: "dataPoints",
        grid: {
          show: true,
          borderColor: "#2a2c3d",
          strokeDashArray: 0,

          fill: {
            type: "gradient",
          },
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
            left: 10,
          },
        },
        chart: {
          events: {
            legendClick: function(chartContext, seriesIndex, config) {
              console.log(chartContext, seriesIndex, config);
              // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
            },
          },
        },
      },
    };
  },

  computed: {},

  methods: {
    handleLineChange(chartContext, seriesIndex, config) {
      let targetKey = Object.keys(this.linesSettings)[seriesIndex];
      if (!targetKey) {
        console.warn("undefined index line has changed");
        return;
      }
      this.linesSettings[targetKey] = !this.linesSettings[targetKey];

      localStorage.setItem(
        `chart_${this._.uid}_settings`,
        JSON.stringify(this.linesSettings)
      );
    },
    getLinesSettings() {
      try {
        let savedSettings = JSON.parse(
          localStorage.getItem(`chart_${this._.uid}_settings`)
        );
        //console.log(savedSettings)
        if (!savedSettings || typeof savedSettings !== "object") throw "err";

        this.linesSettings = {
          portfolio: Object.prototype.hasOwnProperty.call(
            savedSettings,
            "portfolio"
          )
            ? savedSettings.portfolio
            : true,
          structure: Object.prototype.hasOwnProperty.call(
            savedSettings,
            "structure"
          )
            ? savedSettings.structure
            : false,
        };
      } catch (err) {
        // parse err, when settings if not defined or not valid
        console.log("err during parsing");
      }

      try {
        this.$nextTick(() => {
          if (!this.$refs.chart) return;

          Object.keys(this.linesSettings).map((key, index) => {
            let item = this.seriesResult[index];
            if (!item) return;

            if (!this.linesSettings[key]) {
              this.$refs.chart.hideSeries(item.name);
            }
          });
        });
      } catch (err) {
        console.log("err during hiding");
      }
    },
  },
  mounted() {
    this.getLinesSettings(); // достаем из кэша браузера настройки линий
  },
  watch: {
    dataset: {
      handler: function(newValue, oldValue) {
        console.log("DATASET UPDATED");
        if (newValue && newValue["x"]) {
          this.seriesResult = [
            {
              name: "Portfolio Pnl",
              data: this.dataset["y_portf"].map((item, index) => {
                return {
                  x: this.dataset["x"][index],
                  y: item.toFixed(2),
                };
              }),
            },
            {
              name: "Structure Pnl",
              data: this.dataset["y_struct"].map((item, index) => {
                return {
                  x: this.dataset["x"][index],
                  y: item.toFixed(2),
                };
              }),
            },
          ];

          this.getLinesSettings();
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style>
.apexcharts-menu.apexcharts-menu-open {
  background-color: #27293d !important;
  border: 0px;
}

.apexcharts-menu {
  background-color: #27293d !important;
  border: 0px;
}
</style>
