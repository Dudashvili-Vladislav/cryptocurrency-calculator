<template>
  <div class="v-customQA pt-6 container mx-auto ">
    <h1 class="text-2xl ml-10 pb-5 font-medium">
      Базовые вопросы
    </h1>
    <div class="header-form ml-10 w-full">
      <div
        class="form-control text-gray-700 pointer-events-auto w-1/6 justify-start"
      >
        <vSelect
          :label="'Выберите базовый актив:'"
          :options="underlyingList"
          @change="getMaturity"
          v-model="selectedCoin"
        >
        </vSelect>
      </div>

      <h3 class="w-full mt-8 absolute ">
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
      <div class="form-control text-gray-700 pointer-events-auto w-1/6 mt-6">
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
        <Slider
          class="mt-20"
          v-model="expectedMinPrice"
          :min="minSlider"
          :max="maxSlider"
          :step="stepSlider"
        />
        <div class="number flex justify-between">
          <span v-for="label in sliderLabels" :key="label">{{ label }}</span>
        </div>
      </div>

      <vCheckbox v-model="futHedgeFlag">
        Выбрать рекомендуемый диапазон
      </vCheckbox>

      <h3 class="w-full mt-10 ml-8 ">
        Хотите ли застраховаться от противоположного направления движения цены?
      </h3>
      <vCheckbox v-model="saveDirection">
        Да / Нет
      </vCheckbox>

      <div class="slederCustomQa">
        <Slider
          class="mt-20"
          v-model="expectedMaxPrice"
          :min="minSlider"
          :max="maxSlider"
          :step="stepSlider"
        />
        <div class="number flex justify-between">
          <span v-for="label in sliderLabels" :key="label">{{ label }}</span>
        </div>

        <vCheckbox v-model="subDirectionFlag">
          Выбрать рекомендуемый диапазон
        </vCheckbox>
      </div>

      <h3 class="w-full mt-10 ml-8 ">
        Хотите ли получать дополнительную прибыль за счет продажи фьючерса?
      </h3>
      <vCheckbox v-model="saveDirection">
        Да / Нет
      </vCheckbox>
    </div>

    <h3 class="w-full mt-10 ml-8 ">
      Продажа фьючерса требует внесения на счет базового актива в количестве
      равном номиналу проданных фьючерсов.
    </h3>

    <div class="v-table-statistics flex justify-between w-full items-center">
      <vLineChart
        class="text-left chart-v min-w-2/3 w-2/3"
        :dataset="chartData"
        :title="title"
      />

      <div class="wrapper-text w-1/3 mt-20 ml-5 ">
        <div class="text pr-3 ">{{ description }}</div>

        <table v-if="tableData"
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
          <td>{{ tableData [selectedCoin] ['Amount of underlying'] }}</td>
          <td>{{ tableData ['%'] ['Amount of underlying'] }}</td>
          <td>{{ tableData ['USD'] ['Amount of underlying'] }}</td>
          
        </tr>
        <tr class="border-gray-400 bg-emerald-200">
          <td>Max profit</td>
          <td>{{ tableData [selectedCoin] ["Max profit"].toFixed(2) }}</td>
          <td>{{ tableData ['%'] ["Max profit"].toFixed(2)}}</td>
          <td>{{ tableData ['USD'] ["Max profit"].toFixed(2) }}</td>
        </tr>
        <tr class="border-gray-400">
          <td>Structure product price</td>
          <td>{{ tableData [selectedCoin] ["Structure product price"].toFixed(2) }}</td>
          <td>{{ tableData ['%'] ["Structure product price"].toFixed(2) }}</td>
          <td>{{ tableData ['USD'] ["Structure product price"].toFixed(2) }}</td>
        </tr>
        <tr class="border-gray-400">
          <td>Maintenance margin</td>
          <td>{{ tableData [selectedCoin] ["Maintenace margin"].toFixed(2)}}</td>
          <td>{{ tableData ['%'] ["Maintenace margin"].toFixed(2) }}</td>
          <td>{{ tableData ['USD'] ["Maintenace margin"].toFixed(2) }}</td>
        </tr>
        <tr class="border-gray-400">
          <td>Total margin</td>
          <td>{{ tableData[selectedCoin] ["Total margin"].toFixed(2) }}</td>
          <td>{{ tableData ['%'] ["Total margin"].toFixed(2) }}</td>
          <td>{{ tableData ['USD'] ["Total margin"].toFixed(2) }}</td>
        </tr>
      </tbody>
        </table>
        <div class="v-call-spread-right">
          <v-button @upGetStatisctics="sendOrder(tableData)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";

import vHeaderForms from "./header/v-header-forms";
import vSelect from "./header/forms/v-select";
import vAmount from "./header/forms/v-amount";
import Slider from "@vueform/slider";
import vCheckbox from "./header/forms/v-checkbox";
import vLineChart from "@/components/charts/v-line-chart";
import vButton from "@/components/v-button";
import vTable from "@/components/tables/v-table-statistics";
import axios from "axios";

export default {
  name: "v-customQA",

  components: {
    vHeaderForms,
    vSelect,
    vAmount,
    Slider,
    vCheckbox,
    vLineChart,
    vButton,
    vTable,
  },
  emits: ["upGetStatisctics"],

  data() {
    return {
      futHedgeFlag: false,
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
      title: "Chart title from DATA",
      sliderLabels: [],
    };
  },

  watch: {
    selectedCoin(newValue, oldValue) {
/*       this.FieldsCheck(); */
      this.setDirection();
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
    ]),

    async getMaturity(underlying) {
      this.maturityList = await this.getMaturity_actions(underlying);
      const result = await this.getStrikes_actions(this.selectedCoin);
      this.minSlider = result[this.selectedCoin].min;
      this.maxSlider = result[this.selectedCoin].max;
      this.stepSlider = result[this.selectedCoin].step;
      this.expectedMinPrice = result[this.selectedCoin].main_value;
      this.expectedMaxPrice = result[this.selectedCoin].sub_value;
      this.setupSliderLabels();
      this.selectedDate = null;
      this.coinAmount = 0;
      this.chartData = {};
      this.tableData = null;
      this.selectedDirection = null
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

    async setDirection(selectedDirection) {
      const options = {
        currency: this.selectedCoin,
        maturity: this.selectedDate,
        amount: this.coinAmount,
        main_direction: selectedDirection,
        fut_hedge_flag: this.convertBooleanToString(this.futHedgeFlag),
        sub_direction_flag: this.convertBooleanToString(this.subDirectionFlag),
        main_range: [...this.expectedMinPrice],
        sub_range: [...this.expectedMaxPrice],
      };
      var _this = this
      const result = await _this.$store.dispatch(
        "getQaStructs_actions",
          options
      );
      _this.chartData = result[0].chart,
      _this.tableData =result[0].table


      console.log("tableData",this.tableData);
/*       console.log("result", result); */
    },

    setAmount(selectedDirection) {
      this.$store.commit("setAmount_mutations", selectedDirection);
    },

    async FieldsCheck() {
      if (
        this.selectedCoin != null &&
        this.selectedDate != null &&
        this.coinAmount != 0
      ) {


/*           this.$store.dispatch('getStrikes_actions'); */
          this.$store.dispatch('getQaStructs_actions');  
      }
    },
  },
};
</script>

<style src="@vueform/slider/themes/default.css"></style>
