<template>
<v-container fluid>
    <v-row>
        <v-col md="4" sm="0"></v-col>
        <v-col md="4" sm="12">
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
      label="ป้อนชื่อผู้ใช้งาน"
      outlined
      required
      @input="$v.username.$touch()"
      @blur="$v.username.$touch()"
    ></v-text-field>
    <v-text-field
    type="password"
      v-model="passwords"
      :error-messages="nameErrors"
      :counter="10"
      label="ป้อนรหัสผ่าน"
      outlined
      required
      @input="$v.passwords.$touch()"
      @blur="$v.passwords.$touch()"
      v-on:keyup="enterToSignIn"
    ></v-text-field>
  </form>
        </v-col>
        <v-col cols="4"></v-col>
    </v-row>
    <v-row>
        <v-col ></v-col>
        <v-col cols="3" class="text-center">
            <v-btn block color="success" @click="chklogins()">เข้าสู่ระบบ</v-btn>
        </v-col>
        <v-col></v-col>
      </v-row>
      <v-row>
        <v-col ></v-col>
        <v-col cols="3" class="text-center">
            <v-btn block color="primary" @click="goPage('/register')">Sign up</v-btn>
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
    username: { required, maxLength: maxLength(30) }
  },

  data () {
    return {
      passwords: '',
      email: '',
      user: ''
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
      !this.$v.username.maxLength && errors.push('Username must be at most 30 characters long')
      !this.$v.username.required && errors.push('Username is required')
      return errors
    }
  },

  created () {
    // localStorage.removeItem('user')
  },

  methods: {
    enterToSignIn: function (e) {
      if (e.keyCode === 13) this.chklogins()
      // if (e.keyCode === 13) {
      //   alert('Enter was pressed')
      // } else if (e.keyCode === 50) {
      //   alert('@ was pressed');
      // }
      // this.log += e.key
    },
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
          email: this.username,
          password: this.passwords
        })
        console.log(data)
        if (data.status === 'error') {
          this.$swal(
            'ผิดพลาด!',
            'ชื่อผู้ใช่หรือรหัสผ่านไม่ถูกต้อง',
            'error'
          )
        } else {
          localStorage.setItem('user-token', data.token)
          this.user = data.token
          console.log(localStorage.getItem('user-token'))
          this.chklogin()
        }
      } catch (error) {
        console.log(error.message)
      }
    }
  }
}
</script>
