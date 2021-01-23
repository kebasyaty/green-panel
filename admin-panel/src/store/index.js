import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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

  mutations: {
    setSelectedService(state, payload) {
      state.selectedService = payload
    },
    setServiceList(state, payload) {
      state.serviceList = payload
    }
  },

  actions: {
  },

  modules: {
  }
})
