import Vue from 'vue'
import App from './App.vue'
import VueI18n from 'vue-i18n'
import router from './router'
import store from './store'
import messages from './i18n/messages'
import vuetify from './plugins/vuetify'
import '@/assets/css/helpers.css'

// Disable debug to production.
if (process.env.NODE_ENV.trim() === 'production') {
  Vue.config.productionTip = false
  Vue.config.devtools = false
  Vue.config.debug = false
  Vue.config.silent = true
}

// Add support for language translation.
Vue.use(VueI18n)
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
