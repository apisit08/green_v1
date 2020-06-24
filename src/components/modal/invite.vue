<template>
  <v-row justify="center">
    <v-dialog v-model="dialogInvite" persistent max-width="600px">
      <v-card min-height="300px">
        <v-card-title justify-center>
          เชิญผู้เข้าร่วม
          <v-spacer></v-spacer>
          <v-icon @click="dialogInvite = false">mdi-close</v-icon>
        </v-card-title>
        <v-divider style="margin-top: -0.025px;"></v-divider>
        <v-card-text>
            <v-row>
              <v-text-field v-model="email" dense outlined placeholder="Invite someone" class="pl-12 mt-4" :rules="[rules.email]"></v-text-field>
              <b-input-group-append class="pr-12 mt-4">
                  <b-button variant="outline-success" style="margin-bottom: 26px;" :disabled="inviteEmail">ส่งคำเชิญ</b-button>
                  <!-- <b-button variant="outline-success" style="margin-bottom: 26px;">ส่งคำเชิญ</b-button> -->
            </b-input-group-append>
            </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      dialogInvite: false,
      email: null,
      inviteEmail: true,
      rules: {
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          if (this.email == null) {
            this.inviteEmail = true
          } else {
            this.inviteEmail = false
          }
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
    }
  },
  methods: {
    openInvite () {
      this.dialogInvite = true
    }
  }
}
</script>
