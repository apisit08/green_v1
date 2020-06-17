<template>
<v-container fluid>
    <v-row>
        <v-col></v-col>
        <v-col >
    <v-img
      class="white--text align-end"
      src="../assets/oneconflogo.png"
    >
    </v-img>
          <form>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      outlined
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="passwords"
      :error-messages="nameErrors"
      :counter="10"
      label="Password"
      outlined
      required
      @input="$v.passwords.$touch()"
      @blur="$v.passwords.$touch()"
    ></v-text-field>

    <v-btn block class="mr-4" color="success" @click="chklogin()">login</v-btn>
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
      !this.$v.passwords.maxLength && errors.push('Password must be at most 10 characters long')
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
    async chklogin () {
      if (this.email === 'a@email.com' && this.passwords === '123456') {
        console.log('e', this.email)
        console.log('p', this.passwords)
        try {
          var { data } = await this.axios.get('http://192.168.75.130:5000/customers')
          console.log(data)
        } catch (error) {
          console.log(error.message)
        }
      } else {

      }
    }
  }
}
</script>
