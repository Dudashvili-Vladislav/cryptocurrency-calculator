<template>
  <div class="wrapper-siteAdmin">
    <div class="SiteAdmin">
      <div class="header-wrapper flex  ">
        <h1 class="logo font-bold text-xl">
          Calculator. ADMIN
        </h1>

        <div class="user-panel ml-auto">
          <!--         <div class="swicher">
                  <input class="switch" id="switch1" type="checkbox" />
                  <label class="switch-for" for="switch1"></label>
                </div> -->

          <vSelect
            :modelValue="$store.state.calculator.lang"
            @input="changeLang"
            class="lang-select"
          >
            <option
              v-for="locale in $i18n.availableLocales"
              :key="`locale-${locale}`"
              :value="locale"
              class="option"
            >
              {{ locale.toUpperCase() }}
            </option>
          </vSelect>

          <div class="user-panel-wrap">
            <div class="user-avatar">
              <i class="icon user-icon"></i>
            </div>

            <div class="user-info" v-if="$store.state.auth.user">
              <div class="user-name">
                {{ $store.state.auth.user.displayName }}
              </div>
              <div class="user-type">{{ $t("user") }}</div>
            </div>
          </div>
          <div class="exit">
            <a @click.prevent="loguot" class="btn">
              <img
                class=" pr-2 img__exit"
                src="@/assets/images/exit-icon.png"
                alt=""
              />
              {{ $t("exit") }}
            </a>
          </div>
        </div>

        <div class="divider"></div>
        <div class="select">
          <div
            class="form-control text-gray-700 pointer-events-auto w-1/4 justify-start flex"
          >
            <vSelect
              :modelValue="$store.state.calculator.users"
              :label="$t('Select_user_admin')"
              :options="users"
              @input="handleUsersSelect"
              class="underlying select-gradient"
            >
            </vSelect>

            <vSelect
              v-model="sortCurrency"
              :label="$t('Select_currency_admin')"
              class="underlying select-gradient ml-10"
              :options="['BTC', 'ETH']"
              v-if="activeTab === 1 || activeTab === 5"
            >
            </vSelect>

            <vSelect
              v-model="sortProductName"
              :label="$t('Select_product_name_admin')"
              class="underlying select-gradient ml-10"
              :options="[
                'Call-spread',
                'Put-spread',
                'Call',
                'Put',
                'Call-spread with put',
                'Call-spread & put-spread',
                'Strangle',
              ]"
              v-if="activeTab === 2 || activeTab === 3 || activeTab === 4"
            >
            </vSelect>

            <vSelect
              v-model="sortfHeadgeFlag"
              :label="$t('Select_flag_admin')"
              class="underlying select-gradient ml-10"
              :options="[true, false]"
              v-if="activeTab === 2 || activeTab === 3 || activeTab === 4"
            >
            </vSelect>
          </div>
        </div>
      </div>

      <div class="wrapper__table__btn">
        <div class="btn__tab-nav" v-if="activeTab === 3 || activeTab === 4">
          <button class="btn test" @click="onClickEditButton">
            {{ $t("edit") }}
          </button>
        </div>
        <!-- Tabs -->

        <div class="container with-nav">
          <ul class="tab-nav">
            <li class="tab-nav-item">
              <a
                @mouseover="active = true"
                @mouseleave="active = false"
                @click="changeTab(1)"
                class="tab-link"
                :class="{ active: activeTab === 1 }"
                >Margins</a
              >
            </li>

            <li class="tab-nav-item">
              <a
                @click="changeTab(2)"
                class="tab-link"
                :class="{ active: activeTab === 2 }"
                >Positions</a
              >
            </li>

            <li class="tab-nav-item">
              <a
                @click="changeTab(3)"
                class="tab-link"
                :class="{ active: activeTab === 3 }"
                >Deals</a
              >
            </li>

            <li class="tab-nav-item">
              <a
                @click="changeTab(4)"
                class="tab-link"
                :class="{ active: activeTab === 4 }"
                >Orders</a
              >
            </li>

            <li class="tab-nav-item">
              <a
                @click="changeTab(5)"
                class="tab-link"
                :class="{ active: activeTab === 5 }"
                >Funds</a
              >
            </li>
          </ul>
          <div class="tab-content">
            <div class="tab-item" v-if="activeTab === 1">
              <div class="tabe__wrapper">
                <table class="table__main w-full">
                  <thead class="table__thead">
                    <tr class="table__tr">
                      <th class="table__th__header">Client Id</th>
                      <th class="table__th__header">Available funds</th>
                      <th class="table__th__header">Currency</th>
                      <th class="table__th__header">Margin Requirements</th>
                      <th class="table__th__header">Notional</th>
                    </tr>
                  </thead>
                  <div class="hr__wrapper">
                    <hr class="table__hr" />
                  </div>
                  <tbody class="table__tbody">
                    <tr
                      class="table__tbody__tr__margins"
                      v-for="(margin, index) in filtredMargins"
                      :key="index"
                    >
                      <td class="field__descriptions">
                        <p v-if="!isEditing">{{ margin.Client_Id }}</p>
                        <input v-if="isEditing" v-model="margin.Client_Id" />
                      </td>

                      <td class="field__descriptions">
                        <p v-if="!isEditing">{{ margin.availableFunds }}</p>
                        <input
                          v-if="isEditing"
                          v-model="margin.availableFunds"
                        />
                      </td>

                      <td class="field__descriptions">
                        <p v-if="!isEditing">{{ margin.currency }}</p>
                        <input v-if="isEditing" v-model="margin.currency" />
                      </td>

                      <td class="field__descriptions">
                        <p v-if="!isEditing">{{ margin.marginRequirements }}</p>
                        <input
                          v-if="isEditing"
                          v-model="margin.marginRequirements"
                        />
                      </td>

                      <td class="field__descriptions">
                        <p v-if="!isEditing">{{ margin.fundsNotional }}</p>
                        <input
                          v-if="isEditing"
                          v-model="margin.fundsNotional"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="tab-item" v-if="activeTab === 2">
              <div class="tabe__wrapper">
                <table class="table__main w-full">
                  <thead class="table__thead">
                    <tr class="table__tr">
                      <th class="table__th__header">Product Name</th>
                      <th class="table__th__header">Client Id</th>
                      <th class="table__th__header">Amount</th>
                      <th class="table__th__header">Exchange Position</th>
                      <th class="table__th__header">Fin Result USD</th>
                      <th class="table__th__header">Fut Hedge flag</th>
                      <th class="table__th__header">Initial Price USD</th>
                    </tr>
                  </thead>
                  <div class="hr__wrapper">
                    <hr class="table__hr" />
                  </div>
                  <tbody class="table__tbody">
                    <tr
                      class="table__tbody__tr"
                      v-for="(position, index) in filtredPositionsProductName"
                      :key="index"
                    >
                      <td class="field__descriptions">
                        <p v-if="!isEditingPosition">
                          {{ position.ProductName }}
                        </p>
                        <input
                          v-if="isEditingPosition"
                          v-model="position.ProductName"
                        />
                      </td>

                      <td class="field__descriptions">
                        <p v-if="!isEditingPosition">
                          {{ position.Client_Id }}
                        </p>
                        <input
                          v-if="isEditingPosition"
                          v-model="position.Client_Id"
                        />
                      </td>

                      <td class="field__descriptions">
                        <p v-if="!isEditingPosition">{{ position.Amount }}</p>
                        <input
                          v-if="isEditingPosition"
                          v-model="position.Amount"
                        />
                      </td>

                      <td class="field__descriptions">
                        <p v-if="!isEditingPosition">
                          {{ position.ExchangePosition }}
                        </p>
                        <input
                          v-if="isEditingPosition"
                          v-model="position.ExchangePosition"
                        />
                      </td>

                      <td class="field__descriptions">
                        <p v-if="!isEditingPosition">
                          {{ position.FinResultUSD }}
                        </p>
                        <input
                          v-if="isEditingPosition"
                          v-model="position.FinResultUSD"
                        />
                      </td>

                      <td class="field__descriptions">
                        <p v-if="!isEditingPosition">
                          {{ position.FutHedgeFlag }}
                        </p>
                        <input
                          v-if="isEditingPosition"
                          v-model="position.FutHedgeFlag"
                        />
                      </td>

                      <td class="field__descriptions">
                        <p v-if="!isEditingPosition">
                          {{ position.InitialPriceUSD }}
                        </p>
                        <input
                          v-if="isEditingPosition"
                          v-model="position.InitialPriceUSD"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="tab-item" v-if="activeTab === 3">
              <div class="tabe__wrapper">
                <table class="table__main w-full">
                  <thead class="table__thead">
                    <tr class="table__tr">
                      <th class="table__th__header">Product Name</th>
                      <th class="table__th__header">Client Id</th>
                      <th class="table__th__header">Comment</th>
                      <th class="table__th__header">Datetime</th>
                      <th class="table__th__header">Deal Id</th>
                      <th class="table__th__header">Exchange Position</th>
                      <th class="table__th__header">Fut Hedge flag</th>
                      <th class="table__th__header">Maintenance Margin USD</th>
                      <th class="table__th__header">Max Slippage</th>
                      <th class="table__th__header">Price USD</th>
                      <th class="table__th__header">Status</th>
                      <th class="table__th__header">Total Margin USD</th>
                    </tr>
                  </thead>
                  <div class="hr__wrapper">
                    <hr class="table__hr" />
                  </div>
                  <tbody class="table__tbody">
                    <tr
                      class="table__tbody__tr"
                      v-for="(deal, index) in filtredDealsProductName"
                      :key="index"
                    >
                      <td class="field__descriptions">
                        <p v-if="!isEditingDeals">
                          {{ deal.ProductName }}
                        </p>
                        <input
                          class="input_deals"
                          v-if="isEditingDeals"
                          v-model="deal.ProductName"
                        />
                      </td>

                      <td class="field__descriptions">
                        <p v-if="!isEditingDeals">{{ deal.Client_Id }}</p>
                        <input
                          class="input_deals"
                          v-if="isEditingDeals"
                          v-model="deal.Client_Id"
                        />
                      </td>

                      <td class="field__descriptions">
                        <p v-if="!isEditingDeals">{{ deal.Comment }}</p>
                        <input
                          class="input_deals"
                          v-if="isEditingDeals"
                          v-model="deal.Comment"
                        />
                      </td>

                      <td class="field__descriptions">
                        <p v-if="!isEditingDeals">{{ deal.Datetime }}</p>
                        <input
                          class="input_deals"
                          v-if="isEditingDeals"
                          v-model="deal.Datetime"
                        />
                      </td>

                      <td class="field__descriptions">
                        <p v-if="!isEditingDeals">{{ deal.Deal_Id }}</p>
                        <input
                          class="input_deals"
                          v-if="isEditingDeals"
                          v-model="deal.Deal_Id"
                        />
                      </td>

                      <td class="field__descriptions">
                        <p v-if="!isEditingDeals">
                          {{ deal.Exchange_Position }}
                        </p>
                        <input
                          class="input_deals"
                          v-if="isEditingDeals"
                          v-model="deal.Exchange_Position"
                        />
                      </td>

                      <td class="field__descriptions">
                        <p v-if="!isEditingDeals">{{ deal.Fut_Hedge_flag }}</p>
                        <input
                          class="input_deals"
                          v-if="isEditingDeals"
                          v-model="deal.Fut_Hedge_flag"
                        />
                      </td>

                      <td class="field__descriptions">
                        <p v-if="!isEditingDeals">
                          {{ deal.Maintenance_Margin_USD }}
                        </p>
                        <input
                          class="input_deals"
                          v-if="isEditingDeals"
                          v-model="deal.Maintenance_Margin_USD"
                        />
                      </td>

                      <td class="field__descriptions">
                        <p v-if="!isEditingDeals">
                          {{ deal.Max_Slippage }}
                        </p>
                        <input
                          class="input_deals"
                          v-if="isEditingDeals"
                          v-model="deal.Max_Slippage"
                        />
                      </td>

                      <td class="field__descriptions">
                        <p v-if="!isEditingDeals">
                          {{ deal.Price_USD }}
                        </p>
                        <input
                          class="input_deals"
                          v-if="isEditingDeals"
                          v-model="deal.Price_USD"
                        />
                      </td>

                      <td class="field__descriptions">
                        <p v-if="!isEditingDeals">
                          {{ deal.Status }}
                        </p>
                        <input
                          class="input_deals"
                          v-if="isEditingDeals"
                          v-model="deal.Status"
                        />
                      </td>

                      <td class="field__descriptions">
                        <p v-if="!isEditingDeals">
                          {{ deal.Total_Margin_USD }}
                        </p>
                        <input
                          class="input_deals"
                          v-if="isEditingDeals"
                          v-model="deal.Total_Margin_USD"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div
                  class="wrapper__table__btn__footer flex"
                  v-if="this.deals != 0"
                >
                  <v-button
                    class="button-recomended "
                    @upGetStatisctics="SendOrderDeals"
                  >
                    {{ $t("save") }}
                  </v-button>
                  <v-button
                    class="button-cancel"
                    @upGetStatisctics="cancelOrder"
                    >{{ $t("back") }}
                  </v-button>
                </div>
              </div>
            </div>

            <div class="tab-item" v-if="activeTab === 4">
              <div class="tabe__wrapper">
                <table class="table__main w-full">
                  <thead class="table__thead">
                    <tr class="table__tr">
                      <th class="table__th__header">Product Name</th>
                      <th class="table__th__header__id">Client Id</th>
                      <th class="table__th__header">Comment</th>
                      <th class="table__th__header">Datetime</th>
                      <th class="table__th__header">Deal Id</th>
                      <th class="table__th__header">Exchange Position</th>
                      <th class="table__th__header">Fut Hedge flag</th>
                      <th class="table__th__header">Maintenance Margin USD</th>
                      <th class="table__th__header">Max Slippage</th>
                      <th class="table__th__header">Price USD</th>
                      <th class="table__th__header">Status</th>
                      <th class="table__th__header">Total Margin USD</th>
                    </tr>
                  </thead>
                  <div class="hr__wrapper">
                    <hr class="table__hr" />
                  </div>
                  <tbody class="table__tbody">
                    <tr
                      class="table__tbody__tr"
                      v-for="(order, index) in filtredOrdersProductName"
                      :key="index"
                    >
                      <td class="field__descriptions">
                        <p v-if="!isEditingOrders">
                          {{ order.ProductName }}
                        </p>
                        <input
                          class="input_orders"
                          v-if="isEditingOrders"
                          v-model="order.ProductName"
                        />
                      </td>

                      <td class="field__descriptions">
                        <p class="orders_str" v-if="!isEditingOrders">
                          {{ order.Client_Id }}
                        </p>
                        <input
                          class="input_orders"
                          v-if="isEditingOrders"
                          v-model="order.Client_Id"
                        />
                      </td>

                      <td class="field__descriptions">
                        <p class="orders_str" v-if="!isEditingOrders">
                          {{ order.Comment }}
                        </p>
                        <input
                          class="input_orders"
                          v-if="isEditingOrders"
                          v-model="order.Comment"
                        />
                      </td>

                      <td class="field__descriptions">
                        <p class="orders_str" v-if="!isEditingOrders">
                          {{ order.Datetime }}
                        </p>
                        <input
                          class="input_orders"
                          v-if="isEditingOrders"
                          v-model="order.Datetime"
                        />
                      </td>

                      <td class="field__descriptions">
                        <p class="orders_str" v-if="!isEditingOrders">
                          {{ order.Deal_Id }}
                        </p>
                        <input
                          class="input_orders"
                          v-if="isEditingOrders"
                          v-model="order.Deal_Id"
                        />
                      </td>

                      <td class="field__descriptions">
                        <p class="orders_str" v-if="!isEditingOrders">
                          {{ order.Exchange_Position }}
                        </p>
                        <input
                          class="input_orders"
                          v-if="isEditingOrders"
                          v-model="order.Exchange_Position"
                        />
                      </td>

                      <td class="field__descriptions">
                        <p class="orders_str" v-if="!isEditingOrders">
                          {{ order.Fut_Hedge_flag }}
                        </p>
                        <input
                          class="input_orders"
                          v-if="isEditingOrders"
                          v-model="order.Fut_Hedge_flag"
                        />
                      </td>

                      <td class="field__descriptions">
                        <p class="orders_str" v-if="!isEditingOrders">
                          {{ order.Maintenance_Margin_USD }}
                        </p>
                        <input
                          class="input_orders"
                          v-if="isEditingOrders"
                          v-model="order.Maintenance_Margin_USD"
                        />
                      </td>

                      <td class="field__descriptions">
                        <p class="orders_str" v-if="!isEditingOrders">
                          {{ order.Max_Slippage }}
                        </p>
                        <input
                          class="input_orders"
                          v-if="isEditingOrders"
                          v-model="order.Max_Slippage"
                        />
                      </td>

                      <td class="field__descriptions">
                        <p class="orders_str" v-if="!isEditingOrders">
                          {{ order.Price_USD }}
                        </p>
                        <input
                          class="input_orders"
                          v-if="isEditingOrders"
                          v-model="order.Price_USD"
                        />
                      </td>

                      <td class="field__descriptions">
                        <p class="orders_str" v-if="!isEditingOrders">
                          {{ order.Status }}
                        </p>
                        <input
                          class="input_orders"
                          v-if="isEditingOrders"
                          v-model="order.Status"
                        />
                      </td>

                      <td class="field__descriptions">
                        <p class="orders_str" v-if="!isEditingOrders">
                          {{ order.Total_Margin_USD }}
                        </p>
                        <input
                          class="input_orders"
                          v-if="isEditingOrders"
                          v-model="order.Total_Margin_USD"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div
                  class="wrapper__table__btn__footer flex"
                  v-if="orders != 0"
                >
                  <v-button
                    class="button-recomended "
                    @upGetStatisctics="SendOrderOrders"
                  >
                    {{ $t("save") }}
                  </v-button>
                  <v-button
                    class="button-cancel"
                    @upGetStatisctics="cancelOrder"
                    >{{ $t("back") }}
                  </v-button>
                </div>
              </div>
            </div>

            <div class="tab-item" v-if="activeTab === 5">
              <div class="tabe__wrapper">
                <table class="table__main w-full">
                  <thead class="table__thead">
                    <tr class="table__tr">
                      <th class="table__th__header">Client Id</th>
                      <th class="table__th__header">Amount</th>
                      <th class="table__th__header">Currency</th>
                      <th class="table__th__header">Transfer type</th>
                    </tr>
                  </thead>
                  <div class="hr__wrapper">
                    <hr class="table__hr" />
                  </div>
                  <tbody class="table__tbody">
                    <tr
                      class="table__tbody__tr"
                      v-for="(fund, index) in filtredFunds"
                      :key="index"
                    >
                      <td class="field__descriptions">
                        <p>
                          {{ fund.ClientIdFunds }}
                        </p>
                      </td>

                      <td class="field__descriptions">
                        <p>
                          {{ fund.AmountFunds }}
                        </p>
                      </td>

                      <td class="field__descriptions">
                        <p>
                          {{ fund.CurrencyFunds }}
                        </p>
                      </td>

                      <td class="field__descriptions">
                        <p>
                          {{ fund.TransferTypeFunds }}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from "@/components/header/forms/v-select";
import { useRouter } from "vue-router";
import { mapGetters, mapActions, mapState, useStore } from "vuex";
import vButton from "@/components/v-button";
import { string } from "yup/lib/locale";

export default {
  name: "SiteAdmin",

  components: {
    vSelect,
    vButton,
  },

  data() {
    const router = useRouter();
    const store = useStore();
    return {
      users: [],
      margins: [],
      positions: [],
      deals: [],
      orders: [],
      funds: [],
      active: false,
      activeTab: 1,
      timerId: null,
      isEditing: false,
      isEditingPosition: false,
      isEditingDeals: false,
      isEditingOrders: false,
      sortCurrency: "",
      sortProductName: "",
      sortfHeadgeFlag: "true",
      Client_Id: [],

      loguot: () => {
        store.dispatch("auth/signOut");
        router.push("/Login");
      },
    };
  },

  computed: {
    ...mapGetters(["fullDataList"]),

    ...mapState({
      fullDataListState: (state) => state.fullDataList,
    }),

    filtredMargins() {
      return this.margins.filter((item) => {
        if (this.sortCurrency) {
          return item.currency === this.sortCurrency;
        }
        return item;
      });
    },

    filtredPositionsProductName() {
      return this.positions.filter((item) => {
        if (this.sortProductName && this.sortfHeadgeFlag) {
          return (
            item.ProductName === this.sortProductName &&
            String(item.FutHedgeFlag) == this.sortfHeadgeFlag
          );
        }
        return item;
      });
    },

    filtredDealsProductName() {
      return this.deals.filter((item) => {
        if (this.sortProductName && this.sortfHeadgeFlag) {
          return (
            item.ProductName === this.sortProductName &&
            String(item.Fut_Hedge_flag) == this.sortfHeadgeFlag
          );
        }
        return item;
      });
    },

    filtredOrdersProductName() {
      return this.orders.filter((item) => {
        if (this.sortProductName && this.sortfHeadgeFlag) {
          return (
            item.ProductName === this.sortProductName &&
            String(item.Fut_Hedge_flag) == this.sortfHeadgeFlag
          );
        }
        return item;
      });
    },

    filtredFunds() {
      return this.funds.filter(
        (item) => item.CurrencyFunds === this.sortCurrency
      );
    },

    filtredBorder() {
      return this.margins.filter((item) => {
        if (this.client_id[-1] === "SUM") {
          this.client_id.push(1);
        } else if (this.client_id[-1] && this.client_id[-2] === "SUM") {
          this.client_id.push(1);
        }
      });
    },
  },

  methods: {
    ...mapActions([
      "getUsers",
      "fetchCleintTableInfoByTab",
      "getTableStaticsics_actions",
      "sendOrderOrders",
      "sendOrderDeals",
    ]),

    cancelOrder() {
      if (this.activeTab === 3) {
        this.isEditingDeals = false;
        this.handleUsersSelect();
      } else if (this.activeTab === 4) {
        this.isEditingOrders = false;
        this.handleUsersSelect();
      }
    },

    SendOrderOrders() {
      this.sendOrderOrders({
        client_id: this.$store.state.calculator.users,
        table_json: this.orders,
      });
      console.log("table_json-orders", this.orders);
      this.isEditingOrders = false;
      this.handleUsersSelect();
    },

    SendOrderDeals() {
      this.sendOrderDeals({
        client_id: this.$store.state.calculator.users,
        table_json: this.deals,
      });
      console.log("table_json-deals", this.deals);
      this.isEditingDeals = false;
      this.handleUsersSelect();
    },

    async handleUsersSelect(userID) {
      const userId = userID || this.$store.state.calculator.users;
      clearInterval(this.timerId);
      this.$store.commit("calculator/setUserSiteAdmin", userId);
      await this.getUserForTable(userId);
      this.timerId = setInterval(async () => {
        this.getUserForTable(userId);
      }, 2000);
    },

    async getUserForTable(userId) {
      const marginsResponse = await this.fetchCleintTableInfoByTab({
        userId,
        url: "/admin/margins",
      });
      const positionsResponse = await this.fetchCleintTableInfoByTab({
        userId,
        url: "/admin/positions",
      });
      const dealsResponce = await this.fetchCleintTableInfoByTab({
        userId,
        url: "/admin/deals",
      });
      const ordersResponse = await this.fetchCleintTableInfoByTab({
        userId,
        url: "/admin/orders",
      });
      const fundsResponse = await this.fetchCleintTableInfoByTab({
        userId,
        url: "/admin/funds",
      });
      this.margins = this.convertMargins(marginsResponse);
      this.positions = this.convertPositions(positionsResponse);
      this.deals = this.convertDeals(dealsResponce);
      this.orders = this.convertOrders(ordersResponse);
      this.funds = this.convertFunds(fundsResponse);
    },

    convertFunds(response) {
      let convertFunds = [];
      const Client_id_funds = Object.entries(response["client_id"]);
      const Amount = Object.entries(response["amount"]);
      const Currency = Object.entries(response["currency"]);
      const Transfer_type = Object.entries(response["transfer_type"]);

      Client_id_funds.forEach((item, index) => {
        convertFunds.push({});
        convertFunds[index].ClientIdFunds = item[1];
      });

      Amount.forEach((item, index) => {
        convertFunds[index].AmountFunds = item[1].toFixed(2);
      });

      Currency.forEach((item, index) => {
        convertFunds[index].CurrencyFunds = item[1];
      });

      Transfer_type.forEach((item, index) => {
        convertFunds[index].TransferTypeFunds = item[1];
      });

      return convertFunds;
    },

    convertOrders(response) {
      let convertOrders = [];
      const ProductName = Object.entries(response["Product Name"]);
      const Client_Id = Object.entries(response["Client Id"]);
      const Comment = Object.entries(response["Comment"]);
      const Datetime = Object.entries(response["Datetime"]);
      const Deal_Id = Object.entries(response["Deal Id"]);
      const Exchange_Position = Object.entries(response["Exchange Position"]);
      const Fut_Hedge_flag = Object.entries(response["Fut Hedge flag"]);
      const Maintenance_Margin_USD = Object.entries(
        response["Maintenance Margin USD"]
      );
      const Max_Slippage = Object.entries(response["Max Slippage"]);
      const Price_USD = Object.entries(response["Price USD"]);
      const Status = Object.entries(response["Status"]);
      const Total_Margin_USD = Object.entries(response["Total Margin USD"]);

      ProductName.forEach((item, index) => {
        convertOrders.push({});
        convertOrders[index].ProductName = item[1];
      });

      Client_Id.forEach((item, index) => {
        convertOrders[index].Client_Id = item[1];
      });

      Comment.forEach((item, index) => {
        convertOrders[index].Comment = item[1];
      });

      Datetime.forEach((item, index) => {
        convertOrders[index].Datetime = item[1];
      });

      Deal_Id.forEach((item, index) => {
        convertOrders[index].Deal_Id = item[1];
      });

      Exchange_Position.forEach((item, index) => {
        convertOrders[index].Exchange_Position = item[1];
      });

      Fut_Hedge_flag.forEach((item, index) => {
        convertOrders[index].Fut_Hedge_flag = item[1];
      });

      Maintenance_Margin_USD.forEach((item, index) => {
        convertOrders[index].Maintenance_Margin_USD = item[1].toFixed(2);
      });

      Max_Slippage.forEach((item, index) => {
        convertOrders[index].Max_Slippage = item[1];
      });

      Price_USD.forEach((item, index) => {
        convertOrders[index].Price_USD = item[1].toFixed(2);
      });

      Status.forEach((item, index) => {
        convertOrders[index].Status = item[1];
      });

      Total_Margin_USD.forEach((item, index) => {
        convertOrders[index].Total_Margin_USD = item[1].toFixed(2);
      });

      return convertOrders;
    },

    convertDeals(response) {
      let convertDeals = [];
      const ProductName = Object.entries(response["Product Name"]);
      const Client_Id = Object.entries(response["Client Id"]);
      const Comment = Object.entries(response["Comment"]);
      const Datetime = Object.entries(response["Datetime"]);
      const Deal_Id = Object.entries(response["Deal Id"]);
      const Exchange_Position = Object.entries(response["Exchange Position"]);
      const Fut_Hedge_flag = Object.entries(response["Fut Hedge flag"]);
      const Maintenance_Margin_USD = Object.entries(
        response["Maintenance Margin USD"]
      );
      const Max_Slippage = Object.entries(response["Max Slippage"]);
      const Price_USD = Object.entries(response["Price USD"]);
      const Status = Object.entries(response["Status"]);
      const Total_Margin_USD = Object.entries(response["Total Margin USD"]);

      ProductName.forEach((item, index) => {
        convertDeals.push({});
        convertDeals[index].ProductName = item[1];
      });

      Client_Id.forEach((item, index) => {
        convertDeals[index].Client_Id = item[1];
      });

      Comment.forEach((item, index) => {
        convertDeals[index].Comment = item[1];
      });

      Datetime.forEach((item, index) => {
        convertDeals[index].Datetime = item[1];
      });

      Deal_Id.forEach((item, index) => {
        convertDeals[index].Deal_Id = item[1];
      });

      Exchange_Position.forEach((item, index) => {
        convertDeals[index].Exchange_Position = item[1];
      });

      Fut_Hedge_flag.forEach((item, index) => {
        convertDeals[index].Fut_Hedge_flag = item[1];
      });

      Maintenance_Margin_USD.forEach((item, index) => {
        convertDeals[index].Maintenance_Margin_USD = item[1].toFixed(2);
      });

      Max_Slippage.forEach((item, index) => {
        convertDeals[index].Max_Slippage = item[1];
      });

      Price_USD.forEach((item, index) => {
        convertDeals[index].Price_USD = item[1].toFixed(2);
      });

      Status.forEach((item, index) => {
        convertDeals[index].Status = item[1];
      });

      Total_Margin_USD.forEach((item, index) => {
        convertDeals[index].Total_Margin_USD = item[1].toFixed(2);
      });

      return convertDeals;
    },

    convertPositions(response) {
      let convertPositions = [];
      const Product_Name = Object.entries(response["Product Name"]);
      const Client_Id = Object.entries(response["Client Id"]);
      const Amount = Object.entries(response["Amount"]);
      const Exchange_Position = Object.entries(response["Exchange Position"]);
      const Fin_Result_USD = Object.entries(response["Fin Result USD"]);
      const Fut_Hedge_flag = Object.entries(response["Fut Hedge flag"]);
      const Initial_Price_USD = Object.entries(response["Initial Price USD"]);

      Client_Id.forEach((item, index) => {
        convertPositions.push({});
        convertPositions[index].Client_Id = item[1];
      });

      Product_Name.forEach((item, index) => {
        convertPositions[index].ProductName = item[1];
      });

      Amount.forEach((item, index) => {
        convertPositions[index].Amount = item[1];
      });

      Exchange_Position.forEach((item, index) => {
        convertPositions[index].ExchangePosition = item[1];
      });

      Fin_Result_USD.forEach((item, index) => {
        convertPositions[index].FinResultUSD = item[1];
      });

      Fut_Hedge_flag.forEach((item, index) => {
        convertPositions[index].FutHedgeFlag = item[1];
      });

      Initial_Price_USD.forEach((item, index) => {
        convertPositions[index].InitialPriceUSD = item[1];
      });

      return convertPositions;
    },

    convertMargins(response) {
      let convertMargins = [];
      const availableFunds = Object.entries(response["Available Funds"]);
      const Client_Id = Object.entries(response["Client Id"]);
      const currency = Object.entries(response["Currency"]);
      const marginReq = Object.entries(response["Margin Requirements"]);
      const fundsNotionalReq = Object.entries(response["Notional"]);

      marginReq.forEach((item, index) => {
        convertMargins.push({});
        convertMargins[index].marginRequirements = item[1].toFixed(2);
      });

      fundsNotionalReq.forEach((item, index) => {
        convertMargins[index].fundsNotional = item[1].toFixed(2);
      });

      availableFunds.forEach((item, index) => {
        convertMargins[index].availableFunds = item[1].toFixed(2);
      });

      currency.forEach((item, index) => {
        convertMargins[index].currency = item[1];
      });

      Client_Id.forEach((item, index) => {
        convertMargins[index].Client_Id = item[1];
      });

      // const lotsNumber = this.setupFields(lostReq, 'lostNumbers')
      return convertMargins;
    },

    onClickEditButton() {
      if (this.activeTab === 3) {
        this.isEditingDeals = true;
        clearInterval(this.timerId);
      } else if (this.activeTab === 4) {
        this.isEditingOrders = true;
        clearInterval(this.timerId);
      }
    },

    // setupFields(array, fieldType) {
    //   array.forEach((item, index) => {
    //     if (!convertMargins.length) {
    //       convertMargins.push({})
    //     }
    //     convertMargins[index][fieldType] = item[1]
    //   })
    //   return convertMargins
    // },

    changeLang(value) {
      this.$root.$i18n.locale = value;
      this.$store.commit("calculator/setLang", value);
      this.getTableStaticsics_actions();
    },

    changeTab(value) {
      this.activeTab = value;
    },
  },

  async mounted() {
    this.users = await this.getUsers();
    this.handleUsersSelect();
    console.log("NEW-VERSION!");
  },
};
</script>

<style>
.orders_str {
  overflow-wrap: anywhere;
}
.input_orders {
  width: 100%;
}

.input_deals {
  width: 100%;
}

.wrapper__table__btn__footer {
  padding-top: 20px;
  justify-content: end;
  padding-bottom: 30px;
}

.with-nav {
  padding-top: 35px;
}

.btn__tab-nav {
  position: relative;
}

.field__descriptions input {
  color: black;
  background: linear-gradient(270deg, #fcfaff 0%, #afafd1 100%);
}

/*  TABLE */

.hr__wrapper {
  position: relative;
}

.table__hr {
  position: absolute;
  width: 1279px;
  opacity: 0.4;
}

/* .table__tbody__tr:nth-last-child(2) td {
  border-top: 1px solid #fff3;
} */

.table__tbody__tr__margins:nth-last-child(2) td {
  border-top: 1px solid #fff3;
}

.tabe__wrapper {
  flex: 1 1 100%;
  max-width: 2000px;
  background: linear-gradient(
    210.96deg,
    rgba(55, 36, 88, 0.61) 0.01%,
    rgba(43, 35, 83, 0.7) 42.05%,
    rgba(63, 59, 115, 0) 104.81%
  );
}

.table__main td + td {
  border-left: 1px solid #fff3;
}

.table__main td {
  padding: 8px 10px;
}

.table__main td:nth-child(2) {
  max-width: 100px;
}

.table__thead {
  height: 50px;
}

.field__descriptions {
  text-align: center;
  padding-top: 10px;
}

.table__tr {
  text-align: left;
}

.table__th__header {
  overflow: hidden;
  text-align: center;
  padding-left: 5px;
}

.table__th__header__id {
  min-width: 90px;
}

/*  TABLE END */

.test {
  position: absolute;
  z-index: 250;
  top: 270px;
  right: 3.1%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  height: 48px;
  width: 123px;
  background: linear-gradient(270deg, #8743ff 0%, #4136f1 100%);
  border-radius: 5px;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #ffffff;
}

.select {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex: 1 1;
}

.logo {
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.tab-nav {
  display: flex;
}

.tab-nav-item {
  display: block;
  overflow: hidden;
}

.tab-nav-item + .tab-nav-item {
  border-left: 1px solid #322a9b;
}

.tab-nav-item:first-child {
  border-radius: 18px 0px 0px 0px;
}

.tab-nav-item:last-child {
  border-radius: 0px 18px 0px 0px;
}

.tab-link {
  font-family: Gilroy;
  font-weight: 400;
  display: block;
  min-width: 258px;
  padding: 17px 25px;
  background: rgba(0, 0, 0, 0.2);
  font-size: 18px;
  color: #ffffff;
}

.tab-link.active {
  background: linear-gradient(270deg, #8743ff 0%, #4136f1 100%);
}

.lang-select {
  font-family: Gilroy;
}

a {
  cursor: pointer;
  font-family: Gilroy;
}

.logo {
  text-transform: uppercase;
  color: #ffffff;
  font-family: Gilroy;
}

.header-wrapper {
  width: 1280px;
  position: fixed;
  top: 0;
  z-index: 100;

  flex-wrap: wrap;
  align-items: center;
  padding: 48px 48px 24px;
  background: linear-gradient(
    210.96deg,
    rgba(55, 36, 88, 0.61) 0.01%,
    rgba(43, 35, 83, 0.7) 42.05%,
    rgba(63, 59, 115, 0) 104.81%
  );
  filter: drop-shadow(0px 48px 69px rgba(23, 18, 43, 0.845335));
  backdrop-filter: blur(20px);
  border-radius: 0px 0px 18px 18px;
  margin-bottom: 40px;
}

.user-panel {
  display: flex;
  align-items: center;
}

.user-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid rgba(65, 54, 241, 1);
}

.user-info {
  display: flex;
  flex-direction: column;
  margin-left: 18px;
  font-family: Gilroy;
}

.user-name {
  font-size: 18px;
  line-height: 21px;
  color: #fff;
  margin-bottom: 3px;
}

.user-type {
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #ffffff;
  opacity: 0.5;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  font-family: Gilroy;
}

.user-panel-wrap {
  display: flex;
  align-items: center;
  margin-left: 48px;
  margin-right: 48px;
  min-width: 153px;
}

.lang-select {
  margin-left: 48px;
  min-width: 70px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  height: 48px;
  width: 123px;
  background: linear-gradient(270deg, #8743ff 0%, #4136f1 100%);
  border-radius: 5px;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #ffffff;
}

.divider {
  width: 100%;
  background: linear-gradient(270deg, #8743ff 0%, #4136f1 100%);
  height: 1px;
  margin: 28px 0 20px;
}

.switch-for {
  cursor: pointer;
  font-size: 16px;
  line-height: 25px;
  position: relative;
  bottom: 14px;
}

.switch-for::after {
  content: "";
  width: 59px;
  height: 32px;
  background: #171717;
  border-radius: 20px;
  position: absolute;
  right: -18px;
}

.switch-for::before {
  content: "";
  width: 24px;
  height: 24px;
  background: linear-gradient(270deg, #8743ff 0%, #4136f1 100%);
  border-radius: 50px;
  position: absolute;
  right: 14px;
  top: 4px;
  z-index: 1;

  transition-duration: 300ms;
}

.switch {
  display: none;
}

.switch:checked + .switch-for::before {
  right: -15px;
  background: #fff;
}

.switch:checked ~ .header-wrapper {
  background-color: #fff;
}
</style>
