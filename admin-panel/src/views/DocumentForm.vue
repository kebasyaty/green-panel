<template>
  <v-container fluid>
    <v-card class="mt-1">
      <v-toolbar dense flat>
        <v-btn icon @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-title class="pt-0">Document Name</v-card-title>
      <v-card-subtitle>breadcrumbs</v-card-subtitle>
      <v-card-text></v-card-text>
    </v-card>
  </v-container>
</template>

<script>

export default {
  name: 'DocumentForm',

  data: () => ({
  }),

  computed: {
  },

  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>
