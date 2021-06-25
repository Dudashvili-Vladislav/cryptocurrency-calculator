import firebase from 'firebase';

function setUserToState(context, responce) {
	const user = {
		email: responce.user.email,
		verified: responce.user.emailVerified,
		id: responce.user.uid
	};

	context.commit('setUser', user);
	window.localStorage.setItem('user', JSON.stringify(user));
}


export default {
  namespaced: true,
  state() {
    return {
      token: null,
    };
  },

  mutations: {
    setUser(state, user) {
			state.user = user;
		},
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("jwt-token", token)
    },
    loguot(state) {
      state.token = null;
      localStorage.removeItem("jwt-token")
    },
  },
  actions: {
    async login(context, payload) {
      const responce = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password);
      setUserToState(context, responce);
    },

    async createUser(context, { email, password }) {
			try {
				const responce = await firebase.auth().createUserWithEmailAndPassword(email, password);
        setUserToState(context, responce);
        
/* 				setUserToState(context, responce); */
			} catch (error) {
				throw error.message;
			}
		},
  },

  getters: {
    token(state) {
      return state.token
    },
    isAuthenticated(_, getters) { // Пропускаем первый и берем 2 параметр 
      return !!getters.user
    },
  },
};
