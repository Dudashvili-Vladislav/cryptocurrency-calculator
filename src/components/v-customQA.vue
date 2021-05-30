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
        >
        </vSelect>
      </div>

      <h3 class="w-full mt-8 absolute ">
        Какой срок хеджирования вас интересует?
      </h3>
      <div
        class="form-control text-gray-700 pointer-events-auto w-1/6 justify-start mt-14 "
      >
        <vSelect :options="maturityList" @change="setMaturity"> </vSelect>
      </div>
      <div class="form-control text-gray-700 pointer-events-auto w-1/6 mt-6">
        <vAmount
          @click.prevent="this.$emit('upGetStatisctics')"
          @upAmount="setAmount"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";

import vHeaderForms from "./header/v-header-forms";
import vSelect from "./header/forms/v-select";
import vAmount from "./header/forms/v-amount";

export default {
  name: "v-customQA",

  components: {
    vHeaderForms,
    vSelect,
    vAmount,
  },
  emits: ["upGetStatisctics"],

  data() {
    return {
      msg: "waiting",
      underlyingList: ["BTC", "ETH"],
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
      this.FieldsCheck();
    },
    selectedCoin(newValue, oldValue) {
      console.log(this.selectedCoin);
      console.log(this.selectedHedg);
    },
    selectedHedg(newValue, oldValue) {
      console.log(this.selectedCoin);
      console.log(this.selectedHedg);
    },
  },

  methods: {
    ...mapActions(["getMaturity_actions"]),

    getMaturity(underlying) {
      this.$store.commit("setUnderlying_mutations", underlying);
      this.getMaturity_actions(underlying);
    },

    setMaturity(event) {
      this.$store.commit("setMaturity_mutations", event);
    },

    setAmount(count) {
      this.$store.commit("setAmount_mutations", count);
    },

    FieldsCheck() {
      if (
        this.amount != 0 &&
        this.selectedHedg != null &&
        this.selectedCoin != null
      ) {
        this.$store.dispatch("getStatisctics_actions");
        this.$store.dispatch("getTableStaticsics_actions");
      }
    },
  },
};
</script>

<style></style>
