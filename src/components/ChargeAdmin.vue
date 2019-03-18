<!--

filename: Purpose.vue
description: Tasks

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div>
    <div class="committee_admin">
      <div class="title">Charge Controls</div>
      <div class="divider"></div>
      <div class="content"><button class="button is-primary" @click="openConfirmModal()">Close Charge</button></div>
    </div>

    <div class="modal" v-bind:class="{ 'is-active': showConfirmModal }">
        <div class="modal-background" v-on:click="closeConfirmModal()"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Close Charge</p>
          </header>
          <section class="modal-card-body">
            <article class="message" v-if="editChargeResponse.show" v-bind:class="editChargeResponse.success ? 'is-success' : 'is-danger'">
              <div class="message-body">{{ editChargeResponse.message }}</div>
            </article>
            <p>Are you sure you want to close this committee?</p>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-primary" v-on:click="closeCharge()">Close Charge</button>
            <button class="button" v-on:click="closeConfirmModal()">Cancel</button>
          </footer>
        </div>
    </div>
  </div>
</template>

<script>
  import Auth from '../mixins/auth'

  export default {
    name: 'charge-admin',
    mixins: [Auth],
    props: ['charge'],
    data () {
      return {
        showConfirmModal: false,
        editChargeResponse: {
          show: false,
          message: null,
          success: null
        }
      }
    },
    methods: {
      closeCharge () {
        this.$socket.emit('edit_charge', {
          token: this.getToken(),
          charge: this.charge.id,
          status: 5
        })
      },
      closeConfirmModal () {
        this.showConfirmModal = false
        this.editChargeResponse.show = false
        this.editChargeResponse.message = null
        this.editChargeResponse.success = null
      },
      openConfirmModal () {
        this.showConfirmModal = true
      }
    },
    sockets: {
      edit_charge: function (data) {
        if (data.success) {
          this.editChargeResponse.show = true
          this.editChargeResponse.success = true
          this.editChargeResponse.message = data.success
          var that = this
          setTimeout(function () {
            that.$router.push({path: '/committee/' + that.charge.committee})
          }, 2000)
        } else if (data.error) {
          this.editChargeResponse.show = true
          this.editChargeResponse.success = false
          this.editChargeResponse.message = data.error
        }
      }
    }
  }
  
</script>

<style scoped>
  .committee_admin {
    background-color: #fff;
    border: 1px solid #ddd;
    width: 70%;
    margin: 25px auto 10px auto;
  }

  .title {
    text-align: left;
    font-size: 18pt;
    margin: 10px;
    color: #000;
  }

  .divider {
    border-top: 1px solid #000;
  }

  .content {
    padding: 20px;
  }
</style>
