export default {
  namespaced: true,

  state: {
    overlayPageLockout: false
  },

  getters: {},

  mutations: {
    setOverlayPageLockout(state, flag) {
      state.overlayPageLockout = flag
    }
  },

  actions: {
    runShowOverlayPageLockout({ commit }, payload) {
      commit('setOverlayPageLockout', payload)
    }
  }
}
