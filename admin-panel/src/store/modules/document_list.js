export default {
  namespaced: true,

  state: {
    documents: []
  },

  getters: {},

  mutations: {
    setDocuments(state, payload) {
      state.documents = payload
    }
  },

  actions: {}
}
