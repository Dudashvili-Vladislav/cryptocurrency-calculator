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
    <div class="tables pt-10 mx-auto px-10 w-full">
      <div class="flex">
        <button
          type="button"
          class="mt-2 focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-gray-500 hover:bg-gray-600 hover:shadow-lg"
        >
          SendOrder
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import vText from "./v-text";
export default {
  name: "v-call-spread-right",

  components: {
    vText,
  },
};
</script>

<style scoped></style>
