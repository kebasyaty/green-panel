<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" class="mt-16 mb-5">
        <v-img :src="require('../assets/logo.svg')" contain height="200" />
      </v-col>

      <v-col cols="12">
        <h1 class="text-h2 font-weight-bold mb-3">Welcome, root.</h1>
        <p class="text-h5 font-weight-regular orange--text">Good luck on your business!</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  components: {
    //
  }
}
</script>
