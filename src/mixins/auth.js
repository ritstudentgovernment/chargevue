let functions = {
  methods: {
    login (username, password) {
      return new Promise((resolve, reject) => {
        this.$socket.emit('auth', {username: username, password: password})
        this.$options.sockets.auth = (data) => {
          console.log(data)
          if (data.token) {
            localStorage.setItem('authToken', data.token)
            this.$store.commit('SET_TOKEN', data.token)
            resolve()
          } else {
            reject()
          }
        }
      })
    },
    logout () {
      localStorage.removeItem('authToken')
      this.$store.commit('CLEAR_TOKEN')
    },
    checkUserIsLoggedIn () {
      if (localStorage.getItem('authToken') && this.$store.getters.IS_AUTHENTICATED) {
        return true
      } else {
        return false
      }
    }
  }
}

export default functions
