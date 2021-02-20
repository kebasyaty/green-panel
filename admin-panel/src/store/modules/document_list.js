export default {
  namespaced: true,

  state: {
    documents: [
      { title: 'Название документа 1', hash: 'h1' },
      { title: 'Document name 2', hash: 'h2' },
      { title: 'Document name 3', hash: 'h3' }
    ]
  },

  getters: {},

  mutations: {
    setDocuments(state, payload) {
      state.documents = payload
    }
  },

  actions: {}
}
