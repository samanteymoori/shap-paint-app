import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Draw from '../views/Draw.vue'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Draw',
    component: Draw
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
