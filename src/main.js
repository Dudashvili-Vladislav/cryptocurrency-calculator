import { createApp } from 'vue'
import App from './App.vue'
import store from './vuex/store'
import './index.css'
import router from './router'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
