<template>
  <v-container fluid>
    <!-- Form for document. -->
    <v-card class="mt-1" max-width="1000">
      <v-toolbar dense flat>
        <v-btn icon @click="goBack()">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <!-- Update password. -->
        <v-dialog
          v-if="is_password && $route.params.indexDoc !== 'new'"
          v-model="dialogUpdatePassword"
          persistent
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              rounded
              depressed
              color="green darken-2"
              v-bind="attrs"
              v-on="on"
              ><span>{{ $t("message.46") }}</span></v-btn
            >
          </template>
          <v-card ref="updatePasswordForm">
            <v-card-actions class="pr-3 pt-2 pb-0">
              <v-spacer></v-spacer>
              <!-- Button - Close. -->
              <v-btn
                icon
                small
                color="red"
                @click="[updatePassResetForm(), (dialogUpdatePassword = false)]"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-actions>
            <v-card-title class="pt-0">
              <span class="h6">{{ $t("message.46") }}</span>
            </v-card-title>
            <v-card-text>
              <v-text-field
                ref="passwordOld"
                class="mt-0 pt-0"
                autofocus
                required
                clearable
                counter
                :append-icon="
                  dataUpdatePassword.see_pass ? 'mdi-eye' : 'mdi-eye-off'
                "
                :type="dataUpdatePassword.see_pass ? 'text' : 'password'"
                :placeholder="$t('message.47')"
                v-model="dataUpdatePassword.passwordOld"
                :maxlength="256"
                @click:append="
                  dataUpdatePassword.see_pass = !dataUpdatePassword.see_pass
                "
                :rules="[
                  () => !!dataUpdatePassword.passwordOld || $t('message.51'),
                ]"
              ></v-text-field>
              <div>
                <v-text-field
                  id="newPassword"
                  ref="passwordNew"
                  class="mt-0 pt-0"
                  required
                  clearable
                  counter
                  :append-icon="
                    dataUpdatePassword.see_pass ? 'mdi-eye' : 'mdi-eye-off'
                  "
                  :type="dataUpdatePassword.see_pass ? 'text' : 'password'"
                  :placeholder="$t('message.48')"
                  :hint="$t('message.50')"
                  v-model="dataUpdatePassword.passwordNew"
                  :maxlength="256"
                  @click:append="
                    dataUpdatePassword.see_pass = !dataUpdatePassword.see_pass
                  "
                  :rules="[
                    () => !!dataUpdatePassword.passwordNew || $t('message.51'),
                    () =>
                      /^[a-z0-9@#$%^&+=*!~)(]{8,256}$/i.test(
                        dataUpdatePassword.passwordNew
                      ) || $t('message.50'),
                  ]"
                ></v-text-field>
                <password
                  v-model="valuePasswordStrength"
                  :strength-meter-only="true"
                  :class="$vuetify.theme.dark ? 'theme--dark' : 'theme--light'"
                />
              </div>
              <v-text-field
                ref="passwordRepeat"
                class="mt-0 pt-0"
                required
                clearable
                counter
                :append-icon="
                  dataUpdatePassword.see_pass ? 'mdi-eye' : 'mdi-eye-off'
                "
                :type="dataUpdatePassword.see_pass ? 'text' : 'password'"
                :placeholder="$t('message.49')"
                v-model="dataUpdatePassword.passwordRepeat"
                :maxlength="256"
                @click:append="
                  dataUpdatePassword.see_pass = !dataUpdatePassword.see_pass
                "
                :rules="[
                  () => !!dataUpdatePassword.passwordRepeat || $t('message.51'),
                  () =>
                    dataUpdatePassword.passwordRepeat ===
                      dataUpdatePassword.passwordNew || $t('message.52'),
                ]"
              ></v-text-field>
            </v-card-text>
            <v-card-actions class="pt-0">
              <!-- Button - Generate password -->
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    fab
                    dark
                    x-small
                    depressed
                    v-bind="attrs"
                    v-on="on"
                    color="orange darken-2"
                    :loading="dataUpdatePassword.generate"
                    :disabled="dataUpdatePassword.generate"
                    @click="customPassword()"
                  >
                    <v-icon>mdi-cached</v-icon>
                  </v-btn>
                </template>
                {{ $t("message.66") }}
              </v-tooltip>
              <!-- Button - Copy password -->
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    fab
                    dark
                    x-small
                    depressed
                    v-bind="attrs"
                    v-on="on"
                    color="green darken-2"
                    :loading="dataUpdatePassword.generate"
                    :disabled="dataUpdatePassword.generate"
                    @click="copyPassword()"
                    class="mx-4"
                  >
                    <v-icon>mdi-content-copy</v-icon>
                  </v-btn>
                </template>
                {{ $t("message.67") }}
              </v-tooltip>
              <!-- Button - Refresh form -->
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    fab
                    dark
                    x-small
                    depressed
                    v-bind="attrs"
                    v-on="on"
                    color="purple darken-2"
                    class="my-0"
                    @click="updatePassResetForm()"
                  >
                    <v-icon>mdi-refresh</v-icon>
                  </v-btn>
                </template>
                {{ $t("message.68") }}
              </v-tooltip>
              <v-spacer></v-spacer>
              <!-- Button - Update -->
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    fab
                    dark
                    x-small
                    depressed
                    v-bind="attrs"
                    v-on="on"
                    color="blue darken-2"
                    @click="updatePassword()"
                  >
                    <v-icon>mdi-content-save</v-icon>
                  </v-btn>
                </template>
                {{ $t("message.55") }}
              </v-tooltip>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-card-title class="pt-0">{{ docTitle }}</v-card-title>
      <v-card-subtitle class="pt-1">{{ breadcrumbs }}</v-card-subtitle>
      <!-- Form fields. -->
      <v-card-text class="pa-4" v-if="render">
        <form :id="getIdForm()" class="document-form">
          <template v-for="field in fields">
            <!-- Hidden fields -->
            <input
              v-if="field.widget.includes('hidden')"
              :key="field.name"
              v-model="fieldsData[field.name]"
              :label="field.label"
              :id="field.id"
              :type="field.input_type"
              :name="field.name"
            />
            <!-- Others fields. -->
            <div v-else :key="field.name">
              <div v-show="!field.is_hide" class="rounded-lg">
                <!-- Common messages for all fields. -->
                <v-alert
                  v-if="field.common_msg.length > 0"
                  text
                  dense
                  color="deep-orange"
                  icon="mdi-alert"
                  border="left"
                  >{{ field.common_msg }}</v-alert
                >

                <!-- Wrapper for fields. -->
                <v-card flat outlined class="mt-4">
                  <v-card-text
                    :class="
                      field.widget !== 'checkBox' ? 'pt-2 pb-0' : 'pt-2 pb-4'
                    "
                  >
                    <div v-if="field.widget !== 'checkBox'">
                      <!-- Title of field. -->
                      <v-card-title
                        class="pa-0 text-subtitle-1 font-weight-medium"
                      >
                        {{ field.label }}
                        <span v-if="field.required" class="red--text pl-2"
                          >&#9913;</span
                        >
                      </v-card-title>
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
                        <v-card>
                          <v-card-actions class="pr-3 pt-2 pb-0">
                            <v-spacer></v-spacer>
                            <!-- Button - Close. -->
                            <v-btn
                              icon
                              small
                              color="red"
                              @click="
                                [
                                  (dynamicSelectionDialog[field.name] = false),
                                  (newValDynItem = {
                                    title: null,
                                    value: null,
                                  }),
                                  (delDynItems = []),
                                  setShowMsg(false),
                                  runShowOverlayPageLockout(false),
                                ]
                              "
                            >
                              <v-icon>mdi-close</v-icon>
                            </v-btn>
                          </v-card-actions>
                          <!-- Add new list item. -->
                          <v-card-text class="pb-0">
                            <v-card-title class="px-0 py-0">{{
                              $t("message.22")
                            }}</v-card-title>
                            <v-card-subtitle
                              v-if="field.widget.includes('Text')"
                              class="px-0 pt-2 pb-2"
                            >
                              <span class="font-weight-medium green--text">{{
                                $t("message.41")
                              }}</span>
                              <br />
                              <span class="cyan--text"
                                >{{ $t("message.23") }}:&ensp;</span
                              >
                              <span>{{ $t("message.57") }}</span>
                              <br />
                              <span class="cyan--text"
                                >{{ $t("message.24") }}:&ensp;</span
                              >
                              <span>{{ $t("message.57") }}</span>
                            </v-card-subtitle>
                            <v-card-subtitle
                              v-else-if="field.widget.includes('U32')"
                              class="px-0 pt-2 pb-2"
                            >
                              <span class="font-weight-medium green--text">{{
                                $t("message.41")
                              }}</span>
                              <br />
                              <span class="cyan--text"
                                >{{ $t("message.23") }}:&ensp;</span
                              >
                              <span>{{ $t("message.57") }}</span>
                              <br />
                              <span class="cyan--text"
                                >{{ $t("message.24") }}:&ensp;</span
                              >
                              <span>{{ $t("message.58") }}</span>
                            </v-card-subtitle>
                            <v-card-subtitle
                              v-else-if="
                                field.widget.includes('I32') ||
                                field.widget.includes('I64')
                              "
                              class="px-0 pt-2 pb-2"
                            >
                              <span class="font-weight-medium green--text">{{
                                $t("message.41")
                              }}</span>
                              <br />
                              <span class="cyan--text"
                                >{{ $t("message.23") }}:&ensp;</span
                              >
                              <span>{{ $t("message.57") }}</span>
                              <br />
                              <span class="cyan--text"
                                >{{ $t("message.24") }}:&ensp;</span
                              >
                              <span>{{ $t("message.59") }}</span>
                            </v-card-subtitle>
                            <v-card-subtitle
                              v-else-if="field.widget.includes('F64')"
                              class="px-0 pt-2 pb-2"
                            >
                              <span class="font-weight-medium green--text">{{
                                $t("message.41")
                              }}</span>
                              <br />
                              <span class="cyan--text"
                                >{{ $t("message.23") }}:&ensp;</span
                              >
                              <span>{{ $t("message.57") }}</span>
                              <br />
                              <span class="cyan--text"
                                >{{ $t("message.24") }}:&ensp;</span
                              >
                              <span>{{ $t("message.60") }}</span>
                            </v-card-subtitle>
                            <v-row>
                              <v-col cols="12" sm="6">
                                <v-text-field
                                  clearable
                                  :label="$t('message.23')"
                                  v-model="newValDynItem.title"
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
                                  v-model="newValDynItem.value"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <!-- Button - Save. -->
                            <v-btn
                              dark
                              small
                              rounded
                              depressed
                              color="blue darken-2"
                              :disabled="
                                !newValDynItem.title || !newValDynItem.value
                              "
                              @click="updateDynData(field.name, 'save')"
                              ><span>{{ $t("message.19") }}</span></v-btn
                            >
                          </v-card-actions>
                          <v-divider></v-divider>
                          <!-- Remove irrelevant items. -->
                          <v-card-text class="pb-0">
                            <v-card-title class="px-0 pt-6 pb-0">{{
                              $t("message.20")
                            }}</v-card-title>
                            <v-autocomplete
                              dense
                              chips
                              deletable-chips
                              small-chips
                              clearable
                              multiple
                              counter
                              item-text="title"
                              item-value="value"
                              item-color="red darken-3"
                              color="red darken-3"
                              :disabled="field.options.length === 0"
                              :type="field.input_type"
                              class="shrink"
                              v-model="delDynItems"
                              :items="field.options"
                            >
                              <template v-slot:item="{ item, attrs, on }">
                                <v-list-item
                                  v-on="on"
                                  v-bind="attrs"
                                  #default="{ active }"
                                >
                                  <v-list-item-action>
                                    <v-checkbox
                                      :input-value="active"
                                      color="red darken-3"
                                    ></v-checkbox>
                                  </v-list-item-action>
                                  <v-list-item-content>
                                    <v-list-item-title
                                      v-html="item.title"
                                    ></v-list-item-title>
                                    <v-list-item-subtitle
                                      v-html="item.value"
                                    ></v-list-item-subtitle>
                                  </v-list-item-content>
                                </v-list-item>
                              </template>
                            </v-autocomplete>
                          </v-card-text>
                          <v-card-actions class="pt-3">
                            <v-spacer></v-spacer>
                            <!-- Button - Delete. -->
                            <v-btn
                              dark
                              small
                              rounded
                              depressed
                              color="red darken-2"
                              :disabled="delDynItems.length === 0"
                              @click="
                                [
                                  updateDynData(field.name, 'delete'),
                                  (dynamicSelectionDialog[field.name] = false),
                                  (newValDynItem = {
                                    title: null,
                                    value: null,
                                  }),
                                  (delDynItems = []),
                                ]
                              "
                              ><spam>{{ $t("message.21") }}</spam></v-btn
                            >
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </div>

                    <!-- Text fields -->
                    <v-text-field
                      class="mt-0 pt-0"
                      v-if="
                        [
                          'inputText',
                          'inputEmail',
                          'inputPassword',
                          'inputPhone',
                          'inputUrl',
                          'inputIP',
                          'inputIPv4',
                          'inputIPv6',
                          'inputSlug',
                        ].includes(field.widget)
                      "
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
                      v-if="
                        [
                          'numberI32',
                          'numberU32',
                          'numberI64',
                          'numberF64',
                        ].includes(field.widget)
                      "
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
                    <div
                      v-if="
                        [
                          'rangeI32',
                          'rangeU32',
                          'rangeI64',
                          'rangeF64',
                        ].includes(field.widget)
                      "
                    >
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
                      v-if="
                        [
                          'radioText',
                          'radioI32',
                          'radioU32',
                          'radioI64',
                          'radioF64',
                        ].includes(field.widget)
                      "
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
                      v-if="
                        field.widget === 'inputFile' &&
                        fieldsData[field.name].url !== undefined &&
                        fieldsData[field.name].url.length > 0
                      "
                    >
                      <v-divider></v-divider>
                      <div
                        v-for="(item, index) in [
                          getFileIcon(
                            fieldsData[field.name].name.split('.').pop()
                          ),
                        ]"
                        :key="`${item.icon}-${index}`"
                      >
                        <v-sheet
                          rounded
                          color="white"
                          elevation="0"
                          height="60"
                          width="60"
                          class="my-1"
                        >
                          <v-icon light :color="item.color" size="60">{{
                            `mdi-${item.icon}`
                          }}</v-icon>
                        </v-sheet>
                      </div>
                      <v-btn
                        text
                        small
                        color="primary"
                        class="text-lowercase px-0"
                        :href="fieldsData[field.name].url"
                        target="_blank"
                        >{{ fieldsData[field.name].url }}</v-btn
                      >
                      <v-card-subtitle
                        v-if="fieldsData[field.name].size !== undefined"
                        class="pa-0"
                        >{{
                          `${$t("message.28")}: ${humanFileSize(
                            fieldsData[field.name].size
                          )}`
                        }}</v-card-subtitle
                      >
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
                      v-if="
                        field.widget === 'inputImage' &&
                        fieldsData[field.name].url !== undefined &&
                        fieldsData[field.name].url.length > 0
                      "
                    >
                      <v-divider></v-divider>
                      <div class="mt-2 mb-1 h-60">
                        <img
                          class="rounded-lg"
                          :src="
                            fieldsData[field.name].url_xs ||
                            fieldsData[field.name].url
                          "
                          height="60"
                          alt="Image"
                        />
                      </div>
                      <v-btn
                        text
                        small
                        color="primary"
                        class="text-lowercase px-0"
                        :href="fieldsData[field.name].url"
                        target="_blank"
                        >{{ fieldsData[field.name].url }}</v-btn
                      >
                      <v-card-subtitle
                        v-if="fieldsData[field.name].size !== undefined"
                        class="pa-0"
                        >{{
                          `${$t("message.28")}: ${humanFileSize(
                            fieldsData[field.name].size
                          )}`
                        }}</v-card-subtitle
                      >
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
                      :messages="field.warning"
                      :error-messages="field.error"
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
                      :messages="field.warning"
                      :error-messages="field.error"
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
                          @input="defaultColor(field.name)"
                        ></v-text-field>
                      </template>
                      <v-card>
                        <v-color-picker
                          v-if="swatches.length > 0"
                          show-swatches
                          mode="hexa"
                          v-model="fieldsData[field.name]"
                          :disabled="field.disabled"
                          :readonly="field.readonly"
                          :swatches="swatches"
                        ></v-color-picker>
                        <v-color-picker
                          v-else
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
                            >{{ $t("message.18") }}</v-btn
                          >
                          <v-btn
                            text
                            small
                            color="primary"
                            @click="
                              $refs[field.name][0].save(fieldsData[field.name])
                            "
                            >OK</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-menu>

                    <!-- Textarea fields -->
                    <div
                      v-if="field.widget === 'textArea'"
                      :class="
                        field.css_classes.includes('ckeditor')
                          ? 'mt-1 mb-2'
                          : ''
                      "
                    >
                      <div v-if="field.css_classes.includes('ckeditor')">
                        <v-card-subtitle
                          class="px-0 pt-0 pb-1 red--text"
                          v-html="`&#9913;&#9913; ${$t('message.63')}`"
                        ></v-card-subtitle>
                        <ckeditor
                          :editor="classicCKEditor"
                          v-model="fieldsData[field.name]"
                          :config="configCKEditor"
                          :disabled="field.disabled"
                        ></ckeditor>
                        <v-alert
                          class="mt-1"
                          dense
                          outlined
                          type="warning"
                          v-if="field.warning.length > 0"
                          v-html="field.warning"
                        ></v-alert>
                        <v-alert
                          class="mt-1"
                          dense
                          outlined
                          type="error"
                          v-if="field.error.length > 0"
                          v-html="field.error"
                        ></v-alert>
                      </div>
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
                          v-model="showLocalDate[field.name]"
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
                          @click:clear="fieldsData[field.name] = null"
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
                        :min="field.min"
                        @change="updateLocalDate(field.name)"
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          small
                          color="primary"
                          @click="vMenu[field.name] = false"
                          >{{ $t("message.18") }}</v-btn
                        >
                        <v-btn
                          text
                          small
                          color="primary"
                          @click="
                            $refs[field.name][0].save(fieldsData[field.name])
                          "
                          >OK</v-btn
                        >
                      </v-date-picker>
                      <!-- only max -->
                      <v-date-picker
                        v-else-if="
                          field.min.length === 0 && field.max.length > 0
                        "
                        scrollable
                        v-model="fieldsData[field.name]"
                        year-icon="mdi-calendar-blank"
                        color="primary"
                        :disabled="field.disabled"
                        :readonly="field.readonly"
                        :max="field.max"
                        @change="updateLocalDate(field.name)"
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          small
                          color="primary"
                          @click="vMenu[field.name] = false"
                          >{{ $t("message.18") }}</v-btn
                        >
                        <v-btn
                          text
                          small
                          color="primary"
                          @click="
                            $refs[field.name][0].save(fieldsData[field.name])
                          "
                          >OK</v-btn
                        >
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
                        :min="field.min"
                        :max="field.max"
                        @change="updateLocalDate(field.name)"
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          small
                          color="primary"
                          @click="vMenu[field.name] = false"
                          >{{ $t("message.18") }}</v-btn
                        >
                        <v-btn
                          text
                          small
                          color="primary"
                          @click="
                            $refs[field.name][0].save(fieldsData[field.name])
                          "
                          >OK</v-btn
                        >
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
                        @change="updateLocalDate(field.name)"
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          small
                          color="primary"
                          @click="vMenu[field.name] = false"
                          >{{ $t("message.18") }}</v-btn
                        >
                        <v-btn
                          text
                          small
                          color="primary"
                          @click="
                            $refs[field.name][0].save(fieldsData[field.name])
                          "
                          >OK</v-btn
                        >
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
                              :prepend-icon="`mdi-${getFieldIcon(
                                field.widget
                              )}`"
                              v-model="showLocalDate[field.name]"
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
                              @click:clear="fieldsData[field.name] = null"
                            ></v-text-field>
                          </template>
                          <!-- only min -->
                          <v-date-picker
                            v-if="
                              field.min.length > 0 && field.max.length === 0
                            "
                            scrollable
                            v-model="fieldsData[field.name]"
                            year-icon="mdi-calendar-blank"
                            color="primary"
                            :disabled="field.disabled"
                            :readonly="field.readonly"
                            :min="field.min"
                            @change="updateLocalDate(field.name)"
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              small
                              color="primary"
                              @click="vMenu[field.name] = false"
                              >{{ $t("message.18") }}</v-btn
                            >
                            <v-btn
                              text
                              small
                              color="primary"
                              @click="
                                $refs[field.name][0].save(
                                  fieldsData[field.name]
                                )
                              "
                              >OK</v-btn
                            >
                          </v-date-picker>
                          <!-- only max -->
                          <v-date-picker
                            v-else-if="
                              field.min.length === 0 && field.max.length > 0
                            "
                            scrollable
                            v-model="fieldsData[field.name]"
                            year-icon="mdi-calendar-blank"
                            color="primary"
                            :disabled="field.disabled"
                            :readonly="field.readonly"
                            :max="field.max"
                            @change="updateLocalDate(field.name)"
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              small
                              color="primary"
                              @click="vMenu[field.name] = false"
                              >{{ $t("message.18") }}</v-btn
                            >
                            <v-btn
                              text
                              small
                              color="primary"
                              @click="
                                $refs[field.name][0].save(
                                  fieldsData[field.name]
                                )
                              "
                              >OK</v-btn
                            >
                          </v-date-picker>
                          <!-- min and max -->
                          <v-date-picker
                            v-else-if="
                              field.min.length > 0 && field.max.length > 0
                            "
                            scrollable
                            v-model="fieldsData[field.name]"
                            year-icon="mdi-calendar-blank"
                            color="primary"
                            :disabled="field.disabled"
                            :readonly="field.readonly"
                            :min="field.min"
                            :max="field.max"
                            @change="updateLocalDate(field.name)"
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              small
                              color="primary"
                              @click="vMenu[field.name] = false"
                              >{{ $t("message.18") }}</v-btn
                            >
                            <v-btn
                              text
                              small
                              color="primary"
                              @click="
                                $refs[field.name][0].save(
                                  fieldsData[field.name]
                                )
                              "
                              >OK</v-btn
                            >
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
                            @change="updateLocalDate(field.name)"
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              small
                              color="primary"
                              @click="vMenu[field.name] = false"
                              >{{ $t("message.18") }}</v-btn
                            >
                            <v-btn
                              text
                              small
                              color="primary"
                              @click="
                                $refs[field.name][0].save(
                                  fieldsData[field.name]
                                )
                              "
                              >OK</v-btn
                            >
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
                              :id="`${field.id}__time`"
                              type="time"
                              :name="`${field.name}__time`"
                              :placeholder="field.placeholder"
                              :required="field.required"
                              :disabled="field.disabled"
                              readonly
                              :class="field.css_classes"
                              v-bind="attrs"
                              v-on="on"
                              @click:clear="
                                fieldsData[`${field.name}__time`] = null
                              "
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            full-width
                            scrollable
                            v-if="vMenu[`${field.name}__time`]"
                            v-model="fieldsData[`${field.name}__time`]"
                            @click:minute="
                              $refs[`${field.name}__time`][0].save(
                                fieldsData[`${field.name}__time`]
                              )
                            "
                            :disabled="field.disabled"
                            :readonly="field.readonly"
                          ></v-time-picker>
                        </v-menu>
                      </v-col>
                    </v-row>

                    <!-- Selection fields-->
                    <v-autocomplete
                      class="pt-0"
                      v-if="
                        [
                          'selectText',
                          'selectI32',
                          'selectU32',
                          'selectI64',
                          'selectF64',
                        ].includes(field.widget)
                      "
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
                      :error-messages="field.error"
                    ></v-autocomplete>

                    <!-- Selection fields
                     (multiple)
                    -->
                    <v-autocomplete
                      class="pt-0"
                      v-if="
                        [
                          'selectTextMult',
                          'selectI32Mult',
                          'selectU32Mult',
                          'selectI64Mult',
                          'selectF64Mult',
                        ].includes(field.widget)
                      "
                      clearable
                      chips
                      small-chips
                      deletable-chips
                      multiple
                      counter
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
                      :error-messages="field.error"
                    ></v-autocomplete>

                    <!-- Selection fields
                     (dynamic)
                    -->
                    <v-autocomplete
                      class="pt-0"
                      v-if="
                        [
                          'selectTextDyn',
                          'selectI32Dyn',
                          'selectU32Dyn',
                          'selectI64Dyn',
                          'selectF64Dyn',
                        ].includes(field.widget)
                      "
                      clearable
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
                      :error-messages="field.error"
                    >
                      <template v-slot:prepend>
                        <!-- Button - Open a dialog. -->
                        <v-btn
                          fab
                          dark
                          depressed
                          small
                          color="orange darken-2"
                          @click="dynamicSelectionDialog[field.name] = true"
                        >
                          <v-icon>mdi-plus-minus-variant</v-icon>
                        </v-btn>
                      </template>
                    </v-autocomplete>

                    <!-- Selection fields
                     (multiple, dynamic)
                    -->
                    <v-autocomplete
                      class="pt-0"
                      v-if="
                        [
                          'selectTextMultDyn',
                          'selectI32MultDyn',
                          'selectU32MultDyn',
                          'selectI64MultDyn',
                          'selectF64MultDyn',
                        ].includes(field.widget)
                      "
                      clearable
                      chips
                      small-chips
                      deletable-chips
                      multiple
                      counter
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
                      :error-messages="field.error"
                    >
                      <template v-slot:prepend>
                        <!-- Button - Open a dialog. -->
                        <v-btn
                          fab
                          dark
                          depressed
                          small
                          color="orange darken-2"
                          @click="dynamicSelectionDialog[field.name] = true"
                        >
                          <v-icon>mdi-plus-minus-variant</v-icon>
                        </v-btn>
                      </template>
                    </v-autocomplete>
                  </v-card-text>
                </v-card>
              </div>
            </div>
          </template>
        </form>
      </v-card-text>
      <!-- Form control buttons. -->
      <v-card-actions class="pt-8 px-4 pb-4">
        <!-- Delete button. -->
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              small
              depressed
              color="red darken-2"
              :disabled="$route.params.indexDoc === 'new'"
              v-bind="attrs"
              v-on="on"
              @click="dialogDocDelete = true"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
          <span v-text="$t('message.13')"></span>
        </v-tooltip>
        <v-spacer></v-spacer>
        <!-- Save button and create a new document. -->
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              rounded
              depressed
              color="green darken-2"
              v-bind="attrs"
              v-on="on"
              @click="saveDoc('save_and_new')"
            >
              <v-icon small>mdi-content-save</v-icon>
              <v-icon small>mdi-ampersand</v-icon>
              <v-icon small>mdi-file-outline</v-icon>
            </v-btn>
          </template>
          <span v-text="$t('message.14')"></span>
        </v-tooltip>
        <!-- Save button and continue editing the document. -->
        <v-tooltip top v-if="isCreatedDoc()">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              rounded
              depressed
              color="btnOrange.bg"
              class="orange darken-2 mx-4"
              v-bind="attrs"
              v-on="on"
              @click="saveDoc('save_and_edit')"
            >
              <v-icon small>mdi-content-save</v-icon>
              <v-icon small>mdi-ampersand</v-icon>
              <v-icon small>mdi-file-document-edit-outline</v-icon>
            </v-btn>
          </template>
          <span v-text="$t('message.15')"></span>
        </v-tooltip>
        <!-- Save button. -->
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              small
              depressed
              color="blue darken-2"
              v-bind="attrs"
              v-on="on"
              @click="saveDoc()"
              :class="isCreatedDoc() ? '' : 'ml-4'"
            >
              <v-icon>mdi-content-save</v-icon>
            </v-btn>
          </template>
          <span v-text="$t('message.16')"></span>
        </v-tooltip>
      </v-card-actions>
    </v-card>

    <!-- Confirm deletion of the document. -->
    <v-dialog v-model="dialogDocDelete" max-width="290">
      <v-card>
        <v-card-title class="h6">{{ $t("message.39") }}</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="dialogDocDelete = false">{{
            $t("message.18")
          }}</v-btn>
          <v-btn
            text
            color="red"
            @click="[deleteDoc(), (dialogDocDelete = false)]"
            >{{ $t("message.21") }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import generatePassword from "password-generator";
import Password from "vue-password-strength-meter";

export default {
  name: "DocumentForm",

  components: { Password },

  data: () => ({
    docTitle: "...",
    breadcrumbs: "... > ... > ...",
    vMenu: {},
    fieldsData: {},
    fields: [],
    dynamicSelectionDialog: {},
    delDynItems: [],
    newValDynItem: { title: null, value: null },
    showLocalDate: {},
    maxTotalFormSize: 16384, // 16384 = ~16 Kb (default data size for the form),
    render: true,
    dialogDocDelete: false,
    is_password: false,
    // Update password.
    dialogUpdatePassword: false,
    dataUpdatePassword: {
      passwordOld: null,
      passwordNew: null,
      passwordRepeat: null,
      formHasErrors: false,
      see_pass: false,
      generate: false,
    },
    // Options password.
    optionPass: {
      passLength: 16,
      uppercaseMinCount: 3,
      lowercaseMinCount: 3,
      numberMinCount: 2,
      specialMinCount: 2,
      UPPERCASE_RE: /([A-Z])/g,
      LOWERCASE_RE: /([a-z])/g,
      NUMBER_RE: /([\d])/g,
      SPECIAL_CHAR_RE: /([@#$%^&+=*!~)(])/g,
      NON_REPEATING_CHAR_RE: /([@#$%^&+=*!~)(a-z\d])\1{2,}/gi,
    },
  }),

  computed: {
    ...mapState([
      "serviceList",
      "btnRed",
      "btnPurple",
      "btnLightBlue",
      "btnGreen",
      "btnYellow",
      "btnOrange",
      "btnDeepOrange",
    ]),
    ...mapState("documentList", [
      "documents",
      "currentPageNumber",
      "pageCount",
      "docsPerPage",
      "sortDocList",
      "sortDirectDocList",
    ]),
    ...mapState("ckeditor", ["classicCKEditor", "configCKEditor"]),
    ...mapState("colorPicker", ["swatches"]),
    valuePasswordStrength: function () {
      if (this.dataUpdatePassword.passwordNew) {
        return this.dataUpdatePassword.passwordNew;
      } else {
        return "";
      }
    },
  },

  methods: {
    ...mapMutations(["setIsAuthenticated"]),
    ...mapMutations("popUpMsgs", ["setShowMsg"]),
    ...mapMutations("documentList", [
      "setDocuments",
      "setCurrentPageNumber",
      "setDocsPerPage",
      "setSortDocList",
      "setSortDirectDocList",
      "setDataFilters",
      "setSelectDataFilters",
    ]),
    ...mapActions("documentList", ["ajaxGetDocumentList"]),
    ...mapActions("popUpMsgs", ["runShowMsg"]),
    ...mapActions("overlays", ["runShowOverlayPageLockout"]),
    // Router - Go back one step.
    goBack() {
      const service = this.$route.params.service;
      const collection = this.$route.params.collection;
      const indexService = this.$route.params.indexService;
      const indexCollection = this.$route.params.indexCollection;
      this.setShowMsg(false);
      this.setDocuments([]);
      this.$router.replace({
        path: `/${service}/${indexService}/${collection}/${indexCollection}/document-list`,
        query: {
          per: this.docsPerPage,
          page: this.currentPageNumber,
          sort: this.sortDocList,
          direct: this.sortDirectDocList,
        },
      });
    },
    // To Rerender Component.
    reload() {
      this.render = false;
      this.$nextTick(() => {
        this.render = true;
      });
    },
    // Check password quality.
    isStrongEnough(password) {
      const uc = password.match(this.optionPass.UPPERCASE_RE);
      const lc = password.match(this.optionPass.LOWERCASE_RE);
      const n = password.match(this.optionPass.NUMBER_RE);
      const sc = password.match(this.optionPass.SPECIAL_CHAR_RE);
      const nr = password.match(this.optionPass.NON_REPEATING_CHAR_RE);
      return (
        password.length >= this.optionPass.passLength &&
        !nr &&
        uc &&
        uc.length >= this.optionPass.uppercaseMinCount &&
        lc &&
        lc.length >= this.optionPass.lowercaseMinCount &&
        n &&
        n.length >= this.optionPass.numberMinCount &&
        sc &&
        sc.length >= this.optionPass.specialMinCount
      );
    },
    // Generate password.
    customPassword() {
      this.dataUpdatePassword.generate = true;
      //
      let password = "";
      //
      while (!this.isStrongEnough(password)) {
        password = generatePassword(
          this.optionPass.passLength,
          false,
          /[a-z\d@#$%^&+=*!~)(]/i
        );
      }
      this.dataUpdatePassword.passwordNew = password;
      this.dataUpdatePassword.passwordRepeat = password;
      setTimeout(() => {
        this.dataUpdatePassword.generate = false;
        return undefined;
      }, 300);
    },
    // Copy Password to Clipboard.
    copyPassword() {
      let copyText = document.getElementById("newPassword");
      copyText.select();
      copyText.setSelectionRange(0, 99999); /* For mobile devices */
      navigator.clipboard.writeText(copyText.value);
    },
    // Get id form.
    getIdForm() {
      const indexService = this.$route.params.indexService;
      const indexCollection = this.$route.params.indexCollection;
      const service = this.serviceList[indexService];
      return service.collections[indexCollection].model_key
        .split("__")[1]
        .substring(1);
    },
    // Determine if the document was previously created.
    isCreatedDoc() {
      return !isNaN(parseInt(this.$route.params.indexDoc));
    },
    // Get human readable version of file size.
    humanFileSize(size) {
      var i = Math.floor(Math.log(size) / Math.log(1024));
      return (
        (size / Math.pow(1024, i)).toFixed(2) * 1 +
        " " +
        ["B", "kB", "MB", "GB", "TB"][i]
      );
    },
    // Get field type with dynamic widget.
    getDynFieldType(widget) {
      let result = "text";
      if (
        widget.includes("I32") ||
        widget.includes("U32") ||
        widget.includes("I64") ||
        widget.includes("F64")
      ) {
        result = "number";
      }
      return result;
    },
    // Default color.
    defaultColor(fieldName) {
      if (!this.fieldsData[fieldName]) {
        this.fieldsData[fieldName] = "#00000000";
      }
    },
    // Update local date.
    updateLocalDate(fieldName) {
      this.showLocalDate[fieldName] = new Date(
        this.fieldsData[fieldName]
      ).toLocaleDateString([this.$userLang, "en"]);
    },
    // Get the associative icon for the file.
    getFileIcon(extension) {
      let result;
      switch (extension.toLowerCase()) {
        case "txt":
        case "text":
          result = { color: "blue", icon: "note-text-outline" };
          break;
        case "doc":
        case "dot":
        case "wbk":
        case "docx":
        case "docm":
        case "dotx":
        case "dotm":
        case "docb":
          result = { color: "blue", icon: "microsoft-word" };
          break;
        case "xls":
        case "xlt":
        case "xlm":
        case "xlsx":
        case "xlsm":
        case "xltx":
        case "xltm":
        case "xlsb":
        case "xla":
        case "xlam":
        case "xll":
        case "xlw":
          result = { color: "green", icon: "microsoft-excel" };
          break;
        case "ppt":
        case "pot":
        case "pps":
        case "pptx":
        case "pptm":
        case "potx":
        case "potm":
        case "ppam":
        case "ppsx":
        case "ppsm":
        case "sldx":
        case "sldm":
          result = { color: "orange", icon: "microsoft-powerpoint" };
          break;
        case "accdb":
        case "accde":
        case "accdt":
        case "accdr":
          result = { color: "pink", icon: "microsoft-access" };
          break;
        case "one":
          result = { color: "purple", icon: "microsoft-onenote" };
          break;
        case "pub":
          result = { color: "teal", icon: "alpha-p-box" };
          break;
        case "xml":
          result = { color: "blue", icon: "xml" };
          break;
        case "svg":
        case "svgz":
          result = { color: "amber", icon: "svg" };
          break;
        case "pdf":
          result = { color: "red", icon: "file-pdf-box" };
          break;
        case "html":
        case "htm":
          result = { color: "orange", icon: "language-html5" };
          break;
        case "epub":
          result = { color: "lime", icon: "book-open-page-variant-outline" };
          break;
        case "odt":
          result = { color: "blue", icon: "file-document-outline" };
          break;
        case "sxw":
        case "stw":
        case "sxg":
          result = { color: "blue-grey", icon: "file-document-outline" };
          break;
        case "sxc":
        case "stc":
          result = { color: "lime", icon: "table" };
          break;
        case "sxd":
        case "std":
          result = { color: "amber", icon: "draw" };
          break;
        case "sxi":
        case "sti":
          result = { color: "orange", icon: "monitor-dashboard" };
          break;
        case "sxm":
          result = { color: "blue-grey", icon: "math-integral-box" };
          break;
        case "djvu":
        case "djv":
          result = {
            color: "grey darken-1",
            icon: "text-box-multiple-outline",
          };
          break;
        case "csv":
          result = { color: "grey darken-1", icon: "file-delimited-outline" };
          break;
        case "tsv":
        case "tab":
          result = { color: "grey darken-1", icon: "file-table-outline" };
          break;
        default:
          result = { color: "grey darken-1", icon: "file-hidden" };
      }
      return result;
    },
    // Get icon of field.
    getFieldIcon(widget) {
      let result = "";
      switch (widget) {
        case "inputText":
          result = "note-text-outline";
          break;
        case "inputSlug":
          result = "snake";
          break;
        case "inputColor":
          result = "palette-outline";
          break;
        case "inputDate":
        case "inputDateTime":
          result = "calendar";
          break;
        case "inputEmail":
          result = "email-outline";
          break;
        case "inputPassword":
          result = "lock-outline";
          break;
        case "inputPhone":
          result = "phone";
          break;
        case "inputUrl":
          result = "wan";
          break;
        case "inputFile":
          result = "paperclip";
          break;
        case "inputImage":
          result = "camera-outline";
          break;
        case "inputIP":
        case "inputIPv4":
        case "inputIPv6":
          result = "account-network";
          break;
        case "textArea":
          result = "script-text-outline";
          break;
        default:
          if (widget.includes("number")) {
            result = "numeric";
          } else if (widget.includes("range")) {
            result = "arrow-split-vertical";
          } else if (widget.includes("select")) {
            result = "form-select";
          }
      }
      //
      return result;
    },
    // Show popup warning.
    showWarning(msg) {
      if (msg.length > 0) {
        this.runShowMsg({ text: msg, status: "warning" });
      }
    },
    // Get data for fields of form.
    getFormData(document) {
      const vMenu = {};
      const fieldsData = {};
      const dynamicSelectionDialog = {};

      document.forEach((field) => {
        let tmp;
        //
        if (!this.is_password) {
          this.is_password = field.name === "password";
        }
        //
        field.error = field.error.replace(/<br>/g, " ");

        switch (field.widget) {
          case "inputText":
          case "inputEmail":
          case "inputPassword":
          case "inputPhone":
          case "inputUrl":
          case "inputIP":
          case "inputIPv4":
          case "inputIPv6":
          case "inputSlug":
            fieldsData[field.name] = field.value || "";
            this.showWarning(field.common_msg);
            break;
          case "textArea":
            fieldsData[field.name] = field.value || "";
            this.showWarning(field.common_msg);
            break;
          case "inputColor":
            vMenu[field.name] = false;
            fieldsData[field.name] = field.value || "#00000000";
            this.showWarning(field.common_msg);
            break;
          case "inputDate":
            vMenu[field.name] = false;
            field.min = field.min || "";
            field.max = field.max || "";
            fieldsData[field.name] = field.value || null;
            this.showLocalDate[field.name] = field.value
              ? new Date(field.value).toLocaleDateString([this.$userLang, "en"])
              : "";
            this.showWarning(field.common_msg);
            break;
          case "inputDateTime":
            vMenu[field.name] = false;
            vMenu[`${field.name}__time`] = false;
            if (
              this.$route.params.indexDoc === "new" &&
              (field.name === "created_at" || field.name === "updated_at")
            ) {
              field.is_hide = true;
            }
            switch (field.name) {
              case "created_at":
                field.label = this.$t("message.72");
                break;
              case "updated_at":
                field.label = this.$t("message.73");
                break;
            }
            field.min = field.min || "";
            field.max = field.max || "";
            tmp = field.value || "";
            fieldsData[field.name] = tmp.length > 0 ? tmp.substr(0, 10) : null;
            fieldsData[`${field.name}__time`] =
              tmp.length > 0
                ? new Date(tmp + "Z").toLocaleTimeString().slice(0, 5)
                : new Date().toLocaleTimeString().slice(0, 5);
            this.showLocalDate[field.name] = field.value
              ? new Date(field.value).toLocaleDateString([this.$userLang, "en"])
              : "";
            this.showWarning(field.common_msg);
            break;
          case "hiddenText":
            fieldsData[field.name] = field.value || "";
            this.showWarning(field.common_msg);
            break;
          case "hiddenI32":
          case "hiddenU32":
          case "hiddenI64":
            tmp = parseInt(field.value);
            fieldsData[field.name] = !Number.isNaN(tmp) ? tmp : "";
            this.showWarning(field.common_msg);
            break;
          case "hiddenF64":
            tmp = parseFloat(field.value);
            fieldsData[field.name] = !Number.isNaN(tmp) ? tmp : "";
            this.showWarning(field.common_msg);
            break;
          case "numberI32":
          case "numberU32":
          case "numberI64":
            tmp = parseInt(field.value);
            fieldsData[field.name] = !Number.isNaN(tmp) ? tmp : "";
            this.showWarning(field.common_msg);
            break;
          case "numberF64":
            tmp = parseFloat(field.value);
            fieldsData[field.name] = !Number.isNaN(tmp) ? tmp : "";
            this.showWarning(field.common_msg);
            break;
          case "rangeI32":
          case "rangeU32":
          case "rangeI64":
            fieldsData[field.name] = parseInt(field.value);
            this.showWarning(field.common_msg);
            break;
          case "rangeF64":
            fieldsData[field.name] = parseFloat(field.value);
            this.showWarning(field.common_msg);
            break;
          case "radioText":
            fieldsData[field.name] = field.value || "";
            this.showWarning(field.common_msg);
            break;
          case "radioI32":
          case "radioU32":
          case "radioI64":
            tmp = parseInt(field.value);
            fieldsData[field.name] = !Number.isNaN(tmp) ? tmp : "";
            field.options.forEach(function (item) {
              item[0] = parseInt(item[0]);
            });
            this.showWarning(field.common_msg);
            break;
          case "radioF64":
            tmp = parseFloat(field.value);
            fieldsData[field.name] = !Number.isNaN(tmp) ? tmp : "";
            field.options.forEach(function (item) {
              item[0] = parseFloat(item[0]);
            });
            this.showWarning(field.common_msg);
            break;
          case "checkBox":
            fieldsData[field.name] = field.checked;
            this.showWarning(field.common_msg);
            break;
          case "selectText":
            fieldsData[field.name] = field.value || "";
            field.options = field.options.map(function (item) {
              return { value: item[0], title: item[1] };
            });
            this.showWarning(field.common_msg);
            break;
          case "selectI32":
          case "selectU32":
          case "selectI64":
            tmp = parseInt(field.value);
            fieldsData[field.name] = !Number.isNaN(tmp) ? tmp : "";
            field.options = field.options.map(function (item) {
              return { value: parseInt(item[0]), title: item[1] };
            });
            this.showWarning(field.common_msg);
            break;
          case "selectF64":
            tmp = parseFloat(field.value);
            fieldsData[field.name] = !Number.isNaN(tmp) ? tmp : "";
            field.options = field.options.map(function (item) {
              return { value: parseFloat(item[0]), title: item[1] };
            });
            this.showWarning(field.common_msg);
            break;
          case "selectTextMult":
            fieldsData[field.name] =
              field.value.length > 0 ? JSON.parse(field.value) : [];
            field.options = field.options.map(function (item) {
              return { value: item[0], title: item[1] };
            });
            this.showWarning(field.common_msg);
            break;
          case "selectI32Mult":
          case "selectU32Mult":
          case "selectI64Mult":
            fieldsData[field.name] =
              field.value.length > 0
                ? JSON.parse(field.value).map((item) => parseInt(item))
                : [];
            field.options = field.options.map(function (item) {
              return { value: parseInt(item[0]), title: item[1] };
            });
            this.showWarning(field.common_msg);
            break;
          case "selectF64Mult":
            fieldsData[field.name] =
              field.value.length > 0
                ? JSON.parse(field.value).map((item) => parseFloat(item))
                : [];
            field.options = field.options.map(function (item) {
              return { value: parseFloat(item[0]), title: item[1] };
            });
            this.showWarning(field.common_msg);
            break;
          case "selectTextDyn":
            fieldsData[field.name] = field.value || "";
            field.options = field.options.map(function (item) {
              return { value: item[0], title: item[1] };
            });
            dynamicSelectionDialog[field.name] = false;
            this.showWarning(field.common_msg);
            break;
          case "selectI32Dyn":
          case "selectU32Dyn":
          case "selectI64Dyn":
            tmp = parseInt(field.value);
            fieldsData[field.name] = !Number.isNaN(tmp) ? tmp : "";
            field.options = field.options.map(function (item) {
              return { value: parseInt(item[0]), title: item[1] };
            });
            dynamicSelectionDialog[field.name] = false;
            this.showWarning(field.common_msg);
            break;
          case "selectF64Dyn":
            tmp = parseFloat(field.value);
            fieldsData[field.name] = !Number.isNaN(tmp) ? tmp : "";
            field.options = field.options.map(function (item) {
              return { value: parseFloat(item[0]), title: item[1] };
            });
            dynamicSelectionDialog[field.name] = false;
            this.showWarning(field.common_msg);
            break;
          case "selectTextMultDyn":
            fieldsData[field.name] =
              field.value.length > 0 ? JSON.parse(field.value) : [];
            field.options = field.options.map(function (item) {
              return { value: item[0], title: item[1] };
            });
            dynamicSelectionDialog[field.name] = false;
            this.showWarning(field.common_msg);
            break;
          case "selectI32MultDyn":
          case "selectU32MultDyn":
          case "selectI64MultDyn":
            fieldsData[field.name] =
              field.value.length > 0
                ? JSON.parse(field.value).map((item) => parseInt(item))
                : [];
            field.options = field.options.map(function (item) {
              return { value: parseInt(item[0]), title: item[1] };
            });
            dynamicSelectionDialog[field.name] = false;
            this.showWarning(field.common_msg);
            break;
          case "selectF64MultDyn":
            fieldsData[field.name] =
              field.value.length > 0
                ? JSON.parse(field.value).map((item) => parseFloat(item))
                : [];
            field.options = field.options.map(function (item) {
              return { value: parseFloat(item[0]), title: item[1] };
            });
            dynamicSelectionDialog[field.name] = false;
            this.showWarning(field.common_msg);
            break;
          case "inputFile":
          case "inputImage":
            fieldsData[field.name] =
              field.value.length > 0 ? JSON.parse(field.value) : {};
            fieldsData[field.name].is_delete = false;
            this.showWarning(field.common_msg);
            break;
        }
      });

      this.vMenu = vMenu;
      this.fieldsData = fieldsData;
      this.dynamicSelectionDialog = dynamicSelectionDialog;
      this.fields = document;
    },

    // Converte File to base64.
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          let encoded = reader.result.toString().replace(/^data:(.*,)?/, "");
          if (encoded.length % 4 > 0) {
            encoded += "=".repeat(4 - (encoded.length % 4));
          }
          resolve(encoded);
        };
        reader.onerror = (error) => reject(error);
      });
    },

    // Save/Update the document.
    saveDoc(mode = "save") {
      this.setShowMsg(false);
      this.runShowOverlayPageLockout(true);

      const indexService = this.$route.params.indexService;
      const indexCollection = this.$route.params.indexCollection;
      const service = this.serviceList[indexService];
      const modelKey = service.collections[indexCollection].model_key;
      const cloneFieldsData = JSON.parse(JSON.stringify(this.fieldsData));

      const prepareData = () => {
        return new Promise((resolve, reject) => {
          const countFileType = this.fields.reduce((sum, field) => {
            if (field.input_type === "file") {
              ++sum;
            }
            return sum;
          }, 0);
          let dataSumSize = 0;
          const response = (counter) => {
            if (counter === countFileType) {
              if (dataSumSize <= this.maxTotalFormSize) {
                resolve();
              } else {
                const msg = `The total size of the form data exceeds the ${this.humanFileSize(
                  this.maxTotalFormSize
                )} limit.`;
                reject(msg);
              }
            }
          };
          let counter = 0;
          response(counter);
          this.fields.forEach((field) => {
            // Convert numeric data types.
            if (
              field.widget.includes("I32") ||
              field.widget.includes("U32") ||
              field.widget.includes("I64")
            ) {
              if (field.widget.includes("Mult")) {
                cloneFieldsData[field.name] = cloneFieldsData[field.name].map(
                  (item) => parseInt(item)
                );
              } else {
                cloneFieldsData[field.name] = parseInt(
                  cloneFieldsData[field.name]
                );
              }
            } else if (field.widget.includes("F64")) {
              if (field.widget.includes("Mult")) {
                cloneFieldsData[field.name] = cloneFieldsData[field.name].map(
                  (item) => parseFloat(item)
                );
              } else {
                cloneFieldsData[field.name] = parseFloat(
                  cloneFieldsData[field.name]
                );
              }
            }
            // inputDateTime - Combining date and time.
            if (field.widget === "inputDateTime") {
              if (cloneFieldsData[field.name]) {
                let localTime = cloneFieldsData[`${field.name}__time`];
                if (!localTime) {
                  localTime = new Date().toLocaleTimeString().slice(0, 5);
                }
                cloneFieldsData[field.name] = new Date(
                  cloneFieldsData[field.name] + "T" + localTime
                )
                  .toISOString()
                  .slice(0, 16);
              }
              delete cloneFieldsData[`${field.name}__time`];
            }
            // Preparing data from fields of the `file` type.
            if (field.input_type === "file") {
              const files = document.getElementById(field.id).files;
              if (files.length > 0) {
                const file = files[0];
                const fileName = file.name;
                dataSumSize += file.size;
                this.toBase64(file)
                  .then((data) => {
                    cloneFieldsData[field.name] = JSON.stringify({
                      name: fileName,
                      base64: data,
                      is_delete:
                        this.$route.params.indexDoc === "new" ? false : true,
                    });
                    response(++counter);
                  })
                  .catch((error) => {
                    reject(error);
                  });
              } else {
                if (this.fieldsData[field.name].is_delete) {
                  cloneFieldsData[field.name] = JSON.stringify({
                    name: "",
                    base64: "",
                    is_delete: true,
                  });
                } else {
                  cloneFieldsData[field.name] = null;
                }
                response(++counter);
              }
            }
          });
        });
      };

      prepareData()
        .then(() => {
          const options = {
            method: "POST",
            data: cloneFieldsData,
            url: `/admin/${modelKey}/save-document`,
          };

          this.axios(options)
            .then((response) => {
              const data = response.data;
              if (!data.is_authenticated) {
                this.runShowOverlayPageLockout(false);
                this.setIsAuthenticated(false);
              } else if (data.msg_err.length === 0) {
                const document = JSON.parse(data.document);
                for (let idx = 0, len = document.length; idx < len; idx++) {
                  const field = document[idx];
                  if (field.error.length > 0 || field.common_msg.length > 0) {
                    mode = "save_and_edit";
                    break;
                  }
                }
                switch (mode) {
                  case "save":
                    this.goBack();
                    break;
                  case "save_and_edit":
                    this.vMenu = {};
                    this.dynamicSelectionDialog = {};
                    this.delDynItems = [];
                    this.newValDynItem = { title: null, value: null };
                    this.fieldsData = {};
                    this.fields = [];
                    this.getFormData(document);
                    this.reload();
                    break;
                  case "save_and_new":
                    if (this.$session.exists()) {
                      this.$session.set("num_page", this.currentPageNumber);
                      this.$session.set("num_per", this.docsPerPage);
                      this.$session.set("sort", this.sortDocList);
                      this.$session.set("direct", this.sortDirectDocList);
                    }
                    this.$router.replace(
                      {
                        name: "documenForm",
                        params: {
                          service: this.$route.params.service,
                          indexService: this.$route.params.indexService,
                          collection: this.$route.params.collection,
                          indexCollection: this.$route.params.indexCollection,
                          indexDoc: "new",
                        },
                      },
                      () => window.document.location.reload(),
                      () => window.document.location.reload()
                    );
                    break;
                }
                this.runShowOverlayPageLockout(false);
              } else {
                console.log(data.msg_err);
                this.runShowOverlayPageLockout(false);
                this.runShowMsg({ text: data.msg_err, status: "error" });
              }
            })
            .catch((error) => {
              console.log(error);
              this.runShowOverlayPageLockout(false);
              this.runShowMsg({ text: error, status: "error" });
            });
        })
        .catch((error) => {
          console.log(error);
          this.runShowOverlayPageLockout(false);
          this.runShowMsg({ text: error, status: "error" });
        });
    },

    // Get Title of document.
    getDocTitle() {
      const indexDoc = this.$route.params.indexDoc;
      let title = "";
      if (indexDoc !== "new") {
        const indexService = this.$route.params.indexService;
        const indexCollection = this.$route.params.indexCollection;
        const fieldName =
          this.serviceList[indexService].collections[indexCollection].fields[0]
            .field;
        title = this.documents[indexDoc][fieldName];
      } else {
        title = this.$t("message.26");
      }
      this.docTitle = title;
    },

    // Get scheme route of document.
    getBreadcrumbs() {
      const indexService = this.$route.params.indexService;
      const indexCollection = this.$route.params.indexCollection;
      const service = this.serviceList[indexService];
      this.breadcrumbs = `${service.service.title} > ${service.collections[indexCollection].title} > ${this.docTitle}`;
    },

    // Get document
    ajaxGetDoc(indexes) {
      const service = this.serviceList[indexes.indexService];
      const payload = {
        model_key: service.collections[indexes.indexCollection].model_key,
        doc_hash:
          this.documents[indexes.indexDoc] !== undefined
            ? this.documents[indexes.indexDoc].hash
            : "",
      };
      this.axios
        .post("/admin/get-document", payload)
        .then((response) => {
          const data = response.data;
          if (!data.is_authenticated) {
            this.runShowOverlayPageLockout(false);
            this.setIsAuthenticated(false);
          } else if (data.msg_err.length === 0) {
            // 16384 = ~16 Kb (default data size for the form)
            this.maxTotalFormSize = data.max_size - 16384;
            this.getDocTitle();
            this.getBreadcrumbs();
            if (data.document.length > 0) {
              const document = JSON.parse(data.document);
              this.getFormData(document);
            }
            this.runShowOverlayPageLockout(false);
          } else {
            console.log(data.msg_err);
            this.runShowOverlayPageLockout(false);
            this.runShowMsg({ text: data.msg_err, status: "error" });
          }
        })
        .catch((error) => {
          console.log(error);
          this.runShowOverlayPageLockout(false);
          this.runShowMsg({ text: error, status: "error" });
        });
    },
    getDoc() {
      this.setShowMsg(false);
      this.runShowOverlayPageLockout(true);
      const indexService = this.$route.params.indexService;
      const indexCollection = this.$route.params.indexCollection;
      const indexDoc = this.$route.params.indexDoc;
      if (this.documents.length > 0) {
        this.ajaxGetDoc({ indexService, indexCollection, indexDoc });
      } else {
        this.ajaxGetDocumentList({ indexService, indexCollection })
          .then(() => {
            this.ajaxGetDoc({ indexService, indexCollection, indexDoc });
          })
          .catch((error) => {
            console.log(error);
            this.runShowOverlayPageLockout(false);
            this.runShowMsg({ text: error, status: "error" });
          });
      }
    },

    // Remove document from collection.
    deleteDoc() {
      this.setShowMsg(false);
      this.runShowOverlayPageLockout(true);
      const indexService = this.$route.params.indexService;
      const indexCollection = this.$route.params.indexCollection;
      const indexDoc = this.$route.params.indexDoc;
      const service = this.serviceList[indexService];
      const payload = {
        model_key: service.collections[indexCollection].model_key,
        doc_hash:
          this.documents[indexDoc] !== undefined
            ? this.documents[indexDoc].hash
            : "",
      };
      if (payload.doc_hash.length === 0) {
        this.runShowOverlayPageLockout(false);
        return;
      }
      this.axios
        .post("/admin/delete-document", payload)
        .then((response) => {
          const data = response.data;
          if (!data.is_authenticated) {
            this.runShowOverlayPageLockout(false);
            this.setIsAuthenticated(false);
          } else if (data.msg_err.length === 0) {
            this.runShowOverlayPageLockout(false);
            this.goBack();
          } else {
            console.log(data.msg_err);
            this.runShowOverlayPageLockout(false);
            this.runShowMsg({ text: data.msg_err, status: "error" });
          }
        })
        .catch((error) => {
          console.log(error);
          this.runShowOverlayPageLockout(false);
          this.runShowMsg({ text: error, status: "error" });
        });
    },

    // Adding and deleting dynamic elements.
    updateDynData(fieldName, mode) {
      this.setShowMsg(false);
      this.runShowOverlayPageLockout(true);
      const indexService = this.$route.params.indexService;
      const indexCollection = this.$route.params.indexCollection;
      const service = this.serviceList[indexService];
      const targetField = this.fields.filter(
        (item) => item.name === fieldName
      )[0];
      const targetOptions = {};
      const delItemsValue = [];

      switch (mode) {
        case "save":
          this.newValDynItem.title = this.newValDynItem.title.trim();
          // Checking the `Title` field for valid characters.
          if (
            !/^[-_.,`@#$%^&+=*!~)(:><?;№|\\/\s\w\p{L}]+$/iu.test(
              this.newValDynItem.title
            )
          ) {
            this.runShowMsg({ text: this.$t("message.61"), status: "error" });
            return;
          }
          // Validation uniqueness of names for dynamic enumerations.
          for (let idx = 0; idx < targetField.options.length; idx++) {
            if (targetField.options[idx].title === this.newValDynItem.title) {
              this.runShowMsg({
                text: `${this.$t("message.23")}: ${this.$t("message.33")}`,
                status: "error",
              });
              return;
            }
          }
          // Validation of a field of type text.
          if (targetField.widget.includes("Text")) {
            if (
              !/^[-_.,`@#$%^&+=*!~)(:><?;№|\\/\s\w\p{L}]+$/iu.test(
                this.newValDynItem.value.toString().trim()
              )
            ) {
              this.runShowMsg({ text: this.$t("message.62"), status: "error" });
              return;
            }
          }
          // Validation of a field of type u32.
          if (targetField.widget.includes("U32")) {
            // Checking the `Value` field for valid characters.
            if (!/^\d+$/.test(this.newValDynItem.value.toString().trim())) {
              this.runShowMsg({ text: this.$t("message.62"), status: "error" });
              return;
            }
            // The value must not be less than zero.
            if (+this.newValDynItem.value < 0) {
              this.runShowMsg({
                text: `${this.$t("message.23")}: ${
                  this.newValDynItem.title
                }<br>${this.$t("message.24")}: ${this.$t("message.34")}.`,
                status: "error",
              });
              return;
            }
          }
          // Validation of a field of type i32 and i64.
          if (
            targetField.widget.includes("I32") ||
            targetField.widget.includes("I64")
          ) {
            if (!/^-?\d+$/.test(this.newValDynItem.value.toString().trim())) {
              this.runShowMsg({ text: this.$t("message.62"), status: "error" });
              return;
            }
          }
          // Validation of a field of type f64.
          if (targetField.widget.includes("F64")) {
            if (
              !/^-?\d+((\.|,)\d+)?$/.test(
                this.newValDynItem.value.toString().trim()
              )
            ) {
              this.runShowMsg({ text: this.$t("message.62"), status: "error" });
              return;
            }
          }
          // Convert to the appropriate numeric type.
          if (
            targetField.widget.includes("I32") ||
            targetField.widget.includes("U32") ||
            targetField.widget.includes("I64")
          ) {
            // Validate that the value is not fractional.
            if (
              this.newValDynItem.value.includes(".") ||
              this.newValDynItem.value.includes(",")
            ) {
              this.runShowMsg({
                text: `${this.$t("message.23")}: ${
                  this.newValDynItem.title
                }<br>${this.$t("message.24")}: ${this.$t("message.35")}.`,
                status: "error",
              });
              return;
            }
            this.newValDynItem.value = parseInt(this.newValDynItem.value);
          } else if (targetField.widget.includes("F64")) {
            this.newValDynItem.value = parseFloat(this.newValDynItem.value);
          }
          // Prepare `options` for conversion to json-line.
          targetOptions[fieldName] = targetField.options
            .concat(this.newValDynItem)
            .map((item) => [item.value.toString().trim(), item.title]);
          targetOptions[fieldName].sort(function (item, item2) {
            if (item[1] > item2[1]) {
              return 1;
            }
            if (item[1] < item2[1]) {
              return -1;
            }
            return 0;
          });
          break;
        case "delete":
          // Prepare `options` for conversion to json-line.
          for (let idx = 0; idx < this.delDynItems.length; idx++) {
            delItemsValue.push(this.delDynItems[idx]);
          }
          this.delDynItems = [];
          targetOptions[fieldName] = targetField.options
            .filter((item) => !delItemsValue.includes(item.value))
            .map((item) => [item.value.toString(), item.title]);
          break;
      }

      // Create a payload and send it to the server.
      const jsonOptions = JSON.stringify(targetOptions);
      const payload = {
        model_key: service.collections[indexCollection].model_key,
        json_options: jsonOptions,
      };
      this.axios
        .post("/admin/update-dyn-data", payload)
        .then((response) => {
          const data = response.data;
          if (!data.is_authenticated) {
            this.runShowOverlayPageLockout(false);
            this.setIsAuthenticated(false);
          } else if (data.msg_err.length === 0) {
            // Apply changes to the current state.
            switch (mode) {
              case "save":
                if (typeof this.newValDynItem.value === "string") {
                  this.newValDynItem.value = this.newValDynItem.value.trim();
                }
                for (let idx = 0; idx < this.fields.length; idx++) {
                  if (this.fields[idx].name === fieldName) {
                    this.fields[idx].options.push(this.newValDynItem);
                    this.fields[idx].options.sort(function (item, item2) {
                      if (item.title > item2.title) {
                        return 1;
                      }
                      if (item.title < item2.title) {
                        return -1;
                      }
                      return 0;
                    });
                    break;
                  }
                }
                break;
              case "delete":
                for (let idx = 0; idx < this.fields.length; idx++) {
                  if (this.fields[idx].name === fieldName) {
                    if (this.fields[idx].widget.includes("Mult")) {
                      this.fieldsData[fieldName] = this.fieldsData[
                        fieldName
                      ].filter((item) => !delItemsValue.includes(item));
                    } else if (
                      delItemsValue.includes(this.fieldsData[fieldName])
                    ) {
                      this.fieldsData[fieldName] = null;
                    }
                    this.fields[idx].options = this.fields[idx].options.filter(
                      (item) => !delItemsValue.includes(item.value)
                    );
                    break;
                  }
                }
                break;
            }
            this.setDataFilters([]);
            this.setSelectDataFilters({});
            this.runShowOverlayPageLockout(false);
          } else {
            console.log(data.msg_err);
            this.runShowOverlayPageLockout(false);
            this.runShowMsg({ text: data.msg_err, status: "error" });
          }
        })
        .catch((error) => {
          console.log(error);
          this.runShowOverlayPageLockout(false);
          this.runShowMsg({ text: error, status: "error" });
        })
        .then(() => {
          this.dynamicSelectionDialog[fieldName] = false;
          this.newValDynItem = { title: null, value: null };
        });
    },
    // Refresh form for update password.
    updatePassResetForm() {
      this.setShowMsg(false);
      this.dataUpdatePassword.formHasErrors = false;
      const fields = ["passwordOld", "passwordNew", "passwordRepeat"];

      fields.forEach((field) => {
        this.$refs[field].reset();
      });
    },
    // Update password
    updatePassword() {
      this.setShowMsg(false);
      this.runShowOverlayPageLockout(true);
      this.dataUpdatePassword.formHasErrors = false;
      const fields = ["passwordOld", "passwordNew", "passwordRepeat"];

      fields.forEach((field) => {
        if (!this.dataUpdatePassword[field]) {
          this.dataUpdatePassword.formHasErrors = true;
          this.runShowOverlayPageLockout(false);
        }
        this.$refs[field].validate(true);
      });

      if (!this.dataUpdatePassword.formHasErrors) {
        const indexService = this.$route.params.indexService;
        const indexCollection = this.$route.params.indexCollection;
        const indexDoc = this.$route.params.indexDoc;
        const service = this.serviceList[indexService];
        const payload = {
          old_pass: this.dataUpdatePassword.passwordOld,
          new_pass: this.dataUpdatePassword.passwordNew,
          model_key: service.collections[indexCollection].model_key,
          doc_hash:
            this.documents[indexDoc] !== undefined
              ? this.documents[indexDoc].hash
              : "",
        };

        this.axios
          .post("/admin/update-password", payload)
          .then((response) => {
            const data = response.data;
            if (!data.is_authenticated) {
              this.runShowOverlayPageLockout(false);
              this.setIsAuthenticated(false);
            } else if (data.msg_err.length === 0) {
              this.dialogUpdatePassword = false;
              this.runShowOverlayPageLockout(false);
              this.runShowMsg({
                text: this.$t("message.56"),
                status: "success",
              });
            } else {
              console.log(data.msg_err);
              this.runShowOverlayPageLockout(false);
              this.runShowMsg({ text: data.msg_err, status: "error" });
            }
          })
          .catch((error) => {
            console.log(error);
            this.runShowOverlayPageLockout(false);
            this.runShowMsg({ text: error, status: "error" });
          });
      }
    },
  },

  created() {
    // Update the request parameters from the session.
    if (this.$session.exists()) {
      this.setCurrentPageNumber(this.$session.get("num_page") || 1);
      this.setDocsPerPage(this.$session.get("num_per") || 50);
      this.setSortDocList(this.$session.get("sort") || "alphabetical_links");
      this.setSortDirectDocList(this.$session.get("direct") || -1);
      this.$session.remove("num_page");
      this.$session.remove("num_per");
      this.$session.remove("sort");
      this.$session.remove("direct");
    }
    // Get document.
    this.getDoc();
  },
};
</script>

<style>
.Password.theme--dark .Password__strength-meter {
  background: #757575 !important;
  height: 2px !important;
}
.Password.theme--dark .Password__strength-meter:after,
.Password.theme--dark .Password__strength-meter:before {
  border-color: #212121 !important;
}
.Password.theme--light .Password__strength-meter {
  background: #e0e0e0 !important;
  height: 2px !important;
}
.Password.theme--light .Password__strength-meter:after,
.Password.theme--light .Password__strength-meter:before {
  border-color: #fff !important;
}
</style>
