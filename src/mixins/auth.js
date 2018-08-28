let functions = {
  methods: {
    login (username, password) {
      return new Promise((resolve, reject) => {
        this.$socket.emit('auth', {username: username, password: password})
        this.$options.sockets.auth = (data) => {
          if (data.token) {
            localStorage.setItem('token', data.token)
            if (data.admin) this.$store.commit('admin', { admin: true })
            this.$store.commit('authenticated', { authenticated: true })
            this.$store.commit('token', { token: data.token })
            this.$store.commit('username', { username: data.username })
            resolve()
          } else {
            reject()
          }
        }
      })
    },
    logout () {
      localStorage.removeItem('token')
      this.$store.commit('authenticated', { authenticated: false })
      this.$store.commit('token', { token: '' })
      this.$store.commit('username', { username: '' })
      this.$store.commit('admin', { admin: false })
    },
    pageReloaded (token, admin, username) {
      this.$store.commit('authenticated', { authenticated: true })
      this.$store.commit('token', { token: token })
      this.$store.commit('username', { username: username })
      this.$store.commit('admin', { admin: admin })
    },
    getToken () {
      return this.$store.getters.token
    },
    isAdmin () {
      return this.$store.getters.admin
    },
    isAuthenticated () {
      return this.$store.getters.authenticated
    }
  }
}

export default functions
