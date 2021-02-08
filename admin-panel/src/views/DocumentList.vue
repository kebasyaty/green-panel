<template>
  <v-container fluid>
    <v-card class="mt-1">
      <v-toolbar dense flat>
        <!-- Button - A step back in the history of the router. -->
        <v-btn icon @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-toolbar>
      <!-- Show collection name -->
      <v-card-title class="pt-0">{{ collectionTitle }}</v-card-title>
      <v-card-subtitle>{{ breadcrumbs }}</v-card-subtitle>
      <v-card-text class="pt-4">
        <v-row>
          <v-col cols="12" md="6">
            <!-- Search query field. -->
            <v-text-field
              dense
              clearable
              hide-details
              v-model="searchQuery"
              :placeholder="$t('message.3')"
              append-icon="mdi-magnify"
              @click:append="documentSearch"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="text-md-right">
            <!-- Button - Create a new document. -->
            <v-btn text color="green" :to="docUrlNoIndex + '/new'">
              <v-icon left>mdi-plus</v-icon>
              {{ $t('message.25') }}
            </v-btn>
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
              @click="deleteDocs"
            >
              <v-icon left>mdi-close-thick</v-icon>
              {{ $t('message.4') }}
            </v-btn>
          </v-col>
        </v-row>
        <!-- Document table. -->
        <v-simple-table fixed-header class="mt-4">
          <template v-slot:default>
            <thead>
              <tr>
                <!-- Mark all documents for deletion. -->
                <th width="76" class="text-left">
                  <v-checkbox
                    hide-details
                    v-model="deleteAllDocsFlag"
                    color="red darken-3"
                    class="mt-0 pt-0"
                    @change="markAllDocsForDeletion"
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
                    @change="checkStatusListSelectedDocsDeleted"
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
        <v-pagination
          v-model="currentPageNumber"
          :length="countPage"
          :total-visible="5"
          @input="docsTablePagination"
        ></v-pagination>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import slug from 'slug'
import fillRange from 'fill-range'

export default {
  name: 'DocumentList',

  data: () => ({
    searchQuery: null,
    currentPageNumber: 1,
    previousPageNumber: 1,
    countPage: 6,
    deleteAllDocsFlag: false,
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
    // Get Title of collection.
    collectionTitle: function () {
      const indexService = this.$route.params.indexService
      const indexCollection = this.$route.params.indexCollection
      return this.serviceList[indexService].collections[indexCollection].title
    },
    // Get the route scheme to the collection.
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
    // Router - Go back one step.
    goBack() {
      const homeUrl = process.env.NODE_ENV === 'production' ? '/admin' : '/'
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push(homeUrl)
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
    // Mark all documents for deletion.
    markAllDocsForDeletion: function () {
      this.docsToBeDeleted = this.deleteAllDocsFlag ? fillRange(0, this.documents.length - 1) : []
    },
    // Check the status of the list of selected documents to be deleted.
    checkStatusListSelectedDocsDeleted: function () {
      this.deleteAllDocsFlag = this.docsToBeDeleted.length === this.documents.length
    },
    // Delete selected documents.
    deleteDocs: function () {
      window.console.log(this.docsToBeDeleted)
    },
    // Page navigation through the table of documents.
    docsTablePagination: function () {
      // Eliminate duplication.
      if (this.currentPageNumber === this.previousPageNumber) { return }
      // Determine the direction of the selection.
      const preOrNext = this.currentPageNumber < this.previousPageNumber ? 'pre' : 'next'
      // Balance the states of the variables.
      this.previousPageNumber = this.currentPageNumber
      //
      window.console.log(preOrNext, this.currentPageNumber)
    }
  }
}
</script>
