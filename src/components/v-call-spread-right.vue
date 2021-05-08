<template>
  <div class="v-call-spread-right">

    <div class="tables pt-10 mx-auto px-10 w-full">
      <h2 class="text-left max-w-xs">
        Если цена ETH при погашении выше 3600 USD и ниже 4040 USD, то инвестор
        получает дополнительный доход 1:1 отражающий рост ETH. Если цена ETH при
        погашении ниже 3600 USD, то опционная составляющая оказывается вне
        денег, что эквивалентно 0% дополнительного дохода. Если цена ETH при
        погашении выше 4040 USD, то дополнительный доход ограничен на уровне 440
        USD (что эквивалентно 4040 USD – 3600 USD)
      </h2>
      <table class="table-auto text-center mt-5">
        <thead class="border border-gray-400 bg-gray-100">
          <tr>
            <th></th>
            <th>ETH</th>
            <th>%</th>
            <th>USD</th>
          </tr>
        </thead>
        <tbody class="border border-gray-400">
          <tr class="border-gray-400">
            <td>Amount of underlying</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
          <tr class="border-gray-400 bg-emerald-200">
            <td>Max profit</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
          <tr class="border-gray-400">
            <td>Structure product price</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
          <tr class="border-gray-400">
            <td>Maintenance margin</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
          <tr class="border-gray-400">
            <td>Total margin</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
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
export default {
  components: {
    name: "v-call-spread-right",
  },
};
</script>

<style scoped>
</style>