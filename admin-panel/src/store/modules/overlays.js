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
      if (payload) {
        commit('setOverlayPageLockout', payload)
      } else {
        setTimeout(() => commit('setOverlayPageLockout', payload), 500)
      }
    }
  }
}
