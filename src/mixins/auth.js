let functions = {
  methods: {
    login (username, password) {
      return new Promise((resolve, reject) => {
        this.$socket.emit('auth', {username: username, password: password})
        this.$options.sockets.auth = (data) => {
          console.log(data)
          if (data.token) {
            localStorage.setItem('authToken', data.token)
            resolve()
          } else {
            reject()
          }
        }
      })
    },
    logout () {
      localStorage.removeItem('authToken')
    },
    checkAuth () {
      if (localStorage.getItem('authToken')) {
        return true
      } else {
        return false
      }
    }
  }
}

export default functions
