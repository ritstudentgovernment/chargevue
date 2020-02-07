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
      <div class="right flex-container">
        <span class="link" @click="showLoginForm = true" v-if="!authenticated && isLdap">Login</span>
        <span class="link" @click="submitLogout()" v-if="authenticated && isLdap">Logout</span>
        <span class="link" v-if="!authenticated && !isLdap"><a href="/saml/login">Login</a></span>
        <span class="link" v-if="authenticated && !isLdap"><a href="/saml/logout">Logout</a></span>
        <router-link to="/admin" class="link" v-if="admin">Admin</router-link>

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <div class="dropdown"> 
          <button class="btn notification_button" @click="toggleNotifications()"><i class="fa fa-bell notification_button"></i></button>
          <div><span v-if="showBadge" id="notificationBadge" class="w3-badge">{{ badgeNumber }}</span></div>

          <div id="notificationDropdown" class="dropdown-content form-control" name="people">
            <span>
              <div>

                <a class="notification" v-bind:key="notification.id" v-for="notification in notifications" :value="notification">{{notification.message}}
                <ul class="notificationButtons">
                  <li class="delete"><button class="delete" @click="deleteNotifiction(notification)">Delete</button></li>
                  <li class="open"><button class="open" @click="goToDestination(notification)">Open</button></li>
                </ul>
                </a>
              </div>
            </span>
          </div>
          
        </div>

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
var i
import Auth from '../mixins/auth'
import EventBus from './EventBus'
import { mapGetters } from 'vuex'

export default {
  name: 'headermenu',
  mixins: [Auth],
  data () {
    return {
      test: false,
      notifications: [],
      menuMessages: [],
      badgeNumber: null,
      showBadge: false,
      showLoginForm: false,
      showLoginLoading: false,
      showAuthError: false,
      username: '',
      password: ''
    }
  },
  methods: {
    badgeController () {
      this.badgeNumber = 0
      for (i = 0; i < this.notifications.length; i++) {
        if (this.notifications[i].viewed === false) {
          this.badgeNumber++
        }
      }
      if (this.badgeNumber > 0) {
        this.showBadge = true
      } else {
        this.showBadge = false
      }
    },
    deleteNotifiction (notification) {
      var index = this.notifications.indexOf(notification)
      this.notificationController('delete_notification', notification)
      this.notifications.splice(index, 1) // Splice is used to avoid 'holes' in the array
      this.badgeController()
    },
    notificationController (controllerType, notification) {
      this.checkAuth().then((token) => {
        this.$socket.emit(controllerType, {
          token: token,
          notificationId: notification.id
        })
      })
    },
    goToDestination (notification) {
      if (notification.viewed === false) {
        this.notificationController('update_notification', notification)
        notification.viewed = true
      }
      this.badgeController()
      // Local Storage used to open the Action modal on the landing page
      if (notification.type === 'AssignedToAction') {
        localStorage.setItem('openModal', true)
      }
      this.$router.push(notification.redirect)
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
    },
    toggleNotifications () {
      document.getElementById('notificationDropdown').classList.toggle('show')
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'authenticated',
      admin: 'admin',
      isLdap: 'isLdap'
    })
  },
  sockets: {
    get_notifications: function (data) {
      console.log(data)
      this.notifications = data
      this.badgeController()
    }
  },
  beforeMount () {
    this.checkAuth().then((token) => {
      this.$socket.emit('get_notifications', {
        token: token
      })
    })
  },
  mounted () {
    // Handles the notification menu closing. This event is generated in the App.vue main page
    EventBus.$on('closeNotifications', function (event) {
      if (!(event.target.classList.contains('notification') || event.target.classList.contains('notification_button') || event.target.classList.contains('delete'))) {
        document.getElementById('notificationDropdown').classList.remove('show')
      }
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

  .btn {
  background-color: #f36e21; 
  border: none; 
  color: white; 
  padding: 4px 6px 4px 6px; 
  font-size: 12px; 
  margin-left: 18px;
  cursor: pointer; 
  border-radius: 20%;
}

.btn:hover {
  background-color: #d16424;
}

.flex-container {
  display: flex;
  flex-direction: row;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  right: 0;
  display: none;
  margin-top: 21px;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 20vw;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  overflow: auto;
  color: black;
  padding-top: 12px;
  text-decoration: none;
  display: block;
}

/* Show the dropdown menu (use JS to add this class to the .dropdown-content container when the user clicks on the dropdown button) */
.show {
  display:block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.w3-badge{
  position: absolute;
  background: rgb(212, 0, 0);
  height:1.2rem;
  bottom:1rem;
  left:2.2rem;
  width:1.2rem;
  font-size: 14px;
  border-radius: 50%;
  color:white;
  overflow: hidden;
}

.notification {
  position: relative;
  margin: 0 0 0 0;
  border-bottom: 1px solid #f36e21;
}

.notificationButtons {
  float: right;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.delete, .open {
  display: block;
  text-align: center;
  font-size: 14px;
  background: none;
  border: 1px solid rgb(189, 189, 189);
  padding: 0!important;
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  border-radius: 20%
}

.delete :hover {
  background-color: red;
  color: white;
  cursor: pointer;
}

.open :hover {
  background-color: green;
  color: white;
  cursor: pointer;
}

.delete {
  float: right;
  color: red;
}

.open {
  float: left;
  color: green;
}
</style>
