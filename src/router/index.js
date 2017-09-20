import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/pages/Dashboard'
import Committee from '@/pages/Committee'
import Charge from '@/pages/Charge'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Dashboard,
      refresh: true
    },
    {
      path: '/committee/:committee',
      component: Committee,
      refresh: true
    },
    {
      path: '/charge/:charge',
      component: Charge,
      refresh: true
    }
  ]
})
