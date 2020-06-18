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

      <v-avatar v-if="user" class="profile" size="50" style="border-radius: 10px;">
        <v-img src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"></v-img>
      </v-avatar>
      <v-chip v-if="user" class="v-chip-left" large color="white">
        <!-- <v-avatar class="radius-user profile" size="50">
          <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
        </v-avatar> -->
        <span class="font-user">John Leider</span>
      </v-chip>

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
      user: false
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
</style>
