import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import group from './group'
import filter from './filter'
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
    info,
    group,
    filter
  }
})
