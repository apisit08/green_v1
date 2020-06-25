<template>
    <v-container>
      <v-card outlined>

          <v-card-title class="pt-8">แก้ไขข้อมูลบัญชี</v-card-title>
          <v-divider></v-divider>

          <v-card-text>

              <v-row>
                  <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="fullName" outlined dense label="ชื่อ - นามสกุล"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="email" outlined dense label="อีเมล"></v-text-field>
                  </v-col>
              </v-row>

              <v-row class="mt-n2">
                  <v-col cols="12" sm="12" md="12">
                      <v-text-field dense v-model="provider" filled outlined readonly label="ผู้ให้บริการ"></v-text-field>
                  </v-col>
              </v-row>

              <v-row class="mt-n3">
                  <v-col cols="12" sm="12" md="12">
                      <v-overflow-btn editable v-model="language" label="ภาษา" :items="dropdown_edit" item-value="text" class="my-2"></v-overflow-btn>
                  </v-col>
              </v-row>

              <v-row class="mt-n2">
                  <v-col cols="12" sm="2" md="2">
                      <div style="color: black;" class="ml-4 mb-4">รูปภาพ</div>
                      <v-avatar class="profile" size="100" style="border-radius: 10px;">
                        <v-img :src="imageShow" class="ml-6" v-model="imageShow"></v-img>
                      </v-avatar>
                  </v-col>
                  <v-col cols="12" sm="10" md="10">
                      <v-text-field dense v-model="imageShow" outlined style="margin-top:65px;" placeholder="URL ภาพโปรไฟล์"></v-text-field>
                  </v-col>
              </v-row>

          </v-card-text>

          <v-card-actions>
              <v-spacer></v-spacer>
            <v-btn color="orange" style="color:white;" @click="openModalAccountInfo">แก้ไข</v-btn>
          </v-card-actions>

          <ConfirmedUpdateAccountInfo ref="popupConfirmed" />

      </v-card>
    </v-container>
</template>

<script>
import ConfirmedUpdateAccountInfo from '../modal/accountInfo'

export default {
  components: {
    ConfirmedUpdateAccountInfo
  },
  data () {
    return {
      fullName: 'John Leider',
      email: 'john.leider@gmail.com',
      provider: 'INET',
      language: null,
      imageShow: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
      dropdown_edit: [
        { text: 'ไทย' },
        { text: 'อังกฤษ' }
      ]
    }
  },
  methods: {
    openModalAccountInfo () {
      this.$refs.popupConfirmed.openAccountInfo()
    }
  }
}
</script>
