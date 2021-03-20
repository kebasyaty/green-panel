export default {
  namespaced: true,

  state: {
    showMsg: false,
    textMsg: ''
  },

  getters: {},

  mutations: {
    setShowMsg(state, flag) {
      state.showMsg = flag
    },
    setTextMsg(state, text) {
      state.textMsg = text
    }
  },

  actions: {
    runShowMsg({ state, commit }, text) {
      commit('setTextMsg', text)
      commit('setShowMsg', true)
    }
  }
}
