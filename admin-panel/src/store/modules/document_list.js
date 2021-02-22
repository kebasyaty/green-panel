import Vue from 'vue'
import router from '@/router'

export default {
  namespaced: true,

  state: {
    documents: [],
    // block loading of documents
    blockLoadDocs: false
  },

  getters: {},

  mutations: {
    setDocuments(state, payload) {
      state.documents = payload
    },
    setBlockLoadDocs(state, payload) {
      state.blockLoadDocs = payload
    }
  },

  actions: {
    // Get a list of documents.
    async ajaxGetDocumentList({ state, commit, rootState }) {
      if (!state.blockLoadDocs && rootState.serviceList.length > 0) {
        commit('setBlockLoadDocs', true)
        const collection = rootState.serviceList[router.currentRoute.params.indexService]
          .collections[router.currentRoute.params.indexCollection]
        const payload = {
          params: {
            model_key: collection.model_key,
            field_name: collection.doc_name.field
          }
        }
        Vue.axios.get('/admin/document-list', payload)
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
