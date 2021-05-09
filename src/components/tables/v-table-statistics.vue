<template>
  <div class="v-table-statistics">
    {{ tableData }}
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
          <td>{{ tableData ['BTC'] ['Amount of underlying'] }}</td>
          <td>{{ tableData ['%'] ['Amount of underlying'] }}</td>
          <td>{{ tableData ['USD'] ['Amount of underlying'] }}</td>
        </tr>
        <tr class="border-gray-400 bg-emerald-200">
          <td>Max profit</td>
          <td>{{ tableData ['BTC'] ["Max profit"].toFixed(2) }}</td>
          <td>{{ tableData ['%'] ["Max profit"].toFixed(2)}}</td>
          <td>{{ tableData ['USD'] ["Max profit"].toFixed(2) }}</td>
        </tr>
        <tr class="border-gray-400">
          <td>Structure product price</td>
          <td>{{ tableData ['BTC'] ["Structure product price"].toFixed(2) }}</td>
          <td>{{ tableData ['%'] ["Structure product price"].toFixed(2) }}</td>
          <td>{{ tableData ['USD'] ["Structure product price"].toFixed(2) }}</td>
        </tr>
        <tr class="border-gray-400">
          <td>Maintenance margin</td>
          <td>{{ tableData ['BTC'] ["Maintenace margin"].toFixed(2)}}</td>
          <td>{{ tableData ['%'] ["Maintenace margin"].toFixed(2) }}</td>
          <td>{{ tableData ['USD'] ["Maintenace margin"].toFixed(2) }}</td>
        </tr>
        <tr class="border-gray-400">
          <td>Total margin</td>
          <td>{{ tableData['BTC'] ["Total margin"].toFixed(2) }}</td>
          <td>{{ tableData ['%'] ["Total margin"].toFixed(2) }}</td>
          <td>{{ tableData ['USD'] ["Total margin"].toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "v-table-statistics",
  props: {
    tableData: {
      type: Object, 
      default() {
        return {}
      }
    }
  },

  data() {
    return {};
  },
};
</script>
