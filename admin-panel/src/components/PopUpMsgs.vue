<template>
  <!-- Pop-up messages -->
  <v-snackbar app top timeout="-1" v-model="compShowMsg">
    <span class="font-weight-medium" v-html="textMsg"></span>
    <template v-slot:action="{ attrs }">
      <v-btn icon color="deep-orange" text v-bind="attrs" @click="compShowMsg = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'PopUpMsgs',

  computed: {
    ...mapState('popUpMsgs', [
      'showMsg',
      'textMsg'
    ]),
    compShowMsg: {
      get: function () {
        return this.showMsg
      },
      set: function (flag) {
        this.setShowMsg(flag)
      }
    }
  },

  methods: {
    ...mapMutations('popUpMsgs', [
      'setShowMsg',
      'setTextMsg'
    ])
  }
}
</script>
