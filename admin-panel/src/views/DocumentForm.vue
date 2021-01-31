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
      <v-card-text class="pa-4">
        <div v-for="field in fields" :key="field.name" class="rounded-lg">
          <!-- Hidden fields -->
          <input
            v-if="['hiddenText', 'hiddenI32', 'hiddenU32',
                      'hiddenI64', 'hiddenF64'].includes(field.widget)"
            v-model="fieldData[field.name]"
            :label="field.label"
            :id="field.id"
            :type="field.input_type"
            :name="field.name"
          />

          <div v-if="!field.widget.includes('hidden')">
            <v-alert
              v-if="field.common_msg.length > 0"
              dark
              color="pink darken-4"
              icon="mdi-alert"
            >{{ field.common_msg }}</v-alert>

            <v-card flat outlined class="mt-8">
              <v-card-text>
                <v-card-title class="pa-0 text-subtitle-1 font-weight-medium">{{ field.label }}</v-card-title>
                <v-card-subtitle
                  v-if="field.hint.length > 0"
                  class="pl-0 pb-1 pt-3"
                >{{ field.hint }}</v-card-subtitle>

                <!-- Text fields -->
                <v-text-field
                  v-if="['inputText', 'inputEmail', 'inputPassword', 'inputPhone',
                  'inputUrl', 'inputIP', 'inputIPv4', 'inputIPv6'].includes(field.widget)"
                  clearable
                  :prepend-icon="`mdi-${getFieldIcon(field.widget)}`"
                  v-model="fieldData[field.name]"
                  :id="field.id"
                  :type="field.input_type"
                  :name="field.name"
                  :placeholder="field.placeholder"
                  :required="field.required"
                  :disabled="field.disabled"
                  :readonly="field.readonly"
                  :class="field.css_classes"
                  :hint="field.hint"
                  :messages="field.warning"
                  :error-messages="field.error"
                ></v-text-field>

                <!-- Number fields -->
                <v-text-field
                  v-if="['numberI32', 'numberU32', 'numberI64', 'numberF64'].includes(field.widget)"
                  clearable
                  :prepend-icon="`mdi-${getFieldIcon(field.widget)}`"
                  v-model="fieldData[field.name]"
                  :id="field.id"
                  :type="field.input_type"
                  :name="field.name"
                  :placeholder="field.placeholder"
                  :required="field.required"
                  :disabled="field.disabled"
                  :readonly="field.readonly"
                  :step="field.step"
                  :min="field.min"
                  :max="field.max"
                  :class="field.css_classes"
                  :hint="field.hint"
                  :messages="field.warning"
                  :error-messages="field.error"
                ></v-text-field>

                <!-- Slider fields -->
                <v-slider
                  v-if="['rangeI32', 'rangeU32', 'rangeI64', 'rangeF64'].includes(field.widget)"
                  thumb-label
                  :prepend-icon="`mdi-${getFieldIcon(field.widget)}`"
                  v-model="fieldData[field.name]"
                  :id="field.id"
                  :type="field.input_type"
                  :name="field.name"
                  :placeholder="field.placeholder"
                  :required="field.required"
                  :disabled="field.disabled"
                  :readonly="field.readonly"
                  :step="field.step"
                  :min="field.min"
                  :max="field.max"
                  :class="field.css_classes"
                  :hint="field.hint"
                  :messages="field.warning"
                  :error-messages="field.error"
                ></v-slider>

                <!-- Color fields -->
                <v-menu
                  v-if="['inputColor'].includes(field.widget)"
                  :ref="field.name"
                  v-model="vMenu[field.name]"
                  :close-on-content-click="false"
                  :return-value.sync="fieldData[field.name]"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :background-color="fieldData[field.name]"
                      :prepend-icon="`mdi-${getFieldIcon(field.widget)}`"
                      v-model="fieldData[field.name]"
                      :id="field.id"
                      type="text"
                      :name="field.name"
                      :placeholder="field.placeholder"
                      :required="field.required"
                      :disabled="field.disabled"
                      readonly
                      :class="field.css_classes"
                      :hint="field.hint"
                      :messages="field.warning"
                      :error-messages="field.error"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-card>
                    <v-color-picker show-swatches mode="hexa" v-model="fieldData[field.name]"></v-color-picker>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn text small color="primary" @click="vMenu[field.name] = false">Cancel</v-btn>
                      <v-btn
                        text
                        small
                        color="primary"
                        @click="$refs[field.name][0].save(fieldData[field.name])"
                      >OK</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>

                <!-- Textarea fields -->
                <v-textarea
                  v-if="['textArea'].includes(field.widget)"
                  clearable
                  :prepend-icon="`mdi-${getFieldIcon(field.widget)}`"
                  v-model="fieldData[field.name]"
                  :id="field.id"
                  :name="field.name"
                  :placeholder="field.placeholder"
                  :required="field.required"
                  :disabled="field.disabled"
                  :readonly="field.readonly"
                  :class="field.css_classes"
                  :hint="field.hint"
                  :messages="field.warning"
                  :error-messages="field.error"
                ></v-textarea>

                <!-- Date fields -->
                <v-menu
                  v-if="['inputDate'].includes(field.widget)"
                  v-model="vMenu[field.name]"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      clearable
                      :prepend-icon="`mdi-${getFieldIcon(field.widget)}`"
                      v-model="fieldData[field.name]"
                      :id="field.id"
                      :type="field.input_type"
                      :name="field.name"
                      :placeholder="field.placeholder"
                      :required="field.required"
                      :disabled="field.disabled"
                      readonly
                      :class="field.css_classes"
                      :hint="field.hint"
                      :messages="field.warning"
                      :error-messages="field.error"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    scrollable
                    v-model="fieldData[field.name]"
                    @input="vMenu[field.name] = false"
                    year-icon="mdi-calendar-blank"
                    color="primary"
                    :min="field.min"
                    :max="field.max"
                    :locale="$i18n.locale"
                  ></v-date-picker>
                </v-menu>

                <!-- Date and Time fields -->
                <v-row v-if="['inputDateTime'].includes(field.widget)">
                  <v-col cols="6">
                    <v-menu
                      v-model="vMenu[field.name]"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          clearable
                          :prepend-icon="`mdi-${getFieldIcon(field.widget)}`"
                          v-model="fieldData[field.name]"
                          :id="field.id"
                          :type="field.input_type"
                          :name="field.name"
                          :placeholder="field.placeholder"
                          :required="field.required"
                          :disabled="field.disabled"
                          readonly
                          :class="field.css_classes"
                          :hint="field.hint"
                          :messages="field.warning"
                          :error-messages="field.error"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        scrollable
                        v-model="fieldData[field.name]"
                        @input="vMenu[field.name] = false"
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
                      v-model="vMenu[`${field.name}__time`]"
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
                          clearable
                          prepend-icon="mdi-clock-time-four-outline"
                          v-model="fieldData[`${field.name}__time`]"
                          :label="$t('message.17')"
                          :id="field.id"
                          type="time"
                          :name="`${field.name}__time`"
                          :placeholder="field.placeholder"
                          :required="field.required"
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
                        v-if="vMenu[`${field.name}__time`]"
                        v-model="fieldData[`${field.name}__time`]"
                        @click:minute="$refs[`${field.name}__time`][0].save(fieldData[`${field.name}__time`])"
                      ></v-time-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </div>
        </div>
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
    vMenu: { field_date: false, field_datetime: false, field_datetime__time: false },
    fieldData: {},
    fields: []
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
    },
    getFieldIcon(widget) {
      let result = ''
      switch (widget) {
        case 'inputText':
          result = 'note-text-outline'
          break
        case 'inputColor':
          result = 'palette-outline'
          break
        case 'inputDate':
        case 'inputDateTime':
          result = 'calendar'
          break
        case 'inputEmail':
          result = 'email-outline'
          break
        case 'inputPassword':
          result = 'lock-outline'
          break
        case 'inputPhone':
          result = 'phone'
          break
        case 'inputUrl':
          result = 'wan'
          break
        case 'inputIP':
        case 'inputIPv4':
        case 'inputIPv6':
          result = 'account-network'
          break
        case 'textArea':
          result = 'script-text-outline'
          break
        case 'numberI32':
        case 'numberU32':
        case 'numberI64':
        case 'numberF64':
          result = 'numeric-0-box-outline'
          break
        case 'rangeI32':
        case 'rangeU32':
        case 'rangeI64':
        case 'rangeF64':
          result = 'arrow-split-vertical'
          break
      }
      return result
    },
    getFormData() {
      const fields = [
        { widget: 'inputText', id: 'id-text', label: 'Label Text', input_type: 'text', name: 'field_text', value: 'Lorem ipsum dolor sit amet', placeholder: 'Enter text', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'inputColor', id: 'id-color', label: 'Label Color', input_type: 'color', name: 'field_color', value: '#3BE40CFF', placeholder: 'Enter color', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'inputDate', id: 'id-date', label: 'Label Date', input_type: 'date', name: 'field_date', value: '', placeholder: 'Enter date', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'inputDateTime', id: 'id-datetime', label: 'Label Date and Time', input_type: 'datetime', name: 'field_datetime', value: '', placeholder: 'Enter date and time', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'inputEmail', id: 'id-email', label: 'Label E-mail', input_type: 'email', name: 'field_email', value: '', placeholder: 'Enter email', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'inputPassword', id: 'id-passwordl', label: 'Label Password', input_type: 'password', name: 'field_password', value: '', placeholder: 'Enter password', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'inputPhone', id: 'id-phone', label: 'Label Phone', input_type: 'tel', name: 'field_phone', value: '', placeholder: 'Enter phone', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'inputUrl', id: 'id-url', label: 'Label Url', input_type: 'url', name: 'field_url', value: '', placeholder: 'Enter url', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'inputIP', id: 'id-ip', label: 'Label IP', input_type: 'text', name: 'field_ip', value: '', placeholder: 'Enter ip', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'inputIPv4', id: 'id-ip-v4', label: 'Label IPv4', input_type: 'text', name: 'field_ipv4', value: '', placeholder: 'Enter ipv4', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'inputIPv6', id: 'id-ip-v6', label: 'Label IPv6', input_type: 'text', name: 'field_ipv6', value: '', placeholder: 'Enter ipv6', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'textArea', id: 'id-textarea', label: 'Label Textarea', input_type: 'textarea', name: 'field_textarea', value: '', placeholder: 'Enter textarea', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'hiddenText', id: 'id-hidden-text', label: 'Label Hidden Text', input_type: 'hidden', name: 'field_hidden_text', value: '', placeholder: 'Enter hidden text', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'hiddenI32', id: 'id-hidden-i32', label: 'Label Hidden I32', input_type: 'hidden', name: 'field_hidden_i32', value: '', placeholder: 'Enter hidden i32', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'hiddenU32', id: 'id-hidden-u32', label: 'Label Hidden U32', input_type: 'hidden', name: 'field_hidden_u32', value: '', placeholder: 'Enter hidden u32', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'hiddenI64', id: 'id-hidden-i64', label: 'Label Hidden I64', input_type: 'hidden', name: 'field_hidden_i64', value: '', placeholder: 'Enter hidden i64', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'hiddenF64', id: 'id-hidden-f64', label: 'Label Hidden F64', input_type: 'hidden', name: 'field_hidden_f64', value: '', placeholder: 'Enter hidden f64', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'numberI32', id: 'id-number-i32', label: 'Label Number I32', input_type: 'number', name: 'field_number_i32', value: '', placeholder: 'Enter number i32', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'numberU32', id: 'id-number-u32', label: 'Label Number U32', input_type: 'number', name: 'field_number_u32', value: '', placeholder: 'Enter number u32', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'numberI64', id: 'id-number-i64', label: 'Label Number I64', input_type: 'number', name: 'field_number_i64', value: '', placeholder: 'Enter number i64', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'numberF64', id: 'id-number-f64', label: 'Label Number F64', input_type: 'number', name: 'field_number_f64', value: '', placeholder: 'Enter number f64', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'rangeI32', id: 'id-range-i32', label: 'Label Range I32', input_type: 'range', name: 'field_range_i32', value: '0', placeholder: 'Enter range i32', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '1', min: '0', max: '10', required: true },
        { widget: 'rangeU32', id: 'id-range-u32', label: 'Label Range U32', input_type: 'range', name: 'field_range_u32', value: '0', placeholder: 'Enter range u32', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '1', min: '10', max: '100', required: true },
        { widget: 'rangeI64', id: 'id-range-i64', label: 'Label Range I64', input_type: 'range', name: 'field_range_i64', value: '75', placeholder: 'Enter range i64', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '1', min: '-100', max: '100', required: true },
        { widget: 'rangeF64', id: 'id-ranger-f64', label: 'Label Range F64', input_type: 'range', name: 'field_range_f64', value: '0.5', placeholder: 'Enter range f64', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '0.1', min: '0.0', max: '1.0', required: true }
      ]

      fields.forEach(item => {
        switch (item.widget) {
          case 'inputText':
          case 'inputEmail':
          case 'inputPassword':
          case 'inputPhone':
          case 'inputUrl':
          case 'inputIP':
          case 'inputIPv4':
          case 'inputIPv6':
          case 'textArea':
            this.fieldData[item.name] = item.value
            break
          case 'inputColor':
            this.vMenu[item.name] = false
            this.fieldData[item.name] = item.value || '#00000000'
            break
          case 'inputDate':
            this.vMenu[item.name] = false
            this.fieldData[item.name] = item.value || new Date().toISOString().substr(0, 10)
            break
          case 'inputDateTime':
            this.vMenu[item.name] = false
            this.vMenu[`${item.name}__time`] = false
            this.fieldData[item.name] = item.value || new Date().toISOString().substr(0, 10)
            this.fieldData[`${item.name}__time`] = '00:00'
            break
          case 'hiddenText':
          case 'hiddenI32':
          case 'hiddenU32':
          case 'hiddenI64':
          case 'hiddenF64':
            this.fieldData[item.name] = item.value
            break
          case 'numberI32':
          case 'numberU32':
          case 'numberI64':
            this.fieldData[item.name] = item.value
            item.step = parseInt(item.step) || 1
            break
          case 'numberF64':
            this.fieldData[item.name] = item.value
            item.step = parseFloat(item.step) || 1.0
            break
          case 'rangeI32':
          case 'rangeU32':
          case 'rangeI64':
            this.fieldData[item.name] = parseInt(item.value) || 0
            item.step = parseInt(item.step) || 1
            item.min = parseInt(item.min) || 0
            item.max = parseInt(item.max) || 0
            break
          case 'rangeF64':
            this.fieldData[item.name] = parseFloat(item.value) || 0.0
            item.step = parseFloat(item.step) || 1.0
            item.min = parseFloat(item.min) || 0.0
            item.max = parseFloat(item.max) || 0.0
            break
        }
      })
      this.fields = fields
    }
  },

  created() {
    this.getFormData()
  }

}
</script>
