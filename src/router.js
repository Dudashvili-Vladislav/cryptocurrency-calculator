import { createRouter, createWebHistory } from 'vue-router'
import vRecommended from "./components/v-recommended";
import vCustomQA from './components/v-customQA';
import vCustomPro from './components/v-customPro';



 export default createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/recommended', component: vRecommended, alias: '/' },
        {path: '/CustomPro', component: vCustomPro },
        {path: '/CustomQA', component: vCustomQA },
    ]
})