<template>
  <div class="v-recommended pt-6">
    <v-header-forms />

    <div class="grap-table flex justify-between w-full mt-10">
      <div class="graph w-1/2">
        <h1>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint
          distinctio tenetur numquam voluptas nihil non quo nulla. Ratione dolor
          tenetur architecto distinctio facilis. Expedita, quia placeat dolor
          distinctio laudantium dolorem?
        </h1>
      </div>
      <v-call-spread-right />
    </div>
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

<style>
</style>