import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import Page404 from '../views/404.vue'
import Index from '../views/index.vue'
import userPage from '../views/userPage.vue'
import Fund from '../views/fund.vue'
import Home from '../views/home.vue'

Vue.use(VueRouter)

  const routes = [
  {path: '/login',component:Login,name:'login'},
  {path: '/register',component:Register,name:'register'},
  {path: '*',component:Page404,name:'page404'},
  {path: '/', redirect: '/index'},
  {
    path:'/index',
    component:Index,
    // name:'index',
    children:[
      {path:'',name:'home',component:Home},
      {path:'/home',name:'home',component:Home},
      {path:'/userpage',name:'userpage',component:userPage},
      {path: '/fund',name:'fund',component:Fund},
      {path: '/fund1',name:'fund1',component:Fund},
      {path: '/fund2',name:'fund2',component:Fund},
    ]
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
