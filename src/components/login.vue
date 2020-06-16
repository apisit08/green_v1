<template>
<v-container fluid>
    <v-row justify="space-around">
      <span class="group pa-2 teal">
        <v-icon x-large dark>account_circle</v-icon>
      </span>
    </v-row>
    <v-row>
        <v-col></v-col>
        <v-col >
    <form>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="passwords"
      :error-messages="nameErrors"
      :counter="10"
      label="Password"
      required
      @input="$v.passwords.$touch()"
      @blur="$v.passwords.$touch()"
    ></v-text-field>

    <v-btn class="mr-4" color="success" @click="chklogin()">login</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
        </v-col>
        <v-col></v-col>
    </v-row>
</v-container>

</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    passwords: { required, maxLength: maxLength(10) },
    email: { required, email }
  },

  data: () => ({
    passwords: '',
    email: ''
  }),

  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.passwords.$dirty) return errors
      !this.$v.passwords.maxLength && errors.push('Pass must be at most 10 characters long')
      !this.$v.passwords.required && errors.push('Pass is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    }
  },

  methods: {
    submit () {
      this.$v.$touch()
    },
    clear () {
      this.$v.$reset()
      this.pass = ''
      this.email = ''
    },
    chklogin () {
      if (this.email === 'a@email.com' && this.passwords === '123456') {
        console.log('e', this.email)
        console.log('p', this.passwords)
        window.location.href = 'views/Home.vue'
      } else {

      }
    }
  }
}
</script>
