import Vue from 'vue'
import Vuex from 'vuex'
import auth from "@/store/modules/auth";
import tenants from "@/store/modules/tenants";
import users from "@/store/modules/users";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    tenants,
    users
  }
})
