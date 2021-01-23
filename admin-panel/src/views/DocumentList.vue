<template>
  <v-container>
    <v-card>
      <v-card-title>{{ collectionTitle }}</v-card-title>
      <v-card-subtitle class="pb-0">{{ breadcrumbs }}</v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DocumentList',

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
  }
}
</script>
