<template>
  <v-app>
    <v-navigation-drawer app permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Сompany Name</v-list-item-title>
          <v-list-item-subtitle>Brief description of the company.</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>

    <v-app-bar app dense fixed>
      <v-btn icon>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-brightness-4</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer fixed class="pl-footer pr-0" color="transparent">
      <v-card flat tile width="100%">
        <v-divider></v-divider>
        <v-footer color="transparent" class="pb-0">
          <v-btn rounded small depressed color="red">
            <v-icon color="white">mdi-close-thick</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn rounded small depressed color="green">
            <v-icon color="white">mdi-content-save</v-icon>
            <v-icon color="white">mdi-ampersand</v-icon>
            <v-icon color="white">mdi-file-outline</v-icon>
          </v-btn>
          <v-btn rounded small depressed color="orange" class="mx-4">
            <v-icon color="white">mdi-content-save</v-icon>
            <v-icon color="white">mdi-ampersand</v-icon>
            <v-icon color="white">mdi-file-document-edit-outline</v-icon>
          </v-btn>
          <v-btn rounded small depressed color="blue">
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
