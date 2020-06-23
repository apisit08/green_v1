<template>
  <div class="text-center">
    <v-dialog
      v-model="dialogSetting"
      scrollable
      persistent
      max-width="600px"
    >
      <v-card style="border-radius: 16px;">
        <v-card-title
          class="headline lighten-2"
          primary-title
        >
          ตั้งค่าห้องสนทนา
        </v-card-title>
        <v-divider></v-divider>
        <v-row class="text-center">
            <v-col>Room 1</v-col>
        </v-row>
        <v-row>
            <v-col cols="12"><v-checkbox v-model="checkbox1" :label="`Checkbox 1: ${checkbox1.toString()}`"></v-checkbox></v-col>
        </v-row>
        <v-row v-for="option in options" :key="option.value" style="margin-left: -15px; margin-bottom: -15px;">
            <v-col cols="8">
                {{option.text}}
            </v-col>
            <v-col cols="4">
                <v-switch v-model="switch1" inset></v-switch>
            </v-col>
        </v-row>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialogSetting = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogSetting: false,
      checkbox1: false,
      options: [
        { text: 'ต้องผ่านการอนุมัติจากผู้ดูแลก่อนเข้าร่วม', value: 'orange' },
        { text: 'อนุญาตให้ผู้ใช้เริ่มการสนทนาได้เอง', value: 'apple' },
        { text: 'ปิดเสียงผู้ใช้เมื่อเข้วร่วม', value: 'pineapple' }
      ]
    }
  },
  opendialog () {
    this.dialogSetting = true
  }
}
</script>
