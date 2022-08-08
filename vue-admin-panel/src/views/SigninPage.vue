<template>
  <v-container fluid fill-height>
    <v-row justify="space-around">
      <v-card width="400" class="pa-4">
        <v-icon large color="green darken-2" class="icon-lock">
          {{ is_lock_open ? "mdi-lock-open-variant" : "mdi-lock" }}</v-icon
        >
        <!-- Countdown -->
        <v-card-title
          v-if="count_effort === 2"
          class="red--text text--darken-2 justify-center"
          >{{ counter }}</v-card-title
        >
        <!-- Login form -->
        <form class="mb-2" @submit.prevent="submit()" v-else>
          <v-card-text class="pb-0">
            <v-alert
              v-if="msg_error.length > 0"
              dense
              text
              type="error"
              class="mb-0"
              >{{ msg_error }}</v-alert
            >
          </v-card-text>
          <v-card-text>
            <v-text-field
              v-model="username"
              :error-messages="usernameErrors"
              :label="$t('message.5')"
              required
              clearable
              autofocus
              @input="$v.username.$touch()"
              @blur="$v.username.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :error-messages="passwordErrors"
              :label="$t('message.6')"
              required
              clearable
              :append-icon="see_pass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="see_pass ? 'text' : 'password'"
              @click:append="see_pass = !see_pass"
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark small depressed color="green darken-2" type="submit"
              ><spam>{{ $t("message.9") }}</spam></v-btn
            >
            <v-btn
              dark
              small
              depressed
              color="red darken-2"
              class="ml-4"
              @click="clear()"
              ><spam class="">{{ $t("message.10") }}</spam></v-btn
            >
          </v-card-actions>
        </form>
        <v-divider></v-divider>
        <!-- reCaptcha v3 -->
        <v-card-text class="text--caption font-weight-thin">
          <div>This site is protected by reCAPTCHA and the Google</div>
          <v-btn
            text
            x-small
            color="blue"
            href="https://policies.google.com/privacy"
            target="_blank"
            >Privacy Policy</v-btn
          >and
          <v-btn
            text
            x-small
            color="blue"
            href="https://policies.google.com/terms"
            target="_blank"
            >Terms of Service</v-btn
          >apply.
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    username: { required },
    password: { required },
  },

  name: "SigninPage",

  data: () => ({
    username: "",
    password: "",
    msg_error: "",
    is_lock_open: false,
    // For protect against woodpeckers
    count_effort: 0,
    countdown: 10,
    counter: 0,
    see_pass: false,
  }),

  computed: {
    ...mapState(["username", "siteKey"]),
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push(this.$t("message.7"));
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push(this.$t("message.8"));
      return errors;
    },
  },

  methods: {
    ...mapMutations(["setUsername", "setIsAuthenticated"]),
    ...mapActions(["ajaxGetSiteKey"]),
    submit() {
      // Form validation
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        if (this.siteKey.length > 0) {
          // ReCAPTCHA v3 request
          this.$recaptchaLoaded()
            .then(() => {
              this.$recaptcha("login")
                .then((token) => {
                  // Login Request
                  const payload = {
                    username: this.username,
                    password: this.password,
                    token,
                  };
                  this.axios
                    .post("/admin/login", payload)
                    .then((response) => {
                      const data = response.data;
                      if (data.is_authenticated) {
                        this.msg_error = "";
                        this.is_lock_open = true;
                        setTimeout(() => {
                          this.setUsername(data.username);
                          this.setIsAuthenticated(true);
                        }, 500);
                      } else {
                        this.is_lock_open = false;
                        this.setIsAuthenticated(false);
                        this.msg_error = this.$t("message.27");
                        // Protect against woodpeckers
                        if (++this.count_effort === 2) {
                          this.counter = this.countdown;
                          const timer = window.setInterval(() => {
                            if (--this.counter === 0) {
                              window.clearInterval(timer);
                              this.countdown += Math.floor(
                                Math.random() * 20 + 1
                              );
                              this.msg_error = "";
                              this.clear();
                              this.count_effort = 0;
                            }
                          }, 1000);
                        }
                      }
                    })
                    .catch((error) => {
                      this.msg_error = this.$t("message.27");
                      console.log(error);
                    });
                })
                .catch((error) => {
                  this.msg_error = String(error);
                  console.log(error);
                });
            })
            .catch((error) => {
              this.msg_error = String(error);
              console.log(error);
            });
        } else {
          const error = this.$t("message.70");
          this.msg_error = error;
          console.log(error);
        }
      }
    },
    // Clear form
    clear() {
      this.$v.$reset();
      this.username = "";
      this.password = "";
      this.msg_error = "";
    },
  },

  created() {
    if (this.siteKey.length === 0) {
      this.ajaxGetSiteKey().catch((error) => {
        this.msg_error = String(error);
        console.log(error);
      });
    }
    if (this.$session.exists()) {
      this.$router.push({ name: "home" });
    }
  },
};
</script>

<style scoped>
.icon-lock {
  position: absolute;
  top: -18px;
  left: 50%;
  margin-left: -18px;
}
</style>
