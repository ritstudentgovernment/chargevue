import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    username: '',
    admin: false,
    authenticated: false,
    taskId: null
  },
  mutations: {
    token (state, data) {
      state.token = data.token
    },
    admin (state, data) {
      state.admin = data.admin
    },
    username (state, data) {
      state.username = data.username
    },
    authenticated (state, data) {
      state.authenticated = data.authenticated
    },
    taskId (state, data) {
      state.taskId = data.taskId
    }
  },
  getters: {
    token: state => state.token,
    admin: state => state.admin,
    username: state => state.username,
    authenticated: state => state.authenticated,
    isLdap: state => process.env.AUTH_METHOD === 'LDAP',
    taskId: state => state.taskId
  }
})
