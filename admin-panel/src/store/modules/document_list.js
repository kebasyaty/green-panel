export default {
  namespaced: true,

  state: {
    headerList: [{ title: 'Title' }, { nickname: 'Nickname' }],
    documentList: [
      { hash: 'h1', title: 'Document name 1', nickname: 'rust' }
    ]
  },

  getters: {},

  mutations: {
    setHeaderList(state, payload) {
      state.headerList = payload
    },
    setDocumentList(state, payload) {
      state.documentList = payload
    }
  },

  actions: {}
}
