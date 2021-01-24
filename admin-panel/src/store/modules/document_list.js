export default {
  namespaced: true,

  state: {
    headers: [{ title: 'Title' }, { nickname: 'Nickname' }],
    documents: [
      { hash: 'h1', title: 'Document name 1', nickname: 'rust' }
    ]
  },

  getters: {},

  mutations: {
    setHeaders(state, payload) {
      state.headers = payload
    },
    setDocuments(state, payload) {
      state.documents = payload
    }
  },

  actions: {}
}
