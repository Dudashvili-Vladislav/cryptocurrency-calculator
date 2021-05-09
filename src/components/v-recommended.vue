<template>
  <div class="v-recommended pt-6 container mx-auto">
    <v-header-forms />


    <v-call-spread-right />
  </div>
</template>

<script>
import vHeaderForms from "./v-header-forms";
import vCallSpreadRight from "./v-call-spread-right";


export default {
  name: "v-recommended",
  components: {
    vHeaderForms,
    vCallSpreadRight,
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
