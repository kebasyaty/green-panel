export default {
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
  }
}
