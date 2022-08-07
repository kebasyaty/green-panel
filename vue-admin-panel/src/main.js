import Vue from "vue";
import App from "@/App.vue";
import VueI18n from "vue-i18n";
import router from "@/router";
import store from "@/store";
import messages from "@/i18n/messages";
import vuetify from "@/plugins/vuetify";
import "@/assets/css/helpers.css";
import axios from "axios";
import VueAxios from "vue-axios";
import VueSession from "vue-session";
import CKEditor from "@ckeditor/ckeditor5-vue2";
import "@/plugins/ckeditor_translations.js";

// Disable debug to production.
if (process.env.NODE_ENV === "production") {
  Vue.config.productionTip = false;
  Vue.config.devtools = false;
  Vue.config.debug = false;
  Vue.config.silent = true;
}

Vue.use(VueI18n);
Vue.use(VueAxios, axios);
Vue.use(VueSession, { persist: true });
Vue.use(CKEditor);

// Usage: {{ text.title | truncate(20) }}
Vue.filter("truncate", function (text, length, suffix) {
  suffix = suffix || "...";
  if (text.length > length) {
    return text.substring(0, length) + suffix;
  } else {
    return text;
  }
});

// Determine language code by browser localization.
Vue.prototype.$userLang = (navigator.language || navigator.userLanguage)
  .slice(0, 2)
  .toLowerCase();

// Create VueI18n instance with options.
const i18n = new VueI18n({
  locale: "en",
  fallbackLocale: "en",
  messages,
});

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
