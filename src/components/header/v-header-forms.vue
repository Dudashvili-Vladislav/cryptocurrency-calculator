<template>
  <div class="v-header-forms">
    <div
      class="form-control text-gray-700 pointer-events-auto w-1/6 justify-start"
    >
      <vSelect
        :value="$store.state.calculator.selectedUnderlying"
        @input="handleUnderlyingSelect"
        :label="'Underlying'"
        :options="underlyingList"
        class="underlying select-gradient"
      >
      </vSelect>
    </div>

    <div
      class="form-control text-gray-700 pointer-events-auto w-1/6 justify-start ml-8"
    >
      <vSelect
        :value="$store.state.calculator.selectedMaturity"
        @input="handleMaturitySelect"
        :label="'Maturity'"
        :options="maturityList"
        @change="setMaturity"
        class="select-gradient"
      >
      </vSelect>
    </div>
    <div class="form-control text-gray-700 pointer-events-auto w-1/6 ml-8">
      <vAmount
        :value="$store.state.calculator.coinAmount"
        @input="handleAmountChange($event)"
        :label="'Amount ' + $store.state.underlying"
      />
      <!--            @click.prevent="$emit('upGetStatisctics')"-->
      <!--            @upAmount="setAmount"-->
    </div>
    <vCheckbox v-model="Checkbox" @checked="handleCheckbox">
      Futures hedge funding
    </vCheckbox>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";

import vSelect from "./forms/v-select";
import vAmount from "./forms/v-amount";
import vCheckbox from "./forms/v-checkbox";

export default {
  name: "v-header-forms",

  components: {
    vAmount,
    vSelect,
    vCheckbox,
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
      selectedCoin: (state) => state.underlying,
      selectedHedg: (state) => state.maturity,
    }),
  },
  watch: {
    amount(newValue, oldValue) {
      this.fieldsCheck();
    },
    selectedunderlying() {
      this.selectedMaturity = null;
    },
  },

  methods: {
    ...mapActions(["getMaturity_actions"]),

    handleCheckbox(value) {
      console.log("valueeeeeeeeeeeee", value);
      this.$store.commit("setFlagFutures_mutations", value);
      this.fieldsCheck();
    },

    getMaturity(underlying) {
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
        console.log("amount", this.amount);
      }
    },

    handleMaturitySelect(value) {
      this.$store.commit("calculator/setMaturity", value);
      this.$store.commit("setMaturity_mutations", value);
      this.fieldsCheck();
      console.log("maurityValue", value);
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
      this.fieldsCheck();
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
  min-width: 275px;
  color: white;
}

.v-checkbox .select-none {
  font-size: 18px;
  line-height: 21px;
  color: #ffffff;
}
</style>
