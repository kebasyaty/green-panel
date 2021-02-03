import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  // Home page.
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      authRequired: true
    }
  },
  // Login page.
  {
    path: '/sign-in',
    name: 'signin',
    component: () => import('../views/Signin.vue')
  },
  // Document list.
  {
    path: '/:service/:indexService/:collection/:indexCollection/document-list',
    name: 'DocumentList',
    component: () => import('../views/DocumentList.vue'),
    meta: {
      authRequired: true
    }
  },
  // Open a document in a form.
  {
    path: '/:service/:indexService/:collection/:indexCollection/document/:indexDoc',
    name: 'DocumentForm',
    component: () => import('../views/DocumentForm.vue'),
    meta: {
      authRequired: true
    }
  },
  // Form - Create a new document.
  {
    path: '/:service/:indexService/:collection/:indexCollection/create-document',
    name: 'DocumentForm',
    component: () => import('../views/DocumentForm.vue'),
    meta: {
      authRequired: true
    }
  },
  // Error 404 - Page not found.
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      authRequired: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    if (!Vue.prototype.$session.exists()) {
      next({
        path: '/sign-in'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
