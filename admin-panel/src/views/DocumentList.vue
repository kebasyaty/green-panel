<template>
  <v-container>
    <v-card>
      <v-card-title>{{ serviceList[$route.params.index_service].service.title }}</v-card-title>
      <v-card-subtitle
        class="pb-0"
        :text="`/${$route.params.service}/${$route.params.collection}/`"
      ></v-card-subtitle>
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
