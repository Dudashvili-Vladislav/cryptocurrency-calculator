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
        <div class="description text pr-10 mb-3" v-if="description">
          {{ description }}
        </div>

        <div class="button__sendorder flex">
          <v-button
            class="button-recomended"
            @upGetStatisctics="OnSendOrder(mission,title_Struct)"
          />
          <div class="wrapper__slippage">
            <h3 class="text__spippage-recomended">{{ $t("slippage") }}</h3>
            <input
              class="input border border-gray-400 rounded slipage-input px-3 py-3 pb-2"
              v-model="mission"
              name="inputSlipage"
              id="slipage"
              type="number"
            />
          </div>
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
                  tableData[selectedCoin]["Structure product price"].toFixed(2)
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
                {{ tableData[selectedCoin]["Maintenace margin"].toFixed(2) }}
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

    created() {
    console.log("$store", this.$store);
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

    OnSendOrder(mission,title_Struct) {
      
      const body_2 = {
        order_json: {
          client_id: "test_user_01",
          struct_title: "call-spread",
          fut_hedge_flag: "False",
          max_slippage: 300,
          table: {
            BTC: {
              "Amount of underlying": 1,
              "Max profit": 0.07219065033625899,
              "Structure product price": -0.0020646935990654325,
              "Maintenace margin": 0.01242917811539504,
              "Total margin": 0.0103644845163296023,
            },
            "%": {
              "Amount of underlying": "",
              "Max profit": 0.07219065033625899,
              "Structure product price": -0.0020646935990654325,
              "Maintenace margin": 0.01242917811539504,
              "Total margin": 0.010364484516329608,
            },
            USD: {
              "Amount of underlying": "",
              "Max profit": 4117.770577123287,
              "Structure product price": -117.77057712328406,
              "Maintenace margin": 708.9630541213185,
              "Total margin": 591.1924769980344,
            },
          },
          table_struct: {
            "instrument name": {
              0: "BTC-24SEP21-60000-C",
              1: "BTC-24SEP21-70000-C",
            },
            type: { 0: "call", 1: "call" },
            direction: { 0: 1, 1: -1 },
            strike: { 0: 60000, 1: 70001 },
            amount: { 0: 1, 1: 1 },
          },
        },
      };
      const body = {
        order_json: {
          tableData: this.tableData,
          max_slippage: Number(mission),
          client_id: this.$store.state.auth.user,
          struct_title: String(title_Struct),
        },
      };
      this.sendOrder(body);
    },
  },

  data() {
    return {
      mission: this.slippage,
      title_Struct: this.title
    };
  },
};
</script>
<style scoped>
.text__spippage-recomended {
  text-align: center;
  font-family: Gilroy;
  color: #ffffff;
  font-size: 16px;
}
.button-recomended {
  margin-top: 23px;
}
.wrapper-text {
  position: relative;
}
.button__sendorder {
  position: absolute;
  bottom: 0;
}
.v-table-statistics {
  max-width: 100%;
}
.discription__button,
.gradient-table {
  flex: 1 1 100%;
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
  width: 126%;
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

.slipage-input {
  margin-top: 0;
  height: 46px;
  max-height: 100%;
}
</style>
