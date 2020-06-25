<template>
    <v-container>
      <v-card outlined>

          <v-card-title class="pt-8">Change your Password</v-card-title>
          <v-divider></v-divider>

          <v-card-text>

              <v-row>
                  <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="fullName" outlined dense label="Old password"></v-text-field>
                  </v-col>
              </v-row>

              <v-row class="mt-n2">
                  <v-col cols="12" sm="12" md="12">
                      <v-text-field dense v-model="provider" filled outlined readonly label="New passsword"></v-text-field>
                  </v-col>
              </v-row>

              <v-row class="mt-n3">
                  <v-col cols="12" sm="12" md="12">
                      <v-overflow-btn editable v-model="language" label="New password confirmation" :items="dropdown_edit" item-value="text" class="my-2"></v-overflow-btn>
                  </v-col>
              </v-row>

          </v-card-text>

          <v-card-actions>
              <v-spacer></v-spacer>
            <v-btn color="orange" style="color:white;">แก้ไข</v-btn>
          </v-card-actions>

      </v-card>
    </v-container>
</template>

<script>
export default {
  data () {
    return {
      fullname: null,
      email: null,
      provider: null,
      language: null,
      image: null,
      imageShow: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
      dropdown_edit: [
        { text: 'ไทย' },
        { text: 'อังกฤษ' }
      ]
    }
  }
}
</script>
