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
        setTimeout(() => {
          if (state.overlayPageLockout) {
            commit('setOverlayPageLockout', true)
          }
        }, 1000)
      } else {
        setTimeout(() => commit('setOverlayPageLockout', false), 500)
      }
    }
  }
}
