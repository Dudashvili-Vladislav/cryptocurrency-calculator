<template>
  <div class="v-table-statistics">
    {{ tableData }}
    <table class="table-auto text-center mt-5">
      <thead class="border border-gray-400 bg-gray-100">
        <tr>
          <th></th>
          <th>{{ underlyingChoice }}</th>
          <th>%</th>
          <th>USD</th>
        </tr>
      </thead>
      <tbody class="border border-gray-400">
        <tr class="border-gray-400">
          <td>Amount of underlying</td>
          <td>{{ tableData [underlyingChoice] ['Amount of underlying'] }}</td>
          <td>{{ tableData ['%'] ['Amount of underlying'] }}</td>
          <td>{{ tableData ['USD'] ['Amount of underlying'] }}</td>
        </tr>
        <tr class="border-gray-400 bg-emerald-200">
          <td>Max profit</td>
          <td>{{ tableData [underlyingChoice] ["Max profit"].toFixed(2) }}</td>
          <td>{{ tableData ['%'] ["Max profit"].toFixed(2)}}</td>
          <td>{{ tableData ['USD'] ["Max profit"].toFixed(2) }}</td>
        </tr>
        <tr class="border-gray-400">
          <td>Structure product price</td>
          <td>{{ tableData [underlyingChoice] ["Structure product price"].toFixed(2) }}</td>
          <td>{{ tableData ['%'] ["Structure product price"].toFixed(2) }}</td>
          <td>{{ tableData ['USD'] ["Structure product price"].toFixed(2) }}</td>
        </tr>
        <tr class="border-gray-400">
          <td>Maintenance margin</td>
          <td>{{ tableData [underlyingChoice] ["Maintenace margin"].toFixed(2)}}</td>
          <td>{{ tableData ['%'] ["Maintenace margin"].toFixed(2) }}</td>
          <td>{{ tableData ['USD'] ["Maintenace margin"].toFixed(2) }}</td>
        </tr>
        <tr class="border-gray-400">
          <td>Total margin</td>
          <td>{{ tableData[underlyingChoice] ["Total margin"].toFixed(2) }}</td>
          <td>{{ tableData ['%'] ["Total margin"].toFixed(2) }}</td>
          <td>{{ tableData ['USD'] ["Total margin"].toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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

  computed: {
    ...mapGetters(["underlyingChoice"])
  },

  data() {
    return {};
  },
};
</script>
