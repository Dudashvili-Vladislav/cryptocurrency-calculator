import axios from 'axios'
import store from "../vuex/store";
import router from "../router";

axios.interceptors.request.use(function (config) {
    let token = localStorage.getItem('token')

    config.headers['Authorization'] = `Bearer ${ token }`

    return config
})

axios.interceptors.response.use(
    function (response) {
        console.log('response', response)
        return response
    },
    function (error) {
        //console.log(error)
        // console.log('error.response.status', error.response.status)
        if (error.response.status === 401) {
            store.dispatch('auth/signOut')
        }
        return error
    }
);

export default axios
