<template>
  <!-- Pop-up messages -->
  <v-snackbar
    app
    top
    text
    timeout="-1"
    :color="msgStatus"
    v-model="compShowMsg"
  >
    <span v-html="textMsg"></span>
    <template v-slot:action="{ attrs }">
      <v-btn
        icon
        :color="msgStatus"
        v-bind="attrs"
        @click="compShowMsg = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "PopUpMsgs",

  computed: {
    ...mapState("popUpMsgs", ["showMsg", "textMsg", "msgStatus"]),
    compShowMsg: {
      get: function () {
        return this.showMsg;
      },
      set: function (flag) {
        this.setShowMsg(flag);
      },
    },
  },

  methods: {
    ...mapMutations("popUpMsgs", ["setShowMsg"]),
  },
};
</script>
