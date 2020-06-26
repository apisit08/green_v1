<template>
  <div class="text-center">
    <v-dialog
      v-model="dialogSetting"
      scrollable
      persistent
      max-width="600px"
    >
      <v-card style="border-radius: 16px;">
          <v-row>
              <v-col cols="8" sm="12" md="8">
                  <v-card-title
                    class="headline lighten-2"
                    primary-title
                  >
                    ตั้งค่าห้องสนทนา
                  </v-card-title>
              </v-col>
              <v-col cols="4 mt-4" sm="12" md="4"><span class="ml-11 pl-11 mb-6"><v-btn icon class="pl-11" @click="dialogSetting = false"><v-icon>mdi-close</v-icon></v-btn></span></v-col>
          </v-row>
        <v-divider style="margin-top: -0.025px;"></v-divider>
        <v-row class="text-center">
            <v-col>Room 1</v-col>
        </v-row>
        <v-row class="mb-n8">
            <v-col cols="6" sm="2" md="2" class="mr-n10">
                <v-checkbox class="pl-10 mt-n2" v-model="checkbox1"></v-checkbox>
            </v-col>
            <v-col cols="6" sm="10" md="10">
                <span class="mr-n0 pl-6">รหัสผ่านห้องสนทนา{{ checkbox1 }}</span>
            </v-col>
        </v-row>
        <v-row v-if="checkbox1">
            <v-col cols="7" md="7" class="text-center">
             <div class="pl-10">
                <b-form inline>
                    <label for="feedback-user">รหัสผ่าน: &nbsp;</label>
                    <b-input class="ml-4" v-model="txtPassword" :state="validation" maxlenght="6" id="feedback-user"></b-input>
                    <b-form-invalid-feedback :state="validation">
                        ตั้งรหัสผ่านความยาว 6 ตัวอักษร
                    </b-form-invalid-feedback>
                    <!-- <b-form-valid-feedback :state="validation">
                        Looks Good.
                    </b-form-valid-feedback> -->
                </b-form>
             </div>
            </v-col>
            <v-col cols="5">
                <b-button variant="success" @click="generatePassword()">สุ่มรหัสผ่าน</b-button>
            </v-col>

        </v-row>
        <v-row v-for="option in options" :key="option.value" class="mb-n8" style="margin-left: -15px; margin-bottom: -15px;">
            <v-col cols="8">
                <span class="pl-10">{{option.text}}</span>
            </v-col>
            <v-col cols="4" class="pl-11 mt-n5">
                <v-switch inset class="ml-10 pl-11"></v-switch>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
            <v-col cols="8">
                <span class="pl-10">ตั้งค่าขั้นสูง</span>
            </v-col>
            <v-col cols="4" sm="1" md="1">
              <span class="pl-11 ml-10"><v-icon class="ml-11" @click="arrowUpDown = !arrowUpDown">mdi-chevron-{{arrowUpDown? 'up' : 'down'}}</v-icon></span>
            </v-col>
        </v-row>
            <b-collapse id="high-1" :visible="arrowUpDown">
                <v-row class="mb-n8" v-for="item in options2" :key="item.value">
                    <v-col cols="8">
                        <span class="pl-10">{{item.text}}</span>
                     </v-col>
                    <v-col cols="4" class="pl-11 mt-n5">
                        <v-switch inset class="ml-10 pl-11"></v-switch>
                    </v-col>
                </v-row>
            </b-collapse>
            <br>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      arrowUpDown: false,
      dialogSetting: false,
      checkbox1: false,
      txtPassword: '',
      lengthPassword: 6,
      status: 'not_accepted',
      options: [
        { text: 'ต้องผ่านการอนุมัติจากผู้ดูแลก่อนเข้าร่วม', value: 'orange' },
        { text: 'อนุญาตให้ผู้ใช้เริ่มการสนทนาได้เอง', value: 'apple' },
        { text: 'ปิดเสียงผู้ใช้เมื่อเข้วร่วม', value: 'pineapple' }
      ],
      options2: [
        { text: 'ผู้เข้าร่วมสามารถเห็นฉัน', value: 'orange1' },
        { text: 'ให้ผู้เข้าร่วมเปิดกล้อง', value: 'apple1' },
        { text: 'ผู้เข้าร่วมสามารถได้ยินฉัน', value: 'pineapple1' },
        { text: 'ปิดเสียงผู้เข้าร่วมทั้งหมด ยกเว้นผู้นำเสนอ', value: 'orange1' },
        { text: 'สามารถแชทสาธารณะได้', value: 'apple2' },
        { text: 'สามารถแชทส่วนตัวได้', value: 'pineapple2' },
        { text: 'จดบันทึกร่วมกัน', value: 'orange3' }
      ]
    }
  },
  computed: {
    validation () {
      return this.txtPassword.length > 4 && this.txtPassword.length < 13
    }
  },
  methods: {
    opendialog () {
      this.dialogSetting = true
    },
    randomPassword (length) {
      var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP1234567890'
      // var chars = 'abcdefghijklmnopqrstuvwxyz'
      var pass = ''
      for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * chars.length)
        pass += chars.charAt(i)
      }
      return pass
    },
    generatePassword () {
      console.log('press generate')
      this.txtPassword = this.randomPassword(this.lengthPassword)
    }
  }

}
</script>
