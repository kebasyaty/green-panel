<template>
  <v-container fluid>
    <v-card class="mt-1">
      <v-toolbar dense flat>
        <v-btn icon @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-title class="pt-0">{{ collectionTitle }}</v-card-title>
      <v-card-subtitle>{{ breadcrumbs }}</v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <!-- Search query field. -->
            <v-text-field
              dense
              rounded
              outlined
              clearable
              hide-details
              v-model="searchQuery"
              placeholder="Search"
              append-icon="mdi-magnify"
              @click:append="documentSearch"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Document table. -->
        <v-simple-table fixed-header class="mt-4">
          <template v-slot:default>
            <thead>
              <tr>
                <!-- Delete all documents. -->
                <th width="76" class="text-left">
                  <v-checkbox></v-checkbox>
                </th>
                <!-- Symbol - № -->
                <th width="76" class="text-left">&#8470;</th>
                <!-- Header list. -->
                <th
                  class="text-left"
                  v-for="header in headers"
                  :key="Object.keys(header)[0]"
                >{{ Object.values(header)[0] }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(document, idxDoc) in documents" :key="idxDoc">
                <!-- Delete document. -->
                <td width="76" class="pr-0">
                  <v-checkbox></v-checkbox>
                </td>
                <!-- Number of the document in the table. -->
                <td width="76" class="pr-0">{{ idxDoc + 1 }}</td>
                <!-- Document list. -->
                <td v-for="(header, idxHead) in headers" :key="Object.keys(header)[0]">
                  <router-link
                    v-if="idxHead === 0"
                    :to="createDocumentUrl(document.hash)"
                  >{{ document[Object.keys(header)[0]] }}</router-link>
                  <template v-else>{{ document[Object.keys(header)[0]] }}</template>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import slug from 'slug'

export default {
  name: 'DocumentList',

  data: () => ({
    searchQuery: null
  }),

  computed: {
    ...mapState([
      'serviceList'
    ]),
    ...mapState('documentList', [
      'headers',
      'documents'
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
    },
    // Document url without hash.
    docUrlNoHash: function () {
      const currentUserLocale = this.$i18n.locale
      const indexService = this.$route.params.indexService
      const indexCollection = this.$route.params.indexCollection
      const service = this.serviceList[indexService]
      const slugServiceTitle = slug(service.service.title, { locale: currentUserLocale })
      const slugCollectionTitle = slug(service.collections[indexCollection].title, { locale: currentUserLocale })
      return `/${slugServiceTitle}/${indexService}/${slugCollectionTitle}/${indexCollection}/document`
    }
  },

  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    // Documents search.
    documentSearch: function () {
      if (this.searchQuery !== null) {
        window.console.log(this.searchQuery)
      }
    },
    // Create Url for Document.
    createDocumentUrl: function (hash) {
      return `${this.docUrlNoHash}/${hash}`
    }
  }
}
</script>
