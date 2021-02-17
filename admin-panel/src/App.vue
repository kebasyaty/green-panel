<template>
  <v-app>
    <template v-if="isAuthenticated">
      <NavigationBar />
      <AppBar />
    </template>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import NavigationBar from '@/components/NavigationBar.vue'
import AppBar from '@/components/AppBar.vue'

export default {
  name: 'App',

  components: {
    NavigationBar,
    AppBar
  },

  computed: {
    ...mapState([
      'isStart',
      'username',
      'isAuthenticated'
    ])
  },

  watch: {
    isAuthenticated: function (flag) {
      if (!this.isStart) {
        if (flag) {
          this.$session.start()
          this.$session.set('username', this.username)
          this.$router.push({ name: 'home' })
        } else {
          this.$session.destroy()
          this.$router.push('/sign-in')
        }
      } else {
        this.setIsStart(false)
      }
    }
  },

  methods: {
    ...mapMutations([
      'setIsStart',
      'setUsername',
      'setIsAuthenticated'
    ])
  },

  created() {
    if (this.$session.exists()) {
      this.setUsername(this.$session.get('username'))
      this.setIsAuthenticated(true)
    } else {
      this.setIsStart(false)
      this.setUsername('..')
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
