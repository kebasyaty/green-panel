import Vue from 'vue'
import router from '@/router'

export default {
  namespaced: true,

  state: {
    documents: [],
    currentPageNumber: 1,
    pageCount: 0,
    searchQuery: null,
    blockPagination: false,
    // block loading of documents
    blockLoadDocs: false
  },

  getters: {},

  mutations: {
    setDocuments(state, payload) {
      state.documents = payload
    },
    setCurrentPageNumber(state, payload) {
      state.currentPageNumber = payload
    },
    setPageCount(state, payload) {
      state.pageCount = payload
    },
    setSearchQuery(state, payload) {
      state.searchQuery = payload
    },
    setBlockPagination(state, payload) {
      state.blockPagination = payload
    },
    setBlockLoadDocs(state, payload) {
      state.blockLoadDocs = payload
    }
  },

  actions: {
    // Get a list of documents.
    ajaxGetDocumentList({ state, commit, rootState }, payload = {}) {
      return new Promise((resolve, reject) => {
        if (!state.blockLoadDocs && rootState.serviceList.length > 0) {
          commit('setBlockLoadDocs', true)
          let collection
          if (Object.keys(payload).length > 0) {
            collection = rootState.serviceList[payload.indexService]
              .collections[payload.indexCollection]
          } else {
            collection = rootState.serviceList[router.currentRoute.params.indexService]
              .collections[router.currentRoute.params.indexCollection]
          }
          Vue.axios.get('/admin/document-list', {
            params: {
              model_key: collection.model_key,
              field_name: collection.doc_name.field,
              page_num: state.currentPageNumber,
              search_query: state.searchQuery || ''
            }
          })
            .then(response => {
              const data = response.data
              if (!data.is_authenticated) {
                commit('setIsAuthenticated', false, { root: true })
              } else if (data.msg_err.length === 0) {
                commit('setPageCount', data.page_count)
                commit('setDocuments', data.documents)
              } else {
                console.log(data.msg_err)
                commit('setTextMsg', data.msg_err)
                commit('setShowMsg', true)
              }
            })
            .catch(error => {
              console.log(error)
            })
            .then(() => {
              commit('setBlockLoadDocs', false)
              resolve()
            })
        }
      })
    },
    // Reset page number to default.
    resetPageNumberDefault({ commit }) {
      commit('setBlockPagination', true)
      commit('setCurrentPageNumber', 1)
      commit('setBlockPagination', false)
    }
  }
}
