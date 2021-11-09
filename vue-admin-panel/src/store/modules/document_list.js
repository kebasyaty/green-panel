import Vue from "vue";
import router from "@/router";

export default {
  namespaced: true,

  state: {
    documents: [],
    currentPageNumber: 1,
    pageCount: 0,
    progressionStep: 1,
    docsPerPage: 50,
    sortDocList: "alphabetical_links",
    sortDirectDocList: -1,
    sortTypes: ["alphabetical_links", "created", "updated"],
    searchQuery: null,
    // Ajax get data of filters.
    dataFilters: [],
    selectDataFilters: {},
    //
    blockPagination: false,
    // block loading of documents
    blockLoadDocs: false,
  },

  getters: {},

  mutations: {
    setDocuments(state, payload) {
      state.documents = payload;
    },
    setCurrentPageNumber(state, payload) {
      state.currentPageNumber = payload;
    },
    setPageCount(state, payload) {
      state.pageCount = payload;
    },
    setProgressionStep(state, payload) {
      state.progressionStep = payload;
    },
    setDocsPerPage(state, payload) {
      state.docsPerPage = payload;
    },
    setSortDocList(state, payload) {
      state.sortDocList = payload;
    },
    setSortDirectDocList(state, payload) {
      state.sortDirectDocList = payload;
    },
    setSearchQuery(state, payload) {
      state.searchQuery = payload;
    },
    setDataFilters(state, payload) {
      state.dataFilters = payload;
    },
    setSelectDataFilters(state, payload) {
      state.selectDataFilters = payload;
    },
    setBlockPagination(state, payload) {
      state.blockPagination = payload;
    },
    setBlockLoadDocs(state, payload) {
      state.blockLoadDocs = payload;
    },
  },

  actions: {
    // Get a list of documents.
    ajaxGetDocumentList({ state, commit, rootState }, payload = {}) {
      return new Promise((resolve, reject) => {
        let collection;
        if ("indexService" in payload && "indexCollection" in payload) {
          collection =
            rootState.serviceList[payload.indexService].collections[
              payload.indexCollection
            ];
        } else {
          collection =
            rootState.serviceList[router.currentRoute.params.indexService]
              .collections[router.currentRoute.params.indexCollection];
        }
        const filters = {};
        for (let idx = 0; idx < state.dataFilters.length; idx++) {
          const filter = state.dataFilters[idx];
          const key = filter.field;
          const value = state.selectDataFilters[key];
          if (value !== null) {
            if (Array.isArray(value)) {
              if (value.length > 0) {
                filters[key] = {
                  value: value.map(String),
                  negation: filter.negation,
                };
              }
            } else {
              filters[key] = {
                value: String(value),
                negation: filter.negation,
              };
            }
          }
        }
        const payloadQuery = {
          model_key: collection.model_key,
          fields_name: collection.fields.map((item) => item.field),
          page_num: state.currentPageNumber,
          search_query: state.searchQuery || "",
          limit: state.docsPerPage,
          sort: state.sortDocList,
          direct: state.sortDirectDocList,
          filters,
        };
        Vue.axios
          .post("/admin/document-list", payloadQuery)
          .then((response) => {
            const data = response.data;
            if (!data.is_authenticated) {
              commit("setIsAuthenticated", false, { root: true });
            } else if (data.msg_err.length === 0) {
              commit("setPageCount", data.page_count);
              commit("setDocuments", data.documents);
              resolve();
            } else {
              window.console.log(data.msg_err);
              reject(data.msg_err);
            }
          })
          .catch((error) => {
            window.console.log(error);
            reject(error);
          });
      });
    },
    // Ajax get data of filters.
    ajaxGetDataFilters({ commit, rootState }, payload = {}) {
      return new Promise((resolve, reject) => {
        let collection;
        if ("indexService" in payload && "indexCollection" in payload) {
          collection =
            rootState.serviceList[payload.indexService].collections[
              payload.indexCollection
            ];
        } else {
          collection =
            rootState.serviceList[router.currentRoute.params.indexService]
              .collections[router.currentRoute.params.indexCollection];
        }
        const payloadQuery = {
          model_key: collection.model_key,
        };
        Vue.axios
          .post("/admin/data-filters", payloadQuery)
          .then((response) => {
            const data = response.data;
            if (!data.is_authenticated) {
              commit("setIsAuthenticated", false, { root: true });
            } else if (data.msg_err.length === 0) {
              const filters = data.filters;
              const selectDataFilters = {};
              filters.sort(function (item, item2) {
                if (item.label > item2.label) {
                  return 1;
                }
                if (item.label < item2.label) {
                  return -1;
                }
                return 0;
              });
              filters.forEach((item) => {
                selectDataFilters[item.field] = null;
              });
              commit("setSelectDataFilters", selectDataFilters);
              commit("setDataFilters", filters);
              resolve();
            } else {
              window.console.log(data.msg_err);
              reject(data.msg_err);
            }
          })
          .catch((error) => {
            window.console.log(error);
            reject(error);
          });
      });
    },
    // Reset page number to default.
    resetPageNumberDefault({ commit }, payload) {
      commit("setBlockPagination", true);
      commit("setDocsPerPage", payload.numPer);
      commit("setCurrentPageNumber", payload.numPage);
      commit("setSortDocList", payload.sortType);
      commit("setSortDirectDocList", payload.sortDirect);
      commit("setBlockPagination", false);
    },
  },
};
