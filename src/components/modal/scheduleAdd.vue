<template>
  <v-row justify="center">

    <v-dialog v-model="dialogScheduleAdd" scrollable persistent max-width="600px">

      <v-card min-height="600px" style="border-radius: 16px;">

        <v-card-title>
          เพิ่ม Schedule
          <v-spacer></v-spacer>
          <v-icon @click="dialogScheduleAdd = false">mdi-close</v-icon>
        </v-card-title>

        <v-divider style="margin-top: -0.025px;"></v-divider>

        <v-card-text class="text--primary">

          <div style="margin-bottom: 10px;">
            ชื่อการประชุม
          </div>

          <div>
            <v-text-field outlined dense></v-text-field>
          </div>

          <v-row class="mt-n4 mb-n9">
            <v-col cols="6" sm="1" md="1">
              <v-checkbox v-model="chkPassword" class="mt-n3"></v-checkbox>
            </v-col>
            <v-col cols="6" sm="11" md="11" class="mt-n1 ml-n4">
              รหัสผ่านห้องสนทนา
            </v-col>
          </v-row>

          <v-row style="margin-bottom: -10px;" v-if="chkPassword == true">
            <b-input-group class="mt-3">
            <span class="mt-2 mr-2 ml-4" style="color: green;">รหัสผ่าน:</span>
            <v-text-field v-model="txtPassword" dense outlined hint="ตั้งรหัสผ่านความยาว 6 ตัวอักษร" maxlength="6"></v-text-field>
            <b-input-group-append class="mr-4">
              <b-button variant="outline-success" style="margin-bottom: 26px; text-decoration:underline;" @click="generatePassword">สุ่มรหัสผ่านใหม่</b-button>
            </b-input-group-append>
          </b-input-group>
          </v-row>

          <v-row style="margin-bottom: -30px;">
            <v-col cols="12" sm="2" md="2" style="margin-top: 8px;" class="mr-n8">
              วันที่
            </v-col>

            <v-col cols="12" sm="4" md="4">
              <v-menu
                ref="menuDate"
                :close-on-content-click="false"
                v-model="menuDate"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >

                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    dense
                    append-icon="mdi-calendar-range"
                    outlined placeholder="DD/MM/YYYY"
                    slot="activator"
                    v-model="dateFormatted"
                    @blur="date = parseDate(dateFormatted)"
                    v-bind="attrs"
                    v-on="on"
                  >
                  </v-text-field>
                </template>

                <v-date-picker
                  v-model="date"
                  no-title
                  @input="menuDate = false">
                </v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" sm="2" md="2" style="margin-top: 8px; margin-right: -30px;">
              เวลา
            </v-col>
            <v-col cols="12" sm="2" md="2" class="mr-1">
              <v-text-field dense outlined placeholder="00:00" label="เริ่มต้น"></v-text-field>
            </v-col>
            <v-col class="mt-2"><v-icon>mdi-minus</v-icon> </v-col>
            <v-col cols="12" sm="2" md="2">
              <v-text-field dense outlined placeholder="00:00" label="สิ้นสุด" style=""></v-text-field>
            </v-col>
          </v-row>

          <div class="mb-2 mt-3">
            เชิญผู้เข้าร่วมผ่านอีเมล
          </div>

          <b-input-group>
            <v-text-field outlined dense :rules="[rules.email]" v-model="email"></v-text-field>
            <b-input-group-append>
              <b-button variant="outline-success" style="margin-bottom: 26px;">ส่งคำเชิญ</b-button>
            </b-input-group-append>
          </b-input-group>

          <div style="margin-bottom: 10px;"><span style="color: #9ba1ad;">ตั้งค่า</span></div>

          <v-row v-for="txt in setting" :key="txt" style="margin-left: -15px; margin-bottom: -15px;">
            <v-col cols="12" sm="11" md="11">
              {{ txt }}
            </v-col>
            <v-col cols="12" sm="1" md="1" style="margin-top: -30px; margin-left: -20px;">
              <v-switch inset></v-switch>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <v-row style="margin-bottom: -20px;">
            <v-col cols="12" sm="11" md="11">
              <span style="color: #9ba1ad;">ตั้งค่าขั้นสูง</span>
            </v-col>
            <v-col cols="12" sm="1" md="1">
              <v-icon @click="arrowUpDown = !arrowUpDown">mdi-chevron-{{arrowUpDown? 'up' : 'down'}}</v-icon>
            </v-col>
          </v-row>

            <b-collapse :visible="arrowUpDown">
              <b-card-body>
                <v-row v-for="txt in settingHeight" :key="txt" style="margin-left: -35px; margin-bottom: -15px;">
                  <v-col cols="12" sm="11" md="11">
                  {{ txt }}
                  </v-col>
                  <v-col cols="12" sm="1" md="1" style="margin-top: -30px;">
                    <v-switch inset></v-switch>
                  </v-col>
                </v-row>
              </b-card-body>
            </b-collapse>

        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#49af44" outlined @click="dialogScheduleAdd = false">ยกเลิก</v-btn>
          <v-btn color="#49af44" style="color:white;">สร้างห้อง</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    txtPassword: null,
    lengthPassword: 6,
    dateFormatted: null,
    date: null,
    menuDate: false,
    dialogScheduleAdd: false,
    arrowUpDown: true,
    chkPassword: false,
    email: null,
    setting: [
      'ต้องผ่านการอนุมัติจากผู้ดูแลก่อนเข้าร่วม',
      'อนุญาตให้ผู้ใช้เริ่มการสนทนาได้เอง',
      'ปิดเสียงผู้ใช้เมื่อเข้าร่วม'
    ],
    settingHeight: [
      'ผู้เข้าร่วมสามารถเห็นฉัน',
      'ให้ผู้เข้าร่วมเปิดกล้อง',
      'ผู้เข้าร่วมสามารถได้ยินฉัน',
      'ปิดเสียงผู้เข้าร่วมทั้งหมด ยกเว้นผู้นำเสนอ',
      'สามารถแชทสาธารณะได้',
      'สามารถแชทส่วนตัวได้',
      'จดบันทึกร่วมกัน'
    ],
    rules: {
      // required: value => !!value || 'Required.',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || ''
      }
    }
  }),
  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    }
  },
  methods: {
    openScheduleAdd () {
      this.dialogScheduleAdd = true
    },
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`
    },
    randomPassword (length) {
      // var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP1234567890'
      var chars = 'abcdefghijklmnopqrstuvwxyz'
      var pass = ''
      for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * chars.length)
        pass += chars.charAt(i)
      }
      return pass
    },
    generatePassword () {
      this.txtPassword = this.randomPassword(this.lengthPassword)
    }
  }
}
</script>

<style>
</style>
