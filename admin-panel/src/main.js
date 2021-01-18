import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@/assets/css/helpers.css'

// Disable debug to production.
if (process.env.NODE_ENV.trim() === 'production') {
  Vue.config.productionTip = false
  Vue.config.devtools = false
  Vue.config.debug = false
  Vue.config.silent = true
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
