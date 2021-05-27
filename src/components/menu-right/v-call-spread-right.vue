<template>
  <div class="v-call-spread-right">

    <vSendOrder @upGetStatisctics="getStatisctics_actions" />
  </div>
</template>

<script>
import vText from "../text/v-text";
import vSendOrder from "./forms/v-send-order"

import { mapActions } from "vuex"

export default {
  name: "v-call-spread-right",
  
  methods: {
    ...mapActions(['getStatisctics_actions']),

  },

  components: {
    vText,
    vSendOrder
  },
};
</script>
