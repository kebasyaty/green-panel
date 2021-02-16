import Vue from 'vue'
import Vuex from 'vuex'
import mutations from '@/store/mutations.js'
import actions from '@/store/actions.js'
import documentList from '@/store/modules/document_list.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isStart: true,
    isAuthenticated: false,
    username: '...',
    // Open and close service list panel (navigation-drawer).
    openPanelServiceList: null,
    // Panel width for list of services (Drawer).
    panelWidthServiceList: 360,
    // List of services (applications) with nested list of collections.
    selectedService: [undefined, undefined, undefined],
    serviceList: [
      {
        service: { title: 'Название сервиса 1', icon: 'laptop' },
        collections: [
          { title: 'Название коллекции 1.1', model_key: '1' },
          { title: 'Collection name 1.2', model_key: '2' },
          { title: 'Collection name 1.3', model_key: '3' }
        ]
      },
      {
        service: { title: 'Service name 2', icon: 'cellphone' },
        collections: [
          { title: 'Collection name 2.1', model_key: '4' },
          { title: 'Collection name 2.2', model_key: '5' },
          { title: 'Collection name 2.3', model_key: '6' }
        ]
      },
      {
        service: { title: 'Service name 3', icon: 'wifi' },
        collections: [
          { title: 'Collection name 3.1', model_key: '7' },
          { title: 'Collection name 3.2', model_key: '8' },
          { title: 'Collection name 3.3', model_key: '9' }
        ]
      }
    ]
  },

  mutations,
  actions,
  modules: {
    documentList
  }
})
