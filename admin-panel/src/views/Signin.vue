<template>
  <v-container fluid fill-height>
    <div class="text-h1">Signin</div>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Signin',

  data: () => ({
    email: '',
    password: ''
  }),

  methods: {
    ...mapMutations([
      'setIsAuthenticated'
    ]),
    submit() {
      if (this.$refs.loginForm.validate()) {
        window.console.log(this.email, this.password)
        //
        this.setIsAuthenticated(true)
        this.$router.push('/')
      }
    }
  }
}
</script>
