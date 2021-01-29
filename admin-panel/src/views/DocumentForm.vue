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
                <v-card-subtitle
                  v-if="field.hint.length > 0"
                  class="pl-0 pb-1 pt-3"
                >{{ field.hint }}</v-card-subtitle>

                <!-- Text fields -->
                <v-text-field
                  dense
                  shaped
                  clearable
                  hide-details
                  prepend-icon="mdi-note-text-outline"
                  v-model="fieldData[field.name]"
                  v-if="['inputText', 'inputEmail', 'inputPassword', 'inputPhone', 'inputUrl', 'inputIP', 'inputIPv4', 'inputIPv6'].includes(field.widget)"
                  :id="field.id"
                  :type="field.input_type"
                  :name="field.name"
                  :placeholder="field.placeholder"
                  :disabled="field.disabled"
                  :readonly="field.readonly"
                  :class="field.css_classes"
                ></v-text-field>

                <!-- Color fields -->
                <v-menu
                  v-model="menu[field.name]"
                  v-if="['inputColor'].includes(field.widget)"
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
                      prepend-icon="mdi-palette-outline"
                      v-model="fieldData[field.name]"
                      :id="field.id"
                      type="text"
                      :name="field.name"
                      :placeholder="field.placeholder"
                      :disabled="field.disabled"
                      readonly
                      :class="field.css_classes"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-color-picker
                    show-swatches
                    v-model="fieldData[field.name]"
                    @input="menu[field.name] = false"
                  ></v-color-picker>
                </v-menu>

                <!-- Textarea fields -->
                <v-textarea
                  dense
                  shaped
                  clearable
                  hide-details
                  prepend-icon="mdi-script-text-outline"
                  v-model="fieldData[field.name]"
                  v-if="['textArea'].includes(field.widget)"
                  :id="field.id"
                  :name="field.name"
                  :placeholder="field.placeholder"
                  :disabled="field.disabled"
                  :readonly="field.readonly"
                  :class="field.css_classes"
                ></v-textarea>

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
                      v-model="fieldData[field.name]"
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
                    v-model="fieldData[field.name]"
                    @input="menu[field.name] = false"
                    no-title
                    scrollable
                    color="primary"
                    :min="field.min"
                    :max="field.max"
                  ></v-date-picker>
                </v-menu>

                <!-- Date and Time fields -->
                <v-row v-if="['inputDateTime'].includes(field.widget)">
                  <v-col cols="6">
                    <v-menu
                      v-model="menu[field.name]"
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
                          v-model="fieldData[field.name]"
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
                        scrollable
                        v-model="fieldData[field.name]"
                        @input="menu[field.name] = false"
                        year-icon="mdi-calendar-blank"
                        color="primary"
                        :min="field.min"
                        :max="field.max"
                        :locale="$i18n.locale"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="6">
                    <v-menu
                      :ref="`${field.name}__time`"
                      v-model="menu[`${field.name}__time`]"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="fieldData[`${field.name}__time`]"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          dense
                          shaped
                          clearable
                          hide-details
                          prepend-icon="mdi-clock-time-four-outline"
                          v-model="fieldData[`${field.name}__time`]"
                          :id="field.id"
                          :type="field.input_type"
                          :name="`${field.name}__time`"
                          :placeholder="field.placeholder"
                          :disabled="field.disabled"
                          readonly
                          :class="field.css_classes"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        full-width
                        scrollable
                        v-if="menu[`${field.name}__time`]"
                        v-model="fieldData[`${field.name}__time`]"
                        @click:minute="$refs[`${field.name}__time`][0].save(fieldData[`${field.name}__time`])"
                      ></v-time-picker>
                    </v-menu>
                  </v-col>
                </v-row>

                <!-- Messages for field. -->
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
            <v-btn dark depressed small color="error" v-bind="attrs" v-on="on">
              <v-icon>mdi-close-thick</v-icon>
            </v-btn>
          </template>
          <span v-text="$t('message.13')"></span>
        </v-tooltip>
        <v-spacer></v-spacer>
        <!-- Save button and create a new document. -->
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark depressed small color="success" v-bind="attrs" v-on="on">
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
            <v-btn dark depressed small color="warning" class="mx-4" v-bind="attrs" v-on="on">
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
            <v-btn dark depressed small color="primary" v-bind="attrs" v-on="on">
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
    menu: { field_date: false, field_color: false, field_datetime: false, field_datetime__time: false },
    fieldData: { field_text: 'Lorem ipsum dolor sit amet', field_color: '#3BE40C', field_date: new Date().toISOString().substr(0, 10), field_datetime: new Date().toISOString().substr(0, 10), field_datetime__time: '00:00', field_email: '', field_password: '', field_phone: '', field_url: '', field_ip: '', field_ipv4: '', field_ipv6: '', field_textarea: '', required: true },
    fields: [
      { widget: 'inputText', id: 'id-text', label: 'Label Text', input_type: 'text', name: 'field_text', value: 'Lorem ipsum dolor sit amet', placeholder: 'Enter text', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', required: true },
      { widget: 'inputColor', id: 'id-color', label: 'Label Color', input_type: 'color', name: 'field_color', value: '#3BE40C', placeholder: 'Enter color', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '' },
      { widget: 'inputDate', id: 'id-date', label: 'Label Date', input_type: 'date', name: 'field_date', value: '', placeholder: 'Enter date', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', min: '', max: '' },
      { widget: 'inputDateTime', id: 'id-datetime', label: 'Label Date and Time', input_type: 'datetime', name: 'field_datetime', value: '', placeholder: 'Enter date and time', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', min: '', max: '', required: true },
      { widget: 'inputEmail', id: 'id-email', label: 'Label E-mail', input_type: 'email', name: 'field_email', value: '', placeholder: 'Enter email', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', required: true },
      { widget: 'inputPassword', id: 'id-passwordl', label: 'Label Password', input_type: 'password', name: 'field_password', value: '', placeholder: 'Enter password', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', required: true },
      { widget: 'inputPhone', id: 'id-phone', label: 'Label Phone', input_type: 'tel', name: 'field_phone', value: '', placeholder: 'Enter phone', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', required: true },
      { widget: 'inputUrl', id: 'id-url', label: 'Label Url', input_type: 'url', name: 'field_url', value: '', placeholder: 'Enter url', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', required: true },
      { widget: 'inputIP', id: 'id-ip', label: 'Label IP', input_type: 'text', name: 'field_ip', value: '', placeholder: 'Enter ip', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', required: true },
      { widget: 'inputIPv4', id: 'id-ip-v4', label: 'Label IPv4', input_type: 'text', name: 'field_ipv4', value: '', placeholder: 'Enter ipv4', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', required: true },
      { widget: 'inputIPv6', id: 'id-ip-v6', label: 'Label IPv6', input_type: 'text', name: 'field_ipv6', value: '', placeholder: 'Enter ipv6', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', required: true },
      { widget: 'textArea', id: 'id-textarea', label: 'Label Textarea', input_type: 'textarea', name: 'field_textarea', value: '', placeholder: 'Enter textarea', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', required: true }
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
