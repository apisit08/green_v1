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
                <v-text-field label="Email" v-model="email" required outlined></v-text-field>
              </v-col>
          </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Password" v-model="password" type="password" required outlined></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Password Confirmation" v-model="confirmedPassword" :rules="rules" type="password" required outlined></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Phonenumber" v-model="phonenumber" required outlined></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="One ID" v-model="oneid" outlined required></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Avatar Profile" v-model="avatar_profile" outlined></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-btn color="success" class="mt-2">Update Avatar</v-btn>
                <!-- <v-btn color="success" class="mt-2" @click="uploadPhoto">Update Avatar</v-btn> -->
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
import { required, maxLength } from 'vuelidate/lib/validators'

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
      rules: [
        value => !!value || 'Required.',
        value => (value === this.password) || 'รหัสผ่านไม่ตรงกัน'
      ]
    }
  },
  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, maxLength: maxLength(30) },
    password: { require, maxLength: maxLength(30) },
    confirmedPassword: { require, maxLength: maxLength(30) },
    phonenumber: { require, maxLength: maxLength(10) },
    oneid: { require, maxLength: maxLength(33) }
    // avatar_profile: { require }
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
    uploadPhoto () {
      var data = {
        user_id: this.user._id,
        avatar: this.avatar === '' ? 'https://p7.hiclipart.com/preview/518/320/1007/computer-icons-mobile-app-development-android-my-account-icon.jpg' : this.avatar
      }
      // http://localhost:9213/api/avatar/pictureprofile
      this.axios.post(process.env.VUE_APP_API + '/api/avatar/pictureprofile', data).then((response) => {
        console.log(response.data)
        // if (response.data.status === 'register success') {
        //   this.$swal('Register successfull.', '', 'success')
        // } else {
        //   this.$swal('ERROR !', 'Please, try again', 'error')
        // }
      })
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
          this.avatar_profile = ''
          this.goPage('/')
        } else {
          this.$swal('Name Invalid !', 'This name already had. Please, try again', 'error')
          this.name = ''
          this.email = ''
          this.password = ''
          this.confirmedPassword = ''
          this.phonenumber = ''
          this.oneid = ''
          this.avatar_profile = ''
        }
      })
    }
  }
}
</script>
