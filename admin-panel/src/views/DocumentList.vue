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
      <v-card-text class="pt-4 pb-0">
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
        <v-row>
          <v-col cols="auto" class="py-0">
            <!-- Sorting the list of documents. -->
            <div class="w-260">
              <v-select
                v-model="updateSortDocList"
                :items="itemsSortDocList()"
                hide-details
                dense
                @change="getDocumentList()"
              ></v-select>
            </div>
          </v-col>
          <v-col cols="auto" class="py-0">
            <!-- Sorting direction. -->
            <div class="w-180">
              <v-select
                v-model="updateSortDirectDocList"
                :items="itemsSortDirectDocList()"
                hide-details
                dense
                @change="getDocumentList()"
              ></v-select>
            </div>
          </v-col>
        </v-row>
        <!-- Document table. -->
        <v-simple-table fixed-header class="mt-4">
          <template v-slot:default>
            <thead>
              <tr>
                <!-- Symbol - № -->
                <th>&#8470;</th>
                <!-- Mark all documents for deletion. -->
                <th>
                  <v-checkbox
                    hide-details
                    v-model="deleteAllDocsFlag"
                    color="red darken-3"
                    class="mt-0 pt-0"
                    @change="markAllDocsForDeletion()"
                    :disabled="documents.length === 0"
                  ></v-checkbox>
                </th>
                <!-- Other headers. -->
                <th>{{ serviceList[$route.params.indexService].collections[$route.params.indexCollection].doc_name.title }}</th>
                <th>{{ $t('message.29') }}</th>
                <th>{{ $t('message.30') }}</th>
              </tr>
            </thead>
            <tbody>
              <!-- Document list. -->
              <tr v-for="(document, idxDoc) in documents" :key="idxDoc">
                <!-- Number of the document in the table. -->
                <td width="76" class="pr-0">{{ idxDoc + progressionStep }}</td>
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
                <!-- Link to document. -->
                <td>
                  <router-link :to="createDocumentUrl(idxDoc)">{{ document.title }}</router-link>
                </td>
                <td width="160" v-html="formattingDate(document.created_at)"></td>
                <td width="160" v-html="formattingDate(document.updated_at)"></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
      <v-card-actions>
        <v-row>
          <v-col cols="12" class="py-0">
            <div class="w-80 block-center">
              <!-- Documents per page. -->
              <v-select
                v-model="updateDocsPerPage"
                :items="countPerPage"
                hide-details
                dense
                @change="changeDocsPerPage()"
              ></v-select>
            </div>
          </v-col>
          <v-col cols="12 pb-4">
            <!-- Pagination. -->
            <v-pagination
              v-if="!blockPagination"
              circle
              v-model="updateCurrentPageNumber"
              :length="pageCount"
              :total-visible="5"
              @input="[getDocumentList(), refreshUrlState()]"
            ></v-pagination>
          </v-col>
        </v-row>
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
    deleteAllDocsFlag: false,
    docsToBeDeleted: [],
    countPerPage: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 500, 1000]
  }),

  computed: {
    ...mapState([
      'serviceList'
    ]),
    ...mapState('documentList', [
      'documents',
      'currentPageNumber',
      'pageCount',
      'progressionStep',
      'docsPerPage',
      'sortDocList',
      'sortDirectDocList',
      'searchQuery',
      'blockPagination',
      'blockLoadDocs'
    ]),
    updateCurrentPageNumber: {
      get: function () {
        return this.currentPageNumber
      },
      set: function (num) {
        this.deleteAllDocsFlag = false
        this.docsToBeDeleted = []
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
    updateDocsPerPage: {
      get: function () {
        return this.docsPerPage
      },
      set: function (num) {
        this.setDocsPerPage(num)
      }
    },
    updateSortDocList: {
      get: function () {
        return this.sortDocList
      },
      set: function (sort) {
        this.setSortDocList(sort)
      }
    },
    updateSortDirectDocList: {
      get: function () {
        return this.sortDirectDocList
      },
      set: function (direc) {
        this.setSortDirectDocList(direc)
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

  watch: {
    blockLoadDocs: function (flag) {
      if (!flag) {
        this.deleteAllDocsFlag = false
        this.docsToBeDeleted = []
      }
    }
  },

  methods: {
    ...mapMutations('documentList', [
      'setCurrentPageNumber',
      'setProgressionStep',
      'setDocsPerPage',
      'setSortDocList',
      'setSortDirectDocList',
      'setSearchQuery'
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
    // Sorting options for the list of documents.
    itemsSortDocList() {
      return [
        { text: this.$t('message.40'), value: 'name_and_created' },
        { text: this.$t('message.41'), value: 'name_and_updated' },
        { text: this.$t('message.29'), value: 'created' },
        { text: this.$t('message.30'), value: 'updated' }
      ]
    },
    // Sort direction options.
    itemsSortDirectDocList() {
      return [
        { text: this.$t('message.42'), value: -1 },
        { text: this.$t('message.43'), value: 1 }
      ]
    },
    // Refresh the number of documents per page.
    changeDocsPerPage() {
      const url = `${window.location.protocol}//${window.location.host}/admin${this.$route.path}?per=${this.docsPerPage}&page=1&sort=name_and_created&direct=-1`
      document.location.replace(url)
    },
    // Get a list of documents.
    getDocumentList() {
      return new Promise((resolve, reject) => {
        this.setShowMsg(false)
        this.runShowOverlayPageLockout(true)
        if (this.docsToBeDeleted.length > 0) {
          this.deleteAllDocsFlag = false
          this.docsToBeDeleted = []
        }
        this.ajaxGetDocumentList()
          .then(() => resolve())
          .catch(error => {
            window.console.log(error)
            reject(error)
          })
          .then(() => this.runShowOverlayPageLockout(false))
      })
    },
    // After changing the page number, update the url state.
    refreshUrlState() {
      const numPage = this.currentPageNumber
      this.setProgressionStep(((this.docsPerPage * (numPage - 1))) + 1)
      this.$route.query.page = numPage
      const url = `${window.location.protocol}//${window.location.host}/admin${this.$route.path}?per=${this.docsPerPage}&page=${numPage}&sort=${this.sortDocList}&direct=${this.sortDirectDocList}`
      history.replaceState(null, null, url)
    },
    // Documents search.
    documentSearch() {
      // Reset page number to default.
      this.resetPageNumberDefault(this.getRequestParams())
      // Get a list of documents.
      this.getDocumentList()
    },
    // Create Url for Document.
    createDocumentUrl(indexDoc) {
      return `${this.docUrlNoIndex}/${indexDoc}`
    },
    // Formatting date.
    formattingDate(date) {
      const local = new Date(date + 'Z')
      const localDate = local.toLocaleDateString([this.$i18n.locale, 'en'])
      const localTime = local.toLocaleTimeString().slice(0, 5)
      return `<span class="cyan--text text--darken-2">${localDate}</span> <span class="orange--text text--darken-2">${localTime}</span>`
    },
    // Mark all documents for deletion.
    markAllDocsForDeletion() {
      this.docsToBeDeleted = this.deleteAllDocsFlag ? fillRange(0, this.documents.length - 1) : []
    },
    // Check the status of the list of selected documents to be deleted.
    checkStatusListSelectedDocsDeleted() {
      this.deleteAllDocsFlag = this.docsToBeDeleted.length === this.documents.length
    },
    // Restart the list of documents for with the correct number of pages.
    restartDocList() {
      let numPage = this.currentPageNumber
      if (numPage > 1 && this.pageCount < numPage) {
        const url = `${window.location.protocol}//${window.location.host}/admin${this.$route.path}?per=${this.docsPerPage}&page=${--numPage}&sort=${this.sortDocList}&direct=${this.sortDirectDocList}`
        document.location.replace(url)
      }
    },
    // Delete selected documents.
    deleteDocs() {
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
            this.getDocumentList().then(() => {
              this.restartDocList()
            })
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
    },
    // Get request parameters - per, page.
    getRequestParams() {
      let numPage = this.$route.query.page
      numPage = numPage !== undefined ? parseInt(numPage) : 1
      if (Number.isNaN(numPage)) {
        this.runShowMsg({ text: this.$t('message.36'), status: 'error' })
      }
      let numPer = this.$route.query.per
      numPer = numPer !== undefined ? parseInt(numPer) : this.docsPerPage
      if (Number.isNaN(numPer)) {
        this.runShowMsg({ text: this.$t('message.38'), status: 'error' })
      }
      this.setProgressionStep(((numPer * (numPage - 1))) + 1)
      return { numPage, numPer }
    }
  },

  created() {
    // Reset page number to default.
    this.resetPageNumberDefault(this.getRequestParams())
    // Get a list of documents.
    this.getDocumentList().then(() => {
      this.restartDocList()
    })
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
