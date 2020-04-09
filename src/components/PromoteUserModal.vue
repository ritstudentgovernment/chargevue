<template>
  <div class="modal is-active">
    <div class="modal-background" v-on:click="closeModal()"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Promote user to admin status</p>
      </header>
      <section class="modal-card-body" @keyup.enter="promoteUser()">
        <article class="message" v-if="promoteUserResponse.show" v-bind:class="promoteUserResponse.success ? 'is-success' : 'is-danger'">
          <div class="message-body">{{ promoteUserResponse.message }}</div>
        </article>

        <div class="field" v-show="showPromoteUserDropdown">
          <label class="label">User to promote</label>
          <div class="control">
            <div class="select" v-bind:class="{ 'is-loading': showPromoteUserDropdownLoading }">
              <select v-model="userToPromote">
                <option selected disabled></option>
                <option v-for="user in users" :key="user.username" v-bind:value="user">
                    <span>{{user.username}}</span>
                    <span>{{'(' + user.name + ')'}}</span>
                    </option>
              </select>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary" v-on:click="promoteUser()">Promote User</button>
        <button class="button" v-on:click="closeModal()">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import Auth from '../mixins/auth'

export default {
  name: 'PromoteUserModal',
  mixins: [Auth],
  props: {users: Array},
  data () {
    return {
      userToPromote: null,
      showPromoteUserDropdown: true,
      showPromoteUserDropdownLoading: false,
      promoteUserResponse: {
        show: false,
        message: null,
        success: null
      }
    }
  },
  methods: {
    closeModal () {
      this.promoteUserResponse.show = false
      this.promoteUserResponse.message = null
      this.promoteUserResponse.success = null
      this.userToPromote = null
      this.$emit('closeModal')
    },
    promoteUser () {
      this.$socket.emit('edit_roles', {
        token: this.getToken(),
        username: this.userToPromote.username,
        role: 'AdminUser'
      })
    }
  },
  sockets: {
    edit_roles: function (data) {
      if (data.success) {
        this.promoteUserResponse.show = true
        this.promoteUserResponse.success = true
        this.promoteUserResponse.message = data.success
        setTimeout(() => { this.closeModal() }, 2000)
      } else if (data.error) {
        this.promoteUserResponse.show = true
        this.promoteUserResponse.success = false
        this.promoteUserResponse.message = data.error
      }
    }
  }
}
</script>
