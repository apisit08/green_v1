<template>
<v-container>
  <v-app>
    <v-container>
    <v-app-bar
      app
      color="white"
      dark
      height="90px"
    >

      <div class="d-flex align-center">
        <v-img src="@/images/inetlogo.png" max-width="100px" class="app-bar-right"></v-img>
      </div>

      <!-- <v-chip class="ma-2" large @click="register" color="#229c40">
        <v-avatar left>
          <v-icon>mdi-account-plus</v-icon>
        </v-avatar>
        Register
        </v-chip> -->

      <v-spacer></v-spacer>
    </v-app-bar>
    </v-container>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>

</v-container>

</template>

<script>
// import Login from './components/login'

export default {
  name: 'App',

  components: {
    // Login
  },

  data: () => ({
    //
  }),
  methods: {
    goPage (link) {
      this.$router.push(link)
    },
    register () {
      this.goPage('/register')
    },
    login () {
      this.goPage('/')
    }
  }
}
</script>

<style>
.app-bar-right {
  margin-left: 200px;
}
</style>
