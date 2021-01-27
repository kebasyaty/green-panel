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
      <v-card-text class="px-4 py-2">
        <!-- Form for document. -->
        <form>
          <template v-for="field in fields">
            <div :key="field.name">
              <v-alert
                v-if="field.common_msg.length > 0"
                text
                outlined
                color="deep-orange"
                icon="mdi-fire"
              >{{ field.common_msg }}</v-alert>
              <v-text-field
                dense
                solo
                clearable
                v-if="['inputColor'].includes(field.widget)"
                :id="field.id"
                :label="field.label"
                :type="field.input_type"
                :name="field.name"
                :value="field.value"
                :placeholder="field.placeholder"
                :disabled="field.disabled"
                :readonly="field.readonly"
                :class="field.css_classes"
                :hint="field.hint"
                :messages="field.warning"
                :error-messages="field.error"
                :error="field.error.length > 0"
              ></v-text-field>
            </div>
          </template>
        </form>
      </v-card-text>
      <!-- Form control buttons. -->
      <v-card-actions class="pa-4">
        <!-- Delete button. -->
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark outlined small color="red" v-bind="attrs" v-on="on">
              <v-icon>mdi-close-thick</v-icon>
            </v-btn>
          </template>
          <span v-text="$t('message.13')"></span>
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
          <span v-text="$t('message.14')"></span>
        </v-tooltip>
        <!-- Save button and continue editing the document. -->
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark rounded outlined small color="orange" class="mx-4" v-bind="attrs" v-on="on">
              <v-icon>mdi-content-save</v-icon>
              <v-icon>mdi-ampersand</v-icon>
              <v-icon>mdi-file-document-edit-outline</v-icon>
            </v-btn>
          </template>
          <span v-text="$t('message.15')"></span>
        </v-tooltip>
        <!-- Save button. -->
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark rounded outlined small color="blue" v-bind="attrs" v-on="on">
              <v-icon>mdi-content-save</v-icon>
            </v-btn>
          </template>
          <span v-text="$t('message.16')"></span>
        </v-tooltip>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DocumentForm',

  data: () => ({
    fields: {
      field_name: { widget: 'inputColor', id: 'id-field_name', label: 'Label name', input_type: 'color', name: 'field_name', value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', placeholder: 'Enter color', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: 'Nulla in metus id lorem scelerisque condimentum.', error: 'Donec iaculis nunc at risus pretium.', common_msg: 'Proin dolor nibh, imperdiet in odio ac, porttitor blandit ipsum. Etiam sit amet porttitor sapien.' }
    }
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
