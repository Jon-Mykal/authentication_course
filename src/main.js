import axios from 'axios'
// import { response } from 'express'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { authComputed } from './vuex/helper'
import store from './vuex/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created() {
    if (this.isLoggedIn) {
      this.$store.dispatch("persistLogin");
    }

    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          this.$store.dispatch('logout');
        }
        return Promise.reject(error);
      }
    )
  },
  computed: {...authComputed},
  render: h => h(App)
}).$mount('#app')
