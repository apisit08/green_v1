<template>
    <v-container>
      <v-card outlined>

          <v-card-title class="pt-8">ลบบัญชีของคุณอย่างถาวร</v-card-title>
          <v-divider></v-divider>

          <v-card-text>

              <v-row>
                  <v-col cols="12" sm="12" md="12" class="text-center">
                      <label>ถ้าคุณลบบัญชีของคุณ, คุณจะ <b>ไม่</b>สามารถกู้คืนบัญชีของคุณได้อีก, รวมไปถึงการตั้งค่าต่างๆ และประวัติห้องสนทนาจะถูกลบ </label>
                  </v-col>
              </v-row>

              <v-row class="mt-n2">
                  <v-col cols="12" sm="12" md="12" class="text-center">
                        <v-btn color="red" @click="showAlert" style="color:white;">ใช่ ฉันต้องการลบบัญชีของฉัน</v-btn>
                  </v-col>
              </v-row>
          </v-card-text>
      </v-card>
    </v-container>
</template>

<script>
export default {
  data () {
    return {
      user: []
      // id: null
    }
  },
  methods: {
    decodeToken () {
      var d = localStorage.getItem('user-token')
      var base64Url = d.split('.')[1]
      this.datapage = JSON.parse(window.atob(base64Url))
      // console.log('datatoken', this.datapage)
      this.user = this.datapage.users
      console.log('user', this.user)
      // this.id = this.user._id
    },
    confirmedDelete () {
      const { id } = this.user._id
      // console.log(this.user._id)
      // var token = localStorage.getItem('user-token')
      // console.log(token)
      try {
        // http://localhost:9213/api/users/delete
        this.axios.delete(process.env.VUE_APP_API + '/api/users/delete', { data: { id } }, {
          headers: {
            // 'Content-Type': 'application/json',
            Authorization: 'bearer ' + localStorage.getItem('user-token')
          }
        }).then((response) => {
          console.log('response', response.data)
          if (response.data.status === 'success') {
            this.$swal('Delete successfull.', '', 'success')
          } else {
            this.$swal('Error !', 'Please, try again', 'error')
          }
        })
      } catch (error) {
        console.log(error.message)
      }
    },
    showAlert () {
    // Use sweetalert2
      this.$swal({
        title: 'ยืนยันลบ?',
        text: 'ต้องการลบบัญชีใช่หรือไม่',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.value) {
          this.confirmedDelete()
          // this.$swal(
          //   'ลบแล้ว!',
          //   'ลบบัญชีสำเร็จ.',
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
