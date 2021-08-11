import firebase from "firebase";
import {error} from '@/components/utils/error.js';
import { root } from "postcss";
import { mapMutations, mapGetters, } from "vuex";

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
        const responce = await firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password);
      setUserToState(context);
      
      } catch (e) {
        context.dispatch('setMessage',{
          value: e.message,
          type: 'danger'
        }, {root: true})
        return e.message
      }
    },

    async createUser(context, { email, password, user}) {
      try {
        console.log('user', user)
        const responce = await firebase
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
