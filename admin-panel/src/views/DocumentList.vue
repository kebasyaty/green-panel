<template>
  <v-container fluid>
    <v-card class="mt-1">
      <v-card-title>{{ collectionTitle }}</v-card-title>
      <v-card-subtitle class="pb-0">{{ breadcrumbs }}</v-card-subtitle>
      <v-card-text class="pt-4">
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
                  v-for="header in headerList"
                  :key="Object.keys(header)[0]"
                >{{ Object.values(header)[0] }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(document, index) in documentList" :key="index">
                <!-- Delete document. -->
                <td width="76" class="pr-0">
                  <v-checkbox></v-checkbox>
                </td>
                <!-- Number of the document in the table. -->
                <td width="76" class="pr-0">{{ index + 1 }}</td>
                <!-- Document list. -->
                <td
                  v-for="header in headerList"
                  :key="Object.keys(header)[0]"
                >{{ document[Object.keys(header)[0]] }}</td>
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

export default {
  name: 'DocumentList',

  data: () => ({
    // Search query.
    searchQuery: null,
    headerList: [{ title: 'Title' }],
    documentList: [
      { title: 'Document name 1' }
    ]
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
    documentSearch: function () {
      if (this.searchQuery !== null) {
        window.console.log(this.searchQuery)
      }
    }
  }
}
</script>
