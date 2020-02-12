<template>
  <div class="modal is-clipped" v-bind:class="{ 'is-active': showModal }">
    <div class="modal-background" v-on:click="$emit('closeDeleteModal')"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Are you sure you want to delete this notification?</p>
      </header>
      <footer class="modal-card-foot">
        <button class="button is-primary" v-on:click="deleteNotification()">Delete Notification</button>
        <button class="button" v-on:click="$emit('closeDeleteModal')">Cancel</button>
      </footer>
      <article class="message" v-if="deleteNotificationMessage.show" v-bind:class="deleteNotificationMessage.success ? 'is-success' : 'is-danger'">
        <div class="message-body">{{ deleteNotificationMessage.message }}</div>
      </article>
    </div>
  </div>
</template>

<script>
  import Auth from '../mixins/auth'
  export default {
    name: 'DeleteNotificationModal',
    mixins: [Auth],
    data () {
      return {
        showModal: true,
        deleteNotificationMessage: {
          show: false,
          message: null,
          success: null
        }
      }
    },
    methods: {
      deleteNotification () {
        this.deleteNotificationMessage.show = true
        this.deleteNotificationMessage.message = 'Notification Deleted'
        this.deleteNotificationMessage.success = true
        setTimeout(() => { this.$emit('deleteNotification') }, 2000)
      }
    }
  }
</script>

<style scoped>
  .modal-card{
    overflow: visible;
  }
  .modal-card-body{
    overflow: visible;
  }
  .vue-simple-suggest.designed .input-wrapper input{
    font-display: 'Montserrat', Helvetica, Arial, sans-serif !important;
    font-size: 1rem !important;
  }

  .select{
    margin-bottom: 10%;
  }
</style>