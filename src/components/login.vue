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
      v-model="username"
      :error-messages="userErrors"
      label="ป้อนชื่อของคุณในการสนทนา"
      outlined
      required
      @input="$v.username.$touch()"
      @blur="$v.username.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="passwords"
      :error-messages="nameErrors"
      :counter="10"
      label="ป้อนรหัสห้องสนทนา"
      outlined
      required
      @input="$v.passwords.$touch()"
      @blur="$v.passwords.$touch()"
    ></v-text-field>
  </form>
        </v-col>
        <v-col cols="4"></v-col>
    </v-row>
    <v-row>
        <v-col ></v-col>
        <v-col cols="3" class="text-center">
            <v-btn block color="success" @click="chklogin()">เข้าร่วม</v-btn>
        </v-col>
        <v-col></v-col>
      </v-row>
</v-container>

</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
import { EventBus } from '@/EventBus'

export default {
  mixins: [validationMixin],

  validations: {
    passwords: { required, maxLength: maxLength(10) },
    username: { required, maxLength: maxLength(10) }
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
    userErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.maxLength && errors.push('Username must be at most 10 characters long')
      !this.$v.username.required && errors.push('Username is required')
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
      this.username = ''
    },
    chklogin () {
      // localStorage.setItem('user', this.user)
      EventBus.$emit('user')
      this.meeting()
    },
    goPage (link) {
      this.$router.push(link)
    },
    meeting () {
      this.goPage('/meeting')
    },
    async chklogins () {
      try {
        var { data } = await this.axios.post(process.env.VUE_APP_API + '/api/auth/login', {
          email: 'test1@mail.com',
          password: '123456789'
        })
        console.log(data)
      } catch (error) {
        console.log(error.message)
      }
    }
  }
}
</script>
