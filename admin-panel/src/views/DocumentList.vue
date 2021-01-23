<template>
  <v-container>
    <v-card>
      <v-card-title>{{ serviceList[$route.params.indexService].collections[$route.params.indexCollection].title }}</v-card-title>
      <v-card-subtitle
        class="pb-0"
      >{{ `${serviceList[$route.params.indexService].service.title} > ${serviceList[$route.params.indexService].collections[$route.params.indexCollection].title}` }}</v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DocumentList',

  components: {
    //
  },

  computed: {
    ...mapState([
      'serviceList'
    ])
  }
}
</script>
