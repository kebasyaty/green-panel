<template>
  <v-container fluid fill-height>
    <v-row justify="space-around">
      <v-card width="400" class="pa-4">
        <v-img :src="require('../assets/logo.svg')" contain height="100" />
        <form>
          <v-card-text>
            <v-text-field
              v-model="username"
              :error-messages="usernameErrors"
              :label="$t('message.5')"
              required
              @input="$v.username.$touch()"
              @blur="$v.username.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :error-messages="passwordErrors"
              :label="$t('message.6')"
              required
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark outlined color="success" class="mr-4" @click="submit">{{ $t('message.9') }}</v-btn>
            <v-btn dark outlined color="error" @click="clear">{{ $t('message.10') }}</v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    username: { required },
    password: { required }
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
      !this.$v.username.required && errors.push(this.$t('message.7'))
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push(this.$t('message.8'))
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
      }
    },
    clear() {
      this.$v.$reset()
      this.username = ''
      this.password = ''
    }
  },

  created() {
    if (this.$session.exists()) {
      this.$router.push('/')
    }
  }
}
</script>
