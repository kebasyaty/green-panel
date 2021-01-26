<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'App',

  computed: {
    ...mapState([
      'isStart'
    ])
  },

  watch: {
    isAuthenticated: function (flag) {
      if (!this.isStart) {
        if (flag) {
          this.$session.start()
        } else {
          this.$session.destroy()
        }
      } else {
        this.setIsStart(false)
      }
    }
  },

  methods: {
    ...mapMutations([
      'setIsStart',
      'setIsAuthenticated'
    ])
  },

  created() {
    if (this.$session.exists()) {
      this.setIsAuthenticated(true)
    } else {
      this.setIsStart(false)
    }
  }
}
</script>

<style>
.panel-width-service-list__slider .v-slider {
  max-width: 195px;
}
.service-list__icon {
  max-width: 37px;
}
</style>
