import Vue from 'vue'
import Vuex from 'vuex'
import mutations from '@/store/mutations'
import actions from '@/store/actions'
import documentList from '@/store/modules/document_list'
import popUpMsgs from '@/store/modules/pop_up_msgs'
import overlays from '@/store/modules/overlays'

Vue.use(Vuex)

const customColorPalette = [
  {
    color: '#F44336',
    label: 'Red'
  },
  {
    color: '#E91E63',
    label: 'Pink'
  },
  {
    color: '#9C27B0',
    label: 'Purple'
  },
  {
    color: '#673AB7',
    label: 'Deep Purple'
  },
  {
    color: '#3F51B5',
    label: 'Indigo'
  },
  {
    color: '#2196F3',
    label: 'Blue'
  },
  {
    color: '#03A9F4',
    label: 'Light Blue'
  },
  {
    color: '#00BCD4',
    label: 'Cyan'
  },
  {
    color: '#009688',
    label: 'Teal'
  },
  {
    color: '#4CAF50',
    label: 'Green'
  },
  {
    color: '#8BC34A',
    label: 'Light Green'
  },
  {
    color: '#CDDC39',
    label: 'Lime'
  },
  {
    color: '#FFEB3B',
    label: 'Yellow'
  },
  {
    color: '#FFC107',
    label: 'Amber'
  },
  {
    color: '#FF9800',
    label: 'Orange'
  },
  {
    color: '#FF5722',
    label: 'Deep Orange'
  },
  {
    color: '#795548',
    label: 'Brown'
  },
  {
    color: '#607D8B',
    label: 'Blue Grey'
  },
  {
    color: '#000000',
    label: 'Black'
  },
  {
    color: '#424242',
    label: 'Dim Grey'
  },
  {
    color: '#9E9E9E',
    label: 'Grey'
  },
  {
    color: '#E0E0E0',
    label: 'Light Grey'
  },
  {
    color: '#FFFFFF',
    label: 'White'
  }
]

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
      toolbar: {
        items: [
          'heading', '|',
          'textPartLanguage', '|',
          'alignment', '|',
          'bold', 'italic', 'underline', 'strikethrough', '|',
          'subscript', 'superscript', '|',
          'fontColor', 'fontBackgroundColor', 'fontFamily', 'fontsize', '|',
          'bulletedList', 'numberedList', 'todoList', '|',
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
        tableProperties: {
          borderColors: customColorPalette,
          backgroundColors: customColorPalette
        },
        tableCellProperties: {
          borderColors: customColorPalette,
          backgroundColors: customColorPalette
        }
      },
      fontColor: {
        colors: customColorPalette
      },
      fontBackgroundColor: {
        colors: customColorPalette
      }
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
