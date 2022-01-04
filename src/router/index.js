import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/views/Home/Home'
import Welcome from '@/components/Welcome'
import User from '@/components/User/User'


Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/users',
        component: User
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})
//挂载路由导航守卫 控制页面的访问权限
router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  //from 从哪个路径跳转而来
  //next是一个函数，表示放行
  //next() 放行 next('/login')强制跳转
  if (to.path === '/login') return next()
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router
