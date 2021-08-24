<template>
  <div class="v-header-forms">
    <div
      class="form-control text-gray-700 pointer-events-auto w-1/4 justify-start"
    >
      <vSelect
        :modelValue="$store.state.calculator.selectedUnderlying"
        @input="handleUnderlyingSelect"
        :label="$t('underlying')"
        :options="underlyingList"
        class="underlying select-gradient"
      >
      </vSelect>
    </div>

    <div
      class="form-control text-gray-700 pointer-events-auto w-1/4 justify-start ml-8"
    >
      <vSelect
        :modelValue="$store.state.calculator.selectedMaturity"
        @input="handleMaturitySelect"
        :label="$t('maturity')"
        :options="maturityList"
        class="select-gradient"
      >
      </vSelect>
    </div>
    <div class="form-control text-gray-700 pointer-events-auto w-1/6 ml-8">

      <vAmount
        :value="$store.state.calculator.coinAmount"
        @input="handleAmountChange($event)"
        :label="$t('Amount') + $store.state.calculator.selectedUnderlying"
      />
      <!--            @click.prevent="$emit('upGetStatisctics')"-->
      <!--            @upAmount="setAmount"-->
    </div>
    <div class="wrapper w-1/4">
      <vCheckbox 
        v-if="activeTab !== 3"
        v-model="Checkbox" 
        @checked="handleCheckbox"
      >
      <h3
      class="text-chbx-recomended">
        {{ $t("futures_hedge_funding") }}
      </h3>
      </vCheckbox>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";

import vSelect from "./forms/v-select";
import vAmount from "./forms/v-amount";
import vCheckbox from "./forms/v-checkbox";
import _ from "lodash";

export default {
  name: "v-header-forms",

  components: {
    vAmount,
    vSelect,
    vCheckbox,
  },

  props: {
    activeTab: {
      type: Number,
      default: 1
    },
  },

  emits: ["upGetStatisctics"],

  data() {
    return {
      msg: "waiting",
      underlyingList: ["BTC", "ETH"],
      selectedMaturity: null,
      selectedunderlying: null,
      coinAmount: 0,
      Checkbox: false,
      timerId: null,
    };
  },

  computed: {
    ...mapGetters(["maturityList"]),
    ...mapState({
      amount: (state) => state.amount,
      selectedCoin: (state) => state.calculator.selectedUnderlying,
      selectedHedg: (state) => state.maturity,
    }),
  },
  watch: {
    amount(newValue, oldValue) {
      if (this.activeTab === 1) {
        clearInterval(this.timerId)
        this.timerId = setTimeout(() => {
          this.fieldsCheck()
        }, 300);
      }
      this.removeChartSettings()
    },
    selectedCoin(newValue) {
      this.$store.commit("calculator/clearFormRecomended");
      this.removeChartSettings()
    }
  },

  methods: {
    ...mapActions(["getMaturity_actions"]),

    removeChartSettings() {
      for (const key in localStorage) {
        console.log('element', key)
        if(key.includes('chart_')) {
          localStorage.removeItem(key)
        }
      }
    },

    handleCheckbox(value) {
      this.$store.commit("setFlagFutures_mutations", value);
      this.fieldsCheck();
    },

    getMaturity(underlying) {
      this.removeChartSettings()
      this.$store.commit("setUnderlying_mutations", underlying);
      this.getMaturity_actions(underlying);
      (this.selectedMaturity = null),
        (this.selectedunderlying = null),
        (this.coinAmount = 0),
        (this.Checkbox = false),
        this.$store.commit("setFullData_mutations", null), // обнуляем объект с графиками
        this.$store.commit("setAmount_mutations", 0); // обнуляем количество валюты
    },

    setMaturity(event) {
      setTimeout(() => {
        this.$store.commit("setMaturity_mutations", event);
        this.fieldsCheck();
      }, 1000);
    },

    setAmount(count) {
      this.$store.commit("setAmount_mutations", count);
    },

    fieldsCheck() {
      if (
        this.$store.state.calculator.coinAmount !== 0 &&
        this.$store.state.calculator.selectedMaturity !== null &&
        this.$store.state.calculator.selectedUnderlying !== null
      ) {
        this.$store.dispatch("getStatisctics_actions");
        this.$store.dispatch("getTableStaticsics_actions");
      }
    },

    handleMaturitySelect(value) {
      this.$store.commit("calculator/setMaturity", value);
      this.$store.commit("setMaturity_mutations", value);
      this.fieldsCheck();
      this.setMaturity()
    },

    handleUnderlyingSelect(value) {
      this.$store.commit("calculator/setUnderlying", value);
      this.getMaturity();
      this.fieldsCheck();

    },
    handleAmountChange(value) {
      // FIXME
      value = Number(typeof value === "object" ? value.target.value : value);
      this.$store.commit("calculator/setCoinAmount", value);
      this.$store.commit("setAmount_mutations", value);
    },
  },
};
</script>
<style>

.v-header-forms {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex: 1 1;
}

.v-select-underlying {
  min-width: 300px;
  color: white;
}

.v-checkbox .select-none {
  font-size: 18px;
  line-height: 21px;
  color: #ffffff;
}
</style>
