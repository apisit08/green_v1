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

          <v-checkbox style="margin-top: -10px; margin-bottom: -30px;" label="รหัสผ่านห้องสนทนา" v-model="chkPassword"></v-checkbox>

          <v-row style="margin-bottom: -20px;">
            <v-col cols="12" sm="2" md="2" style="margin-top: 8px;">
              รหัสผ่าน:
            </v-col>
            <v-col cols="12" sm="7" md="7">
              <v-text-field v-model="txtPassword" dense outlined hint="ตั้งรหัสผ่านความยาว 6 ตัวอักษร"></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3" style="margin-top: 8px;">
              <span style="text-decoration: underline; color: green;" @click="generatePassword">สุ่มรหัสผ่านใหม่</span>
            </v-col>
          </v-row>

          <v-row style="margin-bottom: -30px;">
            <v-col cols="12" sm="2" md="2" style="margin-top: 8px; margin-right: -40px;">
              วันที่
            </v-col>

            <v-col cols="12" sm="3" md="3">
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
                    v-on="on">
                  </v-text-field>
                </template>

                <v-date-picker
                  v-model="date"
                  no-title
                  @input="menuDate = false">
                </v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" sm="2" md="2" style="margin-top: 8px; margin-right: -40px;">
              เวลา
            </v-col>
            <v-col cols="12" sm="2" md="2">
              <v-text-field dense outlined placeholder="00:00"></v-text-field>
            </v-col>
            <v-col cols="12" sm="1" md="1" style="margin-top: 8px; margin-right: -10px;">- </v-col>
            <v-col cols="12" sm="2" md="2">
              <v-text-field dense outlined placeholder="00:00"></v-text-field>
            </v-col>
          </v-row>

          <v-row style="margin-bottom: -18px;">
            <v-col cols="12" sm="6" md="6">
              <div style="margin-bottom: 10px;">
                เชิญผู้เข้าร่วมผ่านอีเมล
              </div>
              <v-text-field outlined dense></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-btn outlined style="margin-top: 28px; font-weight:bold;" color="#49af44">
                ส่งคำเชิญ
              </v-btn>
            </v-col>
          </v-row>

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
    chkPassword: true,
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
    ]
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
