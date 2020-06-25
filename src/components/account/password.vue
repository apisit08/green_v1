<template>
    <v-container>
      <v-card outlined>

          <v-card-title class="pt-8">เปลี่ยนรหัสผ่าน</v-card-title>
          <v-divider></v-divider>

          <v-card-text>

              <v-row>
                  <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="oldpass" outlined dense label="รหัสผ่านปัจจุบัน"></v-text-field>
                  </v-col>
              </v-row>

              <v-row class="mt-n2">
                  <v-col cols="12" sm="12" md="12">
                      <v-text-field dense v-model="newpass" type="password" outlined label="รหัสผ่านใหม่"></v-text-field>
                  </v-col>
              </v-row>

              <v-row class="mt-n3">
                  <v-col cols="12" sm="12" md="12">
                      <v-text-field dense v-model="confirmpass" type="password" :rules="rules" outlined label="ยืนยันรหัสผ่านใหม่"></v-text-field>
                  </v-col>
              </v-row>

          </v-card-text>

          <v-card-actions>
              <v-spacer></v-spacer>
            <v-btn color="primary" style="color:white;">update</v-btn>
          </v-card-actions>

      </v-card>
    </v-container>
</template>

<script>
export default {
  data () {
    return {
      oldpass: null,
      newpass: null,
      confirmpass: null,
      rules: [
        value => !!value || 'Required.',
        value => (value === this.newpass) || 'รหัสผ่านไม่ตรงกัน'
      ]
    }
  },
  methods: {
  }
}
</script>
