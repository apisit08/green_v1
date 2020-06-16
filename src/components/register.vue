<template>
<v-container fluid fill-height>
  <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card shaped>
      <v-toolbar color="#2d90c2"><v-toolbar-title style="color:white;" >Register</v-toolbar-title></v-toolbar>
      <v-card-text>
          <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field label="ชื่อเต็ม" v-model="fullName" required solo prepend-icon="mdi-account"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field label="อีเมล์" v-model="email" required solo prepend-icon="mdi-email"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field label="รหัสผ่าน" v-model="password" type="password" required solo prepend-icon="mdi-lock"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field label="การยืนยันรหัสผ่าน" v-model="confirmedPassword" type="password" required solo prepend-icon="mdi-lock-plus"></v-text-field>
              </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="6" align="left">
              <v-btn color="success">
                  <v-avatar left>
                      <v-icon>mdi-checkbox-marked-circle</v-icon>
                  </v-avatar>
                  Submit
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="6" align="right">
              <v-btn color="warning" @click="clearData">
                <v-avatar left>
                    <v-icon>mdi-close-circle</v-icon>
                </v-avatar>
                Clear
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  data () {
    return {
      fullName: '',
      email: '',
      password: '',
      confirmedPassword: ''
    }
  },
  methods: {
    clearData () {
      this.fullName = ''
      this.email = ''
      this.password = ''
      this.confirmedPassword = ''
    }
  }
}
</script>
