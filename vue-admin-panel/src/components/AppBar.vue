<template>
  <v-app-bar app dense fixed>
    <!-- Menu button. -->
    <v-app-bar-nav-icon
      @click="setOpenPanelServiceList(!openPanelServiceList)"
    ></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <!-- Reload panel button. -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" :href="homeUrl">
          <v-icon>mdi-reload</v-icon>
        </v-btn>
      </template>
      <span>{{ $t("message.0") }}</span>
    </v-tooltip>
    <!-- Light or dark theme button. -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" @click="changeTheme()">
          <v-icon>mdi-brightness-4</v-icon>
        </v-btn>
      </template>
      <span>{{ $t("message.1") }}</span>
    </v-tooltip>
    <v-spacer></v-spacer>
    <!-- Logout button. -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" @click="logout()">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </template>
      <span>{{ $t("message.2") }}</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "AppBar",

  data: () => ({
    homeUrl: process.env.NODE_ENV === "production" ? "/admin" : "/",
    // Open and close service list panel (navigation-drawer).
    panelServiceList: null,
  }),

  computed: {
    ...mapState(["openPanelServiceList"]),
  },

  methods: {
    ...mapMutations([
      "setUsername",
      "setIsAuthenticated",
      "setOpenPanelServiceList",
      "setBtnBgColor",
    ]),
    ...mapMutations("documentList", [
      "setCurrentPageNumber",
      "setProgressionStep",
      "setDocsPerPage",
    ]),
    logout() {
      this.axios
        .post("/admin/logout", {})
        .then(() => {
          if (this.$session.has("theme_dark")) {
            this.$session.remove("theme_dark");
          }
          if (this.$session.has("num_page")) {
            this.$session.remove("num_page");
          }
          if (this.$session.has("num_per")) {
            this.$session.remove("num_per");
          }
          this.setUsername("..");
          this.setCurrentPageNumber(1);
          this.setProgressionStep(1);
          this.setDocsPerPage(50);
          // this.$vuetify.theme.dark = false
          this.setIsAuthenticated(false);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      if (this.$session.exists()) {
        this.$session.set("theme_dark", this.$vuetify.theme.dark);
      }
      const colorClass = this.$vuetify.theme.dark
        ? "grey darken-3"
        : "grey lighten-5";
      this.setBtnBgColor(colorClass);
    },
  },
};
</script>
