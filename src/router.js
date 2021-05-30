import { createRouter, createWebHashHistory } from 'vue-router'
import vRecommended from "./components/v-recommended";
import vCustomQA from './components/v-customQA';
import vCustomPro from './components/v-customPro';


const recommended = { template: '<div>vRecommended</div>'}
const customQA = { template: '<div>vCustomQA</div>'}
const customPro = { template: '<div>vCustomPro</div>'}


const routes = [
    {path: '/', component: vRecommended },
    {path: '/CustomQA', component: vCustomQA },
    {path: '/CustomPro', component: vCustomPro },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes,
})



/* export default createRouter({
    routes: [
        {path: '/v-recommended', component: vRecommended }
    ]
}) */