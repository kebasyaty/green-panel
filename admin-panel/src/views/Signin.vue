<template>
  <v-main>
    <v-container fluid fill-height>
      <v-row justify="space-around">
        <v-card width="400" class="pa-4">
          <v-img :src="require('../assets/logo.svg')" contain height="100" />
          <form>
            <v-card-text>
              <v-text-field
                v-model="username"
                :error-messages="usernameErrors"
                :counter="40"
                label="Username"
                required
                @input="$v.username.$touch()"
                @blur="$v.username.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="password"
                :error-messages="passwordErrors"
                :counter="256"
                label="Password"
                required
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn dark depressed color="green" class="mr-4" @click="submit">Sign in</v-btn>
              <v-btn dark depressed color="red" @click="clear">Clear</v-btn>
            </v-card-actions>
          </form>
        </v-card>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapMutations } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    username: { required, maxLength: maxLength(40) },
    password: { required, maxLength: maxLength(256) }
  },

  name: 'Signin',

  data: () => ({
    username: '',
    password: ''
  }),

  computed: {
    usernameErrors() {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.maxLength && errors.push('Username must be at most 40 characters long.')
      !this.$v.username.required && errors.push('Username is required.')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.maxLength && errors.push('Password must be at most 256 characters long')
      !this.$v.password.required && errors.push('Password is required.')
      return errors
    }
  },

  methods: {
    ...mapMutations([
      'setIsAuthenticated'
    ]),
    submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        window.console.log(this.username, this.password)
        //
        this.setIsAuthenticated(true)
        this.$router.push('/')
      }
    },
    clear() {
      this.$v.$reset()
      this.username = ''
      this.password = ''
    }
  }
}
</script>
