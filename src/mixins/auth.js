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
    },
    checkAuth () {
      return new Promise((resolve, reject) => {
        if (localStorage.getItem('token')) {
          resolve(localStorage.getItem('token'))
        }
        var token = (process.env.AUTH_METHOD === 'LDAP') ? {token: localStorage.getItem('token')} : {}
        this.$options.sockets.verify_auth = (data) => {
          if (!data.error) {
            this.pageReloaded(localStorage.getItem('token'), data.admin, data.username)
            resolve(localStorage.getItem('token'))
          } else {
            reject()
            this.logout()
          }
        }
        this.$socket.emit('verify_auth', token)
      })
    }
  }
}

export default functions
