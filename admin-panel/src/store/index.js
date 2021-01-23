import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Information about the currently actived service.
    currentActivedService: {}
  },
  mutations: {
    // Update information about the currently actived service.
    setCurrentActivedService(state, payload) {
      state.currentActivedService = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
