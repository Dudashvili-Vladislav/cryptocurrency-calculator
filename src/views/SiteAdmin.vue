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
            >Orders</a
          >
        </li>

        <li class="tab-nav-item">
          <a
            @click="changeTab(4)"
            class="tab-link"
            :class="{ active: activeTab === 4 }"
            >Deals</a
          >
        </li>

        <li class="tab-nav-item">
          <a
            @click="changeTab(5)"
            class="tab-link"
            :class="{ active: activeTab === 5 }"
            >Result</a
          >
        </li>
      </ul>

      <button class="btn" @click="onClickEditButton">Edit</button>
      <h3>{{ isEditing }}</h3>



      <div class="tabe__wrapper" >
        <table class="table__main w-full ">
          <thead class="table__thead">
            <tr class="table__tr">
              <th class="table__th__header">Product Name</th>
              <th class="table__th__header">Amount</th>
              <th class="table__th__header">Fut Hedge flag</th>
              <th class="table__th__header">Margin requirements</th>
              <th class="table__th__header">Available funds</th>
              <th class="table__th__header">Funds / Notional</th>
            </tr>
          </thead>
          <tbody class="table__tbody">
            <tr class="table__tbody__tr" v-for="(margin, index) in margins" :key="index">
              <td class="field__descriptions">
                
                  <p v-if="!isEditing">{{ margin.productsName }}</p>
                  <input v-if="isEditing" v-model="margin.productsName">
              </td>
              <td class="field__descriptions">{{ 1 }}</td>
              <td class="field__descriptions">{{ margin.futHedgeFlag }}</td>
              <td class="field__descriptions">{{ margin.marginRequirements }}</td>
              <td class="field__descriptions">{{ margin.availableFunds }}</td>
              <td class="field__descriptions">{{ margin.fundsNotional }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from "@/components/header/forms/v-select";
import { useRouter } from "vue-router";
import { mapGetters, mapActions, mapState, useStore } from "vuex";

export default {
  name: "SiteAdmin",

  components: {
    vSelect,
  },

  data() {
    const router = useRouter();
    const store = useStore();
    return {
      users: [],
      margins: [],
      positions: [],
      active: false,
      activeTab: 1,
      timerId: null,
      isEditing: false,

      loguot: () => {
        store.dispatch("auth/signOut");
        router.push("/Login");
      },
    };
  },

  methods: {
    ...mapActions([
      "getUsers",
      "fetchCleintTableInfoByTab",
      "getTableStaticsics_actions",
    ]),

    async handleUsersSelect(userId) {
      clearInterval(this.timerId)
      this.$store.commit("calculator/setUserSiteAdmin", userId);
      
      this.timerId = setInterval(async () => {
        const marginsResponse = await this.fetchCleintTableInfoByTab({
          userId,
          url: "/admin/margins",
        });
        this.margins = this.convertMargins(marginsResponse)
        this.positions = await this.fetchCleintTableInfoByTab({
          userId,
          url: "/admin/positions",
        });
      }, 1000);
      
    },

    convertPositions () {

    },

    onClickEditButton () {
      this.isEditing = !this.isEditing
      clearInterval(this.timerId)
    },

    convertMargins (response) {
      let convertMargins = []
      const productsName = Object.entries(response['Product name'])
      const marginReq = Object.entries(response['Margin requirements'])
      const lostReq = Object.entries(response['Lots number'])
      const futHedgeFlagReq = Object.entries(response['Fut hedge flag'])
      const fundsNotionalReq = Object.entries(response['Funds/Notional'])
      const availableFunds = Object.entries(response['Available funds'])

      productsName.forEach((item, index) => {
        convertMargins.push({})
        convertMargins[index].productsName = item[1]
      })

      marginReq.forEach((item, index) => {
        convertMargins[index].marginRequirements = item[1]
      })

      lostReq.forEach((item, index) => {
        convertMargins[index].lotsNumber = item[1]
      })

      futHedgeFlagReq.forEach((item, index) => {
        convertMargins[index].futHedgeFlag = item[1]
      })

      fundsNotionalReq.forEach((item, index) => {
        convertMargins[index].fundsNotional = item[1]
      })

      availableFunds.forEach((item, index) => {
        convertMargins[index].availableFunds = item[1]
      })

      // const lotsNumber = this.setupFields(lostReq, 'lostNumbers')
      // console.log('lotsNumber', lotsNumber)
      return convertMargins
    },

    // setupFields(array, fieldType) {
    //   array.forEach((item, index) => {
    //     if (!convertMargins.length) {
    //       convertMargins.push({})
    //     }
    //     console.log('index', index)
    //     console.log('fieldType', fieldType)
    //     console.log('item[1]', item[1])
    //     convertMargins[index][fieldType] = item[1]
    //   })
    //   return convertMargins
    // },

    changeLang(value) {
      console.log("value", value);
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
  },
};
</script>

<style>
/*  TABLE */
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

.table__main {
  color: #ffffff;
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
.tab-content {
  color: #ffffff;
}

.tab-nav {
  display: flex;
  padding-top: 300px;
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
