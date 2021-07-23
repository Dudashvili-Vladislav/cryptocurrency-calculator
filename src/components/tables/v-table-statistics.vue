<template>
  <div class="v-table-statistics  w-full items-center">
    <!--     <vLineChart
      class="text-left chart-v min-w-2/3 w-2/3"
      :dataset="chartData"
      :title="title"
    /> -->
    <div class="line-chart-wrapper ">
      <vLineChart2
        v-if="chartData"
        class="text-left chart-v min-w-2/3 w-2/3"
        :dataset="chartData"
        :title="title"
      />
    </div>
    <div class="wrapper-text  mt-20 ml-5 flex justify-between ">
      <div class="discription__button w-1/2">
        <div class="description text pr-3" v-if="description">
          {{ description }}
        </div>
        <div class="button__sendorder flex">
          <v-button
            @upGetStatisctics="
              sendOrder({
                tableData: tableData,
                slippage: Number(mission),
              })
            "
          />
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
        </div>
      </div>
      <table
        class="table-auto  text-center  justify-end m-left w-1/2 table-statistic"
      >
        <thead class="border__thead  ">
          <tr class="table__header">
            <th class="th"></th>
            <th class="table__title">{{ underlyingChoice }}</th>
            <th class="table__title">%</th>
            <th class="table__title__USD">USD</th>
          </tr>
        </thead>
        <tbody class="wrapper__table  ">
          <tr class="table__border ">
            <td class="field__description">Amount of underlying</td>
            <td class="field__values">{{ tableData[underlyingChoice]["Amount of underlying"] }}</td>
            <td class="field__values">{{ tableData["%"]["Amount of underlying"] }}</td>
            <td class="field__values">{{ tableData["USD"]["Amount of underlying"] }}</td>
          </tr>
          <tr class="bg-emerald-200">
            <td class="field__description">Max profit</td>
            <td class="field__values">{{ tableData[underlyingChoice]["Max profit"].toFixed(2) }}</td>
            <td class="field__values">{{ tableData["%"]["Max profit"].toFixed(2) }}</td>
            <td class="field__values">{{ tableData["USD"]["Max profit"].toFixed(2) }}</td>
          </tr>
          <tr class="">
            <td class="field__description">Structure product price</td>
            <td class="field__values">{{tableData[underlyingChoice]["Structure product price"].toFixed(2)}}
            </td>
            <td class="field__values">{{ tableData["%"]["Structure product price"].toFixed(2) }}</td>
            <td class="field__values">{{ tableData["USD"]["Structure product price"].toFixed(2) }}
            </td>
          </tr>
          <tr class="">
            <td class="field__description">Maintenance margin</td>
            <td class="field__values">{{ tableData[underlyingChoice]["Maintenace margin"].toFixed(2) }}
            </td>
            <td class="field__values">{{ tableData["%"]["Maintenace margin"].toFixed(2) }}</td>
            <td class="field__values">{{ tableData["USD"]["Maintenace margin"].toFixed(2) }}</td>
          </tr>
          <tr class="">
            <td class="field__description">Total margin</td>
            <td class="field__values">{{ tableData[underlyingChoice]["Total margin"].toFixed(2) }}
            </td>
            <td class="field__values">{{ tableData["%"]["Total margin"].toFixed(2) }}</td>
            <td class="field__values">{{ tableData["USD"]["Total margin"].toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>

      <div class="v-call-spread-right flex pb-2"></div>
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
      handler(oldValue, oldVal) {},
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
.table-auto {
  
}
.table-statistic td {
  padding: 5px 10px;
  border: 1px solid;
}
.input {
  background: none;
  border: 1px solid rgba(65, 54, 241, 1);
  color: #ffffff;
  font-family: Gilroy;
  border-radius: 4px;
  opacity: 0.8;
}
.description {
  font-family: Gilroy;
  color: #ffffff;
  font-size: 14px;
  line-height: 180%;
  font-style: normal;
  font-weight: normal;
}
.field__description {
  font-family: Gilroy;
  color: #ffffff;
  font-size: 14px;
  line-height: 100%;
  order: 0;
  flex-grow: 0;
  margin: 0px 10px;
}
.field__values {
    font-family: Gilroy;
  color: #ffffff;
  font-size: 14px;
  line-height: 100%;
  order: 0;
  flex-grow: 0;
  margin: 0px 10px;
  
  
}
.table__header {
  background: linear-gradient(270deg, #8743FF 0%, #4136F1 100%);

}

.table__title {
      font-family: Gilroy;
  color: #ffffff;
  font-size: 14px;
  line-height: 100%;
  order: 0;
  flex-grow: 0;
  margin: 0px 10px;
  padding: 13px 0 13px 0;
}
.table__title__USD {
        font-family: Gilroy;
  color: #ffffff;
  font-size: 14px;
  line-height: 100%;
  order: 0;
  flex-grow: 0;
  margin: 0px 10px;
  padding: 13px 0 13px 0;
  border-top-right-radius: 18px;
}
.th {
  border-top-left-radius: 18px
}


</style>
