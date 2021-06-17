import { createApp } from "vue";
import App from "./App.vue";
import store from "./vuex/store";
import "./index.css";
import router from "./router";
import Vue from "vue";
import Axios from "axios";



const token = localStorage.getItem("token");
if (token) {
Axios.defaults.headers.common["Authorization"] = token;
}

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
