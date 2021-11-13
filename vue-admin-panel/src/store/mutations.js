export default {
  // Company Attributes
  setLogo(state, payload) {
    state.logo = payload;
  },
  setBrand(state, payload) {
    state.brand = payload;
  },
  setSlogan(state, payload) {
    state.slogan = payload;
  },

  // Access
  setIsStart(state, payload) {
    state.isStart = payload;
  },
  setUsername(state, payload) {
    state.username = payload;
  },
  setIsAuthenticated(state, payload) {
    state.isAuthenticated = payload;
  },

  // reCaptcha v3
  setSiteKey(state, payload) {
    state.siteKey = payload;
  },

  // Service list
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
};
