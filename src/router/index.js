import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import store from '../store'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/logout',
    name: 'LogoutPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/LogoutPage.vue')
  },
  {
    path: '/tenants',
    name: 'TenantsPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/TenantsPage.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/users',
    name: 'UsersPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/UsersPage.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/users-disabled',
    name: 'UsersDisabledPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/UsersDisabledPage.vue'),
    meta: {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next()
      return
    }
    next('/logout')
  } else {
    next()
  }
})

export default router
