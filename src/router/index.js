import Vue from 'vue'
import VueRouter from 'vue-router'

import Register from '../components/register.vue'
import Login from '../components/login'
import Manage from '../components/manage'
import Meeting from '../components/meeting'

Vue.use(VueRouter)

const routes = [
  {
    path: '/manage',
    name: 'Manage',
    component: Manage
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/meeting',
    name: 'Meeting',
    component: Meeting
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
