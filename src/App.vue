<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Auth from '@/mixins/auth'

export default {
  name: 'app',
  mixins: [Auth],
  beforeMount () {
    if (localStorage.getItem('token')) {
      this.$socket.emit('verify_auth', {
        token: localStorage.getItem('token')
      })
    }
  },
  sockets: {
    verify_auth: function (data) {
      this.pageReloaded(localStorage.getItem('token'), data.admin, data.username)
    }
  }
}
</script>

<style lang="sass">
@import 'assets/vars.sass'

@import url('https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400')
@import '../node_modules/bulma/sass/utilities/_all'
@import '../node_modules/bulma/sass/grid/columns'
@import '../node_modules/bulma/sass/components/modal'
@import '../node_modules/bulma/sass/components/message'
@import '../node_modules/bulma/sass/components/menu'
@import '../node_modules/bulma/sass/elements/form'
@import '../node_modules/bulma/sass/elements/button'
@import '../node_modules/bulma/sass/elements/table'
@import '../node_modules/bulma/sass/elements/box'

html, body
  padding: 0
  margin: 0
  background-color: #eee

#app
  font-family: 'Montserrat', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale

.modal
  z-index: 1000
</style>
