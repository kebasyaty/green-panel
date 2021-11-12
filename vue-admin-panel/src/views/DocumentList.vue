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
            <div class="max-w-400">
              <v-text-field
                dense
                clearable
                hide-details
                class="shrink"
                v-model="updateSearchQuery"
                :placeholder="$t('message.3')"
                append-icon="mdi-magnify"
                @input="documentSearch()"
              >
                <template v-slot:append-outer>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <!-- Paste search data from clipboard. -->
                      <v-btn
                        fab
                        dark
                        small
                        depressed
                        :color="btnGreen.bg"
                        v-bind="attrs"
                        v-on="on"
                        @click="pasteSearchData()"
                        style="margin-top: -10px"
                      >
                        <v-icon :color="btnGreen.icon"
                          >mdi-content-paste</v-icon
                        >
                      </v-btn>
                    </template>
                    <span>{{ $t("message.71") }}</span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="text-md-right">
            <!-- Button - Add a new document. -->
            <v-btn
              dark
              depressed
              :color="btnGreen.bg"
              :to="docUrlNoIndex + '/new'"
            >
              <v-icon left :color="btnGreen.icon">mdi-file-plus-outline</v-icon>
              <span :class="btnGreen.text">{{ $t("message.25") }}</span>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <!-- Button - Delete all selected documents. -->
            <v-btn
              dark
              depressed
              v-if="docsToBeDeleted.length > 0"
              :color="btnRed.bg"
              @click="deleteDocs()"
            >
              <v-icon left :color="btnRed.icon">mdi-close-thick</v-icon>
              <span :class="btnRed.text">{{ $t("message.4") }}</span>
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
                @change="[getDocumentList(), refreshUrlState()]"
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
                @change="[getDocumentList(), refreshUrlState()]"
              ></v-select>
            </div>
          </v-col>
          <v-col cols="auto" class="py-0">
            <!-- Filter by selection fields. -->
            <v-btn
              dark
              small
              depressed
              :color="btnBlue.bg"
              :disabled="dataFilters.length === 0"
              @click="showFilterDoc = true"
            >
              <v-icon left :color="btnBlue.icon">mdi-filter</v-icon>
              <span :class="dataFilters.length > 0 ? btnBlue.text : ''">{{
                $t("message.64")
              }}</span>
            </v-btn>
          </v-col>
        </v-row>
        <!-- Document table. -->
        <v-simple-table fixed-header class="mt-4">
          <template v-slot:default>
            <thead
              class="document-list"
              :style="
                $vuetify.theme.dark
                  ? 'background: #1d1f34;'
                  : 'background: #f5f6fb;'
              "
            >
              <tr>
                <!-- Symbol - № -->
                <th align="left" style="text-align: left !important">
                  &#8470;
                </th>
                <!-- Mark all documents for deletion. -->
                <th align="center">
                  <v-checkbox
                    hide-details
                    v-model="deleteAllDocsFlag"
                    color="red darken-2"
                    class="mt-0 pt-0"
                    @change="markAllDocsForDeletion()"
                    :disabled="documents.length === 0"
                  ></v-checkbox>
                </th>
                <!-- Other headers. -->
                <th
                  align="center"
                  v-for="(field, idxHeader) in fields"
                  :key="`header-${idxHeader}`"
                >
                  {{ field.title }}
                </th>
                <th align="center">{{ $t("message.29") }}</th>
                <th align="center">{{ $t("message.30") }}</th>
                <th align="center">ID</th>
              </tr>
            </thead>
            <tbody class="document-list">
              <!-- Document list. -->
              <tr
                v-for="(document, idxDoc) in documents"
                :key="`doc-${idxDoc}`"
              >
                <!-- Number of the document in the table. -->
                <td
                  width="76"
                  align="left"
                  class="pr-0"
                  style="text-align: left !important"
                >
                  {{ idxDoc + progressionStep }}
                </td>
                <!-- Delete document. -->
                <td width="76" align="center" class="pr-0">
                  <v-checkbox
                    hide-details
                    v-model="docsToBeDeleted"
                    :value="idxDoc"
                    color="red darken-2"
                    class="mt-0 pt-0"
                    @change="checkStatusListSelectedDocsDeleted()"
                  ></v-checkbox>
                </td>
                <!-- Other fields. -->
                <template v-for="(item, idxField) in fields">
                  <!-- Link to document. -->
                  <td align="center" :key="idxField">
                    <template v-if="idxField === 0">
                      <!-- Copy doc name to clipboard. -->
                      <span>
                        <v-btn
                          fab
                          dark
                          small
                          depressed
                          :color="btnGreen.bg"
                          v-bind="attrs"
                          v-on="on"
                          @click="copyLinkNameDoc(document[item.field])"
                          class="mr-2"
                        >
                          <v-icon :color="btnGreen.icon"
                            >mdi-content-copy</v-icon
                          >
                        </v-btn>
                      </span>
                      <!-- Link to document form. -->
                      <span>
                        <router-link :to="getDocFormUrl(idxDoc)">{{
                          document[item.field]
                        }}</router-link>
                      </span>
                    </template>
                    <span v-else v-html="document[item.field]"></span>
                  </td>
                </template>
                <!-- Date fields. -->
                <td
                  width="180"
                  v-html="formattingDate(document.created_at)"
                ></td>
                <td
                  width="180"
                  v-html="formattingDate(document.updated_at)"
                ></td>
                <!-- Hash field. -->
                <td align="center">
                  <!-- Button - Copy document ID to clipboard. -->
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        fab
                        dark
                        small
                        depressed
                        :color="btnGreen.bg"
                        v-bind="attrs"
                        v-on="on"
                        @click="copyHashDoc(document.hash)"
                      >
                        <v-icon :color="btnGreen.icon">mdi-content-copy</v-icon>
                      </v-btn>
                    </template>
                    <span>{{ document.hash }}</span>
                  </v-tooltip>
                </td>
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
              color="#2196f38f"
              v-model="updateCurrentPageNumber"
              :length="pageCount"
              :total-visible="5"
              @input="[getDocumentList(), refreshUrlState()]"
            ></v-pagination>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
    <!-- Filter by categories, for selection type fields. -->
    <v-dialog persistent v-model="showFilterDoc" max-width="500px">
      <v-card>
        <v-card-actions class="pr-3 pt-2 pb-0">
          <v-spacer></v-spacer>
          <!-- Button - Close. -->
          <v-btn icon small color="red" @click="showFilterDoc = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-title class="pt-0 pb-6">{{ $t("message.65") }}</v-card-title>
        <v-card-text>
          <v-row justify="center">
            <v-col
              cols="12"
              v-for="(filter, idxFilter) in dataFilters"
              :key="`filter-${idxFilter}`"
              class="mb-4"
            >
              <v-autocomplete
                dense
                :chips="filter.multiple"
                :deletable-chips="filter.multiple"
                :small-chips="filter.multiple"
                clearable
                hide-details
                item-text="title"
                item-value="value"
                class="shrink"
                v-model="selectDataFilters[filter.field]"
                :label="filter.label"
                :multiple="filter.multiple"
                :items="filter.items"
                @input="getDocumentList()"
              >
                <template v-slot:prepend>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        fab
                        dark
                        small
                        depressed
                        :color="filter.negation ? btnBlue.bg : btnRed.bg"
                        @click="
                          [
                            (filter.negation = !filter.negation),
                            getDocumentList(),
                          ]
                        "
                      >
                        <v-icon
                          :color="filter.negation ? btnBlue.icon : btnRed.icon"
                          v-on="on"
                          >{{
                            filter.negation ? "mdi-minus" : "mdi-plus"
                          }}</v-icon
                        >
                      </v-btn>
                    </template>
                    {{ $t("message.69") }}
                  </v-tooltip>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import slug from "slug";
import fillRange from "fill-range";

export default {
  name: "DocumentList",

  data: () => ({
    deleteAllDocsFlag: false,
    docsToBeDeleted: [],
    countPerPage: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    showFilterDoc: false,
  }),

  computed: {
    ...mapState(["serviceList", "btnRed", "btnBlue", "btnGreen"]),
    ...mapState("documentList", [
      "documents",
      "currentPageNumber",
      "pageCount",
      "progressionStep",
      "docsPerPage",
      "sortDocList",
      "sortDirectDocList",
      "sortTypes",
      "searchQuery",
      "dataFilters",
      "selectDataFilters",
      "blockPagination",
      "blockLoadDocs",
    ]),
    updateCurrentPageNumber: {
      get: function () {
        return this.currentPageNumber;
      },
      set: function (num) {
        this.deleteAllDocsFlag = false;
        this.docsToBeDeleted = [];
        this.setCurrentPageNumber(num);
      },
    },
    updateSearchQuery: {
      get: function () {
        return this.searchQuery;
      },
      set: function (text) {
        this.setSearchQuery(text ? text.trim() : text);
      },
    },
    updateDocsPerPage: {
      get: function () {
        return this.docsPerPage;
      },
      set: function (num) {
        this.setDocsPerPage(num);
      },
    },
    updateSortDocList: {
      get: function () {
        return this.sortDocList;
      },
      set: function (sort) {
        this.setSortDocList(sort);
      },
    },
    updateSortDirectDocList: {
      get: function () {
        return this.sortDirectDocList;
      },
      set: function (direc) {
        this.setSortDirectDocList(direc);
      },
    },
    // Get Title of collection.
    collectionTitle: function () {
      const indexService = this.$route.params.indexService;
      const indexCollection = this.$route.params.indexCollection;
      return this.serviceList[indexService].collections[indexCollection].title;
    },
    // Get the route scheme to the collection.
    breadcrumbs: function () {
      const indexService = this.$route.params.indexService;
      const serviceTitle = this.serviceList[indexService].service.title;
      return `${serviceTitle} > ${this.collectionTitle}`;
    },
    // Document url without hash.
    docUrlNoIndex: function () {
      const currentUserLocale = this.$i18n.locale;
      const indexService = this.$route.params.indexService;
      const indexCollection = this.$route.params.indexCollection;
      const service = this.serviceList[indexService];
      const slugServiceTitle = slug(service.service.title, {
        locale: currentUserLocale,
      });
      const slugCollectionTitle = slug(this.collectionTitle, {
        locale: currentUserLocale,
      });
      return `/${slugServiceTitle}/${indexService}/${slugCollectionTitle}/${indexCollection}/document`;
    },
    // Get field list.
    fields: function () {
      const indexService = this.$route.params.indexService;
      const indexCollection = this.$route.params.indexCollection;
      return this.serviceList[indexService].collections[indexCollection].fields;
    },
  },

  watch: {
    blockLoadDocs: function (flag) {
      if (!flag) {
        this.deleteAllDocsFlag = false;
        this.docsToBeDeleted = [];
      }
    },
  },

  filters: {
    upperCase: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.toUpperCase();
    },
  },

  methods: {
    ...mapMutations("documentList", [
      "setCurrentPageNumber",
      "setProgressionStep",
      "setDocsPerPage",
      "setSortDocList",
      "setSortDirectDocList",
      "setSearchQuery",
    ]),
    ...mapMutations("popUpMsgs", ["setShowMsg"]),
    ...mapActions("documentList", [
      "ajaxGetDocumentList",
      "ajaxGetDataFilters",
      "resetPageNumberDefault",
    ]),
    ...mapActions("popUpMsgs", ["runShowMsg"]),
    ...mapActions("overlays", ["runShowOverlayPageLockout"]),
    // Router - Go back one step.
    goBack() {
      this.setShowMsg(false);
      this.$router.replace({ name: "home" });
    },
    // Data from the clipboard, paste into the search field.
    pasteSearchData() {
      this.updateSearchQuery = "";
      navigator.clipboard.readText().then((clipText) => {
        this.updateSearchQuery = clipText;
        this.documentSearch();
      });
    },
    // Sorting options for the list of documents.
    itemsSortDocList() {
      return [
        { text: this.$t("message.40"), value: this.sortTypes[0] },
        { text: this.$t("message.29"), value: this.sortTypes[1] },
        { text: this.$t("message.30"), value: this.sortTypes[2] },
      ];
    },
    // Sort direction options.
    itemsSortDirectDocList() {
      return [
        { text: this.$t("message.42"), value: -1 },
        { text: this.$t("message.43"), value: 1 },
      ];
    },
    // Refresh the number of documents per page.
    changeDocsPerPage() {
      const url = `${window.location.protocol}//${window.location.host}/admin${this.$route.path}?per=${this.docsPerPage}&page=1&sort=${this.sortDocList}&direct=${this.sortDirectDocList}`;
      document.location.replace(url);
    },
    // Copy document link name to clipboard.
    copyLinkNameDoc(linkName) {
      navigator.clipboard.writeText(linkName).then(
        () => {
          /* clipboard successfully set */
        },
        () => {
          this.runShowMsg({ text: "Clipboard write failed.", status: "error" });
        }
      );
    },
    // Copy document ID to clipboard.
    copyHashDoc(hash) {
      navigator.clipboard.writeText(hash).then(
        () => {
          /* clipboard successfully set */
        },
        () => {
          this.runShowMsg({ text: "Clipboard write failed.", status: "error" });
        }
      );
    },
    // Get a list of documents.
    getDocumentList() {
      this.setShowMsg(false);
      this.runShowOverlayPageLockout(true);
      if (this.docsToBeDeleted.length > 0) {
        this.deleteAllDocsFlag = false;
        this.docsToBeDeleted = [];
      }
      return new Promise((resolve, reject) => {
        this.ajaxGetDocumentList()
          .then(() => {
            this.runShowOverlayPageLockout(false);
            resolve();
          })
          .catch((error) => {
            console.log(error);
            this.runShowOverlayPageLockout(false);
            this.runShowMsg({ text: error, status: "error" });
            reject(error);
          });
      });
    },
    // After changing the page number, update the url state.
    refreshUrlState() {
      const numPage = this.currentPageNumber;
      this.setProgressionStep(this.docsPerPage * (numPage - 1) + 1);
      this.$route.query.page = numPage;
      const url = `${window.location.protocol}//${window.location.host}/admin${this.$route.path}?per=${this.docsPerPage}&page=${numPage}&sort=${this.sortDocList}&direct=${this.sortDirectDocList}`;
      history.replaceState(null, null, url);
    },
    // Documents search.
    documentSearch() {
      // Get a list of documents.
      if (this.blockLoadDocs) {
        setTimeout(() => {
          this.documentSearch();
        }, 100);
      } else {
        // Reset page number to default.
        this.resetPageNumberDefault(this.getRequestParams());
        // Request a list of documents.
        this.getDocumentList();
      }
    },
    // Get Url address to document form.
    getDocFormUrl(indexDoc) {
      return `${this.docUrlNoIndex}/${indexDoc}`;
    },
    // Formatting date.
    formattingDate(date) {
      const local = new Date(date + "Z");
      const localDate = local.toLocaleDateString([this.$i18n.locale, "en"]);
      const localTime = local.toLocaleTimeString().slice(0, 8);
      return `<span class="cyan--text text--darken-2">${localDate}</span> <span class="orange--text text--darken-2">${localTime}</span>`;
    },
    // Mark all documents for deletion.
    markAllDocsForDeletion() {
      this.docsToBeDeleted = this.deleteAllDocsFlag
        ? fillRange(0, this.documents.length - 1)
        : [];
    },
    // Check the status of the list of selected documents to be deleted.
    checkStatusListSelectedDocsDeleted() {
      this.deleteAllDocsFlag =
        this.docsToBeDeleted.length === this.documents.length;
    },
    // Restart the list of documents for with the correct number of pages.
    restartDocList() {
      let numPage = this.currentPageNumber;
      if (numPage > 1 && this.pageCount < numPage) {
        const url = `${window.location.protocol}//${
          window.location.host
        }/admin${this.$route.path}?per=${
          this.docsPerPage
        }&page=${--numPage}&sort=${this.sortDocList}&direct=${
          this.sortDirectDocList
        }`;
        document.location.replace(url);
      }
    },
    // Delete selected documents.
    deleteDocs() {
      this.setShowMsg(false);
      this.runShowOverlayPageLockout(true);
      const indexService = this.$route.params.indexService;
      const indexCollection = this.$route.params.indexCollection;
      const service = this.serviceList[indexService];
      const docHashList = [];
      this.docsToBeDeleted.forEach((idx) => {
        docHashList.push(this.documents[idx].hash);
      });
      const payload = {
        model_key: service.collections[indexCollection].model_key,
        doc_hash_list: docHashList,
      };
      this.axios
        .post("/admin/delete-many-doc", payload)
        .then((response) => {
          const data = response.data;
          if (!data.is_authenticated) {
            this.runShowOverlayPageLockout(false);
            this.setIsAuthenticated(false);
          } else if (data.msg_err.length === 0) {
            this.setShowMsg(false);
            this.getDocumentList().then(() => {
              this.restartDocList();
            });
          } else {
            console.log(data.msg_err);
            this.runShowOverlayPageLockout(false);
            this.runShowMsg({ text: data.msg_err, status: "error" });
          }
        })
        .catch((error) => {
          console.log(error);
          this.runShowOverlayPageLockout(false);
          this.runShowMsg({ text: error, status: "error" });
        });
    },
    // Get request parameters - per, page, sort, direct.
    getRequestParams() {
      // Page number.
      let numPage = this.$route.query.page;
      numPage = numPage !== undefined ? parseInt(numPage) : 1;
      if (Number.isNaN(numPage)) {
        this.runShowMsg({ text: this.$t("message.36"), status: "error" });
      }
      // The number of documents per page.
      let numPer = this.$route.query.per;
      numPer = numPer !== undefined ? parseInt(numPer) : this.docsPerPage;
      if (Number.isNaN(numPer)) {
        this.runShowMsg({ text: this.$t("message.38"), status: "error" });
      }
      // Sorting type.
      let sortType = this.$route.query.sort;
      sortType = sortType !== undefined ? sortType : this.sortDocList;
      if (!this.sortTypes.includes(sortType)) {
        this.runShowMsg({ text: this.$t("message.44"), status: "error" });
      }
      // Sorting direction.
      let sortDirect = this.$route.query.direct;
      sortDirect =
        sortDirect !== undefined
          ? parseInt(sortDirect)
          : this.sortDirectDocList;
      if (Number.isNaN(sortDirect)) {
        this.runShowMsg({ text: this.$t("message.45"), status: "error" });
      }
      //
      this.setProgressionStep(numPer * (numPage - 1) + 1);
      return { numPage, numPer, sortType, sortDirect };
    },
  },

  created() {
    // Reset page number to default.
    this.resetPageNumberDefault(this.getRequestParams());
    // Get a list of documents.
    if (!this.blockLoadDocs) {
      this.getDocumentList().then(() => {
        this.restartDocList();
        if (this.dataFilters.length === 0) {
          this.ajaxGetDataFilters().catch((error) => {
            console.log(error);
            this.runShowOverlayPageLockout(false);
            this.runShowMsg({ text: error, status: "error" });
          });
        }
      });
    }
  },
};
</script>

<style>
.v-data-table__wrapper > table > thead.document-list > tr > th {
  background: none !important;
  font-size: 0.9rem !important;
  text-align: center !important;
}
.v-data-table__wrapper > table > tbody.document-list > tr > td {
  text-align: center !important;
}
</style>
