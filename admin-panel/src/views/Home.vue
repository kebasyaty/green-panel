<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200" />
      </v-col>

      <v-col>
        <h1 class="text-h2 font-weight-bold mb-3">Welcome, root.</h1>
        <p class="text-h5 font-weight-regular">Good luck on your business!</p>
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
