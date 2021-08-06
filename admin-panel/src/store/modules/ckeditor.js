import classicCKEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
// Plugins
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline'
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough'
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript'
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript'
import Link from '@ckeditor/ckeditor5-link/src/link'
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat'
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote'
import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import List from '@ckeditor/ckeditor5-list/src/list'
import TodoList from '@ckeditor/ckeditor5-list/src/todolist'
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'
import Font from '@ckeditor/ckeditor5-font/src/font'
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight'
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline'
import Indent from '@ckeditor/ckeditor5-indent/src/indent'
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock'
import TextPartLanguage from '@ckeditor/ckeditor5-language/src/textpartlanguage'
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed'
import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak'
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat'
import SelectAll from '@ckeditor/ckeditor5-select-all/src/selectall'
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters'
import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials'
import Table from '@ckeditor/ckeditor5-table/src/table'
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar'
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties'
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties'
import WordCount from '@ckeditor/ckeditor5-word-count/src/wordcount'
import Code from '@ckeditor/ckeditor5-basic-styles/src/code'
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock'
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice'
import Clipboard from '@ckeditor/ckeditor5-clipboard/src/clipboard'
import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting'

// Custom settings
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
    label: 'White',
    hasBorder: true
  }
]

export default {
  namespaced: true,

  state: {
    classicCKEditor,
    configCKEditor: {
      language: 'en',
      plugins: [
        Essentials,
        Bold,
        Italic,
        Underline,
        Strikethrough,
        Subscript,
        Superscript,
        Link,
        Paragraph,
        Autoformat,
        BlockQuote,
        Heading,
        List,
        TodoList,
        Alignment,
        Font,
        Highlight,
        HorizontalLine,
        Indent,
        IndentBlock,
        TextPartLanguage,
        MediaEmbed,
        PageBreak,
        RemoveFormat,
        SelectAll,
        SpecialCharacters,
        SpecialCharactersEssentials,
        Table,
        TableToolbar,
        TableProperties,
        TableCellProperties,
        WordCount,
        Code,
        CodeBlock,
        PasteFromOffice,
        Clipboard,
        SourceEditing
      ],
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
          'undo', 'redo', '|',
          'sourceEditing'
        ],
        shouldNotGroupWhenFull: true
      },
      table: {
        contentToolbar: [
          'tableColumn', 'tableRow', 'mergeTableCells',
          'tableProperties', 'tableCellProperties'
        ]
      },
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
  },

  getters: {},

  mutations: {
    setLanguageCKEditor(state, languageCode) {
      state.configCKEditor.language = languageCode
    }
  },

  actions: {}
}
