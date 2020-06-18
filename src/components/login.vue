<template>
<v-container fluid>
    <v-row>
        <v-col cols="4"></v-col>
        <v-col cols="4">
    <v-img
      class="white--text align-end"
      src="../assets/oneconflogo.png"
    >
    </v-img>
    <br>
          <form>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="ยูสเซอร์เนม"
      outlined
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="passwords"
      :error-messages="nameErrors"
      :counter="10"
      label="รหัสผ่าน"
      outlined
      required
      @input="$v.passwords.$touch()"
      @blur="$v.passwords.$touch()"
    ></v-text-field>
      <v-row>
        <v-col cols="12" class="text-center">
            <v-btn width="300" color="success" @click="chklogin()">เข้าร่วม</v-btn>
        </v-col>
      </v-row>
  </form>
        </v-col>
        <v-col cols="4"></v-col>
    </v-row>
</v-container>

</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import { EventBus } from '@/EventBus'

export default {
  mixins: [validationMixin],

  validations: {
    passwords: { required, maxLength: maxLength(10) },
    email: { required, email }
  },

  data () {
    return {
      passwords: '',
      email: '',
      user: true
    }
  },

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

  created () {
    // localStorage.removeItem('user')
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
      // localStorage.setItem('user', this.user)
      EventBus.$emit('user')
      this.manage()
    },
    goPage (link) {
      this.$router.push(link)
    },
    manage () {
      this.goPage('/manage')
    }
  }
}
</script>
