import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

if (window.location.hostname === 'localhost') {
  Vue.use(VueSocketIO, socketio('localhost:5000'))
} else if (window.location.hostname.includes('ngrok.io')) {
  Vue.use(VueSocketIO, socketio(window.location.hostname))
} else {
  Vue.use(VueSocketIO, socketio('https://tigertrackerstage.rit.edu'))
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
