import axios from "../instance";

export default {
  margins: {
    get() {
      return axios.get("/admin/margins");
    },
    create(client_id, table_json) {
      return axios.post(
        `/admin/margins?client_id=${client_id}&table_json=${JSON.stringify(
          table_json
        )}`
      );
    },
  },

  positions: {
    get() {
      return axios.get("/admin/positions");
    },
    create(client_id, table_json) {
      return axios.post(
        `/admin/positions?client_id=${client_id}&table_json=${JSON.stringify(
          table_json
        )}`
      );
    },
  },

  deals: {
    get() {
      return axios.get("/admin/deals");
    },
    create(client_id, table_json) {
      return axios.post(
        `/admin/deals?client_id=${client_id}&table_json=${table_json}`
      );
      // return axios.post(
      //   `/admin/deals`, client_id);
    },
  },

  orders: {
    get() {
      return axios.get("/admin/orders");
    },
    create(client_id, table_json) {
      return axios.post(
        `/admin/orders?client_id=${client_id}&table_json=${JSON.stringify(
          table_json
        )}`
      );
    },
  },

  funds: {
    get() {
      return axios.get("/admin/funds");
    },
    create(client_id, table_json) {
      return axios.post(
        `/admin/funds?client_id=${client_id}&table_json=${JSON.stringify(
          table_json
        )}`
      );
    },
  },
};
