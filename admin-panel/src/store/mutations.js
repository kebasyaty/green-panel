export default {
  setBrand(state, payload) {
    state.brand = payload
  },
  setSlogan(state, payload) {
    state.slogan = payload
  },
  setIsStart(state, payload) {
    state.isStart = payload
  },
  setIsAuthenticated(state, payload) {
    state.isAuthenticated = payload
  },
  setUsername(state, payload) {
    state.username = payload
  },
  setOpenPanelServiceList(state, payload) {
    state.openPanelServiceList = payload
  },
  setPanelWidthServiceList(state, payload) {
    state.panelWidthServiceList = payload
  },
  setSelectedService(state, payload) {
    state.selectedService = payload
  },
  setServiceList(state, payload) {
    state.serviceList = payload
  },
  setConfigEditor(state, payload) {
    state.configEditor = payload
  },
  setShowErrMsg(state, payload) {
    state.showErrMsg = payload
  },
  setTextErrMsg(state, payload) {
    state.textErrMsg = payload
  }
}
