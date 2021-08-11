<template>
  <div class="home">
    <div class="header-wrapper flex  ">
      <h1 class="logo font-bold text-xl">
        Calculator
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

          <div class="user-info">
            <div class="user-name" v-if="$store.state.auth.user.displayName">
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

      <v-header-forms :active-tab="activeTab" />
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
            >Recommended</a
          >
        </li>

        <li class="tab-nav-item">
          <a
            @click="changeTab(3)"
            class="tab-link"
            :class="{ active: activeTab === 3 }"
            >Custom QA</a
          >
        </li>
      </ul>

      <div class="tab-content">
        <div
          class="tab-item"
          v-if="activeTab === 1 &&$store.state.calculator.selectedUnderlying &&$store.state.calculator.selectedMaturity &&$store.state.calculator.coinAmount"> 
          <v-recommended></v-recommended>
        </div>
        <div class="tab-item" v-if="activeTab === 2">
          <v-customPro></v-customPro>
        </div>
        <div 
        class="tab-item" 
        v-if="activeTab === 3"
        >
          <vCustomQa></vCustomQa>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VRecommended from "@/components/v-recommended.vue";
import VCustomPro from "@/components/v-customPro.vue";
import vCustomQa from "@/components/v-customQA.vue";
import vSelect from "@/components/header/forms/v-select";
import vHeaderForms from "@/components/header/v-header-forms";
import { useRouter } from "vue-router";
import { mapActions, useStore } from "vuex";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    return {
      loguot: () => {
        store.dispatch("auth/signOut");
        router.push("/Login");
      },
    };
  },

  name: "Home",

  components: {
    vSelect,
    vHeaderForms,
    vCustomQa,
    VCustomPro,
    VRecommended,
  },

  data() {
    return {
      active: false,
      activeTab: 1,
    };
  },
  methods: {
    ...mapActions({
      getTableStaticsics_actions: "getTableStaticsics_actions",
    }),

    changeTab(value) {
      this.activeTab = value;
/*      this.$store.commit("calculator/clearForm");   */
    },
    changeLang(value) {
      console.log('value', value)
      this.$root.$i18n.locale = value
      this.$store.commit("calculator/setLang", value);
      this.getTableStaticsics_actions();
    },
  },
};
</script>

<style>
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
  min-width: 120px;
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

.recomended-ul {
  margin-top: 40px;
}

.recomended {
  background: linear-gradient(270deg, #8743ff 0%, #4136f1 100%);
  border-radius: 18px 0px 0px 0px;
  color: white;
  border-color: rgba(0, 0, 0, 0.2);
}

.qustom-qa {
  background: rgba(0, 0, 0, 0.2);
  color: white;
  border-radius: 0px;
  border-color: rgba(0, 0, 0, 0.2);
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

/* Slider */

.vue-slider .vue-slider-rail {
  border-radius: 0;
  background: linear-gradient(270deg, #8743ff 0%, #4136f1 100%);
  height: 2px;
}

.vue-slider .vue-slider-process {
  height: 6px !important;
  background: #fb49c0;
  top: -2px !important;
}

.vue-slider .vue-slider-dot-handle {
  background: linear-gradient(135deg, #fff2fe 0%, #ffbff6 100%);
  box-shadow: 0px 0 0 5px #ffbff657;
}

.vue-slider.blue-slider .vue-slider-process {
  background: linear-gradient(0deg, #31afd6, #31afd6), #fb49c0;
}

/* Slider END */
</style>
