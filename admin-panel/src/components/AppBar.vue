<template>
  <v-app-bar app dense fixed>
    <!-- Menu button. -->
    <v-app-bar-nav-icon @click="setPanelServiceList(!panelServiceList)"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <!-- Reload panel button. -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" href="/">
          <v-icon>mdi-reload</v-icon>
        </v-btn>
      </template>
      <span>{{ $t("message.0") }}</span>
    </v-tooltip>
    <!-- Light or dark theme button. -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" @click="$vuetify.theme.dark = !$vuetify.theme.dark">
          <v-icon>mdi-brightness-4</v-icon>
        </v-btn>
      </template>
      <span>{{ $t("message.1") }}</span>
    </v-tooltip>
    <v-spacer></v-spacer>
    <!-- Logout button. -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </template>
      <span>{{ $t("message.2") }}</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'AppBar',

  data: () => ({
    // Open and close service list panel (navigation-drawer).
    panelServiceList: null
  }),

  computed: {
    ...mapState([
      'panelServiceList'
    ])
  },

  methods: {
    ...mapMutations([
      'setPanelServiceList'
    ])
  }
}
</script>
