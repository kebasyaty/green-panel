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

  // Buttons
  setBtnRed(state, payload) {
    state.btnRed.bg = payload.bg;
    state.btnRed.icon = payload.icon;
    state.btnRed.text = payload.text;
  },
  setBtnPink(state, payload) {
    state.btnPink.bg = payload.bg;
    state.btnPink.icon = payload.icon;
    state.btnPink.text = payload.text;
  },
  setBtnPurple(state, payload) {
    state.btnPurple.bg = payload.bg;
    state.btnPurple.icon = payload.icon;
    state.btnPurple.text = payload.text;
  },
  setBtnDeepPurple(state, payload) {
    state.btnDeepPurple.bg = payload.bg;
    state.btnDeepPurple.icon = payload.icon;
    state.btnDeepPurple.text = payload.text;
  },
  setBtnIndigo(state, payload) {
    state.btnIndigo.bg = payload.bg;
    state.btnIndigo.icon = payload.icon;
    state.btnIndigo.text = payload.text;
  },
  setBtnBlue(state, payload) {
    state.btnBlue.bg = payload.bg;
    state.btnBlue.icon = payload.icon;
    state.btnBlue.text = payload.text;
  },
  setBtnLightBlue(state, payload) {
    state.btnLightBlue.bg = payload.bg;
    state.btnLightBlue.icon = payload.icon;
    state.btnLightBlue.text = payload.text;
  },
  setBtnCyan(state, payload) {
    state.btnCyan.bg = payload.bg;
    state.btnCyan.icon = payload.icon;
    state.btnCyan.text = payload.text;
  },
  setBtnTeal(state, payload) {
    state.btnTeal.bg = payload.bg;
    state.btnTeal.icon = payload.icon;
    state.btnTeal.text = payload.text;
  },
  setBtnGreen(state, payload) {
    state.btnGreen.bg = payload.bg;
    state.btnGreen.icon = payload.icon;
    state.btnGreen.text = payload.text;
  },
  setBtnLightGreen(state, payload) {
    state.btnLightGreen.bg = payload.bg;
    state.btnLightGreen.icon = payload.icon;
    state.btnLightGreen.text = payload.text;
  },
  setBtnLime(state, payload) {
    state.btnLime.bg = payload.bg;
    state.btnLime.icon = payload.icon;
    state.btnLime.text = payload.text;
  },
  setBtnYellow(state, payload) {
    state.btnYellow.bg = payload.bg;
    state.btnYellow.icon = payload.icon;
    state.btnYellow.text = payload.text;
  },
  setBtnAmber(state, payload) {
    state.btnAmber.bg = payload.bg;
    state.btnAmber.icon = payload.icon;
    state.btnAmber.text = payload.text;
  },
  setBtnOrange(state, payload) {
    state.btnOrange.bg = payload.bg;
    state.btnOrange.icon = payload.icon;
    state.btnOrange.text = payload.text;
  },
  setBtnDeepOrange(state, payload) {
    state.btnDeepOrange.bg = payload.bg;
    state.btnDeepOrange.icon = payload.icon;
    state.btnDeepOrange.text = payload.text;
  },
  setBtnBrown(state, payload) {
    state.btnBrown.bg = payload.bg;
    state.btnBrown.icon = payload.icon;
    state.btnBrown.text = payload.text;
  },
  setBtnBlueGrey(state, payload) {
    state.btnBlueGrey.bg = payload.bg;
    state.btnBlueGrey.icon = payload.icon;
    state.btnBlueGrey.text = payload.text;
  },
  setBtnGrey(state, payload) {
    state.btnGrey.bg = payload.bg;
    state.btnGrey.icon = payload.icon;
    state.btnGrey.text = payload.text;
  },
};
