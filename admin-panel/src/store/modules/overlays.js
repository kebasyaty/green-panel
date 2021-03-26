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
        setTimeout(() => commit('setOverlayPageLockout', payload), 1000)
      } else {
        commit('setOverlayPageLockout', payload)
      }
    }
  }
}
