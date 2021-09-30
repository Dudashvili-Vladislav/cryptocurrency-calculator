import axios from '../instance'

export default {
    sendOrder(data) {
        return axios.post("/order/sendOrder", data)
    }
}
