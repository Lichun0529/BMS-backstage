import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import Page404 from '../views/404.vue'
import Home from '../views/home.vue'
Vue.use(VueRouter)

  const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   // component: Home
  // },
  {
    path: '/login',
    component:Login
  },
  {
    path: '/register',
    component:Register
  },
  {
    path: '*',
    component:Page404
  },
  {
    path:'/home',
    component:Home,
    name:'home'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
