import { createRouter, createWebHistory } from 'vue-router'
import vRecommended from "./components/v-recommended";
import vCustomQA from './components/v-customQA';
import vCustomPro from './components/v-customPro';


/* const recommended = { template: '<div>vRecommended</div>'}
const customQA = { template: '<div>vCustomQA</div>'}
const customPro = { template: '<div>vCustomPro</div>'}


const routes = [
    {path: '/recommended', component: vRecommended },
    {path: '/CustomQA', component: vCustomQA },
    {path: '/CustomPro', component: vCustomPro },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
 */


 export default createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/recommended', component: vRecommended, alias: '/' },
        {path: '/CustomPro', component: vCustomPro },
        {path: '/CustomQA', component: vCustomQA },
    ]
})