<template>
  <div class="v-recommended pt-6 container mx-auto">
    <v-header-forms />

    <vChartsStatisctics />

    <v-call-spread-right />
  </div>
</template>

<script>
import vHeaderForms from "./v-header-forms";
import vCallSpreadRight from "./v-call-spread-right";
import vChartsStatisctics from "./v-charts-statistics"


export default {
  name: "v-recommended",
  components: {
    vHeaderForms,
    vCallSpreadRight,
    vChartsStatisctics
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  watch: {},
};
</script>

<style></style>
