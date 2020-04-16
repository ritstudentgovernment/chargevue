<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Promote user to admin status</p>
      </header>
      <section class="modal-card-body" @keyup.enter="promoteUser">
        <article class="message" v-if="promoteUserResponse.show" :class="promoteUserResponse.success ? 'is-success' : 'is-danger'">
          <div class="message-body">{{ promoteUserResponse.message }}</div>
        </article>

        <div class="field">
          <label class="label">User to promote</label>
            <div class="control">
              <input class="input" type="text" placeholder="Enter a username here" v-model="userToPromote">
            </div>
        </div>

      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary" @click="promoteUser">Promote User</button>
        <button class="button" @click="closeModal">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import Auth from '../mixins/auth'

export default {
  name: 'PromoteUserModal',
  mixins: [Auth],
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
      // Update the user's status in the BE
      this.$socket.emit('edit_roles', {
        token: this.getToken(),
        username: this.userToPromote,
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

<style scoped>

  .input {
    padding-right: 20px;
  }

</style>