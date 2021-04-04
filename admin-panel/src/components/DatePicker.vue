<template>
  <div>
    <v-date-picker
      scrollable
      v-model="data[field.name]"
      year-icon="mdi-calendar-blank"
      color="primary"
      :min="min"
      :max="max"
      :disabled="disabled"
      :readonly="readonly"
      :locale="locale"
    >
      <v-spacer></v-spacer>
      <v-btn text small color="primary" @click="menu[field.name] = false">{{ $t('message.18') }}</v-btn>
      <v-btn text small color="primary" @click="$refs[field.name][0].save(data[field.name])">OK</v-btn>
    </v-date-picker>
  </div>
</template>

<script>

export default {
  name: 'DatePicker',

  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
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
      type: Array,
      default: function () {
        return []
      }
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
