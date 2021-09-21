import axios from '../instance'

export default {
    getToken(username, password) {
        return axios.post("/auth/getToken", { username, password });
    },
    resetToken(username, password) {

    }
}
