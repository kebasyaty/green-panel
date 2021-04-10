// CKEditor 5
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
// Plugins
import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials'
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold'
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic'
import LinkPlugin from '@ckeditor/ckeditor5-link/src/link'
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import AutoformatPlugin from '@ckeditor/ckeditor5-autoformat/src/autoformat'
import BlockQuotePlugin from '@ckeditor/ckeditor5-block-quote/src/blockquote'
import HeadingPlugin from '@ckeditor/ckeditor5-heading/src/heading'
import ListPlugin from '@ckeditor/ckeditor5-list/src/list'
import TodoListPlugin from '@ckeditor/ckeditor5-list/src/todolist'
import AlignmentPlugin from '@ckeditor/ckeditor5-alignment/src/alignment'
import FontPlugin from '@ckeditor/ckeditor5-font/src/font'
import HighlightPlugin from '@ckeditor/ckeditor5-highlight/src/highlight'
import HorizontalLinePlugin from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline'
import IndentPlugin from '@ckeditor/ckeditor5-indent/src/indent'
import IndentBlockPlugin from '@ckeditor/ckeditor5-indent/src/indentblock'
import TextPartLanguagePlugin from '@ckeditor/ckeditor5-language/src/textpartlanguage'
import MediaEmbedPlugin from '@ckeditor/ckeditor5-media-embed/src/mediaembed'
import PageBreakPlugin from '@ckeditor/ckeditor5-page-break/src/pagebreak'
import RemoveFormatPlugin from '@ckeditor/ckeditor5-remove-format/src/removeformat'
import SelectAllPlugin from '@ckeditor/ckeditor5-select-all/src/selectall'
import SpecialCharactersPlugin from '@ckeditor/ckeditor5-special-characters/src/specialcharacters'
import SpecialCharactersEssentialsPlugin from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials'
import TablePlugin from '@ckeditor/ckeditor5-table/src/table'
import TableToolbarPlugin from '@ckeditor/ckeditor5-table/src/tabletoolbar'
import WordCountPlugin from '@ckeditor/ckeditor5-word-count/src/wordcount'
import CodeBlockPlugin from '@ckeditor/ckeditor5-code-block/src/codeblock'

export default {
  namespaced: true,

  state: {
    classicCKEditor: ClassicEditor,

    plugins: [
      EssentialsPlugin,
      BoldPlugin,
      ItalicPlugin,
      LinkPlugin,
      ParagraphPlugin,
      AutoformatPlugin,
      BlockQuotePlugin,
      HeadingPlugin,
      ListPlugin,
      TodoListPlugin,
      AlignmentPlugin,
      FontPlugin,
      HighlightPlugin,
      HorizontalLinePlugin,
      IndentPlugin,
      IndentBlockPlugin,
      TextPartLanguagePlugin,
      MediaEmbedPlugin,
      PageBreakPlugin,
      RemoveFormatPlugin,
      SelectAllPlugin,
      SpecialCharactersPlugin,
      SpecialCharactersEssentialsPlugin,
      TablePlugin,
      TableToolbarPlugin,
      WordCountPlugin,
      CodeBlockPlugin
    ],

    editorConfig: {
      toolbar: {
        items: [
          'heading', '|',
          'alignment', '|',
          'bold', 'italic', '|',
          'bulletedList', 'numberedList', 'todoList', '|',
          'fontColor', 'fontBackgroundColor', 'fontFamily', '|',
          'link', '|',
          'blockQuote', 'highlight', 'horizontalLine', 'outdent', 'indent', '|',
          '-',
          'textPartLanguage', '|',
          'pageBreak', 'removeFormat', 'selectAll', '|',
          'specialCharacters',
          'mediaEmbed', '|',
          'insertTable', '|',
          'codeBlock', '|',
          'undo',
          'redo'
        ],
        table: {
          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
        },
        shouldNotGroupWhenFull: true
      }
    }
  },

  getters: {},

  mutations: {
    setEditorConfig(state, payload) {
      // this.editorConfig.language = this.$i18n.locale
      state.editorConfig = payload
    }
  }
}
