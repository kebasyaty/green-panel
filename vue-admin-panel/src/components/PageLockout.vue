<template>
  <!-- Loader - Page Lockout. -->
  <v-overlay :value="overlayPageLockout">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "PageLockout",

  computed: {
    ...mapState("pageLockout", ["overlayPageLockout"]),
    compShowMsg: {
      get: function () {
        return this.overlayPageLockout;
      },
      set: function (flag) {
        this.setOverlayPageLockout(flag);
      },
    },
  },

  methods: {
    ...mapMutations("pageLockout", ["setOverlayPageLockout"]),
  },
};
</script>
