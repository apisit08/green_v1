<template>
  <v-container>
    <v-card outlined>
      <v-card-title class="font-card-title">
        <v-row>
          <v-col cols="12" sm="9" md="9">
            บันทึกการสนทนา
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-text-field
              outlined
              v-model="search"
              dense
              append-icon="mdi-magnify"
              label="ค้นหา.."
              style="border-radius: 10px;"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-title>
      <v-simple-table
        :dense="dense"
        :items="desserts"
        :search="search"
        style="margin-top: -45px;"
      >
        <template v-slot:default>
          <thead style="background-color: #48af44;">
            <tr>
              <th class="text-left" style="color:white; font-size: 16px; font-weight: 500;">วันที่สนทนา</th>
              <th class="text-left" style="color:white; font-size: 16px; font-weight: 500;">ชื่อการสนทนา</th>
              <th class="text-center" style="color:white; font-size: 16px; font-weight: 500;">จำนวนผู้ใช้</th>
              <th class="text-center" style="color:white; font-size: 16px; font-weight: 500;">วิดีโอการสนทนา</th>
              <th class="text-center" style="color:white; font-size: 16px; font-weight: 500;">รายชื่อผู้เข้าสนทนา</th>
              <th class="text-left" style="color:white; font-size: 16px; font-weight: 500;"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in desserts" :key="item.name">
              <td>{{ item.date }}</td>
              <td>{{ item.name }}</td>
              <td class="text-center">{{ item.count }}</td>
              <td class="text-center"><v-icon>{{ item.icon }}</v-icon></td>
              <td class="text-center" style="color: #48af44; font-weight: 500; text-decoration: underline;">{{ item.people }}</td>
              <td><v-icon>{{ item.dot }}</v-icon></td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      desserts: [
        {
          date: '24/05/2563',
          name: 'การประชุมปรับนโยบายตามกฎกระทรวง',
          count: 10,
          icon: 'mdi-play-circle',
          people: 'รายละเอียด',
          dot: 'mdi-dots-horizontal'
        },
        {
          date: '23/05/2563',
          name: 'การประชุมเตรียมรีบมือ Covid-19',
          count: 7,
          icon: 'mdi-play-circle',
          people: 'รายละเอียด',
          dot: 'mdi-dots-horizontal'
        },
        {
          date: '22/05/2563',
          name: 'การประชุมปรับเปลี่ยนการบริหาร',
          count: 8,
          icon: 'mdi-play-circle',
          people: 'รายละเอียด',
          dot: 'mdi-dots-horizontal'
        },
        {
          date: '21/05/2563',
          name: 'การประชุมไตรมาส 1 / 2563',
          count: 10,
          icon: 'mdi-play-circle',
          people: 'รายละเอียด',
          dot: 'mdi-dots-horizontal'
        }
      ]
    }
  }
}

</script>
