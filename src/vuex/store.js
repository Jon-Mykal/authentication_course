import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
    },
    LOGOUT() {
      localStorage.removeItem('user');
      // Not the most ideal since we need to persist login on refresh.
      // Found a solution that makes this possible.
      location.reload();
    }
  },
  actions: {
    register ({ commit }, credentials) {
      return axios
        .post('//localhost:3000/register', credentials)
        .then(({ data }) => {
          console.log('user data is', data)
          commit('SET_USER_DATA', data)
        });
     },
     login ({ commit }, credentials) {
      return axios
        .post('//localhost:3000/login', credentials)
        .then(({ data }) => {
          commit('SET_USER_DATA', data)
        })
    },
    logout ({ commit }) {
      commit('LOGOUT');
    },
    persistLogin({ commit, getters }) {
      if (getters.isLoggedIn) {
        const userData = JSON.parse(localStorage.getItem('user'));
        commit('SET_USER_DATA', userData);
      }
    }
  },
  getters: {
    loggedIn(state) {
      return !!state.user;
    },
    isLoggedIn() {
      const userString = localStorage.getItem('user');
      if (userString) {
        return true;
      }
      return false;
    }
  }
})
