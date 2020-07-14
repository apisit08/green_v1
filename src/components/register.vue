<template>
<v-container fluid fill-height>
  <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card shaped>
      <v-toolbar color="#2d90c2"><v-toolbar-title style="color:white;" >Create an Account</v-toolbar-title></v-toolbar>
      <v-card-text>
          <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Name" v-model="name" required outlined autofocus="true"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Email" v-model="email" required outlined :rules="[rules.email]"></v-text-field>
              </v-col>
          </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Password" v-model="password" type="password" required outlined></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Password Confirmation" v-model="confirmedPassword" :rules="[rules.password]" type="password" required outlined></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Phonenumber" v-model="phonenumber" :error-messages="phonenumberErrors" required outlined :counter="10"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="One ID" v-model="oneid" outlined required></v-text-field>
              </v-col>
            </v-row>

            <v-row style="display:none;">
              <v-col cols="12" sm="12" md="12">
                <v-text-field label="Avatar Profile" v-model="avatar_profile" outlined></v-text-field>
              </v-col>
            </v-row>

          <v-row>
            <v-col cols="12" sm="6" md="6" align="left">
              <v-btn color="success" @click="register">
                  <v-avatar left>
                      <v-icon>mdi-checkbox-marked-circle</v-icon>
                  </v-avatar>
                  Submit
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="6" align="right">
              <v-btn color="warning" @click="clearData">
                <v-avatar left>
                    <v-icon>mdi-close-circle</v-icon>
                </v-avatar>
                Clear
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import { required, maxLength, minLength } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      confirmedPassword: '',
      phonenumber: '',
      oneid: '',
      avatar_profile: '',
      // rules: [
      //   value => !!value || 'Required.',
      //   value => (value === this.password) || 'รหัสผ่านไม่ตรงกัน'
      // ],
      rules: {
        required: value => !!value || 'Required.',
        password: value => {
          return (value === this.password) || 'รหัสผ่านไม่ตรงกัน'
        },
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || ''
        }
      }
    }
  },
  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, maxLength: maxLength(30) },
    password: { require, maxLength: maxLength(30) },
    confirmedPassword: { require, maxLength: maxLength(30) },
    phonenumber: { require, minLength: minLength(10) },
    oneid: { require, maxLength: maxLength(33) }
    // avatar_profile: { require }
  },
  computed: {
    phonenumberErrors () {
      const errors = []
      if (!this.$v.phonenumber.$dirty) return errors
      !this.$v.phonenumber.minLength && errors.push('Phone number must be 10 characters long')
      !this.$v.phonenumber.required && errors.push('Phone number is required.')
      return errors
    }
  },
  methods: {
    clearData () {
      this.name = ''
      this.email = ''
      this.password = ''
      this.confirmedPassword = ''
      this.phonenumber = ''
      this.oneid = ''
      this.avatar_profile = ''
    },
    goPage (link) {
      this.$router.push(link)
    },
    register () {
      var data = {
        name: this.name,
        email: this.email,
        password: this.password,
        phonenumber: this.phonenumber,
        oneid: this.oneid,
        avatar_profile: this.avatar_profile === '' ? 'https://p7.hiclipart.com/preview/518/320/1007/computer-icons-mobile-app-development-android-my-account-icon.jpg' : this.avatar_profile
      }
      // http://localhost:9213/api/users/register
      this.axios.post(process.env.VUE_APP_API + '/api/users/register', data).then((response) => {
        console.log(response.data)
        if (response.data.status === 'success') {
          this.$swal('Register successfull.', '', 'success')
          this.name = ''
          this.email = ''
          this.password = ''
          this.confirmedPassword = ''
          this.phonenumber = ''
          this.oneid = ''
          this.goPage('/')
        } else {
          this.$swal('Name Invalid !', 'This name already had. Please, try again', 'error')
          this.name = ''
          this.email = ''
          this.password = ''
          this.confirmedPassword = ''
          this.phonenumber = ''
          this.oneid = ''
        }
      })
    }
  }
}
</script>
