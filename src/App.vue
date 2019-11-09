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
  beforeCreate () {
    var token = (process.env.AUTH_METHOD === 'LDAP') ? {token: localStorage.getItem('token')} : {}
    this.$socket.emit('verify_auth', token)
  },
  sockets: {
    verify_auth: function (data) {
      if (!data.error) {
        this.pageReloaded(localStorage.getItem('token'), data.admin, data.username)
      } else {
        this.logout()
      }
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
  @import '../node_modules/bulma/sass/components/tabs'
  @import '../node_modules/bulma/sass/components/navbar'

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

<style lang="css"> 
  /* Customize the label (the container) */
  .container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 1px;
    cursor: pointer;
    font-size: 18px;
  }

/* Hide the browser's default checkbox */
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

/* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 15;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: rgba(150, 143, 143, 0.849);
  }

/* On mouse-over, add a grey background color */
  .container:hover input ~ .checkmark {
    background-color: #ccc;
  }

/* When the checkbox is checked, add an orange background */
  .container input:checked ~ .checkmark {
    background-color: #f36e21;
  }

/* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

/* Show the checkmark when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }

/* Style the checkmark/indicator */
  .container .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
</style>
