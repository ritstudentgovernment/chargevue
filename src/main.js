// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

console.log(window.location.hostname)

if (window.location.hostname === 'localhost') {
  Vue.use(VueSocketIO, socketio('localhost:5000'))
} else {
  Vue.use(VueSocketIO, socketio('https://tigertrackerstage.rit.edu/socket.io'))
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
