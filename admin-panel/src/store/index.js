import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentActivatedService: {}
  },
  mutations: {
    setCurrentActivatedService(state, payload) {
      state.currentActivatedService = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
