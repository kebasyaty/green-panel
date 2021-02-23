import Vue from 'vue'
import router from '@/router'

export default {
  namespaced: true,

  state: {
    documents: [],
    currentPageNumber: 1,
    searchQuery: null,
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
    setSearchQuery(state, payload) {
      state.searchQuery = payload
    },
    setBlockLoadDocs(state, payload) {
      state.blockLoadDocs = payload
    }
  },

  actions: {
    // Get a list of documents.
    ajaxGetDocumentList({ state, commit, rootState }, payload = {}) {
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
            page_num: state.currentPageNumber
          }
        })
          .then(response => {
            const data = response.data
            if (data.documents.length > 0) {
              commit('setDocuments', data.documents)
            } else {
              console.log('No data available')
            }
          })
          .catch(error => {
            console.log(error)
          })
          .then(() => {
            commit('setBlockLoadDocs', false)
          })
      }
    }
  }
}
