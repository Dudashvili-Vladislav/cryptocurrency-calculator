import axios from '../instance'

export default {
    margins: {
        get() {
            return axios.get('/admin/margins')
        },
        create(client_id, table_json) {
            return axios.post(`/admin/margins?client_id=${ client_id }&table_json=${ JSON.stringify( table_json ) }`)
        }
    },

    positions: {
        get() {
            return axios.get('/admin/positions')
        },
        create(client_id, table_json) {
            return axios.post(`/admin/positions?client_id=${ client_id }&table_json=${ JSON.stringify( table_json ) }`)
        }
    },

}
