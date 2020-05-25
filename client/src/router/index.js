import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Облигации',
    meta: {layout: 'main'},
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Авторизация',
    meta: {layout: 'auth'},
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Регистрация',
    meta: {layout: 'auth'},
    component: () => import('../views/Register.vue')
  },
  {
    path: '/lockscreen',
    name: 'Заблокировать',
    meta: {layout: 'auth'},
    component: () => import('../views/LockScreen.vue')
  },
  {
    path: '/admin',
    name: 'Админ-панель',
    meta: {layout: 'main'},
    component: () => import('../views/Admin.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
