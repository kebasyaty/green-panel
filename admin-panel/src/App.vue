<template>
  <v-app>
    <v-navigation-drawer app permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Application Name</v-list-item-title>
          <v-list-item-subtitle></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
    </v-navigation-drawer>

    <v-app-bar app dense fixed>
      <v-btn icon>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-step-backward</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer fixed class="pl-256px pr-0" color="transparent">
      <v-card flat tile width="100%">
        <v-divider></v-divider>
        <v-footer color="transparent" class="pb-0">
          <v-btn rounded small outlined color="red">
            <v-icon>mdi-close-thick</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn rounded small outlined color="green">
            <v-icon>mdi-content-save</v-icon>
            <v-icon>mdi-ampersand</v-icon>
            <v-icon>mdi-text-box-plus-outline</v-icon>
          </v-btn>
          <v-btn rounded small outlined color="orange" class="mx-4">
            <v-icon>mdi-content-save</v-icon>
            <v-icon>mdi-ampersand</v-icon>
            <v-icon>mdi-file-document-edit-outline</v-icon>
          </v-btn>
          <v-btn rounded small outlined color="blue">
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
        </v-footer>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {},

  data: () => ({
    //
  })
}
</script>
