<template>
  <v-app>
    <!-- Navigation bar.
    ------------------------------------------------------------------------------------------------
    -->
    <v-navigation-drawer app v-model="drawer" width="320" class="pa-1">
      <!-- Company name and short description. -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Сompany Name</v-list-item-title>
          <v-list-item-subtitle>Brief description of the company.</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <!-- List of services (applications) and collections in them. -->
      <v-expansion-panels class="service-list">
        <!-- Service list -->
        <v-expansion-panel v-for="(item, index) in serviceList" :key="index">
          <v-expansion-panel-header class="text-subtitle-1 font-weight-medium">{{item.service_name}}</v-expansion-panel-header>
          <v-expansion-panel-content class="service-list__content">
            <!-- Ccollection list -->
            <v-list shaped dense>
              <v-list-item-group v-model="selectedItem" color="primary">
                <v-list-item v-for="(item, index) in item.collections" :key="index" class="px-1">
                  <v-list-item-icon class="mr-2">
                    <v-icon v-text="`mdi-circle-medium`"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-subtitle-1 font-weight-regular"
                      v-text="item.name"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-navigation-drawer>

    <!-- Top panel with control buttons.
    ------------------------------------------------------------------------------------------------
    -->
    <v-app-bar app dense fixed>
      <!-- Menu button. -->
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <!-- Home button. -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </template>
        <span>Home page</span>
      </v-tooltip>
      <!-- Light or dark theme button. -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-brightness-4</v-icon>
          </v-btn>
        </template>
        <span>Light or Dark theme</span>
      </v-tooltip>
      <v-spacer></v-spacer>
      <!-- Logout button. -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </template>
        <span>Logout</span>
      </v-tooltip>
    </v-app-bar>

    <!-- Content display.
    ------------------------------------------------------------------------------------------------
    -->
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
    //
  },

  data: () => ({
    // Open and close navigation-drawer.
    drawer: null,
    // List of services (applications) with nested list of collections.
    selectedItem: -1,
    serviceList: [
      {
        service_name: 'Service name 1',
        collections: [
          { name: 'Collection name 1', model_key: '???' },
          { name: 'Collection name 2', model_key: '???' },
          { name: 'Collection name 3', model_key: '???' }
        ]
      }
    ]
  })
}
</script>
