<template>
  <!-- Footer and control buttons. -->
  <v-footer fixed class="pr-0" color="transparent">
    <v-card flat tile width="100%">
      <v-divider></v-divider>
      <v-footer color="transparent" class="pb-0">
        <!-- Delete button. -->
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn rounded small depressed color="error" v-bind="attrs" v-on="on">
              <v-icon color="white">mdi-close-thick</v-icon>
            </v-btn>
          </template>
          <span>Delete document</span>
        </v-tooltip>
        <v-spacer></v-spacer>
        <!-- Save button and create a new document. -->
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn rounded small depressed color="success" v-bind="attrs" v-on="on">
              <v-icon color="white">mdi-content-save</v-icon>
              <v-icon color="white">mdi-ampersand</v-icon>
              <v-icon color="white">mdi-file-outline</v-icon>
            </v-btn>
          </template>
          <span>Save and create a new document</span>
        </v-tooltip>
        <!-- Save button and continue editing the document. -->
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn rounded small depressed color="warning" class="mx-4" v-bind="attrs" v-on="on">
              <v-icon color="white">mdi-content-save</v-icon>
              <v-icon color="white">mdi-ampersand</v-icon>
              <v-icon color="white">mdi-file-document-edit-outline</v-icon>
            </v-btn>
          </template>
          <span>Save and continue editing the document</span>
        </v-tooltip>
        <!-- Save button. -->
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn rounded small depressed color="primary" v-bind="attrs" v-on="on">
              <v-icon color="white">mdi-content-save</v-icon>
            </v-btn>
          </template>
          <span>Save document</span>
        </v-tooltip>
      </v-footer>
    </v-card>
  </v-footer>
</template>

<script>

export default {
  name: 'Footer',
  components: {
    //
  }
}
</script>
