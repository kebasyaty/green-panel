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

  // Change buttons style
  changeBtnStyle({ commit }, isDarkTheme) {
    if (isDarkTheme) {
      commit("setBtnRed", {
        bg: "grey darken-3",
        icon: "red",
        text: "red--text",
      });
      commit("setBtnPink", {
        bg: "grey darken-3",
        icon: "pink",
        text: "pink--text",
      });
      commit("setBtnPurple", {
        bg: "grey darken-3",
        icon: "purple",
        text: "purple--text",
      });
      commit("setBtnDeepPurple", {
        bg: "grey darken-3",
        icon: "deep-purple",
        text: "deep-purple--text",
      });
      commit("setBtnIndigo", {
        bg: "grey darken-3",
        icon: "indigo",
        text: "indigo--text",
      });
      commit("setBtnBlue", {
        bg: "grey darken-3",
        icon: "blue",
        text: "blue--text",
      });
      commit("setBtnLightBlue", {
        bg: "grey darken-3",
        icon: "light-blue",
        text: "light-blue--text",
      });
      commit("setBtnCyan", {
        bg: "grey darken-3",
        icon: "cyan",
        text: "cyan--text",
      });
      commit("setBtnTeal", {
        bg: "grey darken-3",
        icon: "teal",
        text: "teal--text",
      });
      commit("setBtnGreen", {
        bg: "grey darken-3",
        icon: "green",
        text: "green--text",
      });
      commit("setBtnLightGreen", {
        bg: "grey darken-3",
        icon: "light-green",
        text: "light-green--text",
      });
      commit("setBtnLime", {
        bg: "grey darken-3",
        icon: "lime",
        text: "lime--text",
      });
      commit("setBtnYellow", {
        bg: "grey darken-3",
        icon: "yellow",
        text: "yellow--text",
      });
      commit("setBtnAmber", {
        bg: "grey darken-3",
        icon: "amber",
        text: "amber--text",
      });
      commit("setBtnOrange", {
        bg: "grey darken-3",
        icon: "orange",
        text: "orange--text",
      });
      commit("setBtnDeepOrange", {
        bg: "grey darken-3",
        icon: "deep-orange",
        text: "deep-orange--text",
      });
      commit("setBtnBrown", {
        bg: "grey darken-3",
        icon: "brown",
        text: "brown--text",
      });
      commit("setBtnBlueGrey", {
        bg: "grey darken-3",
        icon: "blue-grey",
        text: "blue-grey--text",
      });
      commit("setBtnGrey", {
        bg: "grey darken-3",
        icon: "grey",
        text: "grey--text",
      });
    } else {
      commit("setBtnRed", {
        bg: "red lighten-5",
        icon: "red darken-1",
        text: "red--text text--darken-1",
      });
      commit("setBtnPink", {
        bg: "pink lighten-5",
        icon: "pink darken-1",
        text: "pink--text text--darken-1",
      });
      commit("setBtnPurple", {
        bg: "purple lighten-5",
        icon: "purple",
        text: "purple--text",
      });
      commit("setBtnDeepPurple", {
        bg: "deep-purple lighten-5",
        icon: "deep-purple",
        text: "deep-purple--text",
      });
      commit("setBtnIndigo", {
        bg: "indigo lighten-5",
        icon: "indigo",
        text: "indigo--text",
      });
      commit("setBtnBlue", {
        bg: "blue lighten-5",
        icon: "blue",
        text: "blue--text",
      });
      commit("setBtnLightBlue", {
        bg: "light-blue lighten-5",
        icon: "light-blue",
        text: "light-blue--text",
      });
      commit("setBtnCyan", {
        bg: "cyan lighten-5",
        icon: "cyan darken-1",
        text: "cyan--text text--darken-1",
      });
      commit("setBtnTeal", {
        bg: "teal lighten-5",
        icon: "teal",
        text: "teal--text",
      });
      commit("setBtnGreen", {
        bg: "green lighten-5",
        icon: "green",
        text: "green--text",
      });
      commit("setBtnLightGreen", {
        bg: "light-green lighten-5",
        icon: "light-green",
        text: "light-green--text",
      });
      commit("setBtnLime", {
        bg: "lime lighten-5",
        icon: "lime darken-1",
        text: "lime--text text--darken-1",
      });
      commit("setBtnYellow", {
        bg: "yellow lighten-5",
        icon: "yellow darken-3",
        text: "yellow--text text--darken-3",
      });
      commit("setBtnAmber", {
        bg: "amber lighten-5",
        icon: "amber darken-2",
        text: "amber--text text--darken-2",
      });
      commit("setBtnOrange", {
        bg: "orange lighten-5",
        icon: "orange darken-1",
        text: "orange--text text--darken-1",
      });
      commit("setBtnDeepOrange", {
        bg: "deep-orange lighten-5",
        icon: "deep-orange darken-1",
        text: "deep-orange--text text--darken-1",
      });
      commit("setBtnBrown", {
        bg: "brown lighten-5",
        icon: "brown",
        text: "brown--text",
      });
      commit("setBtnBlueGrey", {
        bg: "blue-grey lighten-5",
        icon: "blue-grey",
        text: "blue-grey--text",
      });
      commit("setBtnGrey", {
        bg: "grey lighten-5",
        icon: "grey",
        text: "grey--text",
      });
    }
  },
};
