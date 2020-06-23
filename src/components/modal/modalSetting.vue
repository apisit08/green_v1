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
              <v-col cols="8">
                  <v-card-title
                    class="headline lighten-2"
                    primary-title
                  >
                    ตั้งค่าห้องสนทนา
                  </v-card-title>
              </v-col>
              <v-col cols="4 mt-4"><span class="ml-11 pl-11 mb-6"><v-btn icon class="pl-11" @click="dialogSetting = false"><v-icon>mdi-close</v-icon></v-btn></span></v-col>
          </v-row>
        <v-divider style="margin-top: -0.025px;"></v-divider>
        <v-row class="text-center">
            <v-col>Room 1</v-col>
        </v-row>
        <v-row class="mb-n8">
            <v-col cols="6" sm="1" md="1">
                <!-- <b-form-checkbox
                    id="checkbox-1"
                    v-model="status"
                    name="checkbox-1"
                    value="accepted"
                    unchecked-value="not_accepted"
                    class="pl-10 mt-n2"
                >
                </b-form-checkbox> -->
                <v-checkbox class="pl-10 mt-n2" v-model="checkbox1"></v-checkbox>
            </v-col>
            <v-col cols="6" sm="11" md="11">
                <span class="pl-6">รหัสผ่านห้องสนทนา{{ status }}</span>
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
            <v-col cols="4" >
              <span class="pl-11"><v-btn class="pl-10" icon v-b-toggle="'collapse-1'"><v-icon class="ml-10 pl-11" @click="arrowUpDown = !arrowUpDown">mdi-chevron-{{arrowUpDown? 'up' : 'down'}}</v-icon></v-btn></span>
            </v-col>
        </v-row>
            <b-collapse id="collapse-1" class="">
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
      status: 'not_accepted',
      options: [
        { text: 'ต้องผ่านการอนุมัติจากผู้ดูแลก่อนเข้าร่วม', value: 'orange' },
        { text: 'อนุญาตให้ผู้ใช้เริ่มการสนทนาได้เอง', value: 'apple' },
        { text: 'ปิดเสียงผู้ใช้เมื่อเข้วร่วม', value: 'pineapple' }
      ],
      options2: [
        { text: 'ผู้เข้าร่วมสามารถเห็นฉัน', value: 'orange' },
        { text: 'ให้ผู้เข้าร่วมเปิดกล้อง', value: 'apple' },
        { text: 'ผู้เข้าร่วมสามารถได้ยินฉัน', value: 'pineapple' },
        { text: 'ปิดเสียงผู้เข้าร่วมทั้งหมด ยกเว้นผู้นำเสนอ', value: 'orange' },
        { text: 'สามารถแชทสาธารณะได้', value: 'apple' },
        { text: 'สามารถแชทส่วนตัวได้', value: 'pineapple' },
        { text: 'จดบันทึกร่วมกัน', value: 'orange' }
      ]
    }
  },
  methods: {
    opendialog () {
      this.dialogSetting = true
    }
  }

}
</script>
