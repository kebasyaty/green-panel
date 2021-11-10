export default {
  setLogo(state, payload) {
    state.logo = payload;
  },
  setBrand(state, payload) {
    state.brand = payload;
  },
  setSlogan(state, payload) {
    state.slogan = payload;
  },
  setIsStart(state, payload) {
    state.isStart = payload;
  },
  setUsername(state, payload) {
    state.username = payload;
  },
  setIsAuthenticated(state, payload) {
    state.isAuthenticated = payload;
  },
  setSiteKey(state, payload) {
    state.siteKey = payload;
  },
  setOpenPanelServiceList(state, payload) {
    state.openPanelServiceList = payload;
  },
  setPanelWidthServiceList(state, payload) {
    state.panelWidthServiceList = payload;
  },
  setSelectedService(state, payload) {
    state.selectedService = payload;
  },
  setServiceList(state, payload) {
    state.serviceList = payload;
  },
  setShowErrMsg(state, payload) {
    state.showErrMsg = payload;
  },
  setTextErrMsg(state, payload) {
    state.textErrMsg = payload;
  },
  setBtnBgColor(state, color) {
    state.btnBgColor = color;
  },
};
