<template>
  <v-app>
    <v-app-bar
      app
      color="success"
      dark
    >
      <div class="d-flex align-center">
        <h1>green V1</h1>
      </div>

      <v-chip class="ma-2" large @click="register" color="#22a342">
        <v-avatar left>
          <v-icon>mdi-account-plus</v-icon>
        </v-avatar>
        Register
        </v-chip>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
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
    }
  }
}
</script>
