<template>
<v-container>
    <v-row>
      <v-col cols="12">
        <h2>ห้องสนทนา</h2>
      </v-col>
    </v-row>
    <v-row v-for="(item,i) in 2" :key="i">
      <v-col cols="12">
        <b-card>
        <div>
          <table border="0" width="100%">
            <tr>
              <td v-if="i+editform > 0">
                <v-btn icon color="secondary" @click="editformfunc(i)"><v-icon>mdi-pencil</v-icon></v-btn>
                <label>Room{{i+1}}</label>
              </td>
              <td v-if="i+editform <= 0">
                <v-form>
                  <table width="100%" border="0">
                    <tr class="text-center">
                      <td><v-btn icon color="secondary" disabled><v-icon>mdi-pencil</v-icon></v-btn></td>
                      <td><v-text-field class="mt-6" dense outlined v-model="editroom"></v-text-field></td>
                      <td><v-btn color="success" @click="submitfunc()">แก้ไข</v-btn></td>
                    </tr>
                  </table>
                  <!-- <v-row>
                    <v-col cols="2"><v-btn icon color="secondary" disabled><v-icon>mdi-pencil</v-icon></v-btn></v-col>
                    <v-col cols="6"><v-text-field outlined v-model="editroom"></v-text-field></v-col>
                    <v-col cols="4"><v-btn color="success">แก้ไข</v-btn></v-col>
                  </v-row> -->
                </v-form>
              </td>
              <td>
                <div class="float-right">
                  <v-btn @click="openSchedule()" icon color="#778899">
                <v-icon v-if="openRoom">mdi-calendar</v-icon>
              </v-btn>
              <v-btn icon color="#778899" @click="openModalInvite">
                <v-icon v-if="openRoom">mdi-account-plus</v-icon>
              </v-btn>
              <v-btn @click="openPop()" icon color="#778899">
                <v-icon>mdi-cog</v-icon>
              </v-btn>
              <button class="btn btn-success" @click="startroom()">เริ่มต้นสนทนา</button>
                </div>
              </td>
              <td>
                <v-btn class="float-right" v-b-toggle="'collapse-'+i">
                  <v-icon class="" >mdi-chevron-{{openRoom? 'down' : 'up'}}</v-icon>
                </v-btn>
                <!-- <b-button
                  v-b-toggle="['collapse-'+i, openRoom = !openRoom]"
                  class="float-right"
                  variant="outline-secondary"

                >
                  <v-icon class="" >mdi-chevron-{{openRoom? 'up' : 'down'}}</v-icon>
                  <i class="fa fa-angle-down" aria-hidden="true"></i>
                </b-button> -->
              </td>
            </tr>
          </table>
         <b-collapse :id="'collapse-'+i" class="mt-2" @show="show" @hide="hide">
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
                <!-- <form>
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="invite someone...">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary " type="submit">ส่งคำเชิญ</button>
                </div>
              </div>
            </form> -->
            <v-form class="mt-n6 mb-n6">
              <v-row>
                <v-col cols="8">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    placeholder="invite someone"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="4"><v-btn outlined disabled>ส่งคำเชิญ</v-btn></v-col>
              </v-row>
            </v-form>
              </v-col>
            </v-row>
            <v-row>
              <ScheduleMeeting />
            </v-row>
            <v-row>
              <ConversationSavedMeeting />
            </v-row>
          </div>
        </b-collapse>
        </div>
      </b-card>
      </v-col>
    </v-row>
    <ModalSetting ref="popupSetting"/>
    <ScheduleMain ref="popupMain"/>
    <Invite ref="popupInvite" />
</v-container>
</template>

<script>
import ScheduleMeeting from '../components/scheduleMeeting'
import ConversationSavedMeeting from '../components/conversationSavedMeeting'
import ModalSetting from '../components/modal/modalSetting'
import ScheduleMain from '../components/modal/scheduleMain'
import Invite from '../components/modal/invite'
import { EventBus } from '@/EventBus'

export default {
  components: {
    ScheduleMeeting,
    ConversationSavedMeeting,
    ModalSetting,
    ScheduleMain,
    Invite
  },
  data () {
    return {
      openRoom: true,
      editform: 1,
      editforms: 1,
      editroom: '',
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || ''
      ],
      datapage: [],
      room: [],
      userinfo: [],
      d: ''
    }
  },
  created () {
    this.decodejwttoken()
  },
  methods: {
    decodejwttoken () {
      this.d = localStorage.getItem('user-token')
      var base64Url = this.d.split('.')[1]
      this.datapage = JSON.parse(window.atob(base64Url))
      console.log(this.datapage)
      this.userinfo = this.datapage.users
      // console.log(this.userinfo)
      this.room = this.datapage.rooms
      // console.log(this.room)
    },
    async startroom () {
      EventBus.$emit('user')
      // this.goPage('/manage')
      console.log('getjitsi')

      const headers = {
        Authorization: 'Bearer ' + this.d
      }

      try {
        var { data } = await this.axios.post('http://localhost:9213/api/rooms/meeting', {
          user_id: this.userinfo._id
        },
        {
          headers: headers
        }
        )
        window.open(data.room)
        console.log('data', data)
      } catch (error) {
        console.log('error', error.message)
      }
    },
    goPage (link) {
      this.$router.push(link)
    },
    openPop () {
      console.log('pressed')
      this.$refs.popupSetting.dialogSetting = true
      // this.$refs.popupSetting.opendialog()
    },
    openSchedule () {
      console.log('pressed2')
      this.$refs.popupMain.dialogScheduleMain = true
    },
    show () {
      this.openRoom = !this.openRoom
    },
    hide () {
      this.openRoom = !this.openRoom
    },
    openModalInvite () {
      this.$refs.popupInvite.openInvite()
    },
    editformfunc (n) {
      this.editform = -n
      this.editforms = n
      this.editroom = 'Room' + (n + 1)
    },
    submitfunc () {
      this.editform = 1
      this.editforms = 1
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
