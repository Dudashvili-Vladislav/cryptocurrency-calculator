import axios from "../instance";

export default {
  /*     sendOrder(data) {
        return axios.post("/order/sendOrder", data)
    } */

  sendOrder: {
    get() {
      return axios.get("/order/sendOrder");
    },
    create(client_id, table_json) {
      return axios.post(
        `/order/sendOrder?client_id=${client_id}&table_json=${JSON.stringify(
          table_json
        )}`
      );
    },
  },
};
