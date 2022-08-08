export default {
  namespaced: true,

  state: {
    overlayPageLockout: false,
    breaker: false,
  },

  getters: {},

  mutations: {
    setOverlayPageLockout(state, flag) {
      state.overlayPageLockout = flag;
    },
    setBreaker(state, flag) {
      state.breaker = flag;
    },
  },

  actions: {
    runShowOverlayPageLockout({ state, commit }, payload) {
      if (payload) {
        commit("setBreaker", true);
        setTimeout(() => {
          if (state.breaker) {
            commit("setOverlayPageLockout", true);
          }
        }, 1000);
      } else {
        commit("setBreaker", false);
        if (state.overlayPageLockout) {
          setTimeout(() => commit("setOverlayPageLockout", false), 400);
        }
      }
    },
  },
};
