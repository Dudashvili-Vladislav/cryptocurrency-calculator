<template>
  <div class="v-call-spread-right">
    <vText>
      Если цена ETH при погашении выше 3600 USD и ниже 4040 USD, то инвестор
      получает дополнительный доход 1:1 отражающий рост ETH. Если цена ETH при
      погашении ниже 3600 USD, то опционная составляющая оказывается вне денег,
      что эквивалентно 0% дополнительного дохода. Если цена ETH при погашении
      выше 4040 USD, то дополнительный доход ограничен на уровне 440 USD (что
      эквивалентно 4040 USD – 3600 USD)
    </vText>

    <vSendOrder @upGetStatisctics="getStatisctics" />
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

    getStatisctics() {
      this.getStatisctics_actions()
    }
  },

  components: {
    vText,
    vSendOrder
  },
};
</script>
