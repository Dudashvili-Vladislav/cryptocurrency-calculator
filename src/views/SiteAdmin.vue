<template>
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
          class="form-control text-gray-700 pointer-events-auto w-1/4 justify-start"
        >
          <vSelect
            :modelValue="$store.state.calculator.users"
            :options="users"
            :label="$t('Select_user_admin')"
            @input="handleUsersSelect"
            class="underlying select-gradient"
          >
          </vSelect>
        </div>
      </div>
    </div>

    <div class="wrapper__table__btn">
      <div class="btn__tab-nav" v-if="this.margins != 0">
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
                    class="table__tbody__tr"
                    v-for="(margin, index) in margins"
                    :key="index"
                  >
                    <td class="field__descriptions">
                      <p v-if="!isEditing">{{ margin.Client_Id }}</p>
                      <input v-if="isEditing" v-model="margin.Client_Id" />
                    </td>

                    <td class="field__descriptions">
                      <p v-if="!isEditing">{{ margin.availableFunds }}</p>
                      <input v-if="isEditing" v-model="margin.availableFunds" />
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
                      <input v-if="isEditing" v-model="margin.fundsNotional" />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                class="wrapper__table__btn__footer flex"
                v-if="this.margins != 0"
              >
                <v-button
                  class="button-recomended "
                  @upGetStatisctics="SendOrderMar"
                >
                  {{ $t("save") }}
                </v-button>

                <v-button class="button-cancel" @upGetStatisctics="cancelOrder"
                  >{{ $t("back") }}
                </v-button>
              </div>
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
                    v-for="(position, index) in positions"
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
                      <p v-if="!isEditingPosition">{{ position.Client_Id }}</p>
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
              <div
                class="wrapper__table__btn__footer flex"
                v-if="this.positions != 0"
              >
                <v-button
                  class="button-recomended "
                  @upGetStatisctics="SendOrderPos"
                >
                  {{ $t("save") }}</v-button
                >
                <v-button
                  class="button-cancel"
                  @upGetStatisctics="cancelOrder"
                  >{{ $t("back") }}</v-button
                >
              </div>
            </div>
          </div>
          <div class="tab-item" v-if="activeTab === 3"></div>
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
      active: false,
      activeTab: 1,
      timerId: null,
      isEditing: false,
      isEditingPosition: false,

      loguot: () => {
        store.dispatch("auth/signOut");
        router.push("/Login");
      },
    };
  },

  watch: {},

  computed: {
    ...mapGetters(["fullDataList"]),

    ...mapState({
      fullDataListState: (state) => state.fullDataList,
    }),
  },

  methods: {
    ...mapActions([
      "getUsers",
      "fetchCleintTableInfoByTab",
      "getTableStaticsics_actions",
      "sendOrderMargins",
      "sendOrderPositions",
    ]),

    cancelOrder() {
      if (this.activeTab === 1) {
        this.isEditing = false;
        this.handleUsersSelect();
      } else if (this.activeTab === 2) {
        this.isEditingPosition = false;
        this.handleUsersSelect();
      }
    },

    SendOrderMar() {
      this.sendOrderMargins({
        client_id: this.$store.state.calculator.users,
        table_json: this.margins,
      });
      this.isEditing = false;
      this.handleUsersSelect();
    },

    SendOrderPos() {
      this.sendOrderPositions({
        client_id: this.$store.state.calculator.users,
        table_json: this.positions,
      });
      this.isEditingPosition = false;
      this.handleUsersSelect();
    },

    async handleUsersSelect(userID) {
      const userId = userID || this.$store.state.calculator.users;
      clearInterval(this.timerId);
      this.$store.commit("calculator/setUserSiteAdmin", userId);

      this.timerId = setInterval(async () => {
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
        console.log("marginsResponse", marginsResponse);
        console.log("dealsResponce", dealsResponce);
        console.log("$store", this.$store.state.calculator.users);
        this.margins = this.convertMargins(marginsResponse);
        this.positions = this.convertPositions(positionsResponse);
        this.deals = this.convertDeals(dealsResponce);
      }, 2000);
    },

    convertDeals(response) {
      let convertDeals = [];
      const Product_Name = Object.entries(response["Product Name"]);

      Product_Name.forEach((item, index) => {
        convertDeals[index].ProductName = item[1];
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

    onClickEditButton() {
      if (this.activeTab === 1) {
        this.isEditing = true;
        clearInterval(this.timerId);
      } else if (this.activeTab === 2) {
        this.isEditingPosition = true;
        clearInterval(this.timerId);
      }
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
        convertMargins[index].marginRequirements = item[1];
      });

      fundsNotionalReq.forEach((item, index) => {
        convertMargins[index].fundsNotional = item[1];
      });

      availableFunds.forEach((item, index) => {
        convertMargins[index].availableFunds = item[1];
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
    /*     this.handleUsersSelect(); */
  },
};
</script>

<style>
.wrapper__table__btn__footer {
  padding-top: 20px;
  float: right;
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

.table__tbody__tr:last-child td {
  border-top: 1px solid #fff3;
}

.tabe__wrapper {
  flex: 1 1 100%;
  max-width: 2000px;
  max-height: 700px;
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

.table__thead {
  height: 50px;
}

.field__descriptions {
  padding-top: 10px;
  padding-left: 5px;
}

.table__tr {
  text-align: left;
}
.table__th__header {
  padding-left: 5px;
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
  width: 153px;
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
