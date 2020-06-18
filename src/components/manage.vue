
<template>
    <v-container>
      <h1>Hello! I'm Manage.</h1>
      <Schedule />
      <ConversationSaved />
    </v-container>
</template>

<script>
import Schedule from '../components/schedule'
import ConversationSaved from '../components/conversationSaved'

export default {
  components: {
    Schedule,
    ConversationSaved
  },
  data () {
    return {
      user: '',
      panel: '',
      items: 3
    }
  }

  // created () {
  //   this.user = localStorage.getItem('user')
  // }
}
</script>
