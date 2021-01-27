<template>
  <v-container>
    <v-card class="mt-1">
      <v-toolbar dense flat>
        <v-btn icon @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-title class="pt-0">{{ docTitle }}</v-card-title>
      <v-card-subtitle>{{ breadcrumbs }}</v-card-subtitle>
      <form>
        <v-card-text class="mt-2 pa-2">
          <!-- -->
        </v-card-text>
        <v-card-actions class="pa-4">
          <!-- Delete button. -->
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark outlined small color="red" v-bind="attrs" v-on="on">
                <v-icon>mdi-close-thick</v-icon>
              </v-btn>
            </template>
            <span>Delete document</span>
          </v-tooltip>
          <v-spacer></v-spacer>
          <!-- Save button and create a new document. -->
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark rounded outlined small color="green" v-bind="attrs" v-on="on">
                <v-icon>mdi-content-save</v-icon>
                <v-icon>mdi-ampersand</v-icon>
                <v-icon>mdi-file-outline</v-icon>
              </v-btn>
            </template>
            <span>Save and create a new document</span>
          </v-tooltip>
          <!-- Save button and continue editing the document. -->
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                rounded
                outlined
                small
                color="orange"
                class="mx-4"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-content-save</v-icon>
                <v-icon>mdi-ampersand</v-icon>
                <v-icon>mdi-file-document-edit-outline</v-icon>
              </v-btn>
            </template>
            <span>Save and continue editing the document</span>
          </v-tooltip>
          <!-- Save button. -->
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark rounded outlined small color="blue" v-bind="attrs" v-on="on">
                <v-icon>mdi-content-save</v-icon>
              </v-btn>
            </template>
            <span>Save document</span>
          </v-tooltip>
        </v-card-actions>
      </form>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DocumentForm',

  data: () => ({
  }),

  computed: {
    ...mapState([
      'serviceList'
    ]),
    ...mapState('documentList', [
      'headers',
      'documents'
    ]),
    docTitle: function () {
      const indexDoc = this.$route.params.indexDoc
      const docTitle = this.documents[indexDoc][Object.keys(this.headers[0])[0]]
      return docTitle
    },
    breadcrumbs: function () {
      const indexService = this.$route.params.indexService
      const indexCollection = this.$route.params.indexCollection
      const service = this.serviceList[indexService]
      return `${service.service.title} > ${service.collections[indexCollection].title} > ${this.docTitle}`
    }
  },

  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>
