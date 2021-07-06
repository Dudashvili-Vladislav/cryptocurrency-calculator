<template>
  <div class="v-customQA pt-6 container mx-auto ">
    <h1 class="text-2xl ml-10 pb-5 font-medium">
      Базовые вопросы
    </h1>
    <div class="header-form ml-10 w-full">
      <div
        class="form-control text-gray-700 pointer-events-auto w-1/6 justify-start  "
      >
        <vSelect
          :label="'Выберите базовый актив:'"
          :options="underlyingList"
          @change="getMaturity"
          v-model="selectedCoin"
        >
        </vSelect>
      </div>

      <h3 class="w-full mt-7 absolute ">
        Какой срок хеджирования вас интересует?
      </h3>

      <div
        class="form-control text-gray-700 pointer-events-auto w-1/6 justify-start mt-14 "
      >
        <vSelect
          :options="maturityList"
          @change="setMaturity"
          v-model="selectedDate"
        >
        </vSelect>
      </div>
      <h3 class="w-full absolute mt-7 ">
        Укажите сумму активов для хеджирования:
      </h3>
      <div class="form-control text-gray-700 pointer-events-auto w-1/6 mt-14">
        <vAmount
          @click.prevent="$emit('upGetStatisctics')"
          @upAmount="setAmount"
          v-model="coinAmount"
        />
      </div>
      <h2 class="text-2xl  pb-5 font-medium mt-5 ">
        Ожидаемые значения цены
      </h2>
      <h3 class="w-full mt-8  ">
        Какое направление движения цены вы ожидаете?
      </h3>
      <div
        class="form-control text-gray-700 pointer-events-auto w-1/6 justify-start mt-2 "
      >
        <vSelect
          v-model="selectedDirection"
          :options="directionOptions"
          @change="setDirection"
        >
        </vSelect>
      </div>
      <div class="slederCustomQa">
        <div class="mt-20">
          <vue-slider
            v-model="expectedMinPrice"
            :min="minSlider"
            :max="maxSlider"
            :step="stepSlider"
            @change="changeMinPrice"
          ></vue-slider>
        </div>
        <div class="number flex justify-between">
          <span v-for="label in sliderLabels" :key="label">{{ label }}</span>
        </div>
      </div>

      <vCheckbox v-model="futHedgeFlag_top">
        Выбрать рекомендуемый диапазон
      </vCheckbox>

      <h3 class="w-full mt-10 ml-8 ">
        Хотите ли застраховаться от противоположного направления движения цены?
      </h3>
      <vCheckbox v-model="saveDirection">
        Да / Нет
      </vCheckbox>

      <div class="slederCustomQa">
        <div class="mt-20">
          <vue-slider
            v-model="expectedMaxPrice"
            :min="minSlider"
            :max="maxSlider"
            :step="stepSlider"
            @change="changeMaxPrice"
          >
          </vue-slider>
        </div>
        <div class="number flex justify-between">
          <span v-for="label in sliderLabels" :key="label">{{ label }}</span>
        </div>

        <vCheckbox v-model="futHedgeFlag_down">
          Выбрать рекомендуемый диапазон
        </vCheckbox>
      </div>

      <h3 class="w-full mt-5 ml-8 ">
        Хотите ли получать дополнительную прибыль за счет продажи фьючерса?
      </h3>
      <vCheckbox class="mt-5" v-model="subDirectionFlag">
        Да / Нет
      </vCheckbox>
    </div>

    <h3 class="w-full mt-5 ml-16 ">
      Продажа фьючерса требует внесения на счет базового актива в количестве
      равном номиналу проданных фьючерсов.
    </h3>

    <div class="v-table-statistics flex justify-between w-full items-center">
      <!--       <vLineChart
        class="text-left chart-v min-w-2/3 w-2/3"
        :dataset="chartData"
        :title="title"
      /> -->
      <vLineChart2
        v-if="chartData"
        class="text-left chart-v min-w-2/3 w-2/3 mt-5"
        :dataset="chartData"
      />

      <div class="wrapper-text w-1/3 mt-20 ml-10 ">
        <div class="text pr-3 "></div>

        <table
          v-if="tableData && selectedCoin"
          class="table-auto text-center mt-5 justify-end m-left w-full table-statistic"
        >
          <thead class="border border-gray-400 bg-gray-100">
            <tr>
              <th></th>
              <th>{{ selectedCoin }}</th>
              <th>%</th>
              <th>USD</th>
            </tr>
          </thead>
          <tbody class="border border-gray-400">
            <tr class="border-gray-400">
              <td>Amount of underlying</td>
              <td>{{ tableData[selectedCoin]["Amount of underlying"] }}</td>
              <td>{{ tableData["%"]["Amount of underlying"] }}</td>
              <td>{{ tableData["USD"]["Amount of underlying"] }}</td>
            </tr>
            <tr class="border-gray-400 bg-emerald-200">
              <td>Max profit</td>
              <td>{{ tableData[selectedCoin]["Max profit"].toFixed(2) }}</td>
              <td>{{ tableData["%"]["Max profit"].toFixed(2) }}</td>
              <td>{{ tableData["USD"]["Max profit"].toFixed(2) }}</td>
            </tr>
            <tr class="border-gray-400">
              <td>Structure product price</td>
              <td>
                {{
                  tableData[selectedCoin]["Structure product price"].toFixed(2)
                }}
              </td>
              <td>
                {{ tableData["%"]["Structure product price"].toFixed(2) }}
              </td>
              <td>
                {{ tableData["USD"]["Structure product price"].toFixed(2) }}
              </td>
            </tr>
            <tr class="border-gray-400">
              <td>Maintenance margin</td>
              <td>
                {{ tableData[selectedCoin]["Maintenace margin"].toFixed(2) }}
              </td>
              <td>{{ tableData["%"]["Maintenace margin"].toFixed(2) }}</td>
              <td>{{ tableData["USD"]["Maintenace margin"].toFixed(2) }}</td>
            </tr>
            <tr class="border-gray-400">
              <td>Total margin</td>
              <td>{{ tableData[selectedCoin]["Total margin"].toFixed(2) }}</td>
              <td>{{ tableData["%"]["Total margin"].toFixed(2) }}</td>
              <td>{{ tableData["USD"]["Total margin"].toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
        <div class="v-call-spread-right flex pb-2  ">
          <div class="mt-12">
            <input
              class="input border border-gray-400   rounded px-3 py-3  pb-2    "
              v-model="max_slippage"
              name="inputSlipage"
              id="slipage"
              type="number"
            />
            <!--             {{ max_slippage }} -->
          </div>
          <v-button
            @upGetStatisctics="
              sendOrder({
                tableData: tableData,
                max_slippage: Number(max_slippage),
              })
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component/dist-css/vue-slider-component.umd.min.js";
import "vue-slider-component/dist-css/vue-slider-component.css";
import "vue-slider-component/theme/default.css";

import { mapGetters, mapActions, mapState } from "vuex";
// import throttle from "../../../calculator-master_v1.1/src/throttle";

import vHeaderForms from "./header/v-header-forms";
import vSelect from "./header/forms/v-select";
import vAmount from "./header/forms/v-amount";
/* import Slider from "@vueform/slider"; */
import vCheckbox from "./header/forms/v-checkbox";
import vLineChart from "@/components/charts/v-line-chart";
import vLineChart2 from "@/components/charts/v-line-chart-2";
import vButton from "@/components/v-button";
import axios from "axios";

export default {
  name: "v-customQA",

  components: {
    vHeaderForms,
    vSelect,
    vAmount,
    VueSlider,
    /*     Slider, */
    vCheckbox,
    vLineChart,
    vLineChart2,
    vButton,
  },
  emits: ["upGetStatisctics"],

  data() {
    return {
      futHedgeFlag_down: false,
      futHedgeFlag_top: false,
      subDirectionFlag: false,
      saveDirection: false,
      minSlider: 0,
      maxSlider: 150000,
      stepSlider: 100,
      msg: "waiting",
      underlyingList: ["BTC", "ETH"],
      directionOptions: ["Up", "Down"],
      maturityList: [],
      expectedMinPrice: [0, 150000],
      expectedMaxPrice: [0, 150000],

      defolt_expectedMinPrice: [0, 150000],
      defolt_expectedMaxPrice: [0, 150000],

      sliderLabelsBtc: [0, 2000, 3000],
      sliderLabelsEth: [0, 150, 400],

      tableData: null,

      underlyingChoice: [],
      selectedCoin: null,
      selectedDate: null,
      selectedDirection: null,

      coinAmount: 0,
      description: "Description from DATA",
      chartData: {},
      max_slippage: null,
      name: "null",
      title: "Chart title from DATA",
      sliderLabels: [],

      timerId: null,
      intervalTimerId: null
    };
  },

  computed: {
    requestParams() {
      return {
        currency: this.selectedCoin,
        maturity: this.selectedDate,
        amount: this.coinAmount,
        main_direction: this.selectedDirection,
        fut_hedge_flag: this.convertBooleanToString(this.subDirectionFlag),
        sub_direction_flag: this.convertBooleanToString(this.saveDirection),
        main_range: [...this.expectedMinPrice],
        sub_range: [...this.expectedMaxPrice],
        max_slippage: this.max_slippage,
      };
    },

    ...mapGetters(["fullDataList", "tableList"]),
  },

  watch: {
    saveDirection(newValue, oldValue) {
      if (newValue) {
        let DELAY = 1000; // Задержка

        clearTimeout(this.timerId);
        this.timerId = setTimeout(() => {
          this.FieldsCheck();
        }, DELAY);
        console.log("newValue-ssaveDirection", newValue);
      }
      if (oldValue) {
        let DELAY = 1000; // Задержка

        clearTimeout(this.timerId);
        this.timerId = setTimeout(() => {
          this.FieldsCheck();
        }, DELAY);
        console.log("oldValue-ssaveDirection", oldValue);
      }
    },
    subDirectionFlag(newValue, oldValue) {
      if (newValue) {
        let DELAY = 1000; // Задержка

        clearTimeout(this.timerId);
        this.timerId = setTimeout(() => {
          this.FieldsCheck();
        }, DELAY);
        console.log("newValue-subDirectionFlag", newValue);
      }
      if (oldValue) {
        let DELAY = 1000; // Задержка

        clearTimeout(this.timerId);
        this.timerId = setTimeout(() => {
          this.FieldsCheck();
        }, DELAY);
        console.log("oldValue-subDirectionFlag", oldValue);
      }
    },

    expectedMaxPrice(newValue, oldValue) {
      if (newValue) {
        console.log("expectedMaxPrice", newValue);
        let DELAY = 1000; // Задержка

        clearTimeout(this.timerId);
        this.timerId = setTimeout(() => {
          this.FieldsCheck();
        }, DELAY);
      }
    },

    expectedMinPrice(newValue, oldValue) {
      if (newValue) {
        console.log("expectedMinPrice", newValue);
        let DELAY = 1000; // Задержка

        clearTimeout(this.timerId);
        this.timerId = setTimeout(() => {
          this.FieldsCheck();
        }, DELAY);
      }
    },

    futHedgeFlag_top(newValue, oldValue) {
      if (newValue) {
        this.expectedMinPrice = this.defolt_expectedMinPrice;
      }
    },
    futHedgeFlag_down(newValue, oldValue) {
      if (newValue) {
        this.expectedMaxPrice = this.defolt_expectedMaxPrice;
      }
    },

    selectedCoin(newValue, oldValue) {
      console.log("newValue-selectedCoin", newValue);
    },
    selectedDate(newValue, oldValue) {
      this.FieldsCheck();
    },
    coinAmount(newValue, oldValue) {
      this.FieldsCheck();
    },
  },

  methods: {
    ...mapActions([
      "getMaturity_actions",
      "getStrikes_actions",
      "getQaStructs_actions",
      "sendOrder",
    ]),

    async getMaturity(underlying) {
      this.maturityList = await this.getMaturity_actions(underlying);
      const result = await this.getStrikes_actions(this.selectedCoin); //BTC-ETH
      console.log(".main_value", result[this.selectedCoin].main_value);
      console.log("sub_value", result[this.selectedCoin].sub_value);
      this.minSlider = result[this.selectedCoin].min;
      this.maxSlider = result[this.selectedCoin].max;
      this.stepSlider = result[this.selectedCoin].step;
      this.expectedMinPrice = [...result[this.selectedCoin].main_value];
      this.defolt_expectedMinPrice = [...result[this.selectedCoin].main_value];
      this.expectedMaxPrice = [...result[this.selectedCoin].sub_value];
      this.defolt_expectedMaxPrice = [...result[this.selectedCoin].sub_value];
      this.setupSliderLabels();
      this.selectedDate = null;
      this.coinAmount = 0;
      this.chartData = null;
      this.max_slippage = null;
      this.tableData = null;
      this.selectedDirection = null;
      this.futHedgeFlag_top = false;
      this.futHedgeFlag_down = false;
      this.saveDirection = false;
      this.subDirectionFlag = false;
    },

    setupSliderLabels() {
      this.sliderLabels = [];
      const labelsAmount = 16;
      const labelStep = Math.ceil(this.maxSlider / labelsAmount / 100) * 100;
      let currentLabel = 0;
      for (let index = 0; index < labelsAmount; index++) {
        this.sliderLabels.push(currentLabel);
        currentLabel = currentLabel + labelStep;
      }
    },

    setMaturity(event) {
      this.$store.commit("setMaturity_mutations", event);
    },

    convertBooleanToString(flag) {
      return (
        String(flag)
          .charAt(0)
          .toUpperCase() + String(flag).slice(1)
      );
    },

    async setDirection() {
      let shit = 0;
      clearTimeout(this.intervalTimerId)
      this.intervalTimerId = setInterval(async () => {
        try {
          const result = await this.$store.dispatch(
            "getQaStructs_actions",
            this.requestParams
          );
          if (result) {
            shit++;
            if (shit === 1) {
              this.chartData = result[0].chart;
            }
            this.tableData = result[0].table;
            if (!this.max_slippage) {
              this.max_slippage = result[0].max_slippage;
            }
            console.log("max_slippage", this.max_slippage);
            console.log("chartData", this.chartData);
          }
        } catch (error) {
          console.log(error);
        }
      }, 2000);

      /*       console.log("tableData", this.tableData); */
    },

    setAmount(selectedDirection) {
      this.$store.commit("setAmount_mutations", selectedDirection);
    },

    async FieldsCheck() {
      if (
        this.selectedCoin &&
        this.selectedDate &&
        this.coinAmount != 0 &&
        this.selectedDirection
      ) {
        this.setDirection();
      }
    },

    changeMinPrice() {
      this.futHedgeFlag_top = false;
    },

    changeMaxPrice() {
      this.futHedgeFlag_down = false;
    },
  },
};
</script>

<style src="@vueform/slider/themes/default.css"></style>
