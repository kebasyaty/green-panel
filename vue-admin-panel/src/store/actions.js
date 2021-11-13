import Vue from "vue";
import { VueReCaptcha } from "vue-recaptcha-v3";

export default {
  // Get key for reCaptcha v3
  ajaxGetSiteKey({ state, commit }) {
    return new Promise((resolve, reject) => {
      if (state.siteKey.length === 0) {
        Vue.axios
          .get("/admin/recaptcha-site-key")
          .then((response) => {
            const data = response.data;
            if (data.site_key.length > 0) {
              Vue.use(VueReCaptcha, {
                siteKey: data.site_key,
                loaderOptions: {
                  useRecaptchaNet: true,
                  autoHideBadge: true,
                },
              });
              commit("setSiteKey", data.site_key);
              resolve();
            } else {
              window.console.log(data.msg_err);
              reject(data.msg_err);
            }
          })
          .catch((error) => {
            window.console.log(error);
            reject(error);
          });
      } else {
        resolve();
      }
    });
  },
};
