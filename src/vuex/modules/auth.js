import firebase from "firebase";
import {error} from '@/components/utils/error.js';
import {root} from "postcss";
import {mapMutations, mapGetters, mapActions} from "vuex";
import axios from "axios";
import {useRouter} from "vue-router";
import $api from '../../api/requests/index.js'
import router from '../../router'


function setUserToState(context, userName) {
    const userFirebase = firebase.auth().currentUser;
    const user = {email: userFirebase.email, uid: userFirebase.uid, displayName: userFirebase.displayName || userName}
    window.localStorage.setItem("user", JSON.stringify(user));
    context.commit('setUser', user)
    return userFirebase.uid
}

/* const TOKEN_KEY = "jwt-token"
const USER =  */

export default {
    namespaced: true,
    state() {
        return {
            auth_checked: false, // Обозначает что авторизация проверена
            token: null,
            token_timestamp: null,
            username: null,
            password: null,
            user: null,
            admin: false,
        };
    },

    mutations: {
      setAdmin (state, value) {
        state.admin = value
        console.log("setAdmin value",value);
      },  
        setUser(state, user) {
            state.user = user;
        },
        setSession(state, { token = null, username, password }) {
            console.log('njk', { token, username, password })
            state.token = token
            if (token !== null) {
                let timestamp = (new Date()).getTime()
                localStorage.setItem('token', token)
                localStorage.setItem('token_timestamp',  timestamp)
                localStorage.setItem('username',  username)
                localStorage.setItem('password',  password)
                state.token = token
                state.token_timestamp = timestamp
                state.username = username
                state.password = password
            } else {
                localStorage.removeItem('token')
                localStorage.removeItem('token_timestamp')
                state.token = null
                state.token_timestamp = null
                state.username = null
                state.password = null
            }
            state.auth_checked = true
        },
        setToken(state, token) {
            state.token = token;
            localStorage.setItem( "jwt-token" , token );
        },
        loguot(state) {
            state.token = null;
            //(state.user = null), localStorage.removeItem(this.token, this.user);
        },
    },
    actions: {
        async checkAuth({ commit }) {
            try {
                let cache_token = localStorage.getItem('token')
                let cache_token_time = localStorage.getItem('token_timestamp')
                let username = localStorage.getItem('username')
                let password = localStorage.getItem('password')
                // гетаем кэш токена, время получения токена, пароль и логин
                let timestamp = new Date().getTime()
                // получем таймстамп текущего времени

                if (cache_token !== null) {
                    if (timestamp - cache_token_time >= (1000 * 60 * 30)) { // Если токен в кеше старше 30 минут, получаем новый
                        cache_token = await $api.auth.getToken(username, password)
                        cache_token = cache_token.data.access_token
                    }

                    commit('setSession', { token: cache_token, username, password })
                } else {
                    throw({ status: 401 })
                }
            } catch(err) {
                if (err.status === 401) {
                    router.push('/login')
                }
                commit('setSession', { token: null }) // убираем токен
                throw(err)
            }
        },

        async initTokenRefresher({ commit, state }) {
            setInterval(async () => {
                console.log('REFRESH TOKEN')
                try {
                    let token = await $api.auth.getToken(state.username, state.password)
                    token = token.data.access_token

                    commit('setSession', { token, username: state.username, password: state.password })
                } catch (err) {
                    console.log(err)
                }
            }, 1000 * 60 * 25) // каждые 25 минут
        },

        async login(context, { username, password }) {
            try {
                await firebase.auth().signInWithEmailAndPassword(username, password);
                setUserToState(context);

                let res = await $api.auth.getToken("emcd", "6XeumP6F5J2WMTJ6")
                let token = res.data.access_token

                context.commit('setSession', { token, username: "emcd", password: "6XeumP6F5J2WMTJ6" })

                const userFirebase = await firebase.auth().currentUser;
                const user = {email: userFirebase.email, uid: userFirebase.uid, displayName: userFirebase.displayName}
                context.commit('setUser', user, { root: true })

                context.dispatch('initTokenRefresher')

                if (username === 'admin@adm.com') {
                    await router.push({ name: 'siteadmin' })
                    localStorage.setItem('admin', true);
                    context.commit('setAdmin', true)
                } else {
                    await router.push({ name: "home" });
                }
            } catch (err) {
                context.commit('setSession', { token: null })
                context.dispatch('setMessage', {
                    value: err.message,
                    type: 'danger'
                }, {root: true })
                throw(err)
            }
        },

        async oldLogin(context, payload) {
            try {
                await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password);
                setUserToState(context);
                console.log("CTX", context);
                const response = await axios.post("/auth/getToken", {
                    username: "emcd",
                    password: "6XeumP6F5J2WMTJ6",
                });
                /*         console.log("response", response.data.access_token);
                        console.log("login-response.data",response); */
                axios.defaults.headers.common = {
                    Authorization: `Bearer ${response.data.access_token}`,
                };
                window.localStorage.setItem("Token", response.data.access_token);


                /*         if (this.admin) {
                          console.log("fqf");
                          this.$router.push({ name: "siteadmin" });
                        } else {
                          console.log("AAAAAAAAAAAAA");
                          this.$router.push({ name: "home" });
                        } */

            } catch (e) {
                context.dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
                console.log("E", e);
                return e.message
            }
        },

        async createUser(context, {email, password, user}) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password);

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

        async signOut({ commit }) {
            try {
                await firebase.auth().signOut();
                commit("setUser", null);
                commit('setSession', { token: null })
                commit('setAdmin', false);
                localStorage.removeItem("admin");
                localStorage.removeItem("user");
                // убрать токен и localStorage
                router.push("/login")
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
