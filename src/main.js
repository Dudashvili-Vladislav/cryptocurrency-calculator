import { createApp } from "vue";
import App from "./App.vue";
import store from "./vuex/store";
import "./index.css";
import router from "./router";
import Vue from "vue";
import axios from "axios";
import firebase from 'firebase/app';
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import VueApexCharts from "vue3-apexcharts";
import { createI18n } from 'vue-i18n'
import messages from "@/locale/index";

const i18n = createI18n({
  locale: 'ru',
  fallbackLocale: 'en',
  messages
})

// 3. Берешь token из localstorage и добавляешьв axios headers <- write code
let Token =  localStorage.getItem("Token")

axios.defaults.headers.common = {
  Authorization: `Bearer ${Token}`,
};
//config

var firebaseConfig = {
    apiKey: "AIzaSyBDWqkueISEyxBMWHQCoYc8HfqN7SHzt7I",
    authDomain: "cryptocalculator-26418.firebaseapp.com",
    databaseURL: "https://cryptocalculator-26418-default-rtdb.firebaseio.com",
    projectId: "cryptocalculator-26418",
    storageBucket: "cryptocalculator-26418.appspot.com",
    messagingSenderId: "430140431415",
    appId: "1:430140431415:web:19e379138530863ebc33b2"
  };
firebase.initializeApp(firebaseConfig);

function getCurrentUser() {
  const localUserString = window.localStorage.getItem('user') || null;
  return JSON.parse(localUserString);
}

if (window.localStorage) {
  const currenttUser = getCurrentUser();

  if (currenttUser && store.state.auth.user !== currenttUser) {
    store.commit('auth/setUser', currenttUser);
  }
}

const app = createApp(App);


app.use(VueApexCharts);
app.use(router);
app.use(store);
app.use(i18n)
app.mount("#app");
