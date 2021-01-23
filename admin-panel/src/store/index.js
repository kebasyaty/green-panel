import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentSelectedService: {}
  },
  mutations: {
    setCurrentSelectedService(state, payload) {
      state.currentSelectedService = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
