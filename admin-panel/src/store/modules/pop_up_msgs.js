export default {
  namespaced: true,

  state: {
    showMsg: false,
    textMsg: ''
  },

  getters: {},

  mutations: {
    setShowMsg(state, payload) {
      state.showMsg = payload
    },
    setTextMsg(state, payload) {
      state.textMsg = payload
    }
  },

  actions: {
    //
  }
}
