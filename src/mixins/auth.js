let functions = {
  methods: {
    login (username, password) {
      return new Promise((resolve, reject) => {
        this.$socket.emit('auth', {username: username, password: password})
        this.$options.sockets.auth = (data) => {
          if (data.token) {
            localStorage.setItem('token', data.token)
            resolve()
          } else {
            reject()
          }
        }
      })
    },
    logout () {
      localStorage.removeItem('token')
    },
    getToken () {
      return localStorage.getItem('token')
    },
    isAuthenticated () {
      return !!localStorage.getItem('token')
    }
  }
}

export default functions
