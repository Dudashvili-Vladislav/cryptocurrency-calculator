<template>
  <div class="v-customQA pt-6 container mx-auto ">
    <div class="header-form w-full">
      <!--      <div
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
      </h2>  -->
      <h3 class="header__select__change__title w-full mt-8  ">
        Ожидаемые значения цены
      </h3>
      <div
        class="form-control text-gray-700 pointer-events-auto w-1/6 justify-start mt-2 "
      >
        <vSelect
        class="select_change select-gradient"
          v-model="selectedDirection"
          :options="directionOptions"
          @input="setDirection"
        >
        </vSelect>
      </div>
      <div class="slederCustomQa">
        <div class="mt-28">
          <vue-slider
            v-model="expectedMinPrice"
            :marks="markSliderCoin"
            :interval="100"
            :min="minSlider"
            :max="maxSlider"
            :step="stepSlider"
            @change="changeMinPrice"
            :enable-cross="false"
          ></vue-slider>
          <div class="slider-divides">
            <span v-for="item in divides" :key="item"></span>
          </div>
        </div>
        <div class="number flex justify-between">
          <span v-for="label in sliderLabels" :key="label">{{ label }}</span>
        </div>
      </div>

      <vCheckbox 
      class="header__checkbox__customQa"
      v-model="futHedgeFlag_top">
        Выбрать рекомендуемый диапазон
      </vCheckbox>

      <h3 class="header__title__on__radio w-full mt-20  ">
        Хотите ли застраховаться от противоположного направления движения цены?
      </h3>

      <div class="form_radio_2">
        <input
          id="radio-3"
          type="radio"
          name="radio_2"
          value="true"
          v-model="saveDirection"
        />
        <label class="label" for="radio-3"><span>Да /</span></label>
      </div>

      <div class="form_radio_2">
        <input
          id="radio-4"
          type="radio"
          name="radio_2"
          value="false"
          v-model="saveDirection"
        />
        <label class="label"  for="radio-4"><span>Нет</span></label>
      </div>

      <div class="slederCustomQa">
        <div class="mt-20">
          <vue-slider
            class="blue-slider"
            v-model="expectedMaxPrice"
            :marks="markSliderCoin"
            :interval="100"
            :min="minSlider"
            :max="maxSlider"
            @change="changeMaxPrice"
            :enable-cross="false"
          >
          </vue-slider>
          <div class="slider-divides">
            <span v-for="item in divides" :key="item"></span>
          </div>
        </div>
        <div class="number flex justify-between">
          <span v-for="label in sliderLabels" :key="label">{{ label }}</span>
        </div>

        <vCheckbox 
        class="header__checkbox__customQa"
        v-model="futHedgeFlag_down">
          Выбрать рекомендуемый диапазон
        </vCheckbox>
      </div>

      <h3 class="header__title__on__radio w-full mt-20  ">
        Хотите ли получать дополнительную прибыль за счет продажи фьючерса?
      </h3>

      <div class="form_radio">
        <input
          id="radio-1"
          type="radio"
          name="radio"
          value="true"
          v-model="subDirectionFlag"
        />
        <label class="label" for="radio-1"><span>Да /</span></label>
      </div>

      <div class="form_radio">
        <input
          id="radio-2"
          type="radio"
          name="radio"
          value="false"
          v-model="subDirectionFlag"
        />
        <label class="label" for="radio-2"><span>Нет</span></label>
      </div>
    </div>

    <h3 class="caption">
      <svg
        width="18"
        height="19"
        viewBox="0 0 18 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9 1.25001C10.0836 1.24873 11.1568 1.46154 12.1579 1.87623C13.159 2.29091 14.0683 2.89928 14.8336 3.6664C15.6007 4.43171 16.2091 5.34103 16.6238 6.34215C17.0384 7.34325 17.2513 8.41641 17.25 9.5C17.2513 10.5836 17.0385 11.6568 16.6238 12.6579C16.2091 13.659 15.6007 14.5683 14.8336 15.3336C14.0683 16.1007 13.159 16.7091 12.1579 17.1238C11.1568 17.5385 10.0836 17.7513 8.99999 17.75C7.91641 17.7513 6.84325 17.5384 5.84215 17.1238C4.84105 16.7091 3.93173 16.1007 3.16643 15.3336C2.3993 14.5683 1.79092 13.659 1.37623 12.6579C0.961543 11.6568 0.748728 10.5836 0.750006 9.49999C0.748753 8.41641 0.961577 7.34325 1.37626 6.34215C1.79094 5.34104 2.39931 4.43173 3.16643 3.66643C3.93173 2.89931 4.84104 2.29094 5.84215 1.87626C6.84325 1.46158 7.91641 1.24875 9 1.25001ZM9.00001 17L9.00098 16.25C9.88726 16.2512 10.765 16.0771 11.5838 15.738C12.4026 15.3988 13.1464 14.9011 13.7722 14.2736L13.7736 14.2722C14.4011 13.6464 14.8988 12.9026 15.238 12.0838C15.5771 11.265 15.7512 10.3873 15.75 9.50098V9.49905C15.7511 8.61277 15.5771 7.735 15.2379 6.91619C14.8988 6.09737 14.4011 5.35366 13.7736 4.72777L13.7722 4.72639C13.1464 4.09887 12.4026 3.60122 11.5838 3.26204C10.765 2.92287 9.88726 2.74886 9.00098 2.75001H8.99905C8.11277 2.74888 7.235 2.9229 6.41619 3.26207C5.59737 3.60125 4.85366 4.09889 4.22777 4.7264L4.2264 4.72777C3.59889 5.35366 3.10125 6.09737 2.76207 6.91619C2.4229 7.735 2.24888 8.61277 2.25001 9.49905V9.50098C2.24886 10.3873 2.42287 11.265 2.76204 12.0838C3.10122 12.9026 3.59887 13.6464 4.22639 14.2722L4.22778 14.2736C4.85366 14.9011 5.59737 15.3988 6.41619 15.7379C7.235 16.0771 8.11277 16.2511 8.99905 16.25L9.00001 17Z"
          fill="url(#paint0_linear)"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9 14.375C9.24864 14.375 9.4871 14.2762 9.66291 14.1004C9.83873 13.9246 9.9375 13.6861 9.9375 13.4375C9.9375 13.1889 9.83873 12.9504 9.66291 12.7746C9.4871 12.5988 9.24864 12.5 9 12.5C8.75136 12.5 8.5129 12.5988 8.33709 12.7746C8.16127 12.9504 8.0625 13.1889 8.0625 13.4375C8.0625 13.6861 8.16127 13.9246 8.33709 14.1004C8.5129 14.2762 8.75136 14.375 9 14.375Z"
          fill="url(#paint1_linear)"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9 4.25C9.41421 4.25 9.75 4.58579 9.75 5V11C9.75 11.4142 9.41421 11.75 9 11.75C8.58579 11.75 8.25 11.4142 8.25 11V5C8.25 4.58579 8.58579 4.25 9 4.25Z"
          fill="url(#paint2_linear)"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="17.25"
            y1="1.25"
            x2="0.75"
            y2="1.25"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#8743FF" />
            <stop offset="1" stop-color="#4136F1" />
          </linearGradient>
          <linearGradient
            id="paint1_linear"
            x1="9.9375"
            y1="12.5"
            x2="8.0625"
            y2="12.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#8743FF" />
            <stop offset="1" stop-color="#4136F1" />
          </linearGradient>
          <linearGradient
            id="paint2_linear"
            x1="9.75"
            y1="4.25"
            x2="8.25"
            y2="4.25"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#8743FF" />
            <stop offset="1" stop-color="#4136F1" />
          </linearGradient>
        </defs>
      </svg>
      <span  class="span__on__chart ml-3"
        >Продажа фьючерса требует внесения на счет базового актива в количестве
        равном номиналу проданных фьючерсов.</span
      >
    </h3>

    <div class="v-table-statistics   items-center">
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

      <div class="gradient-table mt-10">
        <table
          v-if="tableData && selectedCoin"
          class="table-auto text-center justify-end m-left w-full table-statistic"
        >
          <thead class="border__thead">
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
            <tr class="border-gray-400 bg-emerald-200">
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
            <tr class="border-gray-400">
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
            <tr class="border-gray-400">
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
            <tr class="border-gray-400">
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
      <div class="v-call-spread-right flex pb-2  ">
        <div class="button__sendorder  flex ">
          <v-button
            @upGetStatisctics="
              sendOrder({
                tableData: tableData,
                max_slippage: Number(max_slippage),
              })
            "
          />
          <input
            class="input"
            v-model="max_slippage"
            name="inputSlipage"
            id="slipage"
            type="number"
          />
          <!--             {{ max_slippage }} -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component/dist-css/vue-slider-component.umd.min.js";
import "vue-slider-component/dist-css/vue-slider-component.css";
import "vue-slider-component/theme/default.css";

import { mapGetters, mapActions, mapState, mapMutations } from "vuex";
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
      value: 0,
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
      //selectedCoin: null,
      /*   selectedDate: null, */
      selectedDirection: null,

      /*       coinAmount: 0, */
      description: "Description from DATA",
      chartData: {},
      max_slippage: [0, 100],
      name: "null",
      title: "Chart title from DATA",
      sliderLabels: [],

      timerId: null,
      intervalTimerId: null,

      markSlider: null,
      markSliderEth: null,
    };
  },

  computed: {
    requestParams() {
      return {
        main_direction: this.selectedDirection,
        fut_hedge_flag: this.convertBooleanToString(this.subDirectionFlag),
        sub_direction_flag: this.convertBooleanToString(this.saveDirection),
        main_range: [...this.expectedMinPrice], //
        sub_range: [...this.expectedMaxPrice],
        max_slippage: this.max_slippage,
      };
    },

    divides() {
      if (this.selectedCoin === "BTC") return 7;
      if (this.selectedCoin === "ETH") return 8;
      return 7;
    },

    markSliderCoin() {
      switch (this.selectedCoin) {
        case "BTC":
          return this.markSlider;
        case "ETH":
          return this.markSliderEth;

        default:
          return null;
      }
    },

    ...mapGetters(["fullDataList", "tableList"]),

    ...mapState({
      selectedCoin: (state) => state.calculator.selectedUnderlying,
      selectedDate: (state) => state.calculator.selectedMaturity,
      coinAmount: (state) => state.calculator.coinAmount,
      selectedUnderlying: (state) => state.calculator.selectedUnderlying,
    }),
  },

  watch: {
    selectedUnderlying(newValue) {
      this.getMaturity(newValue);
      this.$store.commit("calculator/clearFormCustomQa");
    },

    saveDirection(newValue, oldValue) {
      //Checkbox
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
      //Checkbox
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
        this.FieldsCheck();
      }
    },

    expectedMinPrice(newValue, oldValue) {
      if (newValue) {
        console.log("expectedMinPrice", newValue);
        this.FieldsCheck();
      }
    },

    futHedgeFlag_top(newValue, oldValue) {
      //Checkbox
      if (newValue) {
        this.expectedMinPrice = this.defolt_expectedMinPrice;
      }
    },
    futHedgeFlag_down(newValue, oldValue) {
      //Checkbox
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
    ...mapMutations([
      "setUnderlying",
      "setMaturity",
      "setCoinAmount",
      "setHedgeFunding",
    ]),
    ...mapActions([
      "getMaturity_actions",
      "getStrikes_actions",
      "getQaStructs_actions",
      "sendOrder",
    ]),

    async getMaturity(underlying) {
      console.log("GET MATUROTY");
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
      /* this.setupSliderLabels();   */
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
      this.markSlider = (v) => !(v % 25000);
      this.markSliderEth = (v) => !(v % 1000);
    },

    setupSliderLabels() {
      this.sliderLabels = [];
      const labelsAmount = 15;
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

    async setDirection(value) {
      console.log("setDirection", value);
      if (value) {
        this.selectedDirection = value;
      }
      let shit = 0;
      clearInterval(this.intervalTimerId);
      this.intervalTimerId = setInterval(async () => {
        try {
          const result = await this.$store.dispatch(
            "getQaStructs_actions",
            this.requestParams
          );
          console.log("result-setDirection", result);
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
          console.log("catch", error);
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
  mounted() {
    console.log(this.$store);
  },
};
</script>

<style>

.span__on__chart {
  font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 21px;
}
.label {
  font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 21px;
}
.header__title__on__radio {
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 21px;
margin-bottom: 30px;

}
.header__checkbox__customQa {
 padding-top: 50px;
    width: auto;
    margin-left: 0;
  
}
.header__select__change__title {
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.05em;
  padding-bottom: 20px;
}
.button__sendorder {
  padding-bottom: 15px;
}
.v-table-statistics {
  width: 140%;
}

.discription__button,
.gradient-table {
  flex: 1 1 100%;
  max-width: 35%;
}

.wrapper-text {
  align-items: flex-start;
}

.gradient-table {
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
  max-height: 50%;
  margin-top: 46px;
}
.description {
  font-family: Gilroy;
  color: #ffffff;
  font-size: 14px;
  line-height: 180%;
  font-style: normal;
  font-weight: normal;
  font-weight: 400;
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

.slider-divides {
  display: flex;
  justify-content: space-between;
  position: relative;
  top: -23px;
}

.slider-divides span {
  display: block;
  width: 2px;
  height: 24px;
  background: linear-gradient(270deg, #8743ff 0%, #4136f1 100%);
}

.caption {
  display: inline-flex;
  align-items: center;
  font-size: 18px;
  line-height: 21px;
  background: rgba(0, 0, 0, 0.1);
  padding: 8px 12px;
  margin: 35px 0;
  border-radius: 10px;
}

/* Radio buttons */

.form_radio {
  display: inline-flex;
  align-items: center;
  margin-bottom: 10px;
  margin-right: 12px;
}

.form_radio span {
  display: block;
  margin-left: 10px;
  margin-bottom: 5px;
}
.form_radio input[type="radio"] {
  display: none;
}
.form_radio label {
  display: inline-block;
  cursor: pointer;
  position: relative;
  padding-left: 25px;
  margin-right: 0;
  line-height: 18px;
  user-select: none;
}
.form_radio label:before {
  content: "";
  display: inline-block;
  width: 26px;
  height: 26px;
  position: absolute;
  left: 0;
  bottom: 1px;
  border: 1px solid #333;
  border-radius: 50%;
}

/* Checked */
.form_radio input[type="radio"]:checked + label:before {
  background: url("../assets/images/checked.png") 0 0 no-repeat;
  border: none;
}

/* Hover */
.form_radio label:hover:before {
  filter: brightness(120%);
}

/* Disabled */
.form_radio input[type="radio"]:disabled + label:before {
  filter: grayscale(100%);
}

.form_radio_2 {
  display: inline-flex;
  align-items: center;
  margin-bottom: 10px;
  margin-right: 12px;
}

.form_radio_2 span {
  display: block;
  margin-left: 10px;
  margin-bottom: 5px;
}
.form_radio_2 input[type="radio"] {
  display: none;
}
.form_radio_2 label {
  display: inline-block;
  cursor: pointer;
  position: relative;
  padding-left: 25px;
  margin-right: 0;
  line-height: 18px;
  user-select: none;
}
.form_radio_2 label:before {
  content: "";
  display: inline-block;
  width: 26px;
  height: 26px;
  position: absolute;
  left: 0;
  bottom: 1px;
  border: 1px solid #333;
  border-radius: 50%;
}

/* Checked */
.form_radio_2 input[type="radio"]:checked + label:before {
  background: url("../assets/images/checked.png") 0 0 no-repeat;
  border: none;
}

/* Hover */
.form_radio_2 label:hover:before {
  filter: brightness(120%);
}

/* Disabled */
.form_radio_2 input[type="radio"]:disabled + label:before {
  filter: grayscale(100%);
}

/* Radio buttons END */
</style>
