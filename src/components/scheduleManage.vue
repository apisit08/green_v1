<template>
    <v-container>
      <v-card outlined>
          <v-card-title class="font-card-title">
            Schedule
            <v-spacer></v-spacer>
            <v-icon @click="openModelScheduleAdd">mdi-plus-circle</v-icon>
          </v-card-title>
          <v-divider style="margin-top: -7px;"></v-divider>
          <v-card-text class="text--primary font-card-text">
              <v-row style="margin-top: -20px;">
                  <v-col cols="12" sm="9" md="9">
                      การประชุมเตรียมความพร้อมโกอินเตอร์ทูนาซ่า
                  </v-col>
                  <v-col cols="12" sm="3" md="3">
                      <v-btn color="success" style="margin-right: 15px; margin-left: 120px;">เริ่มต้น</v-btn>
                      <v-menu>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon v-bind="attrs" v-on="on">mdi-dots-horizontal</v-icon>
                          </template>
                          <v-list>
                              <v-list-item
                                v-for="(item, i) in items"
                                :key="i"
                                @click="() => {}"
                              >
                                <v-avatar left><v-icon>{{ item.icon }}</v-icon></v-avatar>
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                              </v-list-item>
                          </v-list>
                      </v-menu>
                  </v-col>
              </v-row>
              <v-row>
                <v-card-subtitle class="pb-0" style="margin-top: -30px; margin-left: -3.5px;">
                  3:00 - 4:30 pm
                </v-card-subtitle>
              </v-row>
          </v-card-text>
      </v-card>
      <ScheduleAdd ref="popupScheduleAdd" />
    </v-container>
</template>

<script>
import ScheduleAdd from '../components/modal/scheduleAdd'

export default {
  components: {
    ScheduleAdd
  },
  data () {
    return {
      items: [
        {
          icon: 'mdi-pencil',
          title: 'แก้ไข'
        },
        {
          icon: 'mdi-delete',
          title: 'ลบ'
        }
      ]
    }
  },
  methods: {
    openModelScheduleAdd () {
      this.$refs.popupScheduleAdd.openScheduleAdd()
    }
  }
}
</script>

<style>
.v-sheet.v-card {
  border-radius: 10px;
}
.font-card-title {
  font-size: 16px;
  font-weight: bold;
}
.font-card-text {
  font-size: 16px;
}
</style>
