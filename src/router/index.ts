import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Page1',
    component: () => import(/*Page1 */ '../views/Page1.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router