<template>
<v-container>
<v-card>
    <v-toolbar flat>
      <v-toolbar-title>ข้อมูลส่วนตัว</v-toolbar-title>
    </v-toolbar>
    <v-tabs vertical>
      <v-tab style="margin-right: auto;">
        <v-icon left>mdi-account</v-icon>
        ข้อมูลบัญชี
      </v-tab>
      <v-tab>
        <v-icon left>mdi-key-variant</v-icon>
        เปลี่ยนรหัสผ่าน
      </v-tab>
      <v-tab style="margin-right: auto;">
        <v-icon left>mdi-trash-can</v-icon>
        ลบบัญชี
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <AccountInfo />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <Password/>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <Profiles/>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</v-container>
</template>

<script>
import AccountInfo from '../components/account/accountInfo'
import Password from '../components/account/password'
import Profiles from '../components/account/profiles'

export default {
  components: {
    AccountInfo,
    Password,
    Profiles
  }
}
</script>
