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
      <v-card-text class="pt-4">
        <v-container fluid class="pa-0">
          <v-row>
            <v-col cols="12" md="6">
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
          <v-row>
            <v-col cols="12">
              <!-- Button - Delete all selected documents. -->
              <v-btn
                dark
                tile
                depressed
                v-if="docsToBeDeleted.length > 0"
                color="red darken-3"
                @click="deleteDoc"
              >
                <v-icon left>mdi-close-thick</v-icon>Is delete selected documents ?
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
        <!-- Document table. -->
        <v-simple-table fixed-header class="mt-4">
          <template v-slot:default>
            <thead>
              <tr>
                <!-- Delete all documents. -->
                <th width="76" class="text-left">
                  <v-checkbox
                    hide-details
                    v-model="docsToBeDeleted"
                    value="all"
                    color="red darken-3"
                    class="mt-0 pt-0"
                  ></v-checkbox>
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
                  <v-checkbox
                    hide-details
                    v-model="docsToBeDeleted"
                    :value="idxDoc"
                    color="red darken-3"
                    class="mt-0 pt-0"
                  ></v-checkbox>
                </td>
                <!-- Number of the document in the table. -->
                <td width="76" class="pr-0">{{ idxDoc + 1 }}</td>
                <!-- Document list. -->
                <td v-for="(header, idxHead) in headers" :key="Object.keys(header)[0]">
                  <router-link
                    v-if="idxHead === 0"
                    :to="createDocumentUrl(idxDoc)"
                  >{{ document[Object.keys(header)[0]] }}</router-link>
                  <template v-else>{{ document[Object.keys(header)[0]] }}</template>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-pagination circle v-model="pageNumber" :length="countPage" :total-visible="5"></v-pagination>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import slug from 'slug'

export default {
  name: 'DocumentList',

  data: () => ({
    searchQuery: null,
    pageNumber: 1,
    countPage: 6,
    docsToBeDeleted: []
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
      const serviceTitle = this.serviceList[indexService].service.title
      return `${serviceTitle} > ${this.collectionTitle}`
    },
    // Document url without hash.
    docUrlNoIndex: function () {
      const currentUserLocale = this.$i18n.locale
      const indexService = this.$route.params.indexService
      const indexCollection = this.$route.params.indexCollection
      const service = this.serviceList[indexService]
      const slugServiceTitle = slug(service.service.title, { locale: currentUserLocale })
      const slugCollectionTitle = slug(this.collectionTitle, { locale: currentUserLocale })
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
    createDocumentUrl: function (indexDoc) {
      return `${this.docUrlNoIndex}/${indexDoc}`
    },
    // Delete selected documents.
    deleteDoc: function () {
      window.console.log(this.docsToBeDeleted)
    }
  }
}
</script>
