module.exports = {
  sockets: {
    auth: function (data) {
      console.log(data)
      if (data.token) {
        localStorage.setItem('authToken', data.token)
      }
    }
  },
  methods: {
    login (username, password) {
      this.$socket.emit('auth', {username: username, password: password})
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
