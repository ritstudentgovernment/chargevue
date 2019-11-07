<!--

filename: HeaderMenu.vue
description: Header component for use across all pages

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div @keyup.enter="submitLogin()">
    <header>
      <div class="left">
        <div class="link" id="site">
          <router-link to="/" tag="span">Go to Site</router-link>
        </div>
      </div>
      <p class="title"><router-link to="/">TigerTracker</router-link></p>
      <div class="right">
        <span class="link" @click="showLoginForm = true" v-if="!authenticated && isLdap">Login</span>
        <span class="link" @click="submitLogout()" v-if="authenticated && isLdap">Logout</span>
        <button class = "customButton" @click="redirectLogin()" v-if="!authenticated && !isLdap">Login</button>
        <button class = "customButton" @click="redirectLogout()" v-if="authenticated && !isLdap">Logout</button>
        <router-link to="/admin" class="link" v-if="admin">Admin</router-link>
      </div>
    </header>

    <div>
      <div class="modal" v-bind:class="{ 'is-active': showLoginForm }">
      <div class="modal-background" @click="showLoginForm = false"></div>
      <div class="modal-card">
        <div class="modal-card-head">
          <p class="modal-card-title">Login</p>
        </div>
        <section class="modal-card-body">
          <article class="message is-danger" v-if="showAuthError">
            <div class="message-body">Oops! Username or password was incorrect. Please try again.</div>
          </article>

          <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <input class="input" type="text" placeholder="RIT Username" v-model="username">
            </div>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input class="input" type="password" placeholder="RIT Password" v-model="password">
            </div>
          </div>
        </section>
        <div class="modal-card-foot">
          <button class="button is-primary" @click="submitLogin()" v-bind:class="{ 'is-loading': showLoginLoading }">Login</button>
          <button class="button" @click="showLoginForm = false">Cancel</button>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '../mixins/auth'
import { mapGetters } from 'vuex'

export default {
  name: 'headermenu',
  mixins: [Auth],
  data () {
    return {
      showLoginForm: false,
      showLoginLoading: false,
      showAuthError: false,
      username: '',
      password: ''
    }
  },
  methods: {
    redirectLogin () {
      this.$router.push('/saml/login')
      this.$router.go()
    },
    redirectLogout () {
      this.$router.push('/saml/logout')
      this.$router.go()
    },
    submitLogin () {
      this.showAuthError = false
      this.showLoginLoading = true
      this.login(this.username, this.password).then(() => {
        this.showAuthError = false
        this.showLoginForm = false
        this.showLoginLoading = false
        this.username = ''
        this.password = ''
      }).catch(() => {
        this.showLoginLoading = false
        this.showAuthError = true
      })
    },
    submitLogout () {
      this.logout()
      this.$router.push({ path: '/' })
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'authenticated',
      admin: 'admin',
      isLdap: false
    })
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400');

  body {
    padding-top: 58px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  header { 
    padding-top: 15px;
    padding-bottom: 15px;
    display: inline-block;
    width: 100% !important;
    text-align: center;
    z-index: 2;
    background-color: white;
  }

  header .title {
    margin: 0;
    padding: 0;
    color: #f36e21;
    font-size: 20px;
    font-weight: 300;
    display: inline;
    cursor: default;
  }

  header .link {
    cursor: pointer;
    font-weight: 300;
    color: grey;
    text-align: right;
    display: inline-block;
    padding-left: 20px;
  }

  /* A button made to look like a link */
  button {
    padding: 0!important;
    font-size: 18px;
    font-weight: 300;
    background: none!important;
    display: inline-block;
    font-family: 'Montserrat', Helvetica, Arial, sans-serif;
    border: none;
    z-index: 2;
    cursor: pointer;
    color: grey;
    text-align: right;
  }

  header .left {
    float: left;
    padding: 0px;
    margin: 0px;
    width: 25%;
    min-height: 1px;
  }

  header .right {
    float: right;
    height: 28px;
    width: 25% !important;
    padding: 0;
    margin: 0;
    min-height: 1px;
  }

  header i {
    display: inline-flex;
    vertical-align: middle;
  }

  @media screen and (max-width: 800px) {
    .button span {
      display: none;
    }
  }

  p {
    padding: 0;
  }

  .modal-card-head {
    padding: 0 0 0 20px;
    text-align: left;
  }

  .control {
    padding-right: 20px;
  }
</style>
