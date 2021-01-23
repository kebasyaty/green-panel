<template>
  <v-app>
    <!-- Navigation bar.
    ------------------------------------------------------------------------------------------------
    -->
    <v-navigation-drawer app v-model="panelServiceList" :width="panelWidthServiceList" class="pa-1">
      <!-- Company name and short description. -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">Сompany Name</v-list-item-title>
          <v-list-item-subtitle>Brief description of the company.</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <!-- Change the width of the panel. -->
      <v-list-item class="panel-width-service-list pl-1">
        <v-list-item-content>
          <v-slider
            dense
            hide-details
            v-model="panelWidthServiceList"
            prepend-icon="mdi-arrow-split-vertical"
            min="256"
            max="600"
            class="panel-width-service-list__slider"
          ></v-slider>
        </v-list-item-content>
      </v-list-item>
      <!-- List of services (applications) and collections in them. -->
      <v-expansion-panels class="service-list">
        <!-- Service list -->
        <v-expansion-panel v-for="(item, index) in serviceList" :key="item.service.title">
          <v-expansion-panel-header class="text-subtitle-1 font-weight-medium pl-0">
            <div class="pl-1 service-list__icon">
              <v-icon class="pos-relative pos-top-n2" v-text="`mdi-${item.service.icon}`"></v-icon>
            </div>
            <span class>{{item.service.title}}</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="service-list__content">
            <!-- Ccollection list -->
            <v-list shaped dense>
              <v-list-item-group v-model="selectedItem[index]" color="primary">
                <v-list-item
                  v-for="collection in item.collections"
                  :key="collection.model_key"
                  class="px-1"
                  @click="resetPreSelectedItem(index)"
                  :to="createUrlDocumentList(item.service.title, collection.title)"
                >
                  <v-list-item-icon class="mr-2">
                    <v-icon>mdi-circle-medium</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-subtitle-1 font-weight-regular"
                      v-text="collection.title"
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
      <v-app-bar-nav-icon @click="panelServiceList = !panelServiceList"></v-app-bar-nav-icon>
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

    <!-- Content display.
    ------------------------------------------------------------------------------------------------
    -->
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import slug from 'slug'

export default {
  name: 'App',

  components: {
    //
  },

  data: () => ({
    // Panel width for list of services (Drawer).
    panelWidthServiceList: 360,
    // Open and close service list panel (navigation-drawer).
    panelServiceList: null,
    // List of services (applications) with nested list of collections.
    selectedItem: [undefined, undefined, undefined],
    serviceList: [
      {
        service: { title: 'Название сервиса 1', icon: 'laptop' },
        collections: [
          { title: 'Название коллекции 1.1', model_key: '1' },
          { title: 'Collection name 1.2', model_key: '2' },
          { title: 'Collection name 1.3', model_key: '3' }
        ]
      },
      {
        service: { title: 'Service name 2', icon: 'cellphone' },
        collections: [
          { title: 'Collection name 2.1', model_key: '4' },
          { title: 'Collection name 2.2', model_key: '5' },
          { title: 'Collection name 2.3', model_key: '6' }
        ]
      },
      {
        service: { title: 'Service name 3', icon: 'wifi' },
        collections: [
          { title: 'Collection name 3.1', model_key: '7' },
          { title: 'Collection name 3.2', model_key: '8' },
          { title: 'Collection name 3.3', model_key: '9' }
        ]
      }
    ]
  }),

  computed: {
    ...mapState([
      'currentUserLocale'
    ])
  },

  methods: {
    // List of services - Resetting previously activated items.
    resetPreSelectedItem: function (currIndex) {
      this.selectedItem.forEach(function (item, idx, arr) {
        if (idx !== currIndex) {
          arr[idx] = undefined
        }
      })
    },
    // Create Url for Document list.
    createUrlDocumentList: function (serviceTitle, collectionTitle) {
      const slugServiceTitle = slug(serviceTitle, { locale: this.currentUserLocale })
      const slugCollectionTitle = slug(collectionTitle, { locale: this.currentUserLocale })
      return `/${slugServiceTitle}/${slugCollectionTitle}/document-list`
    }
  },

  created() {
    this.$i18n.locale = this.currentUserLocale
    window.console.log(this.$i18n.locale)
  }
}
</script>

<style>
.panel-width-service-list__slider .v-slider {
  max-width: 195px;
}
.service-list__icon {
  max-width: 37px;
}
</style>
