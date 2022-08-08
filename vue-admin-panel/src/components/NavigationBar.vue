<template>
  <v-navigation-drawer
    app
    v-model="updateOpenPanelServiceList"
    :width="updatePanelWidthServiceList"
    class="pa-1"
  >
    <!-- Company name and short description. -->
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">{{ brand }}</v-list-item-title>
        <v-list-item-subtitle>{{ slogan }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <!-- Change the width of the panel. -->
    <v-list-item class="panel-width-service-list pl-1">
      <v-list-item-content>
        <v-slider
          dense
          hide-details
          v-model="updatePanelWidthServiceList"
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
      <v-expansion-panel
        v-for="(item, indexService) in serviceList"
        :key="item.service.title"
      >
        <v-expansion-panel-header
          class="text-subtitle-1 font-weight-medium pl-0"
        >
          <div class="pl-1 service-list__icon">
            <v-icon
              class="pos-relative pos-top-n2"
              v-text="`mdi-${item.service.icon}`"
            ></v-icon>
          </div>
          <span class>{{ item.service.title }}</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="service-list__content">
          <!-- Ccollection list -->
          <v-list shaped dense>
            <v-list-item-group
              v-model="selectedService[indexService]"
              color="primary"
            >
              <v-list-item
                v-for="(collection, indexCollection) in item.collections"
                :key="collection.model_key"
                class="px-1"
                @click="
                  [
                    resetPageNumberDefault(getRequestParams()),
                    getDocumentList({ indexService, indexCollection }),
                    resetPreActivatedService(indexService),
                  ]
                "
                :to="
                  createUrlDocumentList(
                    item.service.title,
                    collection.title,
                    indexService,
                    indexCollection
                  )
                "
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
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import slug from "slug";

export default {
  name: "NavigationBar",

  computed: {
    ...mapState([
      "brand",
      "slogan",
      "openPanelServiceList",
      "panelWidthServiceList",
      "selectedService",
      "serviceList",
    ]),
    ...mapState("documentList", [
      "docsPerPage",
      "sortDocList",
      "sortDirectDocList",
      "sortTypes",
    ]),
    updateOpenPanelServiceList: {
      get: function () {
        return this.openPanelServiceList;
      },
      set: function (flag) {
        this.setOpenPanelServiceList(flag);
      },
    },
    updatePanelWidthServiceList: {
      get: function () {
        return this.panelWidthServiceList;
      },
      set: function (num) {
        this.setPanelWidthServiceList(num);
      },
    },
  },

  methods: {
    ...mapMutations([
      "setOpenPanelServiceList",
      "setPanelWidthServiceList",
      "setSelectedService",
    ]),
    ...mapMutations("documentList", [
      "setProgressionStep",
      "setSearchQuery",
      "setDataFilters",
      "setSelectDataFilters",
      "setBlockLoadDocs",
    ]),
    ...mapMutations("popUpMsgs", ["setShowMsg"]),
    ...mapActions("documentList", [
      "ajaxGetDocumentList",
      "ajaxGetDataFilters",
      "resetPageNumberDefault",
    ]),
    ...mapActions("popUpMsgs", ["runShowMsg"]),
    ...mapActions("pageLockout", ["runShowOverlayPageLockout"]),
    // List of services - Resetting previously activated items.
    resetPreActivatedService: function (currIndex) {
      this.setSelectedService(
        this.selectedService.map(function (item, idx) {
          if (idx !== currIndex) {
            item = undefined;
          }
          return item;
        })
      );
    },
    // Create Url for Document list.
    createUrlDocumentList: function (
      serviceTitle,
      collectionTitle,
      indexService,
      indexCollection
    ) {
      const currentUserLocale = this.$i18n.locale;
      const slugServiceTitle = slug(serviceTitle, {
        locale: currentUserLocale,
      });
      const slugCollectionTitle = slug(collectionTitle, {
        locale: currentUserLocale,
      });
      //
      let numPer = this.$route.query.per;
      numPer = numPer !== undefined ? parseInt(numPer) : this.docsPerPage;
      if (Number.isNaN(numPer)) {
        this.runShowMsg({ text: this.$t("message.38"), status: "error" });
      }
      //
      return `/${slugServiceTitle}/${indexService}/${slugCollectionTitle}/${indexCollection}/document-list?per=${numPer}&page=1&sort=alphabetical_links&direct=-1`;
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
    // Get a list of documents.
    getDocumentList: function (payload) {
      this.setShowMsg(false);
      this.runShowOverlayPageLockout(true);
      this.setBlockLoadDocs(true);
      this.setSearchQuery(null);
      this.resetPageNumberDefault(this.getRequestParams());
      this.setDataFilters([]);
      this.setSelectDataFilters({});
      this.ajaxGetDocumentList(payload)
        .then(() => {
          this.runShowOverlayPageLockout(false);
          setTimeout(() => {
            this.setBlockLoadDocs(false);
            this.ajaxGetDataFilters(payload).catch((error) => {
              console.log(error);
              this.runShowOverlayPageLockout(false);
              this.runShowMsg({ text: error, status: "error" });
            });
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
          this.runShowOverlayPageLockout(false);
          this.runShowMsg({ text: error, status: "error" });
          setTimeout(() => this.setBlockLoadDocs(false), 1000);
        });
    },
  },
};
</script>
