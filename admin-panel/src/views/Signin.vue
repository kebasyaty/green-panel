<template>
  <v-container fluid fill-height>
    <v-row justify="space-around">
      <v-card width="400" class="pa-4">
        <v-icon large color="green darken-2" class="icon-lock">mdi-lock</v-icon>
        <v-card-title
          v-if="count_effort === 2"
          class="red--text text--darken-2 justify-center"
        >{{ counter }}</v-card-title>
        <form @submit.prevent="submit()" v-else>
          <v-card-text class="pb-0">
            <v-alert
              v-if="msg_error.length > 0"
              dense
              text
              type="error"
              class="mb-0"
            >{{ msg_error }}</v-alert>
          </v-card-text>
          <v-card-text>
            <v-text-field
              v-model="username"
              :error-messages="usernameErrors"
              :label="$t('message.5')"
              required
              autofocus
              @input="$v.username.$touch()"
              @blur="$v.username.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="password"
              type="password"
              :error-messages="passwordErrors"
              :label="$t('message.6')"
              required
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="green" type="submit">{{ $t('message.9') }}</v-btn>
            <v-btn text color="red" class="ml-4" @click="clear">{{ $t('message.10') }}</v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
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
    password: '',
    msg_error: '',
    count_effort: 0,
    countdown: 10,
    counter: 0
  }),

  computed: {
    ...mapState([
      'username'
    ]),
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
      'setUsername',
      'setIsAuthenticated'
    ]),
    submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        const payload = {
          username: this.username,
          password: this.password
        }
        this.axios.post('/admin/login', payload)
          .then(response => {
            const data = response.data
            if (data.is_authenticated) {
              this.setUsername(data.username)
              this.setIsAuthenticated(true)
            } else {
              this.setIsAuthenticated(false)
              this.msg_error = this.$t('message.27')
              if (++this.count_effort === 2) {
                this.counter = this.countdown
                const timer = window.setInterval(() => {
                  if (--this.counter === 0) {
                    window.clearInterval(timer)
                    this.countdown += Math.floor((Math.random() * 20) + 1)
                    this.msg_error = ''
                    this.clear()
                    this.count_effort = 0
                  }
                }, 1000)
              }
            }
          })
          .catch(error => {
            this.msg_error = this.$t('message.27')
            console.log(error)
          })
      }
    },
    clear() {
      this.$v.$reset()
      this.username = ''
      this.password = ''
      this.msg_error = ''
    }
  },

  created() {
    if (this.$session.exists()) {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style scoped>
.icon-lock {
  position: absolute;
  top: -18px;
  left: 50%;
  margin-left: -18px;
}
</style>
