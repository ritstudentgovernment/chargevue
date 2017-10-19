import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    CLEAR_TOKEN: state => {
      state.token = null
    }
  },
  getters: {
    IS_AUTHENTICATED: state => {
      if (state.token) {
        return true
      }
    },
    GET_TOKEN: state => {
      return state.token
    }
  }
})
