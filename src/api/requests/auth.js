import axios from '../instance'


export default {
    getToken(username, password) {
        return axios.post(`http://213.79.122.13:50805/auth/getToken?username=${ username }&password=${ password }`);
    },
    resetToken(username, password) {

    }
}
