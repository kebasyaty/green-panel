import Vue from 'vue'
import Vuex from 'vuex'
import mutations from '@/store/mutations'
import actions from '@/store/actions'
import documentList from '@/store/modules/document_list'
import popUpMsgs from '@/store/modules/pop_up_msgs'
import overlays from '@/store/modules/overlays'

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
    // Hint: For menu admin panel.
    serviceList: [],
    // CKeditor configuration.
    configCKEditor: {
      language: 'en',
      toolbar: [
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
      table: {
        contentToolbar: [
          'tableColumn', 'tableRow', 'mergeTableCells',
          'tableProperties', 'tableCellProperties'
        ],
        tableProperties: {},
        tableCellProperties: {}
      },
      shouldNotGroupWhenFull: true
    }
  },

  mutations,
  actions,
  modules: {
    documentList,
    popUpMsgs,
    overlays
  }
})
