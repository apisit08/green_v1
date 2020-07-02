<template>
    <v-container>
      <v-card outlined>

          <v-card-title class="pt-8">แก้ไขข้อมูลบัญชี</v-card-title>
          <v-divider></v-divider>

          <v-card-text>

              <v-row>
                  <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="name" outlined dense label="Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="phonenumber" outlined dense label="Phone number"></v-text-field>
                  </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="email" outlined dense label="Email" readonly filled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" class="mt-n2">
                      <v-text-field dense v-model="provider" filled outlined readonly label="ผู้ให้บริการ"></v-text-field>
                  </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="12" md="12" class="mt-n3">
                      <v-overflow-btn editable v-model="language" label="ภาษา" :items="dropdown_edit" item-value="text" class="my-2"></v-overflow-btn>
                  </v-col>
              </v-row>

              <v-row>
                <span style="color: black;" class="ml-4 mb-4">รูปภาพ</span>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="2" md="2">
                      <v-avatar class="profile" size="100" style="border-radius: 10px;">
                        <v-img :src="avatar_profile" v-model="avatar_profile"></v-img>
                      </v-avatar>
                  </v-col>
                  <v-col cols="12" sm="7" md="7">
                      <v-text-field dense v-model="avatar_profile" outlined style="margin-top:65px;" placeholder="URL ภาพโปรไฟล์"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3" md="3">
                    <v-btn color="success" style="margin-top: 66px; margin-left: 35px;" @click="uploadPhoto">Update Avatar</v-btn>
                  </v-col>
              </v-row>

          </v-card-text>

          <v-card-actions>
              <v-spacer></v-spacer>
              <!-- <v-btn color="orange" style="color:white;" @click="openModalAccountInfo">แก้ไข</v-btn> -->
            <v-btn color="orange" style="color:white;" @click="alertConfirmed">แก้ไข</v-btn>
          </v-card-actions>

          <!-- <ConfirmedUpdateAccountInfo ref="popupConfirmed" /> -->

      </v-card>
    </v-container>
</template>

<script>
// import ConfirmedUpdateAccountInfo from '../modal/accountInfo'

export default {
  components: {
    // ConfirmedUpdateAccountInfo
  },
  data () {
    return {
      user: [],
      id: null,
      name: null,
      phonenumber: null,
      email: null,
      provider: 'INET',
      language: null,
      avatar_profile: null,
      dropdown_edit: [
        { text: 'ไทย' },
        { text: 'อังกฤษ' }
      ]
    }
  },
  methods: {
    uploadPhoto () {
      var data = {
        avatar_profile: this.avatar_profile === '' ? 'https://p7.hiclipart.com/preview/518/320/1007/computer-icons-mobile-app-development-android-my-account-icon.jpg' : this.avatar_profile
      }
      // http://localhost:9213' + '/api/avatar/pictureprofile'
      this.axios.post('http://localhost:9213' + '/api/avatar/pictureprofile', data).then((response) => {
        console.log(response.data)
        if (response.data.status === 'register success') {
          this.$swal('Register successfull.', '', 'success')
          // this.name = ''
          // this.email = ''
          // this.password = ''
          // this.confirmedPassword = ''
          // this.phonenumber = ''
          // this.oneid = ''
          // this.avatar_profile = ''
        } else {
          this.$swal('ERROR !', 'Please, try again', 'error')
          // this.name = ''
          // this.email = ''
          // this.password = ''
          // this.confirmedPassword = ''
          // this.phonenumber = ''
          // this.oneid = ''
          // this.avatar_profile = ''
        }
      })
    },
    // openModalAccountInfo () {
    //   this.$refs.popupConfirmed.openAccountInfo()
    // },
    confirmedUpdate () {
      var data = {
        id: this.id,
        name: this.name,
        // email: this.email,
        // password: this.password,
        phonenumber: this.phonenumber
      }
      // console.log(data.id)
      // http://localhost:9213' + '/api/users/update'
      var token = localStorage.getItem('user-token')
      try {
        this.axios.put('http://localhost:9213' + '/api/users/update', data, {
          headers: {
            Authorization: 'bearer ' + token
          }
        }).then((response) => {
          console.log(response.data)
          if (response.data.status === 200) {
            this.$swal('Update successfull.', '', 'success')
          // this.name = ''
          // this.email = ''
          // this.password = ''
          // this.confirmedPassword = ''
          // this.phonenumber = ''
          // this.oneid = ''
          } else {
            this.$swal('ERROR !', 'Please, try again', 'error')
          // this.name = ''
          // this.email = ''
          // this.password = ''
          // this.confirmedPassword = ''
          // this.phonenumber = ''
          // this.oneid = ''
          }
        })
      } catch (error) {
        console.log(error.message)
      }
    },
    alertConfirmed () {
      this.$swal({
        title: 'ยืนยันแก้ไขข้อมูลบัญชี ?',
        text: 'ต้องการแก้ไขข้อมูลบัญชีใช่หรือไม่',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.value) {
          this.confirmedUpdate()
          // this.$swal(
          //   'สำเร็จ !',
          //   'เปลี่ยนข้อมูลบัญชีแล้ว.',
          //   'success'
          // )
        }
      })
    },
    decodeToken () {
      var d = localStorage.getItem('user-token')
      var base64Url = d.split('.')[1]
      this.datapage = JSON.parse(window.atob(base64Url))
      // console.log('datatoken', this.datapage)
      this.user = this.datapage.users
      console.log('user', this.user)
      this.id = this.user._id
      this.name = this.user.name
      this.phonenumber = this.user.phonenumber
      this.email = this.user.email
      this.avatar_profile = this.user.avatar_profile
    }
  },
  created () {
    this.decodeToken()
  }
}
</script>
