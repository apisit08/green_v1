<template>
<v-container>
    <v-row>
      <v-col cols="12">
        <h2>ห้องประชุม</h2>
      </v-col>
    </v-row>
    <v-row v-for="(item,i) in 2" :key="i">
      <v-col cols="12">
        <b-card>
        <div>
          <table border="0" width="100%">
            <tr>
              <td>
                <!-- <v-btn icon color="secondary"><v-icon>mdi-pencil</v-icon></v-btn> -->
                <label>Room{{i+1}}</label>
              </td>
              <td>
                <div class="float-right">
                  <v-btn icon color="#778899">
                <v-icon>mdi-calendar</v-icon>
              </v-btn>
              <v-btn icon color="#778899">
                <v-icon>mdi-account-plus</v-icon>
              </v-btn>
              <v-btn v-b-modal="'my-modal'" icon color="#778899">
                <v-icon>mdi-cog</v-icon>
              </v-btn>
              <button class="btn btn-success" @click="getjitsi">เริ่มต้น</button>
                </div>
              </td>
              <td>
                <b-button
                  v-b-toggle="'collapse-'+i"
                  class="float-right"
                  variant="outline-secondary"
                >
                  <i class="fa fa-angle-down" aria-hidden="true"></i>
                </b-button>
              </td>
            </tr>
          </table>
         <b-collapse :id="'collapse-'+i" class="mt-2">
          <div>
            <v-row>
              <v-col cols="12">
                <b>เชิญผู้เข้าร่วมสนทนา</b>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <button class="btn-outline-success"><i class="fa fa-clone" aria-hidden="true"></i>
              &nbsp;Copy link</button>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <b>เชิญผู้เข้าร่วมผ่านอีเมลล์</b>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="5">
                <form>
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="invite someone...">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary " type="submit">ส่งคำเชิญ</button>
                </div>
              </div>
            </form>
              </v-col>
            </v-row>
            <v-row>
              <ScheduleManage />
            </v-row>
            <v-row>
              <ConversationSavedManage />
            </v-row>
          </div>
        </b-collapse>
        </div>
      </b-card>
      </v-col>
    </v-row>
    <Setting/>
</v-container>
</template>
<script>
import ScheduleManage from '../components/scheduleManage'
import ConversationSavedManage from '../components/conversationSavedManage'
import Setting from '../components/modal/setting'

export default {
  components: {
    ScheduleManage,
    ConversationSavedManage,
    Setting
  },
  data () {
    return {
      token: '',
      user: []
    }
  },
  created () {
    this.token = localStorage.getItem('user-token')
    var base64Url = this.oken.split('.')[1]
    this.datapage = JSON.parse(window.atob(base64Url))
    this.userinfo = this.datapage.users
    console.log(this.user)
  },
  methods: {
    async getjitsi () {
      console.log('getjitsi')

      const headers = {
        Authorization: 'Bearer ' + this.token
      }

      try {
        var { data } = await this.axios.post('http://localhost:9213/api/rooms/meeting', {
          user_id: this.user._id
        },
        {
          headers: headers
        }
        )
        console.log('data', data)
      } catch (error) {
        console.log('error', error.message)
      }
    }
  }
}
</script>
<style>
  label {
    font-size: 20;
    font-weight: bold;
  }
</style>
