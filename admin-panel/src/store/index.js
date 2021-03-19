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
    username: '..',
    // Open and close service list panel (navigation-drawer).
    openPanelServiceList: null,
    // Panel width for list of services (Drawer).
    panelWidthServiceList: 360,
    // The current service in which the collection is selected.
    selectedService: [],
    // List of services (sub-applications) with nested list of collections.
    serviceList: [],
    // Pop-up error message.
    showErrMsg: false,
    textErrMsg: ''
  },

  mutations,
  actions,
  modules: {
    documentList
  }
})
