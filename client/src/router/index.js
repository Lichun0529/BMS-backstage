import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import Page404 from '../views/404.vue'
import Home from '../views/home.vue'
import userPage from '../views/userPage.vue'
Vue.use(VueRouter)

  const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   // component: Home
  // },
  {
    path: '/login',
    component:Login,
    name:'login'
  },
  {
    path: '/register',
    component:Register,
    name:'register'
  },
  {
    path: '*',
    component:Page404
  },
  {
    path:'/home',
    component:Home,
    name:'home'
  },
  {
    path:'/userPage',
    component:userPage,
    name:'userPage'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//路由守卫
router.beforeEach((to,from,next)=>{
  const isLogin = localStorage.getItem('BMStoken') ? true : false ;
  if(to.name == 'login' || to.name == 'register' ){
    next()
  }else{
    isLogin ? next() : next({name:'login'})
  }
})

export default router
