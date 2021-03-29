<template>
  <v-container fluid v-if="serviceList.length > 0">
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
              v-model="updateSearchQuery"
              :placeholder="$t('message.3')"
              append-icon="mdi-magnify"
              @input="documentSearch()"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="text-md-right">
            <!-- Button - Create a new document. -->
            <v-btn text color="green" :to="docUrlNoIndex + '/new'">
              <v-icon left>mdi-file-plus-outline</v-icon>
              {{ $t('message.25') }}
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <!-- Button - Delete all selected documents. -->
            <v-btn
              dark
              v-if="docsToBeDeleted.length > 0"
              color="red darken-3"
              @click="deleteDocs()"
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
                <th>
                  <v-checkbox
                    hide-details
                    v-model="updateDeleteAllDocsFlag"
                    color="red darken-3"
                    class="mt-0 pt-0"
                    @change="markAllDocsForDeletion()"
                  ></v-checkbox>
                </th>
                <!-- Symbol - № -->
                <th>&#8470;</th>
                <!-- Other headers. -->
                <th>{{ serviceList[$route.params.indexService].collections[$route.params.indexCollection].doc_name.title }}</th>
                <th>{{ $t('message.29') }}</th>
                <th>{{ $t('message.30') }}</th>
              </tr>
            </thead>
            <tbody>
              <!-- Document list. -->
              <tr v-for="(document, idxDoc) in documents" :key="`${document.title}-${idxDoc}`">
                <!-- Delete document. -->
                <td width="76" class="pr-0">
                  <v-checkbox
                    hide-details
                    v-model="docsToBeDeleted"
                    :value="idxDoc"
                    color="red darken-3"
                    class="mt-0 pt-0"
                    @change="checkStatusListSelectedDocsDeleted()"
                  ></v-checkbox>
                </td>
                <!-- Number of the document in the table. -->
                <td width="76" class="pr-0">{{ idxDoc + 1 }}</td>
                <!-- Link to document. -->
                <td>
                  <router-link :to="createDocumentUrl(idxDoc)">{{ document.title }}</router-link>
                </td>
                <td width="160" v-html="formatDate(document.created_at)"></td>
                <td width="160" v-html="formatDate(document.updated_at)"></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-pagination
          v-if="!blockPagination"
          v-model="updateCurrentPageNumber"
          :length="pageCount"
          :total-visible="5"
          @input="getDocumentList()"
          :disabled="deleteAllDocsFlag"
        ></v-pagination>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import slug from 'slug'
import fillRange from 'fill-range'

export default {
  name: 'DocumentList',

  data: () => ({
    //
  }),

  computed: {
    ...mapState([
      'serviceList'
    ]),
    ...mapState('documentList', [
      'documents',
      'currentPageNumber',
      'pageCount',
      'searchQuery',
      'blockPagination',
      'deleteAllDocsFlag',
      'docsToBeDeleted'
    ]),
    updateCurrentPageNumber: {
      get: function () {
        return this.currentPageNumber
      },
      set: function (num) {
        this.updateDeleteAllDocsFlag = false
        this.setDocsToBeDeleted([])
        this.setCurrentPageNumber(num)
      }
    },
    updateSearchQuery: {
      get: function () {
        return this.searchQuery
      },
      set: function (text) {
        this.setSearchQuery(text)
      }
    },
    updateDeleteAllDocsFlag: {
      get: function () {
        return this.deleteAllDocsFlag
      },
      set: function (flag) {
        this.setDeleteAllDocsFlag(flag)
      }
    },
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
    ...mapMutations([
      'setSearchQuery'
    ]),
    ...mapMutations('documentList', [
      'setCurrentPageNumber',
      'setSearchQuery',
      'setDeleteAllDocsFlag',
      'setDocsToBeDeleted'
    ]),
    ...mapMutations('popUpMsgs', [
      'setShowMsg'
    ]),
    ...mapActions('documentList', [
      'ajaxGetDocumentList',
      'resetPageNumberDefault'
    ]),
    ...mapActions('popUpMsgs', [
      'runShowMsg'
    ]),
    ...mapActions('overlays', [
      'runShowOverlayPageLockout'
    ]),
    // Router - Go back one step.
    goBack() {
      this.setShowMsg(false)
      this.$router.replace({ name: 'home' })
    },
    // Get a list of documents.
    getDocumentList: function () {
      this.runShowOverlayPageLockout(true)
      this.ajaxGetDocumentList()
        .catch(error => {
          window.console.log(error)
        })
        .then(() => this.runShowOverlayPageLockout(false))
    },
    // Documents search.
    documentSearch: function () {
      if (this.updateSearchQuery !== null) {
        // Reset page number to default.
        this.resetPageNumberDefault()
        // Get a list of documents.
        this.getDocumentList()
      }
    },
    // Create Url for Document.
    createDocumentUrl: function (indexDoc) {
      return `${this.docUrlNoIndex}/${indexDoc}`
    },
    // Formatting date.
    formatDate: function (date) {
      const dateParsing = date.split('T')
      return `<span class="cyan--text text--darken-2">${dateParsing[0]}</span> <span class="orange--text text--darken-2">${dateParsing[1]}</span>`
    },
    // Mark all documents for deletion.
    markAllDocsForDeletion: function () {
      this.setDocsToBeDeleted(this.deleteAllDocsFlag ? fillRange(0, this.documents.length - 1) : [])
    },
    // Check the status of the list of selected documents to be deleted.
    checkStatusListSelectedDocsDeleted: function () {
      this.updateDeleteAllDocsFlag = this.docsToBeDeleted.length === this.documents.length
    },
    // Delete selected documents.
    deleteDocs: function () {
      this.setShowMsg(false)
      this.runShowOverlayPageLockout(true)
      const indexService = this.$route.params.indexService
      const indexCollection = this.$route.params.indexCollection
      const service = this.serviceList[indexService]
      const docHashList = []
      this.docsToBeDeleted.forEach(idx => {
        docHashList.push(this.documents[idx].hash)
      })
      const payload = {
        model_key: service.collections[indexCollection].model_key,
        doc_hash_list: docHashList
      }
      this.axios.post('/admin/delete-many-doc', payload)
        .then(response => {
          const data = response.data
          if (!data.is_authenticated) {
            this.setIsAuthenticated(false)
          } else if (data.msg_err.length === 0) {
            this.setShowMsg(false)
            this.updateSearchQuery = null
            this.resetPageNumberDefault()
            this.getDocumentList()
          } else {
            console.log(data.msg_err)
            this.runShowMsg({ text: data.msg_err, status: 'error' })
          }
        })
        .catch(error => {
          console.log(error)
          this.runShowMsg({ text: error, status: 'error' })
        })
        .then(() => this.runShowOverlayPageLockout(false))
    }
  },

  created() {
    // Reset page number to default.
    this.resetPageNumberDefault()
    // Get a list of documents.
    this.getDocumentList()
  }
}
</script>

<style>
.v-pagination__item--active,
.v-pagination__item,
.v-pagination__navigation {
  box-shadow: none !important;
}
button:not(.v-pagination__item--active).v-pagination__item,
.v-pagination__navigation {
  border: 1px solid transparent !important;
}
button:not(.v-pagination__item--active).v-pagination__item:hover,
.v-pagination__navigation:hover {
  border: 1px solid #e0e0e0 !important;
}
</style>
