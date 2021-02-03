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

          <!-- Others fields. -->
          <div v-if="!field.widget.includes('hidden')">
            <!-- Common messages for all fields. -->
            <v-alert
              v-if="field.common_msg.length > 0"
              dark
              color="pink darken-4"
              icon="mdi-alert"
            >{{ field.common_msg }}</v-alert>

            <!-- Wrapper for fields. -->
            <v-card flat outlined class="mt-4">
              <v-card-text
                :class="!['checkBox'].includes(field.widget) ? 'pt-2 pb-0' : 'pt-2 pb-4'"
              >
                <div v-if="!['checkBox'].includes(field.widget)">
                  <!-- Title of field. -->
                  <v-card-title class="pa-0 text-subtitle-1 font-weight-medium">{{ field.label }}</v-card-title>
                  <!-- Hint for field. -->
                  <v-card-subtitle
                    v-if="field.hint.length > 0"
                    class="pl-0 pb-1 pt-3"
                  >{{ field.hint }}</v-card-subtitle>
                  <!-- Dialogue for fields with dynamic widgets. -->
                  <v-dialog
                    persistent
                    max-width="600px"
                    v-model="dynamicSelectionDialog[field.name]"
                    v-if="field.widget.includes('Dyn')"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <!-- Button - Open a dialog. -->
                      <v-btn
                        dark
                        x-small
                        depressed
                        color="orange darken-1"
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon>mdi-plus</v-icon>
                        <span>/</span>
                        <v-icon>mdi-minus</v-icon>
                      </v-btn>
                    </template>
                    <v-card>
                      <!-- Add new list item. -->
                      <v-card-text>
                        <v-card-subtitle>{{ $t('message.22') }}</v-card-subtitle>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              clearable
                              :label="$t('message.23')"
                              v-model="currValDynItem.title"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              clearable
                              :label="$t('message.24')"
                              v-model="currValDynItem.value"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <!-- Button - Close. -->
                        <v-btn
                          text
                          color="primary"
                          @click="[dynamicSelectionDialog[field.name] = false],
                                   delDynItems = [],
                                   currValDynItem = {title: null, value: null}"
                        >{{ $t('message.18') }}</v-btn>
                        <!-- Button - Save. -->
                        <v-btn
                          text
                          color="green"
                          :disabled="currValDynItem.title === null || currValDynItem.value === null"
                          @click="[saveNewDynItem(field.name),
                                   dynamicSelectionDialog[field.name] = false,
                                   delDynItems = [],
                                   currValDynItem = {title: null, value: null}]"
                        >{{ $t('message.19') }}</v-btn>
                      </v-card-actions>
                      <v-divider></v-divider>
                      <!-- Remove irrelevant items. -->
                      <v-card-text>
                        <v-list subheader two-line flat>
                          <v-subheader>{{ $t('message.20') }}</v-subheader>
                          <v-list-item-group v-model="delDynItems" multiple>
                            <v-list-item v-for="item in field.options" :key="item.title">
                              <template v-slot:default="{ active, }">
                                <v-list-item-action>
                                  <v-checkbox :input-value="active" color="primary"></v-checkbox>
                                </v-list-item-action>
                                <v-list-item-content>
                                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                                  <v-list-item-subtitle>{{ item.value }}</v-list-item-subtitle>
                                </v-list-item-content>
                              </template>
                            </v-list-item>
                          </v-list-item-group>
                        </v-list>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <!-- Button - Close. -->
                        <v-btn
                          text
                          color="primary"
                          @click="[delDynItems = [],
                                   dynamicSelectionDialog[field.name] = false]"
                        >{{ $t('message.18') }}</v-btn>
                        <!-- Button - Delete. -->
                        <v-btn
                          text
                          color="red"
                          :disabled="delDynItems.length === 0"
                          @click="[removeDynItems(field.options),
                                   dynamicSelectionDialog[field.name] = false,
                                   delDynItems = []]"
                        >{{ $t('message.21') }}</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>

                <!-- Text fields -->
                <v-text-field
                  class="mt-0 pt-0"
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
                  :messages="field.warning"
                  :error-messages="field.error"
                ></v-text-field>

                <!-- Number fields -->
                <v-text-field
                  class="mt-0 pt-1"
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
                  :messages="field.warning"
                  :error-messages="field.error"
                ></v-slider>

                <!-- Radio buttons fields -->
                <v-radio-group
                  class="mt-1"
                  v-if="['radioText', 'radioI32', 'radioU32', 'radioI64', 'radioF64'].includes(field.widget)"
                  v-model="fieldData[field.name]"
                  :messages="field.warning"
                  :error-messages="field.error"
                >
                  <v-radio
                    v-for="(item, idx) in field.options"
                    :key="item[1]"
                    :id="`${field.id}-${idx}`"
                    :label="item[1]"
                    :type="field.input_type"
                    :name="field.name"
                    :value="item[0]"
                    :disabled="field.disabled"
                    :readonly="field.readonly"
                    :class="field.css_classes"
                  ></v-radio>
                </v-radio-group>

                <!-- Checkbox fields -->
                <v-checkbox
                  class="mt-0"
                  persistent-hint
                  v-if="['checkBox'].includes(field.widget)"
                  v-model="fieldData[field.name]"
                  :id="field.id"
                  :label="field.label"
                  :type="field.input_type"
                  :name="field.name"
                  :hint="field.hint"
                  :disabled="field.disabled"
                  :readonly="field.readonly"
                  :class="field.css_classes"
                ></v-checkbox>

                <!-- File fields -->
                <v-file-input
                  class="mt-0 pt-1"
                  show-size
                  :ref="field.name"
                  v-if="['inputFile'].includes(field.widget)"
                  :id="field.id"
                  :type="field.input_type"
                  :name="field.name"
                  :accept="field.accept"
                  :placeholder="field.placeholder"
                  :disabled="field.disabled"
                  :readonly="field.readonly"
                  :class="field.css_classes"
                ></v-file-input>

                <!-- Image fields -->
                <v-file-input
                  class="mt-0 pt-1"
                  show-size
                  :ref="field.name"
                  v-if="['inputImage'].includes(field.widget)"
                  :prepend-icon="`mdi-${getFieldIcon(field.widget)}`"
                  :id="field.id"
                  :type="field.input_type"
                  :name="field.name"
                  :accept="field.accept"
                  :placeholder="field.placeholder"
                  :disabled="field.disabled"
                  :readonly="field.readonly"
                  :class="field.css_classes"
                ></v-file-input>

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
                      class="mt-0 pt-1"
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
                  class="mt-0 pt-1"
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
                      class="mt-0 pt-1"
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
                          class="mt-0 pt-1"
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
                          class="mt-0 pt-1"
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

                <!-- Selection fields -->
                <v-select
                  class="pt-0"
                  v-if="['selectText', 'selectI32', 'selectU32',
                         'selectI64', 'selectF64'].includes(field.widget)"
                  clearable
                  :prepend-icon="`mdi-${getFieldIcon(field.widget)}`"
                  :items="field.options"
                  item-text="title"
                  item-value="value"
                  v-model="fieldData[field.name]"
                  :id="field.id"
                  :name="field.name"
                  :placeholder="field.placeholder"
                  :required="field.required"
                  :disabled="field.disabled"
                  :readonly="field.readonly"
                  :class="field.css_classes"
                  :messages="field.warning"
                ></v-select>

                <!-- Selection fields
                     (Dynamic)
                -->
                <v-select
                  class="pt-0"
                  v-if="['selectTextDyn', 'selectI32Dyn', 'selectU32Dyn',
                         'selectI64Dyn', 'selectF64Dyn'].includes(field.widget)"
                  clearable
                  :prepend-icon="`mdi-${getFieldIcon(field.widget)}`"
                  :items="field.options"
                  item-text="title"
                  item-value="value"
                  v-model="fieldData[field.name]"
                  :id="field.id"
                  :name="field.name"
                  :placeholder="field.placeholder"
                  :required="field.required"
                  :disabled="field.disabled"
                  :readonly="field.readonly"
                  :class="field.css_classes"
                  :messages="field.warning"
                ></v-select>

                <!-- Selection fields
                     (multiple)
                -->
                <v-select
                  class="pt-0"
                  v-if="['selectTextMult', 'selectI32Mult', 'selectU32Mult',
                         'selectI64Mult', 'selectF64Mult'].includes(field.widget)"
                  clearable
                  chips
                  multiple
                  :prepend-icon="`mdi-${getFieldIcon(field.widget)}`"
                  :items="field.options"
                  item-text="title"
                  item-value="value"
                  v-model="fieldData[field.name]"
                  :id="field.id"
                  :name="field.name"
                  :placeholder="field.placeholder"
                  :required="field.required"
                  :disabled="field.disabled"
                  :readonly="field.readonly"
                  :class="field.css_classes"
                  :messages="field.warning"
                ></v-select>

                <!-- Selection fields
                     (multiple, dynamic)
                -->
                <v-select
                  class="pt-0"
                  v-if="['selectTextMultDyn', 'selectI32MultDyn', 'selectU32MultDyn',
                         'selectI64MultDyn', 'selectF64MultDyn'].includes(field.widget)"
                  clearable
                  chips
                  multiple
                  :prepend-icon="`mdi-${getFieldIcon(field.widget)}`"
                  :items="field.options"
                  item-text="title"
                  item-value="value"
                  v-model="fieldData[field.name]"
                  :id="field.id"
                  :name="field.name"
                  :placeholder="field.placeholder"
                  :required="field.required"
                  :disabled="field.disabled"
                  :readonly="field.readonly"
                  :class="field.css_classes"
                  :messages="field.warning"
                ></v-select>
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
            <v-btn dark small depressed color="red" v-bind="attrs" v-on="on" @click="removeDoc()">
              <v-icon>mdi-close-thick</v-icon>
            </v-btn>
          </template>
          <span v-text="$t('message.13')"></span>
        </v-tooltip>
        <v-spacer></v-spacer>
        <!-- Save button and create a new document. -->
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark small depressed color="green" v-bind="attrs" v-on="on" @click="saveDoc()">
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
            <v-btn
              dark
              small
              depressed
              color="orange"
              class="mx-4"
              v-bind="attrs"
              v-on="on"
              @click="saveDoc()"
            >
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
            <v-btn dark small depressed color="blue" v-bind="attrs" v-on="on" @click="saveDoc()">
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
    vMenu: {},
    fieldData: {},
    fields: [],
    dynamicSelectionDialog: {},
    delDynItems: [],
    currValDynItem: { title: null, value: null }
  }),

  computed: {
    ...mapState([
      'serviceList'
    ]),
    ...mapState('documentList', [
      'headers',
      'documents'
    ]),
    // Get Title of document.
    docTitle: function () {
      const indexDoc = this.$route.params.indexDoc
      const docTitle = this.documents[indexDoc][Object.keys(this.headers[0])[0]]
      return docTitle
    },
    // Get scheme route of document.
    breadcrumbs: function () {
      const indexService = this.$route.params.indexService
      const indexCollection = this.$route.params.indexCollection
      const service = this.serviceList[indexService]
      return `${service.service.title} > ${service.collections[indexCollection].title} > ${this.docTitle}`
    }
  },

  methods: {
    // Router - Go back one step.
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    // Get icon of field.
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
          result = 'numeric-1-box-multiple-outline'
          break
        case 'rangeI32':
        case 'rangeU32':
        case 'rangeI64':
        case 'rangeF64':
          result = 'arrow-split-vertical'
          break
        case 'inputImage':
          result = 'camera-outline'
          break
        case 'selectText':
        case 'selectI32':
        case 'selectU32':
        case 'selectI64':
        case 'selectF64':
        case 'selectTextDyn':
        case 'selectI32Dyn':
        case 'selectU32Dyn':
        case 'selectI64Dyn':
        case 'selectF64Dyn':
        case 'selectTextMult':
        case 'selectI32Mult':
        case 'selectU32Mult':
        case 'selectI64Mult':
        case 'selectF64Mult':
        case 'selectTextMultDyn':
        case 'selectI32MultDyn':
        case 'selectU32MultDyn':
        case 'selectI64MultDyn':
        case 'selectF64MultDyn':
          result = 'form-select'
          break
      }
      return result
    },
    // Get data for fields of form.
    getFormData() {
      const vMenu = {}
      const fieldData = {}
      const dynamicSelectionDialog = {}
      let tmp
      const fields = [
        { widget: 'inputText', id: 'id-text', label: 'Label Text', input_type: 'text', name: 'field_text', value: 'Lorem ipsum dolor sit amet', placeholder: 'Enter text', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'inputEmail', id: 'id-email', label: 'Label E-mail', input_type: 'email', name: 'field_email', value: '', placeholder: 'Enter email', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'inputPassword', id: 'id-passwordl', label: 'Label Password', input_type: 'password', name: 'field_password', value: '', placeholder: 'Enter password', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'inputPhone', id: 'id-phone', label: 'Label Phone', input_type: 'tel', name: 'field_phone', value: '', placeholder: 'Enter phone', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'inputUrl', id: 'id-url', label: 'Label Url', input_type: 'url', name: 'field_url', value: '', placeholder: 'Enter url', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'inputIP', id: 'id-ip', label: 'Label IP', input_type: 'text', name: 'field_ip', value: '', placeholder: 'Enter ip', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'inputIPv4', id: 'id-ip-v4', label: 'Label IPv4', input_type: 'text', name: 'field_ipv4', value: '', placeholder: 'Enter ipv4', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'inputIPv6', id: 'id-ip-v6', label: 'Label IPv6', input_type: 'text', name: 'field_ipv6', value: '', placeholder: 'Enter ipv6', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },

        { widget: 'inputColor', id: 'id-color', label: 'Label Color', input_type: 'color', name: 'field_color', value: '#3BE40CFF', placeholder: 'Enter color', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },

        { widget: 'inputDate', id: 'id-date', label: 'Label Date', input_type: 'date', name: 'field_date', value: '', placeholder: 'Enter date', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'inputDateTime', id: 'id-datetime', label: 'Label Date and Time', input_type: 'datetime', name: 'field_datetime', value: '', placeholder: 'Enter date and time', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },

        { widget: 'textArea', id: 'id-textarea', label: 'Label Textarea', input_type: 'textarea', name: 'field_textarea', value: '', placeholder: 'Enter textarea', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },

        { widget: 'hiddenText', id: 'id-hidden-text', label: 'Label Hidden Text', input_type: 'hidden', name: 'field_hidden_text', value: '', placeholder: 'Enter hidden text', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'hiddenI32', id: 'id-hidden-i32', label: 'Label Hidden I32', input_type: 'hidden', name: 'field_hidden_i32', value: '', placeholder: 'Enter hidden i32', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'hiddenU32', id: 'id-hidden-u32', label: 'Label Hidden U32', input_type: 'hidden', name: 'field_hidden_u32', value: '', placeholder: 'Enter hidden u32', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'hiddenI64', id: 'id-hidden-i64', label: 'Label Hidden I64', input_type: 'hidden', name: 'field_hidden_i64', value: '', placeholder: 'Enter hidden i64', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'hiddenF64', id: 'id-hidden-f64', label: 'Label Hidden F64', input_type: 'hidden', name: 'field_hidden_f64', value: '', placeholder: 'Enter hidden f64', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },

        { widget: 'numberI32', id: 'id-number-i32', label: 'Label Number I32', input_type: 'number', name: 'field_number_i32', value: '', placeholder: 'Enter number i32', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'numberU32', id: 'id-number-u32', label: 'Label Number U32', input_type: 'number', name: 'field_number_u32', value: '0', placeholder: 'Enter number u32', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true },
        { widget: 'numberI64', id: 'id-number-i64', label: 'Label Number I64', input_type: 'number', name: 'field_number_i64', value: '-1', placeholder: 'Enter number i64', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '1', min: '', max: '', required: true },
        { widget: 'numberF64', id: 'id-number-f64', label: 'Label Number F64', input_type: 'number', name: 'field_number_f64', value: '0.0', placeholder: 'Enter number f64', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '0.1', min: '', max: '', required: true },

        { widget: 'rangeI32', id: 'id-range-i32', label: 'Label Range I32', input_type: 'range', name: 'field_range_i32', value: '0', placeholder: 'Enter range i32', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '1', min: '0', max: '10', required: true },
        { widget: 'rangeU32', id: 'id-range-u32', label: 'Label Range U32', input_type: 'range', name: 'field_range_u32', value: '0', placeholder: 'Enter range u32', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '1', min: '10', max: '100', required: true },
        { widget: 'rangeI64', id: 'id-range-i64', label: 'Label Range I64', input_type: 'range', name: 'field_range_i64', value: '75', placeholder: 'Enter range i64', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '1', min: '-100', max: '100', required: true },
        { widget: 'rangeF64', id: 'id-ranger-f64', label: 'Label Range F64', input_type: 'range', name: 'field_range_f64', value: '0.5', placeholder: 'Enter range f64', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '0.1', min: '0.0', max: '1.0', required: true },

        { widget: 'radioText', id: 'id-radio-text', label: 'Label Radio Text', input_type: 'radio', name: 'field_radio_text', value: 'volvo', placeholder: 'Enter radio text', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true, options: [['volvo', 'Volvo'], ['saab', 'Saab'], ['mercedes', 'Mercedes'], ['audi', 'Audi']] },
        { widget: 'radioI32', id: 'id-radio-i32', label: 'Label Radio I32', input_type: 'radio', name: 'field_radio_i32', value: '0', placeholder: 'Enter radio i32', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true, options: [['0', 'Volvo'], ['-1', 'Saab'], ['-2', 'Mercedes'], ['-3', 'Audi']] },
        { widget: 'radioU32', id: 'id-radio-u32', label: 'Label Radio U32', input_type: 'radio', name: 'field_radio_u32', value: '1', placeholder: 'Enter radio u32', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true, options: [['0', 'Volvo'], ['1', 'Saab'], ['2', 'Mercedes'], ['3', 'Audi']] },
        { widget: 'radioI64', id: 'id-radio-i64', label: 'Label Radio I64', input_type: 'radio', name: 'field_radio_i64', value: '-2', placeholder: 'Enter radio i64', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true, options: [['0', 'Volvo'], ['-1', 'Saab'], ['-2', 'Mercedes'], ['-3', 'Audi']] },
        { widget: 'radioF64', id: 'id-radio-f64', label: 'Label Radio F64', input_type: 'radio', name: 'field_radio_f64', value: '0.0', placeholder: 'Enter radio f64', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true, options: [['0.0', 'Volvo'], ['1.1', 'Saab'], ['2.2', 'Mercedes'], ['3.3', 'Audi']] },

        { widget: 'checkBox', id: 'id-checkbox', label: 'Label Checkbox', input_type: 'checkbox', name: 'field_checkbox', value: '', placeholder: 'Enter checkbox', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true, checked: true },

        { widget: 'inputFile', id: 'id-file', label: 'Label File', input_type: 'file', name: 'field_file', value: '', placeholder: 'Enter file', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true, accept: '' },
        { widget: 'inputImage', id: 'id-image', label: 'Label Image', input_type: 'file', name: 'field_image', value: '', placeholder: 'Enter image', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true, accept: '' },

        { widget: 'selectText', id: 'id-select-text', label: 'Label Select Text', input_type: 'select', name: 'field_select_text', value: 'volvo', placeholder: 'Enter radio text', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true, options: [['volvo', 'Volvo'], ['saab', 'Saab'], ['mercedes', 'Mercedes'], ['audi', 'Audi']] },
        { widget: 'selectI32', id: 'id-select-i32', label: 'Label Select I32', input_type: 'select', name: 'field_select_i32', value: '0', placeholder: 'Enter radio i32', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true, options: [['0', 'Volvo'], ['-1', 'Saab'], ['-2', 'Mercedes'], ['-3', 'Audi']] },
        { widget: 'selectU32', id: 'id-select-u32', label: 'Label Select U32', input_type: 'select', name: 'field_select_u32', value: '1', placeholder: 'Enter radio u32', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true, options: [['0', 'Volvo'], ['1', 'Saab'], ['2', 'Mercedes'], ['3', 'Audi']] },
        { widget: 'selectI64', id: 'id-select-i64', label: 'Label Select I64', input_type: 'select', name: 'field_select_i64', value: '-2', placeholder: 'Enter radio i64', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true, options: [['0', 'Volvo'], ['-1', 'Saab'], ['-2', 'Mercedes'], ['-3', 'Audi']] },
        { widget: 'selectF64', id: 'id-select-f64', label: 'Label Select F64', input_type: 'select', name: 'field_select_f64', value: '0.0', placeholder: 'Enter radio f64', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true, options: [['0.0', 'Volvo'], ['1.1', 'Saab'], ['2.2', 'Mercedes'], ['3.3', 'Audi']] },

        { widget: 'selectTextDyn', id: 'id-select-text-dyn', label: 'Label Select Text Dyn', input_type: 'select', name: 'field_select_text_dyn', value: 'volvo', placeholder: 'Enter radio text dyn', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true, options: [['volvo', 'Volvo'], ['saab', 'Saab'], ['mercedes', 'Mercedes'], ['audi', 'Audi']] },
        { widget: 'selectI32Dyn', id: 'id-select-i32-dyn', label: 'Label Select I32 Dyn', input_type: 'select', name: 'field_select_i32_dyn', value: '0', placeholder: 'Enter radio i32 dyn', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true, options: [['0', 'Volvo'], ['-1', 'Saab'], ['-2', 'Mercedes'], ['-3', 'Audi']] },
        { widget: 'selectU32Dyn', id: 'id-select-u32-dyn', label: 'Label Select U32 Dyn', input_type: 'select', name: 'field_select_u32_dyn', value: '1', placeholder: 'Enter radio u32 dyn', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true, options: [['0', 'Volvo'], ['1', 'Saab'], ['2', 'Mercedes'], ['3', 'Audi']] },
        { widget: 'selectI64Dyn', id: 'id-select-i64-dyn', label: 'Label Select I64 Dyn', input_type: 'select', name: 'field_select_i64_dyn', value: '-2', placeholder: 'Enter radio i64 dyn', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true, options: [['0', 'Volvo'], ['-1', 'Saab'], ['-2', 'Mercedes'], ['-3', 'Audi']] },
        { widget: 'selectF64Dyn', id: 'id-select-f64-dyn', label: 'Label Select F64 Dyn', input_type: 'select', name: 'field_select_f64_dyn', value: '0.0', placeholder: 'Enter radio f64 dyn', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true, options: [['0.0', 'Volvo'], ['1.1', 'Saab'], ['2.2', 'Mercedes'], ['3.3', 'Audi']] },

        { widget: 'selectTextMult', id: 'id-select-text-mult', label: 'Label Select Text Mult', input_type: 'select', name: 'field_select_text_mult', value: '', placeholder: 'Enter radio text mult', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true, options: [['volvo', 'Volvo'], ['saab', 'Saab'], ['mercedes', 'Mercedes'], ['audi', 'Audi']] },
        { widget: 'selectI32Mult', id: 'id-select-i32-mult', label: 'Label Select I32 Mult', input_type: 'select', name: 'field_select_i32_mult', value: '', placeholder: 'Enter radio i32 mult', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true, options: [['0', 'Volvo'], ['-1', 'Saab'], ['-2', 'Mercedes'], ['-3', 'Audi']] },
        { widget: 'selectU32Mult', id: 'id-select-u32-mult', label: 'Label Select U32 Mult', input_type: 'select', name: 'field_select_u32_mult', value: '', placeholder: 'Enter radio u32 mult', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true, options: [['0', 'Volvo'], ['1', 'Saab'], ['2', 'Mercedes'], ['3', 'Audi']] },
        { widget: 'selectI64Mult', id: 'id-select-i64-mult', label: 'Label Select I64 Mult', input_type: 'select', name: 'field_select_i64_mult', value: '', placeholder: 'Enter radio i64 mult', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true, options: [['0', 'Volvo'], ['-1', 'Saab'], ['-2', 'Mercedes'], ['-3', 'Audi']] },
        { widget: 'selectF64Mult', id: 'id-select-f64-mult', label: 'Label Select F64 Mult', input_type: 'select', name: 'field_select_f64_mult', value: '', placeholder: 'Enter radio f64 mult', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true, options: [['0.0', 'Volvo'], ['1.1', 'Saab'], ['2.2', 'Mercedes'], ['3.3', 'Audi']] },

        { widget: 'selectTextMultDyn', id: 'id-select-text-mult-dyn', label: 'Label Select Text Mult Dyn', input_type: 'select', name: 'field_select_text_mult_dyn', value: '', placeholder: 'Enter radio text mult dyn', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true, options: [['volvo', 'Volvo'], ['saab', 'Saab'], ['mercedes', 'Mercedes'], ['audi', 'Audi']] },
        { widget: 'selectI32MultDyn', id: 'id-select-i32-mult-dyn', label: 'Label Select I32 Mult Dyn', input_type: 'select', name: 'field_select_i32_mult_dyn', value: '', placeholder: 'Enter radio i32 mult dyn', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true, options: [['0', 'Volvo'], ['-1', 'Saab'], ['-2', 'Mercedes'], ['-3', 'Audi']] },
        { widget: 'selectU32MultDyn', id: 'id-select-u32-mult-dyn', label: 'Label Select U32 Mult Dyn', input_type: 'select', name: 'field_select_u32_mult_dyn', value: '', placeholder: 'Enter radio u32 mult dyn', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true, options: [['0', 'Volvo'], ['1', 'Saab'], ['2', 'Mercedes'], ['3', 'Audi']] },
        { widget: 'selectI64MultDyn', id: 'id-select-i64-mult-dyn', label: 'Label Select I64 Mult Dyn', input_type: 'select', name: 'field_select_i64_mult_dyn', value: '', placeholder: 'Enter radio i64 mult dyn', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true, options: [['0', 'Volvo'], ['-1', 'Saab'], ['-2', 'Mercedes'], ['-3', 'Audi']] },
        { widget: 'selectF64MultDyn', id: 'id-select-f64-mult-dyn', label: 'Label Select F64 Mult Dyn', input_type: 'select', name: 'field_select_f64_mult_dyn', value: '', placeholder: 'Enter radio f64 mult dyn', disabled: false, readonly: false, css_classes: 'class-name', hint: 'Quisque tristique magna tortor.', warning: '', error: '', common_msg: '', step: '', min: '', max: '', required: true, options: [['0.0', 'Volvo'], ['1.1', 'Saab'], ['2.2', 'Mercedes'], ['3.3', 'Audi']] }
      ]

      fields.forEach(field => {
        switch (field.widget) {
          case 'inputText':
          case 'inputEmail':
          case 'inputPassword':
          case 'inputPhone':
          case 'inputUrl':
          case 'inputIP':
          case 'inputIPv4':
          case 'inputIPv6':
          case 'textArea':
            fieldData[field.name] = field.value || ''
            break
          case 'inputColor':
            vMenu[field.name] = false
            fieldData[field.name] = field.value || '#00000000'
            break
          case 'inputDate':
            vMenu[field.name] = false
            fieldData[field.name] = field.value.substr(0, 10) || new Date().toISOString().substr(0, 10)
            break
          case 'inputDateTime':
            vMenu[field.name] = false
            vMenu[`${field.name}__time`] = false
            tmp = field.value || new Date().toISOString()
            fieldData[field.name] = tmp.substr(0, 10)
            fieldData[`${field.name}__time`] = new Date(tmp).toLocaleTimeString(this.$i18n.locale,
              { timeStyle: 'short', hour12: false })
            tmp = undefined
            break
          case 'hiddenText':
          case 'hiddenI32':
          case 'hiddenU32':
          case 'hiddenI64':
          case 'hiddenF64':
            fieldData[field.name] = field.value || ''
            break
          case 'numberI32':
          case 'numberU32':
          case 'numberI64':
            tmp = parseInt(field.value)
            fieldData[field.name] = !Number.isNaN(tmp) ? tmp : ''
            tmp = undefined
            break
          case 'numberF64':
            tmp = parseFloat(field.value)
            fieldData[field.name] = !Number.isNaN(tmp) ? tmp : ''
            tmp = undefined
            break
          case 'rangeI32':
          case 'rangeU32':
          case 'rangeI64':
            fieldData[field.name] = parseInt(field.value)
            break
          case 'rangeF64':
            fieldData[field.name] = parseFloat(field.value)
            break
          case 'radioText':
            fieldData[field.name] = field.value || ''
            break
          case 'radioI32':
          case 'radioU32':
          case 'radioI64':
            tmp = parseInt(field.value)
            fieldData[field.name] = !Number.isNaN(tmp) ? tmp : ''
            field.options.forEach(function (item) {
              item[0] = parseInt(item[0])
            })
            tmp = undefined
            break
          case 'radioF64':
            tmp = parseFloat(field.value)
            fieldData[field.name] = !Number.isNaN(tmp) ? tmp : ''
            field.options.forEach(function (item) {
              item[0] = parseFloat(item[0])
            })
            tmp = undefined
            break
          case 'checkBox':
            fieldData[field.name] = field.checked
            break
          case 'selectText':
            fieldData[field.name] = field.value || ''
            field.options = field.options.map(function (item) {
              return { value: item[0], title: item[1] }
            })
            break
          case 'selectI32':
          case 'selectU32':
          case 'selectI64':
            tmp = parseInt(field.value)
            fieldData[field.name] = !Number.isNaN(tmp) ? tmp : ''
            field.options = field.options.map(function (item) {
              return { value: parseInt(item[0]), title: item[1] }
            })
            tmp = undefined
            break
          case 'selectF64':
            tmp = parseFloat(field.value)
            fieldData[field.name] = !Number.isNaN(tmp) ? tmp : ''
            field.options = field.options.map(function (item) {
              return { value: parseFloat(item[0]), title: item[1] }
            })
            tmp = undefined
            break
          case 'selectTextMult':
            fieldData[field.name] = field.value.length > 0 ? JSON.parse(field.value) : []
            field.options = field.options.map(function (item) {
              return { value: item[0], title: item[1] }
            })
            break
          case 'selectI32Mult':
          case 'selectU32Mult':
          case 'selectI64Mult':
            fieldData[field.name] = field.value.length > 0 ? JSON.parse(field.value) : []
            field.options = field.options.map(function (item) {
              return { value: parseInt(item[0]), title: item[1] }
            })
            break
          case 'selectF64Mult':
            fieldData[field.name] = field.value.length > 0 ? JSON.parse(field.value) : []
            field.options = field.options.map(function (item) {
              return { value: parseFloat(item[0]), title: item[1] }
            })
            break

          case 'selectTextDyn':
            fieldData[field.name] = field.value || ''
            field.options = field.options.map(function (item) {
              return { value: item[0], title: item[1] }
            })
            dynamicSelectionDialog[field.name] = false
            break
          case 'selectI32Dyn':
          case 'selectU32Dyn':
          case 'selectI64Dyn':
            tmp = parseInt(field.value)
            fieldData[field.name] = !Number.isNaN(tmp) ? tmp : ''
            field.options = field.options.map(function (item) {
              return { value: parseInt(item[0]), title: item[1] }
            })
            dynamicSelectionDialog[field.name] = false
            tmp = undefined
            break
          case 'selectF64Dyn':
            tmp = parseFloat(field.value)
            fieldData[field.name] = !Number.isNaN(tmp) ? tmp : ''
            field.options = field.options.map(function (item) {
              return { value: parseFloat(item[0]), title: item[1] }
            })
            dynamicSelectionDialog[field.name] = false
            tmp = undefined
            break
          case 'selectTextMultDyn':
            fieldData[field.name] = field.value.length > 0 ? JSON.parse(field.value) : []
            field.options = field.options.map(function (item) {
              return { value: item[0], title: item[1] }
            })
            dynamicSelectionDialog[field.name] = false
            break
          case 'selectI32MultDyn':
          case 'selectU32MultDyn':
          case 'selectI64MultDyn':
            fieldData[field.name] = field.value.length > 0 ? JSON.parse(field.value) : []
            field.options = field.options.map(function (item) {
              return { value: parseInt(item[0]), title: item[1] }
            })
            dynamicSelectionDialog[field.name] = false
            break
          case 'selectF64MultDyn':
            fieldData[field.name] = field.value.length > 0 ? JSON.parse(field.value) : []
            field.options = field.options.map(function (item) {
              return { value: parseFloat(item[0]), title: item[1] }
            })
            dynamicSelectionDialog[field.name] = false
            break
        }
      })
      this.vMenu = vMenu
      this.fieldData = fieldData
      this.dynamicSelectionDialog = dynamicSelectionDialog
      this.fields = fields
    },

    // Add a new dynamic element.
    saveNewDynItem(fieldName) {
      window.console.log(fieldName, this.currValDynItem)
    },

    // Remove selected dynamic elements.
    removeDynItems(choice) {
      window.console.log(this.delDynItems, choice)
    },

    // Remove document from collection.
    removeDoc() {
      window.console.log('Remove document')
    },

    // Save/Update the document.
    saveDoc() {
      window.console.log('Save document')
    }
  },

  created() {
    this.getFormData()
  }

}
</script>
