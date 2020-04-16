<template>
  <div class="modal is-active">
    <div class='modal-background' v-on:click="closeModal()"></div>
    <div class='modal-card'>
      <header class='modal-card-head'>
        <p class='modal-card-title'>Create new admin user</p>
      </header>
      <section class='modal-card-body' @keyup.enter="addAdmin()">
        <article
          class='message'
          v-if="addAdminResponse.show"
          v-bind:class="addAdminResponse.success ? 'is-success' : 'is-danger'">
          <div class='message-body'>{{ addAdminResponse.message }}</div>
        </article>

        <div class='field'>
          <label class='label'>Username</label>
          <div class='control'>
            <input
              class='input'
              type='text'
              placeholder='RIT email ID'
              maxlength='255'
              v-model="userId"
            />
          </div>
        </div>

        <div class='field'>
          <label class='label'>First Name</label>
          <div class='control'>
            <input
              class='input'
              type='text'
              placeholder='First Name'
              maxlength='255'
              v-model="userFirstName"
            />
          </div>
        </div>

        <div class='field'>
          <label class='label'>Last Name</label>
          <div class='control'>
            <input
              class='input'
              type='text'
              placeholder='Last Name'
              maxlength='255'
              v-model="userLastName"
            />
          </div>
        </div>

        <div class='field'>
          <label class='label'>email</label>
          <div class='control'>
            <input
              class='input'
              type='text'
              placeholder='Email'
              maxlength='255'
              v-model="userEmail"
            />
          </div>
        </div>
      </section>
      <footer class='modal-card-foot'>
        <button class='button is-primary' v-on:click="addAdmin()">Add Admin</button>
        <button class='button' v-on:click="closeModal()">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import Auth from '../mixins/auth'

export default {
  name: 'AddAdminModal',
  mixins: [Auth],
  data () {
    return {
      userId: null,
      userFirstName: null,
      userLastName: null,
      userEmail: null,
      addAdminResponse: {
        show: false,
        message: null,
        success: null
      }
    }
  },
  methods: {
    closeModal () {
      this.addAdminResponse.show = false
      this.addAdminResponse.message = null
      this.addAdminResponse.success = null
      this.$emit('closeModal')
    },
    addAdmin () {
      this.$socket.emit('add_user', {
        token: this.getToken(),
        id: this.userId,
        first_name: this.userFirstName,
        last_name: this.userLastName,
        email: this.userEmail,
        is_admin: true
      })
    }
  },
  sockets: {
    add_user: function (data) {
      if (data.success) {
        this.addAdminResponse.show = true
        this.addAdminResponse.success = true
        this.addAdminResponse.message = data.success
        var that = this
        setTimeout(function () {
          that.closeModal()
        }, 2000)
      } else if (data.error) {
        this.addAdminResponse.show = true
        this.addAdminResponse.success = false
        this.addAdminResponse.message = data.error
      }
    }
  }
}
</script>

<style scoped>
.modal-card {
  overflow: visible;
}
.modal-card-body {
  overflow: visible;
}
.vue-simple-suggest.designed .input-wrapper input {
  font-display: "Montserrat", Helvetica, Arial, sans-serif !important;
  font-size: 1rem !important;
}

.vue-simple-suggest.designed .suggestions {
  max-height: 200px;
  overflow-y: auto;
}

.select {
  margin-bottom: 10%;
}
</style>
