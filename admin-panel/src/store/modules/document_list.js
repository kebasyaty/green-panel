export default {
  namespaced: true,

  state: {
    documents: [
      { hash: 'h1', title: 'Название документа 1', nickname: 'rust' },
      { hash: 'h2', title: 'Document name 2', nickname: 'rust2' },
      { hash: 'h3', title: 'Document name 3', nickname: 'rust3' }
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
