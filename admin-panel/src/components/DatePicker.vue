<template>
  <!-- only min -->
  <v-date-picker
    v-if="min.length > 0 && max.length === 0"
    scrollable
    @input="menu[field_name] = false"
    v-model="data[field_name]"
    year-icon="mdi-calendar-blank"
    color="primary"
    :min="min"
    :disabled="disabled"
    :readonly="readonly"
    :locale="locale"
  ></v-date-picker>
  <!-- only max -->
  <v-date-picker
    v-else-if="min.length === 0 && max.length > 0"
    scrollable
    @input="menu[field_name] = false"
    v-model="data[field_name]"
    year-icon="mdi-calendar-blank"
    color="primary"
    :max="max"
    :disabled="disabled"
    :readonly="readonly"
    :locale="locale"
  ></v-date-picker>
  <!-- min and max -->
  <v-date-picker
    v-else-if="min.length > 0 && max.length > 0"
    scrollable
    @input="menu[field_name] = false"
    v-model="data[field_name]"
    year-icon="mdi-calendar-blank"
    color="primary"
    :min="min"
    :max="max"
    :disabled="disabled"
    :readonly="readonly"
    :locale="locale"
  ></v-date-picker>
  <!-- without min and max -->
  <v-date-picker
    v-else
    scrollable
    v-model="data[field_name]"
    @input="menu[field_name] = false"
    year-icon="mdi-calendar-blank"
    color="primary"
    :disabled="disabled"
    :readonly="readonly"
    :locale="locale"
  ></v-date-picker>
</template>

<script>
export default {
  name: 'DatePicker',

  props: {
    data: {
      type: Object,
      default: function () {
        return {}
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
      default: 'en'
    },
    menu: {
      type: Object,
      default: function () {
        return {}
      }
    },
    field_name: {
      type: String,
      default: ''
    }
  }
}
</script>
