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
        > </vSelect>
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
        <vSelect :options="directionOptions" @change="setMaturity"> </vSelect>
      </div>
      <div class="slederCustomQa">
        <Slider class="mt-20" v-model="value" :max="150000" />
        <div class="number flex justify-between">
          <span>0</span>
          <span>10000</span>
          <span>20000</span>
          <span>30000</span>
          <span>40000</span>
          <span>50000</span>
          <span>60000</span>
          <span>70000</span>
          <span>80000</span>
          <span>90000</span>
          <span>100000</span>
          <span>110000</span>
          <span>120000</span>
          <span>130000</span>
          <span>140000</span>
          <span>150000</span>
        </div>
      </div>
    </div>
    <vCheckbox>
      Выбрать рекомендуемый диапазон
    </vCheckbox>
    <h3 class="w-full mt-10 ml-8 ">
      Хотите ли застраховаться от противоположного направления движения цены?
    </h3>
    <vCheckbox>
      Да / Нет
    </vCheckbox>
    
    <h3 class="w-full mt-10 ml-8 ">
      Продажа фьючерса требует внесения на счет базового актива в количестве равном номиналу проданных фьючерсов.
    </h3>

    <div class="v-table-statistics flex justify-between w-full items-center">
      <vLineChart
        class="text-left chart-v min-w-2/3 w-2/3"
        :dataset="chartData"
        :title="title"
      />

      <div class="wrapper-text w-1/3 mt-20 ml-5 ">
        <div class="text pr-3 ">{{ description }}</div>

        <table
          class="table-auto text-center mt-5 justify-end m-left w-full table-statistic"
        >
          <thead class="border border-gray-400 bg-gray-100">
            <tr>
              <th></th>
              <th>{{ underlyingChoice }}</th>
              <th>%</th>
              <th>USD</th>
            </tr>
          </thead>
          <tbody class="border border-gray-400">
            <tr class="border-gray-400">
              <td>Amount of underlying</td>
              <td>{{ tableData[underlyingChoice] }}</td>
              <td>{{ tableData["%"] }}</td>
              <td>{{ tableData["USD"] }}</td>
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
      msg: "waiting",
      underlyingList: ["BTC", "ETH"],
      directionOptions: ["Up", "Down"],
      maturityList: [],
      value: [20, 40],
      tableData: {},
      underlyingChoice: [],
      selectedCoin: null,
      selectedDate: null,
      coinAmount: 0,
      
    };
  },


  watch: {
    selectedCoin(newValue, oldValue) {
      this.FieldsCheck();
    },
    selectedDate(newValue, oldValue) {
      this.FieldsCheck();
    },
    coinAmount(newValue, oldValue) {
      this.FieldsCheck();
    },
  },

  methods: {
    ...mapActions(["getMaturity_actions"]),

    async getMaturity(underlying) {
      this.maturityList = await this.getMaturity_actions(underlying);
    },

    setMaturity(event) {
      this.$store.commit("setMaturity_mutations", event);
    },

    setAmount(count) {
      this.$store.commit("setAmount_mutations", count);
    },
    

    FieldsCheck() {
      if (
        this.selectedCoin != null &&
        this.selectedDate != null &&
        this.coinAmount != 0
      ) {
        this.$store.dispatch("getQaStructs_actions", this.selectedCoin);
        this.$store.dispatch("");
      }
    },
  },
};
</script>

<style src="@vueform/slider/themes/default.css"></style>
