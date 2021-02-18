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
      'setIsAuthenticated',
      'setSelectedService',
      'setServiceList'
    ])
  },

  created() {
    if (this.$session.exists()) {
      this.setUsername(this.$session.get('username'))
      this.setIsAuthenticated(true)
      // Get a list of services and collections
      this.axios.get('/admin/service-list')
        .then(response => {
          const data = response.data
          const listLength = data.service_list.length
          if (listLength > 0) {
            const selectedServiceList = []
            for (let idx = 0; idx < listLength; idx++) {
              selectedServiceList.push(undefined)
            }
            this.setSelectedService(selectedServiceList)
            this.setServiceList(data.service_list)
          } else {
            console.log('No data available')
          }
        })
        .catch(error => {
          console.log(error)
        })
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
