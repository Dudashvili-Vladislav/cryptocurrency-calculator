<template>
  <div class="v-table-statistics flex justify-between w-full items-center">
    <!--     <vLineChart
      class="text-left chart-v min-w-2/3 w-2/3"
      :dataset="chartData"
      :title="title"
    /> -->
    <vLineChart2
      v-if="chartData"
      class="text-left chart-v min-w-2/3 w-2/3"
      :dataset="chartData"
      :title="title"
    />

    <div class="wrapper-text w-1/3 mt-20 ml-5 ">
      <div class="text pr-3" v-if="description">{{ description }}</div>

      <table
        class="table-auto text-center mt-5 justify-end m-left w-full table-statistic"
      >
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
            <td>{{ tableData[underlyingChoice]["Amount of underlying"] }}</td>
            <td>{{ tableData["%"]["Amount of underlying"] }}</td>
            <td>{{ tableData["USD"]["Amount of underlying"] }}</td>
          </tr>
          <tr class="border-gray-400 bg-emerald-200">
            <td>Max profit</td>
            <td>{{ tableData[underlyingChoice]["Max profit"].toFixed(2) }}</td>
            <td>{{ tableData["%"]["Max profit"].toFixed(2) }}</td>
            <td>{{ tableData["USD"]["Max profit"].toFixed(2) }}</td>
          </tr>
          <tr class="border-gray-400">
            <td>Structure product price</td>
            <td>
              {{
                tableData[underlyingChoice]["Structure product price"].toFixed(
                  2
                )
              }}
            </td>
            <td>{{ tableData["%"]["Structure product price"].toFixed(2) }}</td>
            <td>
              {{ tableData["USD"]["Structure product price"].toFixed(2) }}
            </td>
          </tr>
          <tr class="border-gray-400">
            <td>Maintenance margin</td>
            <td>
              {{ tableData[underlyingChoice]["Maintenace margin"].toFixed(2) }}
            </td>
            <td>{{ tableData["%"]["Maintenace margin"].toFixed(2) }}</td>
            <td>{{ tableData["USD"]["Maintenace margin"].toFixed(2) }}</td>
          </tr>
          <tr class="border-gray-400">
            <td>Total margin</td>
            <td>
              {{ tableData[underlyingChoice]["Total margin"].toFixed(2) }}
            </td>
            <td>{{ tableData["%"]["Total margin"].toFixed(2) }}</td>
            <td>{{ tableData["USD"]["Total margin"].toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
      <div class="v-call-spread-right flex pb-2">
        <input
              class="input border border-gray-400 mt-11  rounded px-3 py-3  pb-2    "
              v-model="mission"
              name="inputSlipage"
              id="slipage"
              type="number"
            />
        <!-- <div class="slippage mt-14 text-lg border-b-2 border-gray-500">
          {{ slippage }}
        </div> -->
        <v-button
          @upGetStatisctics="
            sendOrder({
              tableData: tableData,
              slippage: Number(mission),
            })
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import vButton from "@/components/v-button";
import { mapGetters, mapActions } from "vuex";
import vLineChart from "@/components/charts/v-line-chart";
import vLineChart2 from "@/components/charts/v-line-chart-2";

export default {
  name: "v-table-statistics",

  components: {
    vLineChart,
    vLineChart2,
    vButton,
  },

  props: {
    tableData: {
      type: Object,
      default() {
        return {};
      },
    },

    description: {
      type: String,
      default() {
        return "";
      },
    },

    title: {
      type: String,
      default() {
        return "";
      },
    },

    chartData: {
      type: Object,
      default() {
        return {};
      },
    },

    tableList: {
      type: Object,
      default() {
        return {};
      },
    },
    slippage: {
      type: Number,
      default: null,
    },
  },

  computed: {
    ...mapGetters(["underlyingChoice", "fullDataList", "maturity"]),
  },

  watch: {
    dataset: {
      handler(newVal, oldVal) {},
      immediate: true,
    },

    logData() {
      console.log("tableData", this.tableData);
    },
  },

  methods: {
    ...mapActions([
      "getStatisctics_actions",
      "getTableStaticsics_actions",
      "sendOrder",
    ]),
  },

  data() {
    return {
       mission: this.slippage,
    };
  },
};
</script>
<style scoped>
.table-statistic td {
  padding: 5px 10px;
  border: 1px solid;
}
</style>
