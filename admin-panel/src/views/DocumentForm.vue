<template>
  <v-container fluid>
    <!-- Form for document. -->
    <v-card class="mt-1" max-width="1000">
      <v-toolbar dense flat>
        <v-btn icon @click="goBack()">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-title class="pt-0">{{ docTitle }}</v-card-title>
      <v-card-subtitle>{{ breadcrumbs }}</v-card-subtitle>
      <!-- Form fields. -->
      <v-card-text class="pa-4" v-if="render">
        <div v-for="field in fields" :key="field.name" class="rounded-lg">
          <!-- Hidden fields -->
          <input
            v-if="['hiddenText', 'hiddenI32', 'hiddenU32',
                   'hiddenI64', 'hiddenF64'].includes(field.widget)"
            v-model="fieldsData[field.name]"
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
              <v-card-text :class="field.widget !== 'checkBox' ? 'pt-2 pb-0' : 'pt-2 pb-4'">
                <div v-if="field.widget !== 'checkBox'">
                  <!-- Title of field. -->
                  <v-card-title class="pa-0 text-subtitle-1 font-weight-medium">{{ field.label }}</v-card-title>
                  <!-- Hint for field. -->
                  <v-card-subtitle
                    v-if="field.hint.length > 0"
                    class="pl-0 pb-1 pt-3"
                    v-html="field.hint"
                  ></v-card-subtitle>
                  <!-- Dialogue for fields with dynamic widgets. -->
                  <v-dialog
                    persistent
                    max-width="600px"
                    v-model="dynamicSelectionDialog[field.name]"
                    v-if="field.widget.includes('Dyn')"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <!-- Button - Open a dialog. -->
                      <v-btn text x-small color="orange" class="mb-2" v-bind="attrs" v-on="on">
                        <v-icon>mdi-plus</v-icon>
                        <span>/</span>
                        <v-icon>mdi-minus</v-icon>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-actions class="pr-3 pt-2">
                        <v-spacer></v-spacer>
                        <!-- Button - Close. -->
                        <v-btn
                          icon
                          small
                          color="red"
                          @click="[dynamicSelectionDialog[field.name] = false,
                                   currValDynItem = {title: null, value: null},
                                   delDynItems = [],
                                   setShowMsg(false),
                                   runShowOverlayPageLockout(false)]"
                        >
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </v-card-actions>
                      <!-- Add new list item. -->
                      <v-card-text class="pb-0">
                        <v-card-subtitle class="pt-0">{{ $t('message.22') }}</v-card-subtitle>
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
                              :type="getDynFieldType(field.widget)"
                              :step="field.step"
                              :min="field.min"
                              :max="field.max"
                              v-model="currValDynItem.value"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <!-- Button - Save. -->
                        <v-btn
                          text
                          color="green"
                          :disabled="currValDynItem.title === null || currValDynItem.value === null"
                          @click="updateDynData(field.name, 'save')"
                        >{{ $t('message.19') }}</v-btn>
                      </v-card-actions>
                      <v-divider></v-divider>
                      <!-- Remove irrelevant items. -->
                      <v-card-text class="pb-0">
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
                        <!-- Button - Delete. -->
                        <v-btn
                          text
                          color="red"
                          :disabled="delDynItems.length === 0"
                          @click="[updateDynData(field.name, 'delete'),
                                   dynamicSelectionDialog[field.name] = false,
                                   currValDynItem = {title: null, value: null},
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
                  counter
                  :prepend-icon="`mdi-${getFieldIcon(field.widget)}`"
                  v-model="fieldsData[field.name]"
                  :id="field.id"
                  :type="field.input_type"
                  :name="field.name"
                  :placeholder="field.placeholder"
                  :required="field.required"
                  :disabled="field.disabled"
                  :readonly="field.readonly"
                  :maxlength="field.maxlength"
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
                  v-model="fieldsData[field.name]"
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

                <!-- Range fields -->
                <div v-if="['rangeI32', 'rangeU32', 'rangeI64', 'rangeF64'].includes(field.widget)">
                  <v-divider class="mb-1"></v-divider>
                  <div>{{ `value: ${fieldsData[field.name]}` }}</div>
                  <span>{{ `step: ${field.step}` }}</span>
                  <span class="ml-2">{{ `min: ${field.min}` }}</span>
                  <span class="ml-2">{{ `max: ${field.max}` }}</span>
                  <v-slider
                    thumb-label
                    :prepend-icon="`mdi-${getFieldIcon(field.widget)}`"
                    v-model="fieldsData[field.name]"
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
                </div>

                <!-- Radio buttons fields -->
                <v-radio-group
                  class="mt-1"
                  v-if="['radioText', 'radioI32', 'radioU32', 'radioI64', 'radioF64'].includes(field.widget)"
                  v-model="fieldsData[field.name]"
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
                  v-if="field.widget === 'checkBox'"
                  v-model="fieldsData[field.name]"
                  :id="field.id"
                  :label="field.label"
                  :type="field.input_type"
                  :name="field.name"
                  :hint="field.hint"
                  :disabled="field.disabled"
                  :readonly="field.readonly"
                  :class="field.css_classes"
                ></v-checkbox>

                <!-- File information -->
                <div
                  v-if="field.widget === 'inputFile' && fieldsData[field.name].url !== undefined && fieldsData[field.name].url.length > 0"
                >
                  <v-divider class="mb-1"></v-divider>
                  <div
                    v-for="(item, index) in [getFileIcon(fieldsData[field.name].name.split('.').pop())]"
                    :key="`${item.icon}-${index}`"
                  >
                    <v-icon :color="item.color" size="60">{{ `mdi-${item.icon}` }}</v-icon>
                  </div>
                  <v-btn
                    text
                    small
                    color="primary"
                    class="text-lowercase px-0"
                    :href="fieldsData[field.name].url"
                    target="_blank"
                  >{{ fieldsData[field.name].url }}</v-btn>
                  <v-card-subtitle
                    class="pa-0"
                  >{{ `${$t('message.28')}: ${humanFileSize(fieldsData[field.name].size)}` }}</v-card-subtitle>
                  <v-checkbox
                    dense
                    hide-details
                    class="mt-0"
                    v-model="fieldsData[field.name].is_delete"
                    :label="`${$t('message.31')} ?`"
                    :disabled="field.required"
                  ></v-checkbox>
                </div>

                <!-- Image thumbnail -->
                <div
                  v-if="field.widget === 'inputImage' && fieldsData[field.name].url !== undefined && fieldsData[field.name].url.length > 0"
                >
                  <v-divider class="mb-1"></v-divider>
                  <v-img contain :src="fieldsData[field.name].url" height="60" position="left"></v-img>
                  <v-btn
                    text
                    small
                    color="primary"
                    class="text-lowercase px-0"
                    :href="fieldsData[field.name].url"
                    target="_blank"
                  >{{ fieldsData[field.name].url }}</v-btn>
                  <v-card-subtitle
                    class="pa-0"
                  >{{ `${$t('message.28')}: ${humanFileSize(fieldsData[field.name].size)}` }}</v-card-subtitle>
                  <v-checkbox
                    dense
                    hide-details
                    class="mt-0"
                    v-model="fieldsData[field.name].is_delete"
                    :label="`${$t('message.32')} ?`"
                    :disabled="field.required"
                  ></v-checkbox>
                </div>

                <!-- File fields -->
                <v-file-input
                  class="mt-0 pt-1"
                  show-size
                  small-chips
                  :ref="field.name"
                  v-if="field.widget === 'inputFile'"
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

                <!-- Image fields -->
                <v-file-input
                  class="mt-0 pt-1"
                  show-size
                  small-chips
                  :ref="field.name"
                  v-if="field.widget === 'inputImage'"
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
                  v-if="field.widget === 'inputColor'"
                  :ref="field.name"
                  v-model="vMenu[field.name]"
                  :close-on-content-click="false"
                  :return-value.sync="fieldsData[field.name]"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      class="mt-0 pt-1"
                      clearable
                      :background-color="fieldsData[field.name]"
                      :prepend-icon="`mdi-${getFieldIcon(field.widget)}`"
                      v-model="fieldsData[field.name]"
                      :id="field.id"
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
                    <v-color-picker
                      show-swatches
                      mode="hexa"
                      v-model="fieldsData[field.name]"
                      :disabled="field.disabled"
                      :readonly="field.readonly"
                    ></v-color-picker>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        small
                        color="primary"
                        @click="vMenu[field.name] = false"
                      >{{ $t('message.18') }}</v-btn>
                      <v-btn
                        text
                        small
                        color="primary"
                        @click="$refs[field.name][0].save(fieldsData[field.name])"
                      >OK</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>

                <!-- Textarea fields -->
                <div v-if="field.widget === 'textArea'">
                  <ckeditor
                    v-if="field.css_classes.includes('ckeditor')"
                    :editor="editor"
                    v-model="fieldsData[field.name]"
                    :config="editorConfig"
                    tag-name="textarea"
                    :disabled="field.disabled"
                  ></ckeditor>
                  <v-textarea
                    class="mt-0 pt-1"
                    v-else
                    counter
                    clearable
                    :prepend-icon="`mdi-${getFieldIcon(field.widget)}`"
                    v-model="fieldsData[field.name]"
                    :id="field.id"
                    :name="field.name"
                    :placeholder="field.placeholder"
                    :required="field.required"
                    :disabled="field.disabled"
                    :readonly="field.readonly"
                    :maxlength="field.maxlength"
                    :class="field.css_classes"
                    :messages="field.warning"
                    :error-messages="field.error"
                  ></v-textarea>
                </div>

                <!-- Date fields -->
                <v-menu
                  v-if="field.widget === 'inputDate'"
                  :ref="field.name"
                  v-model="vMenu[field.name]"
                  :close-on-content-click="false"
                  :return-value.sync="fieldsData[field.name]"
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
                      v-model="fieldsData[field.name]"
                      :id="field.id"
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
                  <!-- only min -->
                  <v-date-picker
                    v-if="field.min.length > 0 && field.max.length === 0"
                    scrollable
                    v-model="fieldsData[field.name]"
                    year-icon="mdi-calendar-blank"
                    color="primary"
                    :disabled="field.disabled"
                    :readonly="field.readonly"
                    :locale="$i18n.locale"
                    :min="field.min"
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      small
                      color="primary"
                      @click="vMenu[field.name] = false"
                    >{{ $t('message.18') }}</v-btn>
                    <v-btn
                      text
                      small
                      color="primary"
                      @click="$refs[field.name][0].save(fieldsData[field.name])"
                    >OK</v-btn>
                  </v-date-picker>
                  <!-- only max -->
                  <v-date-picker
                    v-else-if="field.min.length === 0 && field.max.length > 0"
                    scrollable
                    v-model="fieldsData[field.name]"
                    year-icon="mdi-calendar-blank"
                    color="primary"
                    :disabled="field.disabled"
                    :readonly="field.readonly"
                    :locale="$i18n.locale"
                    :max="field.max"
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      small
                      color="primary"
                      @click="vMenu[field.name] = false"
                    >{{ $t('message.18') }}</v-btn>
                    <v-btn
                      text
                      small
                      color="primary"
                      @click="$refs[field.name][0].save(fieldsData[field.name])"
                    >OK</v-btn>
                  </v-date-picker>
                  <!-- min and max -->
                  <v-date-picker
                    v-else-if="field.min.length > 0 && field.max.length > 0"
                    scrollable
                    v-model="fieldsData[field.name]"
                    year-icon="mdi-calendar-blank"
                    color="primary"
                    :disabled="field.disabled"
                    :readonly="field.readonly"
                    :locale="$i18n.locale"
                    :min="field.min"
                    :max="field.max"
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      small
                      color="primary"
                      @click="vMenu[field.name] = false"
                    >{{ $t('message.18') }}</v-btn>
                    <v-btn
                      text
                      small
                      color="primary"
                      @click="$refs[field.name][0].save(fieldsData[field.name])"
                    >OK</v-btn>
                  </v-date-picker>
                  <!-- without min and max -->
                  <v-date-picker
                    v-else
                    scrollable
                    v-model="fieldsData[field.name]"
                    year-icon="mdi-calendar-blank"
                    color="primary"
                    :disabled="field.disabled"
                    :readonly="field.readonly"
                    :locale="$i18n.locale"
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      small
                      color="primary"
                      @click="vMenu[field.name] = false"
                    >{{ $t('message.18') }}</v-btn>
                    <v-btn
                      text
                      small
                      color="primary"
                      @click="$refs[field.name][0].save(fieldsData[field.name])"
                    >OK</v-btn>
                  </v-date-picker>
                </v-menu>

                <!-- Date and Time fields -->
                <v-row v-if="field.widget === 'inputDateTime'">
                  <v-col cols="6">
                    <v-menu
                      :ref="field.name"
                      v-model="vMenu[field.name]"
                      :close-on-content-click="false"
                      :return-value.sync="fieldsData[field.name]"
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
                          v-model="fieldsData[field.name]"
                          :id="field.id"
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
                      <!-- only min -->
                      <v-date-picker
                        v-if="field.min.length > 0 && field.max.length === 0"
                        scrollable
                        v-model="fieldsData[field.name]"
                        year-icon="mdi-calendar-blank"
                        color="primary"
                        :disabled="field.disabled"
                        :readonly="field.readonly"
                        :locale="$i18n.locale"
                        :min="field.min"
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          small
                          color="primary"
                          @click="vMenu[field.name] = false"
                        >{{ $t('message.18') }}</v-btn>
                        <v-btn
                          text
                          small
                          color="primary"
                          @click="$refs[field.name][0].save(fieldsData[field.name])"
                        >OK</v-btn>
                      </v-date-picker>
                      <!-- only max -->
                      <v-date-picker
                        v-else-if="field.min.length === 0 && field.max.length > 0"
                        scrollable
                        v-model="fieldsData[field.name]"
                        year-icon="mdi-calendar-blank"
                        color="primary"
                        :disabled="field.disabled"
                        :readonly="field.readonly"
                        :locale="$i18n.locale"
                        :max="field.max"
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          small
                          color="primary"
                          @click="vMenu[field.name] = false"
                        >{{ $t('message.18') }}</v-btn>
                        <v-btn
                          text
                          small
                          color="primary"
                          @click="$refs[field.name][0].save(fieldsData[field.name])"
                        >OK</v-btn>
                      </v-date-picker>
                      <!-- min and max -->
                      <v-date-picker
                        v-else-if="field.min.length > 0 && field.max.length > 0"
                        scrollable
                        v-model="fieldsData[field.name]"
                        year-icon="mdi-calendar-blank"
                        color="primary"
                        :disabled="field.disabled"
                        :readonly="field.readonly"
                        :locale="$i18n.locale"
                        :min="field.min"
                        :max="field.max"
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          small
                          color="primary"
                          @click="vMenu[field.name] = false"
                        >{{ $t('message.18') }}</v-btn>
                        <v-btn
                          text
                          small
                          color="primary"
                          @click="$refs[field.name][0].save(fieldsData[field.name])"
                        >OK</v-btn>
                      </v-date-picker>
                      <!-- without min and max -->
                      <v-date-picker
                        v-else
                        scrollable
                        v-model="fieldsData[field.name]"
                        year-icon="mdi-calendar-blank"
                        color="primary"
                        :disabled="field.disabled"
                        :readonly="field.readonly"
                        :locale="$i18n.locale"
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          small
                          color="primary"
                          @click="vMenu[field.name] = false"
                        >{{ $t('message.18') }}</v-btn>
                        <v-btn
                          text
                          small
                          color="primary"
                          @click="$refs[field.name][0].save(fieldsData[field.name])"
                        >OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="6">
                    <v-menu
                      :ref="`${field.name}__time`"
                      v-model="vMenu[`${field.name}__time`]"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="fieldsData[`${field.name}__time`]"
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
                          v-model="fieldsData[`${field.name}__time`]"
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
                        v-model="fieldsData[`${field.name}__time`]"
                        @click:minute="$refs[`${field.name}__time`][0].save(fieldsData[`${field.name}__time`])"
                        :disabled="field.disabled"
                        :readonly="field.readonly"
                      ></v-time-picker>
                    </v-menu>
                  </v-col>
                </v-row>

                <!-- Selection fields-->
                <v-select
                  class="pt-0"
                  v-if="['selectText', 'selectI32', 'selectU32',
                         'selectI64', 'selectF64'].includes(field.widget)"
                  clearable
                  :prepend-icon="`mdi-${getFieldIcon(field.widget)}`"
                  :items="field.options"
                  item-text="title"
                  item-value="value"
                  v-model="fieldsData[field.name]"
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
                  v-model="fieldsData[field.name]"
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
                  v-model="fieldsData[field.name]"
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
                  v-model="fieldsData[field.name]"
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
            <v-btn text small color="red" v-bind="attrs" v-on="on" @click="deleteDoc()">
              <v-icon>mdi-close-thick</v-icon>
            </v-btn>
          </template>
          <span v-text="$t('message.13')"></span>
        </v-tooltip>
        <v-spacer></v-spacer>
        <!-- Save button and create a new document. -->
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              small
              color="green"
              v-bind="attrs"
              v-on="on"
              @click="saveDoc('save_and_new')"
            >
              <v-icon>mdi-content-save</v-icon>
              <v-icon>mdi-ampersand</v-icon>
              <v-icon>mdi-file-outline</v-icon>
            </v-btn>
          </template>
          <span v-text="$t('message.14')"></span>
        </v-tooltip>
        <!-- Save button and continue editing the document. -->
        <v-tooltip top v-if="isCreatedDoc()">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              small
              color="orange"
              class="mx-4"
              v-bind="attrs"
              v-on="on"
              @click="saveDoc('save_and_edit')"
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
            <v-btn text small color="blue" v-bind="attrs" v-on="on" @click="saveDoc()">
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
import { mapState, mapMutations, mapActions } from 'vuex'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
  name: 'DocumentForm',

  data: () => ({
    docTitle: '...',
    breadcrumbs: '... > ... > ...',
    vMenu: {},
    fieldsData: {},
    fields: [],
    dynamicSelectionDialog: {},
    delDynItems: [],
    currValDynItem: { title: null, value: null },
    maxTotalFilesSize: 16384, // 16384 = ~16 Kb (default data size for the form),
    render: true,
    editor: ClassicEditor,
    editorConfig: {
      language: 'ru'
    }
  }),

  computed: {
    ...mapState([
      'serviceList'
    ]),
    ...mapState('documentList', [
      'documents'
    ])
  },

  methods: {
    ...mapMutations([
      'setIsAuthenticated'
    ]),
    ...mapMutations('popUpMsgs', [
      'setShowMsg'
    ]),
    ...mapActions('documentList', [
      'ajaxGetDocumentList'
    ]),
    ...mapActions('popUpMsgs', [
      'runShowMsg'
    ]),
    ...mapActions('overlays', [
      'runShowOverlayPageLockout'
    ]),
    // Router - Go back one step.
    goBack() {
      this.setShowMsg(false)
      this.$router.go(-1)
    },
    // To Rerender Component.
    reload() {
      this.render = false
      this.$nextTick(() => {
        this.render = true
      })
    },
    // Determine if the document was previously created.
    isCreatedDoc() {
      return !isNaN(parseInt(this.$route.params.indexDoc))
    },
    // Get human readable version of file size.
    humanFileSize(size) {
      var i = Math.floor(Math.log(size) / Math.log(1024))
      return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
    },
    // Get field type with dynamic widget.
    getDynFieldType(widget) {
      let result = 'text'
      if (widget.includes('I32') || widget.includes('U32') ||
        widget.includes('I64') || widget.includes('F64')) {
        result = 'number'
      }
      return result
    },
    // Get the associative icon for the file.
    getFileIcon(extension) {
      let result
      switch (extension.toLowerCase()) {
        case 'txt':
        case 'text':
          result = { color: 'blue', icon: 'note-text-outline' }
          break
        case 'doc':
        case 'dot':
        case 'wbk':
        case 'docx':
        case 'docm':
        case 'dotx':
        case 'dotm':
        case 'docb':
          result = { color: 'blue', icon: 'microsoft-word' }
          break
        case 'xls':
        case 'xlt':
        case 'xlm':
        case 'xlsx':
        case 'xlsm':
        case 'xltx':
        case 'xltm':
        case 'xlsb':
        case 'xla':
        case 'xlam':
        case 'xll':
        case 'xlw':
          result = { color: 'green', icon: 'microsoft-excel' }
          break
        case 'ppt':
        case 'pot':
        case 'pps':
        case 'pptx':
        case 'pptm':
        case 'potx':
        case 'potm':
        case 'ppam':
        case 'ppsx':
        case 'ppsm':
        case 'sldx':
        case 'sldm':
          result = { color: 'orange', icon: 'microsoft-powerpoint' }
          break
        case 'accdb':
        case 'accde':
        case 'accdt':
        case 'accdr':
          result = { color: 'pink', icon: 'microsoft-access' }
          break
        case 'one':
          result = { color: 'purple', icon: 'microsoft-onenote' }
          break
        case 'pub':
          result = { color: 'teal', icon: 'alpha-p-box' }
          break
        case 'xml':
          result = { color: 'blue', icon: 'xml' }
          break
        case 'svg':
        case 'svgz':
          result = { color: 'amber', icon: 'svg' }
          break
        case 'pdf':
          result = { color: 'red', icon: 'file-pdf-box' }
          break
        case 'html':
        case 'htm':
          result = { color: 'orange', icon: 'language-html5' }
          break
        case 'epub':
          result = { color: 'lime', icon: 'book-open-page-variant-outline' }
          break
        case 'odt':
          result = { color: 'blue', icon: 'file-document-outline' }
          break
        case 'sxw':
        case 'stw':
        case 'sxg':
          result = { color: 'blue-grey', icon: 'file-document-outline' }
          break
        case 'sxc':
        case 'stc':
          result = { color: 'lime', icon: 'table' }
          break
        case 'sxd':
        case 'std':
          result = { color: 'amber', icon: 'draw' }
          break
        case 'sxi':
        case 'sti':
          result = { color: 'orange', icon: 'monitor-dashboard' }
          break
        case 'sxm':
          result = { color: 'blue-grey', icon: 'math-integral-box' }
          break
        case 'djvu':
        case 'djv':
          result = { color: 'grey darken-1', icon: 'text-box-multiple-outline' }
          break
        case 'csv':
          result = { color: 'grey darken-1', icon: 'file-delimited-outline' }
          break
        case 'tsv':
        case 'tab':
          result = { color: 'grey darken-1', icon: 'file-table-outline' }
          break
        default:
          result = { color: 'grey darken-1', icon: 'file-hidden' }
      }
      return result
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
        case 'inputFile':
          result = 'paperclip'
          break
        case 'inputImage':
          result = 'camera-outline'
          break
        case 'inputIP':
        case 'inputIPv4':
        case 'inputIPv6':
          result = 'account-network'
          break
        case 'textArea':
          result = 'script-text-outline'
          break
        default:
          if (widget.includes('number')) {
            result = 'numeric-1-box-multiple-outline'
          } else if (widget.includes('range')) {
            result = 'arrow-split-vertical'
          } else if (widget.includes('select')) {
            result = 'form-select'
          }
      }
      //
      return result
    },
    // Get data for fields of form.
    getFormData(document) {
      const vMenu = {}
      const fieldsData = {}
      const dynamicSelectionDialog = {}
      const re = /<br>/g

      document.forEach(field => {
        field.warning = field.warning.replace(re, ' || ')
        field.error = field.error.replace(re, ' || ')
        let tmp

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
            fieldsData[field.name] = field.value || ''
            break
          case 'inputColor':
            vMenu[field.name] = false
            fieldsData[field.name] = field.value || '#00000000'
            break
          case 'inputDate':
            vMenu[field.name] = false
            field.min = field.min || ''
            field.max = field.max || ''
            fieldsData[field.name] = field.value || ''
            break
          case 'inputDateTime':
            vMenu[field.name] = false
            vMenu[`${field.name}__time`] = false
            field.min = field.min || ''
            field.max = field.max || ''
            tmp = field.value || ''
            fieldsData[field.name] = tmp.substr(0, 10)
            fieldsData[`${field.name}__time`] = new Date(tmp).toLocaleTimeString(this.$i18n.locale,
              { timeStyle: 'short', hour12: false })
            break
          case 'hiddenText':
          case 'hiddenI32':
          case 'hiddenU32':
          case 'hiddenI64':
          case 'hiddenF64':
            fieldsData[field.name] = field.value || ''
            break
          case 'numberI32':
          case 'numberU32':
          case 'numberI64':
            tmp = parseInt(field.value)
            fieldsData[field.name] = !Number.isNaN(tmp) ? tmp : ''
            break
          case 'numberF64':
            tmp = parseFloat(field.value)
            fieldsData[field.name] = !Number.isNaN(tmp) ? tmp : ''
            break
          case 'rangeI32':
          case 'rangeU32':
          case 'rangeI64':
            fieldsData[field.name] = parseInt(field.value)
            break
          case 'rangeF64':
            fieldsData[field.name] = parseFloat(field.value)
            break
          case 'radioText':
            fieldsData[field.name] = field.value || ''
            break
          case 'radioI32':
          case 'radioU32':
          case 'radioI64':
            tmp = parseInt(field.value)
            fieldsData[field.name] = !Number.isNaN(tmp) ? tmp : ''
            field.options.forEach(function (item) {
              item[0] = parseInt(item[0])
            })
            break
          case 'radioF64':
            tmp = parseFloat(field.value)
            fieldsData[field.name] = !Number.isNaN(tmp) ? tmp : ''
            field.options.forEach(function (item) {
              item[0] = parseFloat(item[0])
            })
            break
          case 'checkBox':
            fieldsData[field.name] = field.checked
            break
          case 'selectText':
            fieldsData[field.name] = field.value || ''
            field.options = field.options.map(function (item) {
              return { value: item[0], title: item[1] }
            })
            break
          case 'selectI32':
          case 'selectU32':
          case 'selectI64':
            tmp = parseInt(field.value)
            fieldsData[field.name] = !Number.isNaN(tmp) ? tmp : ''
            field.options = field.options.map(function (item) {
              return { value: parseInt(item[0]), title: item[1] }
            })
            break
          case 'selectF64':
            tmp = parseFloat(field.value)
            fieldsData[field.name] = !Number.isNaN(tmp) ? tmp : ''
            field.options = field.options.map(function (item) {
              return { value: parseFloat(item[0]), title: item[1] }
            })
            break
          case 'selectTextMult':
            fieldsData[field.name] = field.value.length > 0 ? JSON.parse(field.value) : []
            field.options = field.options.map(function (item) {
              return { value: item[0], title: item[1] }
            })
            break
          case 'selectI32Mult':
          case 'selectU32Mult':
          case 'selectI64Mult':
            fieldsData[field.name] = field.value.length > 0 ? JSON.parse(field.value).map(item => parseInt(item)) : []
            field.options = field.options.map(function (item) {
              return { value: parseInt(item[0]), title: item[1] }
            })
            break
          case 'selectF64Mult':
            fieldsData[field.name] = field.value.length > 0 ? JSON.parse(field.value).map(item => parseFloat(item)) : []
            field.options = field.options.map(function (item) {
              return { value: parseFloat(item[0]), title: item[1] }
            })
            break

          case 'selectTextDyn':
            fieldsData[field.name] = field.value || ''
            field.options = field.options.map(function (item) {
              return { value: item[0], title: item[1] }
            })
            dynamicSelectionDialog[field.name] = false
            break
          case 'selectI32Dyn':
          case 'selectU32Dyn':
          case 'selectI64Dyn':
            tmp = parseInt(field.value)
            fieldsData[field.name] = !Number.isNaN(tmp) ? tmp : ''
            field.options = field.options.map(function (item) {
              return { value: parseInt(item[0]), title: item[1] }
            })
            dynamicSelectionDialog[field.name] = false
            break
          case 'selectF64Dyn':
            tmp = parseFloat(field.value)
            fieldsData[field.name] = !Number.isNaN(tmp) ? tmp : ''
            field.options = field.options.map(function (item) {
              return { value: parseFloat(item[0]), title: item[1] }
            })
            dynamicSelectionDialog[field.name] = false
            break
          case 'selectTextMultDyn':
            fieldsData[field.name] = field.value.length > 0 ? JSON.parse(field.value) : []
            field.options = field.options.map(function (item) {
              return { value: item[0], title: item[1] }
            })
            dynamicSelectionDialog[field.name] = false
            break
          case 'selectI32MultDyn':
          case 'selectU32MultDyn':
          case 'selectI64MultDyn':
            fieldsData[field.name] = field.value.length > 0 ? JSON.parse(field.value).map(item => parseInt(item)) : []
            field.options = field.options.map(function (item) {
              return { value: parseInt(item[0]), title: item[1] }
            })
            dynamicSelectionDialog[field.name] = false
            break
          case 'selectF64MultDyn':
            fieldsData[field.name] = field.value.length > 0 ? JSON.parse(field.value).map(item => parseFloat(item)) : []
            field.options = field.options.map(function (item) {
              return { value: parseFloat(item[0]), title: item[1] }
            })
            dynamicSelectionDialog[field.name] = false
            break
          case 'inputFile':
          case 'inputImage':
            fieldsData[field.name] = field.value.length > 0 ? JSON.parse(field.value) : {}
            fieldsData[field.name].is_delete = false
            break
        }
      })

      this.vMenu = vMenu
      this.fieldsData = fieldsData
      this.dynamicSelectionDialog = dynamicSelectionDialog
      this.fields = document
    },

    // Converte File to base64.
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          let encoded = reader.result.toString().replace(/^data:(.*,)?/, '')
          if ((encoded.length % 4) > 0) {
            encoded += '='.repeat(4 - (encoded.length % 4))
          }
          resolve(encoded)
        }
        reader.onerror = error => reject(error)
      })
    },

    // Save/Update the document.
    saveDoc(mode = 'save') {
      this.setShowMsg(false)
      this.runShowOverlayPageLockout(true)

      const indexService = this.$route.params.indexService
      const indexCollection = this.$route.params.indexCollection
      const service = this.serviceList[indexService]
      const modelKey = service.collections[indexCollection].model_key
      const cloneFieldsData = JSON.parse(JSON.stringify(this.fieldsData))

      const prepareData = () => {
        return new Promise((resolve, reject) => {
          const countFileType = this.fields.reduce((sum, field) => {
            if (field.input_type === 'file') {
              ++sum
            }
            return sum
          }, 0)
          let dataSumSize = 0
          const response = (counter) => {
            if (counter === countFileType) {
              if (dataSumSize <= this.maxTotalFilesSize) {
                resolve()
              } else {
                const msg = `The total data size exceeds the ${this.humanFileSize(this.maxTotalFilesSize)} limit.`
                reject(msg)
              }
            }
          }
          let counter = 0
          response(counter)
          this.fields.forEach(field => {
            // Convert numeric data types.
            if (field.widget.includes('I32') || field.widget.includes('U32') ||
              field.widget.includes('I64')) {
              if (field.widget.includes('Mult')) {
                cloneFieldsData[field.name] = cloneFieldsData[field.name].map(item => parseInt(item))
              } else {
                cloneFieldsData[field.name] = parseInt(cloneFieldsData[field.name])
              }
            } else if (field.widget.includes('F64')) {
              if (field.widget.includes('Mult')) {
                cloneFieldsData[field.name] = cloneFieldsData[field.name].map(item => parseFloat(item))
              } else {
                cloneFieldsData[field.name] = parseFloat(cloneFieldsData[field.name])
              }
            }
            // inputDateTime - Combining date and time.
            if (field.widget === 'inputDateTime') {
              cloneFieldsData[field.name] = cloneFieldsData[field.name] + 'T' + cloneFieldsData[`${field.name}__time`]
              delete cloneFieldsData[`${field.name}__time`]
            }
            // Preparing data from fields of the `file` type.
            if (field.input_type === 'file') {
              const files = document.getElementById(field.id).files
              if (files.length > 0) {
                const file = files[0]
                const fileName = file.name
                dataSumSize += file.size
                this.toBase64(file).then(
                  data => {
                    cloneFieldsData[field.name] = JSON.stringify({
                      name: fileName,
                      base64: data,
                      is_delete: this.fieldsData[field.name].url !== undefined &&
                        this.fieldsData[field.name].url.length > 0
                        ? true : this.fieldsData[field.name].is_delete
                    })
                    response(++counter)
                  }
                ).catch(error => {
                  reject(error)
                })
              } else {
                if (this.fieldsData[field.name].is_delete) {
                  cloneFieldsData[field.name] = JSON.stringify({
                    name: '',
                    base64: '',
                    is_delete: this.fieldsData[field.name].is_delete
                  })
                } else {
                  cloneFieldsData[field.name] = null
                }
                response(++counter)
              }
            }
          })
        })
      }

      prepareData().then(
        () => {
          const options = {
            method: 'POST',
            data: cloneFieldsData,
            url: `/admin/${modelKey}/save-document`
          }

          this.axios(options)
            .then(response => {
              const data = response.data
              if (!data.is_authenticated) {
                this.setIsAuthenticated(false)
              } else if (data.msg_err.length === 0) {
                const document = JSON.parse(data.document)
                for (let idx = 0, len = document.length; idx < len; idx++) {
                  const field = document[idx]
                  if (field.error.length > 0 || field.common_msg.length > 0) {
                    mode = 'save_and_edit'
                    break
                  }
                }
                switch (mode) {
                  case 'save':
                    this.goBack()
                    break
                  case 'save_and_edit':
                    this.vMenu = {}
                    this.dynamicSelectionDialog = {}
                    this.delDynItems = []
                    this.currValDynItem = { title: null, value: null }
                    this.fieldsData = {}
                    this.fields = []
                    this.getFormData(document)
                    this.reload()
                    break
                  case 'save_and_new':
                    this.$router.replace({
                      name: 'documenForm',
                      params: {
                        service: this.$route.params.service,
                        indexService: this.$route.params.indexService,
                        collection: this.$route.params.collection,
                        indexCollection: this.$route.params.indexCollection,
                        indexDoc: 'new'
                      }
                    }, () => window.document.location.reload(), () => window.document.location.reload())
                    break
                }
              } else {
                console.log(data.msg_err)
                this.runShowMsg({ text: data.msg_err, status: 'error' })
              }
            })
            .catch(error => {
              console.log(error)
              this.runShowMsg({ text: error, status: 'error' })
            })
            .then(() => this.runShowOverlayPageLockout(false))
        }
      ).catch(error => {
        console.log(error)
        this.runShowMsg({ text: error, status: 'error' })
      }).then(() => this.runShowOverlayPageLockout(false))
    },

    // Get Title of document.
    getDocTitle() {
      const indexDoc = this.$route.params.indexDoc
      let title = ''
      if (indexDoc !== 'new') {
        title = this.documents[indexDoc].title
      } else {
        title = this.$t('message.26')
      }
      this.docTitle = title
    },

    // Get scheme route of document.
    getBreadcrumbs() {
      const indexService = this.$route.params.indexService
      const indexCollection = this.$route.params.indexCollection
      const service = this.serviceList[indexService]
      this.breadcrumbs = `${service.service.title} > ${service.collections[indexCollection].title} > ${this.docTitle}`
    },

    // Get document
    ajaxGetDoc(indexes) {
      const service = this.serviceList[indexes.indexService]
      const payload = {
        model_key: service.collections[indexes.indexCollection].model_key,
        doc_hash: this.documents[indexes.indexDoc] !== undefined ? this.documents[indexes.indexDoc].hash : ''
      }
      this.axios.post('/admin/get-document', payload)
        .then(response => {
          const data = response.data
          if (!data.is_authenticated) {
            this.setIsAuthenticated(false)
          } else if (data.msg_err.length === 0) {
            // 16384 = ~16 Kb (default data size for the form)
            this.maxTotalFilesSize = data.max_size - 16384
            this.getDocTitle()
            this.getBreadcrumbs()
            if (data.document.length > 0) {
              const document = JSON.parse(data.document)
              this.getFormData(document)
            }
          } else {
            console.log(data.msg_err)
            this.runShowMsg({ text: data.msg_err, status: 'error' })
          }
        })
        .catch(error => {
          console.log(error)
          this.runShowMsg({ text: error, status: 'error' })
        })
        .then(() => this.runShowOverlayPageLockout(false))
    },
    getDoc() {
      this.setShowMsg(false)
      this.runShowOverlayPageLockout(true)
      const indexService = this.$route.params.indexService
      const indexCollection = this.$route.params.indexCollection
      const indexDoc = this.$route.params.indexDoc
      if (this.documents.length > 0) {
        this.ajaxGetDoc({ indexService, indexCollection, indexDoc })
      } else {
        this.ajaxGetDocumentList({ indexService, indexCollection }).then(() => {
          this.ajaxGetDoc({ indexService, indexCollection, indexDoc })
        }).catch(error => {
          console.log(error)
          this.runShowOverlayPageLockout(false)
          this.runShowMsg({ text: error, status: 'error' })
        })
      }
    },

    // Remove document from collection.
    deleteDoc() {
      this.setShowMsg(false)
      this.runShowOverlayPageLockout(true)
      const indexService = this.$route.params.indexService
      const indexCollection = this.$route.params.indexCollection
      const indexDoc = this.$route.params.indexDoc
      const service = this.serviceList[indexService]
      const payload = {
        model_key: service.collections[indexCollection].model_key,
        doc_hash: this.documents[indexDoc] !== undefined ? this.documents[indexDoc].hash : ''
      }
      if (payload.doc_hash.length === 0) {
        this.runShowOverlayPageLockout(false)
        return
      }
      this.axios.post('/admin/delete-document', payload)
        .then(response => {
          const data = response.data
          if (!data.is_authenticated) {
            this.setIsAuthenticated(false)
          } else if (data.msg_err.length === 0) {
            this.goBack()
          } else {
            console.log(data.msg_err)
            this.runShowMsg({ text: data.msg_err, status: 'error' })
          }
        })
        .catch(error => {
          console.log(error)
          this.runShowMsg({ text: error, status: 'error' })
        })
        .then(() => this.runShowOverlayPageLockout(false))
    },

    // Adding and deleting dynamic elements.
    updateDynData(fieldName, mode) {
      this.setShowMsg(false)
      this.runShowOverlayPageLockout(true)
      const indexService = this.$route.params.indexService
      const indexCollection = this.$route.params.indexCollection
      const service = this.serviceList[indexService]
      const targetField = this.fields.filter(item => item.name === fieldName)[0]
      const targetOptions = {}
      const delItemsName = []

      switch (mode) {
        case 'save':
          // Validation uniqueness of names for dynamic enumerations.
          for (let idx = 0; idx < targetField.options.length; idx++) {
            if (targetField.options[idx].title === this.currValDynItem.title) {
              this.runShowMsg({ text: `Title: ${this.$t('message.33')}`, status: 'error' })
              return
            }
          }
          // Validating a number like u32 - The value must not be less than zero.
          if (targetField.widget.includes('U32')) {
            if (+this.currValDynItem.value < 0) {
              this.runShowMsg({ text: `Title: ${this.currValDynItem.title}<br>Value: ${this.$t('message.34')}.`, status: 'error' })
              return
            }
          }
          // Convert to the appropriate numeric type.
          if (targetField.widget.includes('I32') || targetField.widget.includes('U32') ||
            targetField.widget.includes('I64')) {
            // Validate that the value is not fractional.
            if (this.currValDynItem.value.includes('.') || this.currValDynItem.value.includes(',')) {
              this.runShowMsg({ text: `Title: ${this.currValDynItem.title}<br>Value: ${this.$t('message.35')}.`, status: 'error' })
              return
            }
            this.currValDynItem.value = parseInt(this.currValDynItem.value)
          } else if (targetField.widget.includes('F64')) {
            this.currValDynItem.value = parseFloat(this.currValDynItem.value)
          }
          // Prepare `options` for conversion to json-line.
          targetOptions[fieldName] = targetField.options.concat(this.currValDynItem)
            .map(item => [item.value.toString(), item.title])
          break
        case 'delete':
          // Prepare `options` for conversion to json-line.
          this.delDynItems.forEach(idx => {
            delItemsName.push(targetField.options[idx].title)
          })
          targetOptions[fieldName] = targetField.options
            .filter(item => !delItemsName.includes(item.title))
            .map(item => [item.value.toString(), item.title])
          break
      }

      // Create a payload and send it to the server.
      const jsonOptions = JSON.stringify(targetOptions)
      const payload = {
        model_key: service.collections[indexCollection].model_key,
        json_options: jsonOptions
      }
      this.axios.post('/admin/update-dyn-data', payload)
        .then(response => {
          const data = response.data
          if (!data.is_authenticated) {
            this.setIsAuthenticated(false)
          } else if (data.msg_err.length === 0) {
            // Apply changes to the current state.
            switch (mode) {
              case 'save':
                for (let idx = 0; idx < this.fields.length; idx++) {
                  if (this.fields[idx].name === fieldName) {
                    this.fields[idx].options.push(this.currValDynItem)
                    break
                  }
                }
                break
              case 'delete':
                for (let idx = 0; idx < this.fields.length; idx++) {
                  if (this.fields[idx].name === fieldName) {
                    this.fields[idx].options = this.fields[idx].options
                      .filter(item => !delItemsName.includes(item.title))
                    break
                  }
                }
                break
            }
          } else {
            console.log(data.msg_err)
            this.runShowMsg({ text: data.msg_err, status: 'error' })
          }
        })
        .catch(error => {
          console.log(error)
          this.runShowMsg({ text: error, status: 'error' })
        })
        .then(() => {
          this.dynamicSelectionDialog[fieldName] = false
          this.delDynItems = []
          this.currValDynItem = { title: null, value: null }
          this.runShowOverlayPageLockout(false)
        })
    }
  },

  created() {
    // Get document.
    this.getDoc()
  }

}
</script>
