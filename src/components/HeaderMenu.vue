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
          <button @click="toggleNotifications()" class="btn"><i class="fa fa-bell"></i></button>
          <div><span v-if="showBadge" id="notificationBadge" class="badge">{{ badgeNumber }}</span></div>
          <div id="notificationDropdown" class="dropdown-content form-control" name="people">
            <div>
              <a class="notification" @click="witnessNotification(notification)" v-bind:key="notification" v-for="notification in notifications" :value="notification">{{notification.message}}</a>
            </div>
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
import { mapGetters } from 'vuex'

export default {
  name: 'headermenu',
  mixins: [Auth],
  data () {
    return {
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
      if (this.badgeNumber > 0) {
        this.showBadge = true
      } else if (this.badgeNumber <= 0) {
        this.showBadge = false
      }
    },
    // This should eventually emit to the backend to delete the notification
    witnessNotification (notification) {
      notification.seen = true
      this.badgeNumber--
      this.badgeController()
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
    },
    populateNotificationMenu () {
      for (i = 0; i < this.notifications.length; i++) {
        this.notifications[i].message = this.generateMessage(this.notifications[i])

        if (this.notifications[i].seen === false) { // Used to flag if the message is new or not
          this.badgeNumber++
        }
      }
      this.badgeController()
    },
    // TODO: These could be more informative, maybe we should refactor the notifications to contain
    // more information? Maybe tell the user who performed the action they are being notified about, and when.
    // Also, these messages could be generated in the backend instead of here.
    generateMessage (notification) {
      var message
      if (notification.type === 'MadeCommitteeHead') {
        message = 'You have been made the head of a committee.'
      } else if (notification.type === 'AssignedToAction') {
        message = 'You have been assigned to an action.'
      } else if (notification.type === 'MentionedInNote') {
        message = 'You have been mentioned in a note.'
      } else if (notification.type === 'UserRequest') {
        message = 'A user has a request for you.'
      }
      return message
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
    // These notifications should be stored in a way that lets them be sorted by new and old
    // This would allow us to only show the user notifications that they haven't 'witnessed' yet
    // Otherwise they will be shown the same notifications every time
    get_notifications: function (data) {
      this.notifications = data
      for (i = 0; i < this.notifications.length; i++) {
        this.notifications[i].seen = false // initialize new notifications as unseen
      }
      this.populateNotificationMenu()
    }
  },
  beforeMount () {
    this.checkAuth().then((token) => {
      this.$socket.emit('get_notifications', {
        token: token
      })
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
  padding: 10px 12px 10px 12px; 
  font-size: 16px; 
  margin-left: 18px;
  cursor: pointer; 
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
  padding-top: 8px;
  margin-top: 5px;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 20vw;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Show the dropdown menu (use JS to add this class to the .dropdown-content container when the user clicks on the dropdown button) */
.show {
  display:block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.badge{
  position: absolute;
  background: rgb(212, 0, 0);
  height:2rem;
  bottom:.6rem;
  left:3rem;
  width:1.75rem;
  text-align: center;
  line-height: 2rem;;
  font-size: 20px;
  border-radius: 50%;
  color:white;
}

.notification {
  cursor: pointer;
}
</style>
