import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/pages/Dashboard'
import Committee from '@/pages/Committee'
import Charge from '@/pages/Charge'
import Admin from '@/pages/Admin'
import NotFound from '@/pages/NotFound'
import Invitation from '@/pages/Invitation'
import store from '@/store'
import Minutes from '@/pages/Minutes'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Dashboard
    },
    {
      path: '/committee/:committee',
      component: Committee
    },
    {
      path: '/charge/:charge',
      component: Charge
    },
    {
      path: '/admin',
      component: Admin,
      beforeEnter: (to, from, next) => {
        if (store.getters.admin) {
          next()
        } else {
          next({ path: '/' })
        }
      }
    },
    {
      path: '/invitation/:id',
      component: Invitation
    },
    {
      path: '/minute/:minute',
      component: Minutes
    },
    {
      path: '*',
      component: NotFound
    }
  ],
  mode: 'history'
})
