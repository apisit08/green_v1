<template>
    <v-container>
      <v-card outlined>

          <v-card-title class="pt-8">Upload Avatar</v-card-title>
          <v-divider></v-divider>

          <v-card-text>

              <v-row>
                  <v-col cols="12" sm="12" md="12">
                     <span>รูปภาพ</span>
                  </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="12" md="12" style="text-align: center;">
                      <v-avatar class="profile" size="200" style="border-radius: 10px;">
                        <v-img :src="avatar" v-model="avatar"></v-img>
                      </v-avatar>
                  </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="12" md="12 " style="text-align: center;">
                      <input type="file" @change="onFileSelected" style="font-size: 12pt; margin-left: 100px;" />
                  </v-col>
              </v-row>

          </v-card-text>

          <v-card-actions>
              <v-spacer></v-spacer>
            <v-btn color="primary" @click="alertConfirmed">Upload</v-btn>
          </v-card-actions>

      </v-card>
    </v-container>
</template>

<script>
export default {
  components: {
    // ConfirmedUpdateAccountInfo
  },
  data () {
    return {
      user: [],
      id: null,
      avatar: '',
      selectedFile: null,
      dropdown_edit: [
        { text: 'ไทย' },
        { text: 'อังกฤษ' }
      ]
    }
  },
  methods: {
    onFileSelected (event) {
      // console.log(event)
      this.selectedFile = event.target.files[0]
      // console.log(this.selectedFile)
      const file = event.target.files[0]
      this.avatar = URL.createObjectURL(file)
    },
    uploadPhoto () {
      const fd = new FormData()
      fd.append('avatar', this.selectedFile, this.selectedFile.name)
      fd.append('user_id', this.id)
      // http://localhost:9213/api/avatar/pictureprofile
      this.axios.post(process.env.VUE_APP_API + '/api/avatar/pictureprofile', fd).then(res => {
        this.$swal('Update Avatar successfull.', '', 'success')
        localStorage.setItem('user-token', res.data.token)
        this.decodeToken()
        window.location.reload()
      })
    },
    alertConfirmed () {
      this.$swal({
        title: 'ยืนยันแก้ไขรูปภาพ Avatar ?',
        text: 'ต้องการแก้ไขรูปภาพ Avatar ใช่หรือไม่',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.value) {
          this.uploadPhoto()
        }
      })
    },
    decodeToken () {
      var d = localStorage.getItem('user-token')
      var base64Url = d.split('.')[1]
      this.datapage = JSON.parse(window.atob(base64Url))
      // console.log('datatoken', this.datapage)
      this.user = this.datapage.users
      // console.log('user', this.datapage.users)
      this.id = this.user._id
      this.avatar = this.user.avatar_profile
    }
  },
  created () {
    this.decodeToken()
  }
}
</script>
