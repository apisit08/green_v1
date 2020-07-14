<template>
    <v-container>
      <v-card outlined>

          <v-card-title class="pt-8">เปลี่ยนรหัสผ่าน</v-card-title>
          <v-divider></v-divider>

          <v-card-text>

              <v-row>
                  <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="oldpass" type="password" outlined dense label="รหัสผ่านปัจจุบัน"></v-text-field>
                  </v-col>
              </v-row>

              <v-row class="mt-n2">
                  <v-col cols="12" sm="12" md="12">
                      <v-text-field dense v-model="newpass" type="password" outlined label="รหัสผ่านใหม่"></v-text-field>
                  </v-col>
              </v-row>

              <v-row class="mt-n3">
                  <v-col cols="12" sm="12" md="12">
                      <v-text-field dense v-model="confirmpass" type="password" :rules="rules" outlined label="ยืนยันรหัสผ่านใหม่"></v-text-field>
                  </v-col>
              </v-row>

          </v-card-text>

          <v-card-actions>
              <v-spacer></v-spacer>
            <v-btn color="warning" @click="btnupdate" style="color:white;">update</v-btn>
          </v-card-actions>

      </v-card>
    </v-container>
</template>

<script>
export default {
  data () {
    return {
      user: [],
      id: null,
      oldpass: null,
      newpass: null,
      confirmpass: null,
      rules: [
        value => !!value || 'Required.',
        value => (value === this.newpass) || 'รหัสผ่านไม่ตรงกัน'
      ]
    }
  },
  methods: {
    decodeToken () {
      var d = localStorage.getItem('user-token')
      var base64Url = d.split('.')[1]
      this.datapage = JSON.parse(window.atob(base64Url))
      // console.log('datatoken', this.datapage)
      this.user = this.datapage.users
      this.id = this.user._id
      // console.log('user', this.datapage.users)
    },
    updatePassword () {
      var data = {
        user_id: this.id,
        old_password: this.oldpass,
        new_password: this.newpass
      }
      // http://localhost:9213/api/users/changepassword
      var token = localStorage.getItem('user-token')
      try {
        this.axios.put(process.env.VUE_APP_API + '/api/users/changepassword', data, {
          headers: {
            Authorization: 'bearer ' + token
          }
        }).then((response) => {
          console.log(response.data)
          if (response.data.status === 'success') {
            this.$swal('Update Password successfull.', '', 'success')
            localStorage.setItem('user-token', response.data.token)
            this.decodeToken()
            window.location.reload()
          } else {
            this.$swal('ERROR !', 'Please, try again', 'error')
          }
        })
      } catch (error) {
        console.log(error.message)
      }
    },
    btnupdate () {
      this.$swal({
        title: 'ยืนยันเปลี่ยนรหัสผ่าน?',
        text: 'ต้องการบันทึกการเปลี่ยนแปลงใช่หรือไม่',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.value) {
          this.updatePassword()
          // this.$swal(
          //   'สำเร็จ!',
          //   'เปลี่ยนรหัสผ่านแล้ว.',
          //   'success'
          // )
        }
      })
    }
  },
  created () {
    this.decodeToken()
  }
}
</script>
