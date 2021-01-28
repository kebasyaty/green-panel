<template>
  <v-container>
    <!-- Form for document. -->
    <v-card class="mt-1">
      <v-toolbar dense flat>
        <v-btn icon @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-title class="pt-0">{{ docTitle }}</v-card-title>
      <v-card-subtitle>{{ breadcrumbs }}</v-card-subtitle>
      <!-- Form fields. -->
      <v-card-text class="px-4 py-2">
        <template v-for="field in fields">
          <div :key="field.name" class="rounded-lg">
            <div>
              <v-alert
                v-if="field.common_msg.length > 0"
                dark
                color="pink darken-4"
                icon="mdi-alert"
              >{{ field.common_msg }}</v-alert>
            </div>
            <v-card flat outlined class="mt-8">
              <v-card-text>
                <v-card-title class="pa-0 text-subtitle-1 font-weight-medium">{{ field.label }}</v-card-title>
                <v-card-subtitle class="pl-0 pb-1 pt-3">{{ field.hint }}</v-card-subtitle>

                <!-- Text fields -->
                <v-text-field
                  dense
                  shaped
                  clearable
                  hide-details
                  v-model="models[field.name]"
                  v-if="['inputText', 'inputColor'].includes(field.widget)"
                  :id="field.id"
                  :type="field.input_type"
                  :name="field.name"
                  :placeholder="field.placeholder"
                  :disabled="field.disabled"
                  :readonly="field.readonly"
                  :class="field.css_classes"
                ></v-text-field>

                <!-- Date fields -->
                <v-menu
                  v-model="menu[field.name]"
                  v-if="['inputDate'].includes(field.widget)"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      dense
                      shaped
                      clearable
                      hide-details
                      prepend-icon="mdi-calendar"
                      v-model="models[field.name]"
                      :id="field.id"
                      :type="field.input_type"
                      :name="field.name"
                      :placeholder="field.placeholder"
                      :disabled="field.disabled"
                      readonly
                      :class="field.css_classes"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="models[field.name]"
                    @input="menu[field.name] = false"
                    no-title
                    scrollable
                  ></v-date-picker>
                </v-menu>

                <v-card-subtitle
                  v-if="field.warning.length > 0"
                  class="pl-0 pb-0 pt-1 warning--text"
                >{{ field.warning }}</v-card-subtitle>
                <v-card-subtitle
                  v-if="field.error.length > 0"
                  class="pl-0 pb-0 pt-1 error--text"
                >{{ field.error }}</v-card-subtitle>
              </v-card-text>
            </v-card>
          </div>
        </template>
      </v-card-text>
      <!-- Form control buttons. -->
      <v-card-actions class="pt-8 px-4 pb-4">
        <!-- Delete button. -->
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark rounded outlined small color="red" v-bind="attrs" v-on="on">
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
    date: new Date().toISOString().substr(0, 10),
    datetime: new Date().toISOString().substr(0, 16),
    menu: { field_date: false, field_datetime: false },
    models: { field_text: 'Lorem ipsum dolor sit amet', field_color: '#3BE40C', field_date: '', field_datetime: '' },
    fields: [
      { widget: 'inputText', id: 'id-field-name', label: 'Label Text', input_type: 'text', name: 'field_text', value: 'Lorem ipsum dolor sit amet', placeholder: 'Enter text', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: 'Praesent in ligula maximus, viverra nulla sed, aliquam est.', error: 'Pellentesque sit amet lorem sed leo pharetra pretium.', common_msg: 'Proin dolor nibh, imperdiet in odio ac, porttitor blandit ipsum. Etiam sit amet porttitor sapien.' },
      { widget: 'inputColor', id: 'id-field-name-2', label: 'Label Color', input_type: 'color', name: 'field_color', value: '#3BE40C', placeholder: 'Enter color', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '' },
      { widget: 'inputDate', id: 'id-field-name-3', label: 'Label Date', input_type: 'date', name: 'field_date', value: '', placeholder: 'Enter date', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', min: '', max: '' },
      { widget: 'inputDateTime', id: 'id-field-name-4', label: 'Label DateTime', input_type: 'datetime', name: 'field_datetime', value: '', placeholder: 'Enter date and time', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', min: '', max: '' }
    ]
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
