<template>
    <div>
        <div id="chart">
            <div>
                <div @click="line1_show = !line1_show">line 1</div>
                <div @click="line2_show = !line2_show">lime 2</div>
            </div>
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
            default: () => {
            },
        },
        title: {
            type: String,
            default: "",
        },
    },

    data() {
        return {
            line1_show: true,
            line2_show: false,
            //series: [],
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
                        }
                    }
                },

                colors: ["#a4a82c", "#c416b9"],
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
            },
        };
    },

    computed: {
        series() {
            let series = [
                {
                    name: "Portfolio Pnl",
                    data: this.dataset["y_portf"].map((item, index) => {
                        return {
                            x: this.dataset["x"][index],
                            y: item.toFixed(2),
                        };
                    }),
                }
            ]
            if (this.line2_show) {
                series.push({
                    name: " Structure Pnl",
                    data: this.dataset["y_struct"].map((item, index) => {
                        return {
                            x: this.dataset["x"][index],
                            y: item.toFixed(2),
                        };
                    }),
                })
            }
            return series
        }
    },

    watch: {
        title(val) {
            console.log("val", val);
        },

        // dataset: {
        //     handler: function (newValue, oldValue) {
        //         console.log("newValue-dataset", newValue);
        //         console.log("oldValue", oldValue);
        //         if (newValue && newValue["x"]) {
        //             let series = [
        //                 {
        //                     name: "Portfolio Pnl",
        //                     data: this.dataset["y_portf"].map((item, index) => {
        //                         return {
        //                             x: this.dataset["x"][index],
        //                             y: item.toFixed(2),
        //                         };
        //                     }),
        //                 },
        //                 {
        //                     name: " Structure Pnl",
        //                     data: this.dataset["y_struct"].map((item, index) => {
        //                         return {
        //                             x: this.dataset["x"][index],
        //                             y: item.toFixed(2),
        //                         };
        //                     }),
        //                 },
        //             ]
        //
        //             this.series = series;
        //
        //
        //             this.$nextTick(() => {
        //                 this.$refs.chart.hideSeries("Portfolio Pnl");
        //                 console.log("this.$refs.chart", this.$refs.chart);
        //             });
        //         }
        //     },
        //     deep: true,
        //     immediate: true,
        // },
    },
    mounted() {
        // this.$nextTick(() => {
        //   this.$refs.chart.hideSeries("Portfolio Pnl");
        //   console.log("this.$refs.chart", this.$refs.chart);
        // });

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
