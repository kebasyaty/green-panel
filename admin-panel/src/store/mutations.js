export default {
  setIsStart(state, payload) {
    state.isStart = payload
  },
  setIsAuthenticated(state, payload) {
    state.isAuthenticated = payload
  },
  setSelectedService(state, payload) {
    state.selectedService = payload
  },
  setServiceList(state, payload) {
    state.serviceList = payload
  }
}
