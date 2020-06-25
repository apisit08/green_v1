<template>
  <v-row justify="center">
    <v-dialog v-model="dialogAccountInfo" persistent max-width="400px">
      <v-card min-height="200px">
        <v-card-title justify-center>
          ยืนยันแก้ไขข้อมูลบัญชี ?
          <v-spacer></v-spacer>
          <v-icon @click="dialogAccountInfo = false">mdi-close</v-icon>
        </v-card-title>
        <v-divider style="margin-top: -0.025px;"></v-divider>
        <v-card-text>
            <v-row class="ml-10 mt-9">
               <v-col cols="12" sm="6" md="6">
                   <v-btn color="success" style="color:white;">ยืนยัน</v-btn>
               </v-col>
               <v-col cols="12" sm="6" md="6">
                   <v-btn color="error" style="color:white;" @click="dialogAccountInfo = false">ยกเลิก</v-btn>
               </v-col>
            </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      dialogAccountInfo: false
    }
  },
  methods: {
    openAccountInfo () {
      this.dialogAccountInfo = true
    }
  }
}
</script>
