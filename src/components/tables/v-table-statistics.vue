<template>
  <div class="v-table-statistics  w-full items-center">
    <div class="line-chart-wrapper">
      <div class="chart-titles p-2">
        <div class="chart-title-top mt-3"></div>
        <div class="chart-title-bottom"></div>
      </div>
      <vLineChart2
        v-if="chartData"
        class="chart text-left chart-v  w-full"
        :dataset="chartData"
        :title="title"
      />
    </div>
    <div class="wrapper-text  mt-20 ml-5 flex justify-between ">
      <div class="discription__button pr-20">
        <div class="description text pr-5 " v-if="description">
         {{ description }}
        </div>

        <div class="button__sendorder flex  ">
          <v-button
            @upGetStatisctics="
              sendOrder({
                tableData: tableData,
                slippage: Number(mission),
              })
            "
          />
          <input
            class="input border border-gray-400 mt-11  rounded px-3 py-3  pb-2    "
            v-model="mission"
            name="inputSlipage"
            id="slipage"
            type="number"
          />
          <!-- <div class="slippage mt-14 text-lg border-b-2 border-gray-500">
          {{ slippage }}
        </div> -->
        </div>
      </div>

      <div class="gradient-table">
        <table
          v-if="tableData[selectedCoin]"
          class="table-auto  text-center  justify-end m-left table-statistic"
        >
          <thead class="border__thead  ">
            <tr class="table__header">
              <th class="th"></th>
              <th class="table__title">{{ selectedCoin }}</th>
              <th class="table__title">%</th>
              <th class="table__title__USD">USD</th>
            </tr>
          </thead>
          <tbody class="wrapper__table">
            <tr class="table__border ">
              <td class="field__description">Amount of underlying</td>
              <td class="field__values">
                {{ tableData[selectedCoin]["Amount of underlying"] }}
              </td>
              <td class="field__values">
                {{ tableData["%"]["Amount of underlying"] }}
              </td>
              <td class="field__values">
                {{ tableData["USD"]["Amount of underlying"] }}
              </td>
            </tr>
            <tr class="bg-emerald-200">
              <td class="field__description">Max profit</td>
              <td class="field__values">
                {{ tableData[selectedCoin]["Max profit"].toFixed(2) }}
              </td>
              <td class="field__values">
                {{ tableData["%"]["Max profit"].toFixed(2) }}
              </td>
              <td class="field__values">
                {{ tableData["USD"]["Max profit"].toFixed(2) }}
              </td>
            </tr>
            <tr class="">
              <td class="field__description">Structure product price</td>
              <td class="field__values">
                {{
                  tableData[selectedCoin][
                    "Structure product price"
                  ].toFixed(2)
                }}
              </td>
              <td class="field__values">
                {{ tableData["%"]["Structure product price"].toFixed(2) }}
              </td>
              <td class="field__values">
                {{ tableData["USD"]["Structure product price"].toFixed(2) }}
              </td>
            </tr>
            <tr class="">
              <td class="field__description">Maintenance margin</td>
              <td class="field__values">
                {{
                  tableData[selectedCoin]["Maintenace margin"].toFixed(2)
                }}
              </td>
              <td class="field__values">
                {{ tableData["%"]["Maintenace margin"].toFixed(2) }}
              </td>
              <td class="field__values">
                {{ tableData["USD"]["Maintenace margin"].toFixed(2) }}
              </td>
            </tr>
            <tr class="">
              <td class="field__description">Total margin</td>
              <td class="field__values">
                {{ tableData[selectedCoin]["Total margin"].toFixed(2) }}
              </td>
              <td class="field__values">
                {{ tableData["%"]["Total margin"].toFixed(2) }}
              </td>
              <td class="field__values">
                {{ tableData["USD"]["Total margin"].toFixed(2) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import vButton from "@/components/v-button";
import { mapGetters, mapActions, mapState } from "vuex";
import vLineChart from "@/components/charts/v-line-chart";
import vLineChart2 from "@/components/charts/v-line-chart-2";
import { map } from "lodash";

export default {
  name: "v-table-statistics",

  components: {
    vLineChart,
    vLineChart2,
    vButton,
  },

  props: {
    tableData: {
      type: Object,
      default() {
        return {};
      },
    },

    description: {
      type: String,
      default() {
        return "";
      },
    },

    title: {
      type: String,
      default() {
        return "";
      },
    },

    chartData: {
      type: Object,
      default() {
        return {};
      },
    },

    tableList: {
      type: Object,
      default() {
        return {};
      },
    },
    slippage: {
      type: Number,
      default: null,
    },
  },

  computed: {
    ...mapGetters(["fullDataList", "underlyingChoice"]),
    ...mapState({
      selectedCoin: (state) => state.calculator.selectedUnderlying,
      underlying: (state) => state.underlying,
      maturity: (state) => state.maturity,
      amount: (state) => state.amount,
      futHedgeFlag: (state) => state.futHedgeFlag,
    }),
  },

  watch: {
    dataset: {
      handler(oldValue, oldVal) {},
      immediate: true,
    },


  },

  methods: {
    ...mapActions([
      "getStatisctics_actions",
      "getTableStaticsics_actions",
      "sendOrder",
    ]),
  },

  data() {
    return {
      mission: this.slippage,

    };
  },
};
</script>
<style scoped>
.v-table-statistics {
  max-width: 100%;
}
.discription__button,
.gradient-table {
  flex: 1 1 100%;
}

.wrapper-text {
  align-items: flex-start;
}

.gradient-table {
  max-width: 550px;
  max-height: 248px;
  border-radius: 10px;
  overflow: hidden;
  padding: 1px;
  background: linear-gradient(270deg, #8743ff 0%, #4136f1 100%);
}
.chart {
  color: white;
}

.chart-titles {
  position: absolute;
  margin: 10px;
}

.chart-title-top {
  min-width: 145px;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(18.5547px);
  border-radius: 20px;
  font-size: 18px;
  padding: 15px;
  color: #ffffff;
}

.chart-title-bottom {
  height: 37px;
  margin-top: 12px;
  min-width: 145px;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(18.5547px);
  border-radius: 14.5px;
  font-size: 18px;
  padding: 8px 12px;
  color: #ffffff;
}

.line-chart-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.table-statistic {
  border-radius: 10px;
  width: 100%;
}

.table-statistic td + td {
  border-left: 1px solid #fff3;
}

.table-statistic td {
  padding: 13px 10px;
  background: #261b43;
}

.input {
  background: none;
  border: 1px solid rgba(65, 54, 241, 1);
  color: #ffffff;
  font-family: Gilroy;
  border-radius: 4px;
  opacity: 0.8;
}
.description {
  font-family: Gilroy;
  color: #ffffff;
  font-size: 14px;
  line-height: 180%;
  font-style: normal;
  font-weight: normal;
  font-weight: 400;
  width: 150%;
}
.field__description {
  font-family: Gilroy;
  color: #ffffff;
  font-size: 14px;
  line-height: 100%;
  order: 0;
  flex-grow: 0;
  margin: 0px 10px;
}
.field__values {
  font-family: Gilroy;
  color: #ffffff;
  font-size: 14px;
  line-height: 100%;
  order: 0;
  flex-grow: 0;
  margin: 0px 10px;
}
.table__header {
  background: linear-gradient(270deg, #8743ff 0%, #4136f1 100%);
}

.table__title {
  font-family: Gilroy;
  color: #ffffff;
  font-size: 14px;
  line-height: 100%;
  order: 0;
  flex-grow: 0;
  margin: 0px 10px;
  padding: 13px 0 13px 0;
}
.table__title__USD {
  font-family: Gilroy;
  color: #ffffff;
  font-size: 14px;
  line-height: 100%;
  order: 0;
  flex-grow: 0;
  margin: 0px 10px;
  padding: 13px 0 13px 0;
  border-top-right-radius: 18px;
}
.th {
  border-top-left-radius: 18px;
}
</style>
