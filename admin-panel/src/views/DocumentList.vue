<template>
  <v-container>
    <v-card>
      <v-card-title>{{ collectionTitle }}</v-card-title>
      <v-card-subtitle class="pb-0">{{ breadcrumbs }}</v-card-subtitle>
      <v-card-text class="pt-4">
        <v-row>
          <v-col cols="6">
            <v-text-field
              rounded
              outlined
              dense
              hide-details
              clearable
              v-model="searchQuery"
              placeholder="Search"
              append-icon="mdi-magnify"
              @click:append="docSearch"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DocumentList',

  data: () => ({
    // Search query.
    searchQuery: null
  }),

  computed: {
    ...mapState([
      'serviceList'
    ]),
    collectionTitle: function () {
      const indexService = this.$route.params.indexService
      const indexCollection = this.$route.params.indexCollection
      return this.serviceList[indexService].collections[indexCollection].title
    },
    breadcrumbs: function () {
      const indexService = this.$route.params.indexService
      const indexCollection = this.$route.params.indexCollection
      const service = this.serviceList[indexService]
      return `${service.service.title} > ${service.collections[indexCollection].title}`
    }
  },

  methods: {
    // Documents search.
    docSearch: function () {
      if (this.searchQuery !== null) {
        window.console.log(this.searchQuery)
      }
    }
  }
}
</script>
