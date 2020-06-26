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
      fullname: null,
      email: null,
      provider: null,
      language: null,
      image: null,
      imageShow: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
      dropdown_edit: [
        { text: 'ไทย' },
        { text: 'อังกฤษ' }
      ]
    }
  },
  methods: {
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
          this.$swal(
            'ลบแล้ว!',
            'ลบบัญชีสำเร็จ.',
            'success'
          )
        }
      })
    }
  }
}
</script>
