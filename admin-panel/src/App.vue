<template>
  <v-app>
    <!-- Navigation bar. -->
    <v-navigation-drawer app permanent>
      <!-- Company name and short description. -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Сompany Name</v-list-item-title>
          <v-list-item-subtitle>Brief description of the company.</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <!-- List of services (applications) and collections in them. -->
      <!-- -->
    </v-navigation-drawer>

    <!-- Top panel with control buttons. -->
    <v-app-bar app dense fixed>
      <!-- Home button. -->
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </template>
        <span>Home page.</span>
      </v-tooltip>
      <!-- Logout button. -->
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </template>
        <span>Logout.</span>
      </v-tooltip>
      <v-spacer></v-spacer>
      <!-- Light or dark theme button. -->
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-brightness-4</v-icon>
          </v-btn>
        </template>
        <span>Light or Dark theme.</span>
      </v-tooltip>
    </v-app-bar>

    <!-- Content display.  -->
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>

    <!-- Footer and control buttons. -->
    <v-footer fixed class="pl-footer pr-0" color="transparent">
      <v-card flat tile width="100%">
        <v-divider></v-divider>
        <v-footer color="transparent" class="pb-0">
          <!-- Delete button. -->
          <v-btn rounded small depressed color="error">
            <v-icon color="white">mdi-close-thick</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <!-- Save button and create a new document. -->
          <v-btn rounded small depressed color="success">
            <v-icon color="white">mdi-content-save</v-icon>
            <v-icon color="white">mdi-ampersand</v-icon>
            <v-icon color="white">mdi-file-outline</v-icon>
          </v-btn>
          <!-- Save button and continue editing the document. -->
          <v-btn rounded small depressed color="warning" class="mx-4">
            <v-icon color="white">mdi-content-save</v-icon>
            <v-icon color="white">mdi-ampersand</v-icon>
            <v-icon color="white">mdi-file-document-edit-outline</v-icon>
          </v-btn>
          <!-- Save button. -->
          <v-btn rounded small depressed color="primary">
            <v-icon color="white">mdi-content-save</v-icon>
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

<style scoped>
.pl-footer {
  padding-left: 256px;
}
</style>
