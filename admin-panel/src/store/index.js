import Vue from 'vue'
import Vuex from 'vuex'
import mutations from '@/store/mutations.js'
import actions from '@/store/actions.js'
import documentList from '@/store/modules/document_list.js'
import popUpMsgs from '@/store/modules/pop_up_msgs.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    brand: '',
    slogan: '',
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
    serviceList: []
  },

  mutations,
  actions,
  modules: {
    documentList,
    popUpMsgs
  }
})
