<template>
  <!-- Pop-up messages -->
  <v-snackbar app top timeout="-1" v-model="compShowMsg">
    <span class="font-weight-medium" v-html="textMsg"></span>
    <template v-slot:action="{ attrs }">
      <v-btn color="red" text v-bind="attrs" @click="compShowMsg = false">{{ $t('message.18') }}</v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'PopUpMsgs',

  data: () => ({
    //
  }),

  computed: {
    ...mapState('popUpMsgs', [
      'showMsg',
      'textMsg'
    ])
  },

  methods: {
    ...mapMutations('popUpMsgs', [
      'setShowMsg',
      'setTextMsg'
    ]),
    compShowMsg: {
      get: function () {
        return this.showErrMsg
      },
      set: function (flag) {
        this.setShowMsg(flag)
      }
    }
  }
}
</script>
