import Vue from 'vue'
import VueRouter from 'vue-router'

import Register from '../components/register.vue'
import Login from '../components/login'
import Manage from '../components/manage'
import Meeting from '../components/meeting'
import Maccount from '../components/manageAccount.vue'
import Invite from '../components/invite'
import Profile from '../components/profile'
import Signin from '../components/signIn'
import Conference from '../components/conference'

Vue.use(VueRouter)

const routes = [
  {
    path: '/manage',
    name: 'Manage',
    component: Manage
  },
  {
    path: '/conference',
    name: 'Conference',
    component: Conference
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/meeting',
    name: 'Meeting',
    component: Meeting
  },
  {
    path: '/manageAccount',
    name: 'Maccount',
    component: Maccount
  },
  {
    path: '/invite',
    name: 'Invite',
    component: Invite
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
