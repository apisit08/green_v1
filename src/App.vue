<template>
  <v-app>
    <v-app-bar
      app
      color="white"
      dark
      height="90px"
    >

      <div class="d-flex align-center">
        <v-img src="@/images/inetlogo.png" max-width="100px" class="app-bar-left"></v-img>
      </div>

      <v-spacer></v-spacer>

      <v-menu v-if="user" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on">
            <v-avatar class="profile" size="50" style="border-radius: 10px;">
              <v-img src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"></v-img>
            </v-avatar>
            <v-chip class="v-chip-left" large color="white">
              <span class="font-user">John Leider</span>
            </v-chip>
          </div>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            @click="goPage(item.link)"
            >
              <v-avatar left><v-icon>{{ item.icon }}</v-icon></v-avatar>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
      </v-menu>

    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>
<script>
import { EventBus } from '@/EventBus'

export default {
  name: 'App',

  components: {
    // Login
  },

  data () {
    return {
      user: false,
      items: [
        {
          icon: 'mdi-card-account-details',
          title: 'ข้อมูลส่วนตัว',
          link: '/profile'
        },
        {
          icon: 'mdi-help-circle',
          title: 'ต้องการความช่วยเหลือ ?',
          link: ''
        },
        {
          icon: 'mdi-logout',
          title: 'ออกจากระบบ',
          link: '/'
        }
      ]
    }
  },

  created () {
    EventBus.$on('user', this.test)
    // localStorage.clear()
    // this.user = localStorage.getItem('user')
    // alert(this.user)
    // localStorage.removeItem('user')
    // alert(this.$route.name)
    if (this.$route.name === 'Login') {
    // localStorage.removeItem('user')
      this.user = false
    }
  },

  methods: {
    goPage (link) {
      // alert(link)
      if (link === '/') {
        this.user = false
      }
      this.$router.push(link)
    },
    register () {
      this.goPage('/register')
    },
    login () {
      this.goPage('/')
    },
    test () {
      this.user = true
    }
  }
}
</script>

<style>
.app-bar-left {
  margin-left: 100px;
}
.v-chip-left {
  margin-right: 100px;
}
.font-user {
  color: black;
  font-weight: 500;
}

.v-card__text::-webkit-scrollbar {
  width: 8px;
}

/* Track */
.v-card__text::-webkit-scrollbar-track {
  border-radius: 10px;
}

/* Handle */
.v-card__text::-webkit-scrollbar-thumb {
  background: lightgray;
  border-radius: 10px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #ccc8c0;
}
</style>
