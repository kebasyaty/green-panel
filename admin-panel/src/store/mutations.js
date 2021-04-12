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
    if (payload instanceof Object && Object.keys(payload).length > 0) {
      state.configEditor = payload
    } else {
      state.configCKEditor = {
        toolbar: {
          items: [
            'heading', '|',
            'textPartLanguage', '|',
            'alignment', '|',
            'bold', 'italic', 'underline', 'strikethrough', '|',
            'subscript', 'superscript', '|',
            'fontColor', 'fontBackgroundColor', 'fontFamily', 'fontsize', '|',
            'bulletedList', 'numberedList', 'todoList', '|',
            '-',
            'outdent', 'indent', '|',
            'blockQuote', 'highlight', '|',
            'pageBreak', 'removeFormat', 'selectAll', '|',
            'link', 'specialCharacters', 'insertTable', 'mediaEmbed',
            'horizontalLine', 'code', 'codeBlock', '|',
            'undo',
            'redo'
          ],
          shouldNotGroupWhenFull: true
        },
        table: {
          contentToolbar: [
            'tableColumn', 'tableRow', 'mergeTableCells',
            'tableProperties', 'tableCellProperties'
          ],
          tableProperties: {},
          tableCellProperties: {}
        }
      }
    }
  },
  setShowErrMsg(state, payload) {
    state.showErrMsg = payload
  },
  setTextErrMsg(state, payload) {
    state.textErrMsg = payload
  }
}
