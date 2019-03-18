<!--

filename: Invitation.vue
description: Page for committee invitations

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div>
    <HeaderMenu />
    <div class="invitation-content" v-show="!noinvite">
      <div class="invitation-intro">
        <h3 class="title is-3">You have been invited!</h3>
        <p>Welcome <strong>{{invitee}}</strong>! You have been invited to join <strong>{{committee}}</strong> by <strong>{{inviter}}</strong>! Since you haven't logged onto TigerTracker before, you can accept or decline the invitation here.</p>
      </div>
      <div class="columns">
        <div class="column">
          <div class="accept" @click="showLoginForm = true"><strong>Accept Invitation</strong></div>
        </div>
        <div class="column">
          <div class="decline" @click="sendHome()"><strong>Decline Invitation</strong></div>
        </div>
      </div>
    </div>

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

    <div v-show="noinvite">
      <div class="invitation-content">
        <div class="invitation-intro">
          <h3 class="title is-3">No Invitation Found</h3>
          <p>Sorry, no invitation was found at this URL. If you believe this is an error, please contact the Student Government Services Team</p>
        </div>
        <div class="columns">
          <div class="column">
            <div class="info" @click="sendHome()"><strong>Return Home</strong></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import HeaderMenu from '../components/HeaderMenu'
  import Auth from '../mixins/auth'

  export default {
    name: 'invitations',
    mixins: [Auth],
    components: {
      'HeaderMenu': HeaderMenu
    },
    data () {
      return {
        committee: null,
        inviter: null,
        invitee: null,
        noinvite: false,
        showLoginForm: false,
        showLoginLoading: false,
        showAuthError: false,
        username: '',
        password: ''
      }
    },
    methods: {
      submitLogin () {
        this.showAuthError = false
        this.showLoginLoading = true
        this.login(this.username, this.password).then(() => {
          this.showAuthError = false
          this.showLoginForm = false
          this.showLoginLoading = false
          this.authenticated = true
          this.acceptInvite()
        }).catch(() => {
          this.showLoginLoading = false
          this.showAuthError = true
        })
      },
      sendHome () {
        this.$router.push({path: '/'})
      },
      acceptInvite () {
        this.$socket.emit('set_invitation', {
          token: this.getToken(),
          invitation_id: this.$router.history.current.params['id'],
          status: true
        })
      }
    },
    beforeMount () {
      let token = localStorage.getItem('token')
      this.$socket.emit('get_invitation', {
        invitation_id: this.$router.history.current.params['id'],
        token: token
      })
    },
    sockets: {
      get_invitation: function (data) {
        if (data.error) {
          this.noinvite = true
        } else {
          this.committee = data.committee_title
          this.inviter = data.committee_head
          this.invitee = data.invite_user
        }
      },
      set_invitation: function (data) {
        if (data.error) {
        } else {
          this.$router.push({path: '/committee/' + this.committee})
        }
      }
    }
  }
</script>

<style scoped>
  .invitation-content {
    width: 60%;
    margin: 20px auto 0 auto;
  }

  .invitation-intro {
    background: #fff;
    padding: 20px;
  }

  .columns {
    text-align: center;
  }

  .accept, .decline, .info{
    padding: 40px 0 40px 0;
    margin-top: 20px;
  }

  .accept {
    background-color: hsl(141, 71%, 48%);
  }

  .decline {
    background-color: hsl(348, 100%, 61%);
  }

  .info {
    background-color: hsl(208, 100%, 65%);
  }
</style>
