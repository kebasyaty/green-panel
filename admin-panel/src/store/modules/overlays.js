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
    runShowOverlayPageLockout({ state, commit }, payload) {
      if (payload) {
        commit('setOverlayPageLockout', true)
      } else {
        if (state.overlayPageLockout) {
          setTimeout(() => commit('setOverlayPageLockout', false), 500)
        }
      }
    }
  }
}
