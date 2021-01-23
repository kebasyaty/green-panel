import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  // Home page.
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // Document list
  {
    path: '/:service/:index_service/:collection/:index_collection/document-list',
    name: 'DocumentList',
    component: () => import('../views/DocumentList.vue')
  },
  // Error 404 - Page not found.
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
