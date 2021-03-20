export default {
  namespaced: true,

  state: {
    showMsg: false,
    textMsg: '',
    msgStatus: 'info' // error | info | success | warning
  },

  getters: {},

  mutations: {
    setShowMsg(state, flag) {
      state.showMsg = flag
    },
    setTextMsg(state, text) {
      state.textMsg = text
    },
    setMsgStatus(state, status) {
      state.msgStatus = status
    }
  },

  actions: {
    runShowMsg({ commit }, text) {
      commit('setTextMsg', text)
      commit('setShowMsg', true)
    }
  }
}
