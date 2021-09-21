import firebase from "firebase";
import {error} from '@/components/utils/error.js';
import { root } from "postcss";
import { mapMutations, mapGetters, mapActions } from "vuex";
import axios from "axios";
import { useRouter } from "vue-router";



function setUserToState(context, userName) {
  const userFirebase = firebase.auth().currentUser;
  const user = {email: userFirebase.email, uid: userFirebase.uid, displayName: userFirebase.displayName || userName}
  window.localStorage.setItem("user", JSON.stringify(user));
  return userFirebase.uid
}

/* const TOKEN_KEY = "jwt-token"
const USER =  */

export default {
  namespaced: true,
  state() {
    return {
      token: null,
      user: null,
      admin: true,
    };
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
        console.log("CTX",context);
        const response = await axios.post("/auth/getToken", {
          username: "emcd",
          password: "6XeumP6F5J2WMTJ6",
        });
/*         console.log("response", response.data.access_token);
        console.log("login-response.data",response); */
        axios.defaults.headers.common = {
          Authorization: `Bearer ${response.data.access_token}`,
        };
        window.localStorage.setItem("Token",response.data.access_token);


/*         if (this.admin) {
          console.log("fqf");
          this.$router.push({ name: "siteadmin" });
        } else {
          console.log("AAAAAAAAAAAAA");
          this.$router.push({ name: "home" });
        } */

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
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
               
        const userFirebase = firebase.auth().currentUser;
        userFirebase.updateProfile({
          displayName: user
        })

        const uid = setUserToState(context, user);
        await firebase.firestore().collection("users").doc(uid).set({admin: 'client'})


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
        // убрать токен и localStorage
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
