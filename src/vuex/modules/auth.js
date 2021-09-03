import firebase from "firebase";
import {error} from '@/components/utils/error.js';
import { root } from "postcss";
import { mapMutations, mapGetters, mapActions } from "vuex";
import axios from "axios";



function setUserToState(context, userName) {
  const userFirebase = firebase.auth().currentUser;
  const user = {email: userFirebase.email, uid: userFirebase.uid, displayName: userFirebase.displayName || userName}
  console.log('user', user)
  context.commit("setUser", user);
  window.localStorage.setItem("user", JSON.stringify(user));
}

/* const TOKEN_KEY = "jwt-token"
const USER =  */

export default {
  namespaced: true,
  state() {
    return {
      token: null,
      user: null,
    };
  },

  computed: {
    ...mapGetters(["userFirebase"]),
  },
  methods: {
    ...mapMutations([
      "setUser"
    ]),
    ...mapActions([
      "getToken"
    ]),
  },


  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("jwt-token", token);
    },
    loguot(state) {
      state.token = null;
      (state.user = null), localStorage.removeItem(this.token, this.user);
    },
  },
  actions: {
    async login(context, payload) {
      try {
        await firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password);
        setUserToState(context);
        const response = await axios.post("/auth/getToken", {
          username: "emcd",
          password: "6XeumP6F5J2WMTJ6",
        });
        console.log("response", response.data.access_token);
        axios.defaults.headers.common = {
          Authorization: `Bearer ${response.data.access_token}`,
        };
        window.localStorage.setItem("Token",response.data.access_token);
      
      } catch (e) {
        context.dispatch('setMessage',{
          value: e.message,
          type: 'danger'
        }, {root: true})
        console.log("E",e);
        return e.message
      }
    },

    async createUser(context, { email, password, user}) {
      try {
        console.log('user', user)
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        
        const userFirebase = firebase.auth().currentUser;
        userFirebase.updateProfile({
          displayName: user
        })

        setUserToState(context, user);

        /* 				setUserToState(context, responce); */
      } catch (error) {
        console.log('error', error)
        throw error.message;
      }
    },

    async signOut(context) {
      try {
        await firebase.auth().signOut();
        context.commit("setUser", null);
        localStorage.removeItem("user");
      } catch (error) {
        throw error.message;
      }
    },
  },

  getters: {
    token(state) {
      return state.token;
    },
    isAuthenticated(_, getters) {
      // Пропускаем первый и берем 2 параметр
      return !!getters.user;
    },
  },
};
