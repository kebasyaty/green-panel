import Vue from 'vue'
import App from '@/App.vue'
import VueI18n from 'vue-i18n'
import router from '@/router'
import store from '@/store'
import messages from '@/i18n/messages'
import vuetify from '@/plugins/vuetify'
import '@/assets/css/helpers.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSession from 'vue-session'
import CKEditor from '@ckeditor/ckeditor5-vue2'

// CKEditor - Translations
import '@ckeditor/ckeditor5-build-classic/build/translations/af'
import '@ckeditor/ckeditor5-build-classic/build/translations/ar'
import '@ckeditor/ckeditor5-build-classic/build/translations/ast'
import '@ckeditor/ckeditor5-build-classic/build/translations/az'
import '@ckeditor/ckeditor5-build-classic/build/translations/bg'
import '@ckeditor/ckeditor5-build-classic/build/translations/ca'
import '@ckeditor/ckeditor5-build-classic/build/translations/cs'
import '@ckeditor/ckeditor5-build-classic/build/translations/da'
import '@ckeditor/ckeditor5-build-classic/build/translations/de'
import '@ckeditor/ckeditor5-build-classic/build/translations/de-ch'
import '@ckeditor/ckeditor5-build-classic/build/translations/el'
import '@ckeditor/ckeditor5-build-classic/build/translations/en-au'
import '@ckeditor/ckeditor5-build-classic/build/translations/en-gb'
import '@ckeditor/ckeditor5-build-classic/build/translations/eo'
import '@ckeditor/ckeditor5-build-classic/build/translations/es'
import '@ckeditor/ckeditor5-build-classic/build/translations/et'
import '@ckeditor/ckeditor5-build-classic/build/translations/eu'
import '@ckeditor/ckeditor5-build-classic/build/translations/fa'
import '@ckeditor/ckeditor5-build-classic/build/translations/fi'
import '@ckeditor/ckeditor5-build-classic/build/translations/fr'
import '@ckeditor/ckeditor5-build-classic/build/translations/gl'
import '@ckeditor/ckeditor5-build-classic/build/translations/gu'
import '@ckeditor/ckeditor5-build-classic/build/translations/he'
import '@ckeditor/ckeditor5-build-classic/build/translations/hi'
import '@ckeditor/ckeditor5-build-classic/build/translations/hr'
import '@ckeditor/ckeditor5-build-classic/build/translations/hu'
import '@ckeditor/ckeditor5-build-classic/build/translations/id'
import '@ckeditor/ckeditor5-build-classic/build/translations/it'
import '@ckeditor/ckeditor5-build-classic/build/translations/ja'
import '@ckeditor/ckeditor5-build-classic/build/translations/km'
import '@ckeditor/ckeditor5-build-classic/build/translations/kn'
import '@ckeditor/ckeditor5-build-classic/build/translations/ko'
import '@ckeditor/ckeditor5-build-classic/build/translations/ku'
import '@ckeditor/ckeditor5-build-classic/build/translations/lt'
import '@ckeditor/ckeditor5-build-classic/build/translations/lv'
import '@ckeditor/ckeditor5-build-classic/build/translations/ms'
import '@ckeditor/ckeditor5-build-classic/build/translations/nb'
import '@ckeditor/ckeditor5-build-classic/build/translations/ne'
import '@ckeditor/ckeditor5-build-classic/build/translations/nl'
import '@ckeditor/ckeditor5-build-classic/build/translations/no'
import '@ckeditor/ckeditor5-build-classic/build/translations/oc'
import '@ckeditor/ckeditor5-build-classic/build/translations/pl'
import '@ckeditor/ckeditor5-build-classic/build/translations/pt'
import '@ckeditor/ckeditor5-build-classic/build/translations/pt-br'
import '@ckeditor/ckeditor5-build-classic/build/translations/ro'
import '@ckeditor/ckeditor5-build-classic/build/translations/ru'
import '@ckeditor/ckeditor5-build-classic/build/translations/si'
import '@ckeditor/ckeditor5-build-classic/build/translations/sk'
import '@ckeditor/ckeditor5-build-classic/build/translations/sl'
import '@ckeditor/ckeditor5-build-classic/build/translations/sq'
import '@ckeditor/ckeditor5-build-classic/build/translations/sr'
import '@ckeditor/ckeditor5-build-classic/build/translations/sr-latn'
import '@ckeditor/ckeditor5-build-classic/build/translations/sv'
import '@ckeditor/ckeditor5-build-classic/build/translations/th'
import '@ckeditor/ckeditor5-build-classic/build/translations/tk'
import '@ckeditor/ckeditor5-build-classic/build/translations/tr'
import '@ckeditor/ckeditor5-build-classic/build/translations/tt'
import '@ckeditor/ckeditor5-build-classic/build/translations/ug'
import '@ckeditor/ckeditor5-build-classic/build/translations/uk'
import '@ckeditor/ckeditor5-build-classic/build/translations/vi'
import '@ckeditor/ckeditor5-build-classic/build/translations/zh'
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn'

// Disable debug to production.
if (process.env.NODE_ENV === 'production') {
  Vue.config.productionTip = false
  Vue.config.devtools = false
  Vue.config.debug = false
  Vue.config.silent = true
}

Vue.use(VueI18n)
Vue.use(VueAxios, axios)
Vue.use(VueSession, { persist: true })
Vue.use(CKEditor)

// Create VueI18n instance with options.
const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount('#app')
