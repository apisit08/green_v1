<template>
  <v-app>
    <v-app-bar
      app
      color="success"
      dark
    >
      <div class="d-flex align-center">
        <h1>Login</h1>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <Login/>
    </v-content>
  </v-app>
</template>

<script>
import Login from './components/login'

export default {
  name: 'App',

  components: {
    Login
  },

  data: () => ({
    //
  })
}
</script>
