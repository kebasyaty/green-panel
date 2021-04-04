<template>
  <div>
    <v-date-picker
      scrollable
      v-model="data"
      year-icon="mdi-calendar-blank"
      color="primary"
      :min="min"
      :max="max"
      :disabled="disabled"
      :readonly="readonly"
      :locale="locale"
    >
      <v-spacer></v-spacer>
      <v-btn text small color="primary" @click="vMenu[field.name] = false">{{ $t('message.18') }}</v-btn>
      <v-btn
        text
        small
        color="primary"
        @click="$refs[field.name][0].save(fieldsData[field.name])"
      >OK</v-btn>
    </v-date-picker>
  </div>
</template>

<script>

export default {
  name: 'DatePicker',

  props: {
    data: {
      type: String,
      default: new Date().toISOString().substr(0, 10)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    min: {
      type: String,
      default: ''
    },
    max: {
      type: String,
      default: ''
    },
    locale: {
      type: String,
      default: this.$i18n.locale
    },
    menu: {
      type: Boolean,
      default: false
    },
    field: {
      type: Object,
      default: function () {
        return {}
      }
    }
  }
}
</script>
