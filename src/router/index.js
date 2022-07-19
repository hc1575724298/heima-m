/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-13 08:59:21
 * @LastEditors: sj
 * @LastEditTime: 2022-07-19 14:48:02
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: 'video',
        component: () => import('@/views/Video')
      },
      {
        path: 'qa',
        component: () => import('@/views/QA')
      },
      {
        path: 'profile',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  }
]

const router = new VueRouter({
  routes
})

export default router
