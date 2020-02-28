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
      <div class="content">
        <button class="button is-primary" @click="openConfirmModal()">Close Charge</button>
        <button class="button is-primary" @click="openEditModal()">Edit Charge</button>
      </div>
    </div>

    <div class="modal" v-bind:class="{ 'is-active': showConfirmModal }">
        <div class="modal-background" v-on:click="closeModals()"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Close Charge</p>
          </header>
          <section class="modal-card-body">
            <article class="message" v-if="editChargeResponse.show" v-bind:class="editChargeResponse.success ? 'is-success' : 'is-danger'">
              <div class="message-body">{{ editChargeResponse.message }}</div>
            </article>
            <p>Are you sure you want to close this charge?</p>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-primary" v-on:click="closeCharge()">Close Charge</button>
            <button class="button" v-on:click="closeModals()">Cancel</button>
          </footer>
        </div>
    </div>

    <div class="modal" v-bind:class="{ 'is-active': showEditModal }">
        <div class="modal-background" v-on:click="closeModals()"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Edit Charge</p>
          </header>
          <section class="modal-card-body">

            <article class="message" v-if="editChargeResponse.show" v-bind:class="editChargeResponse.success ? 'is-success' : 'is-danger'">
              <div class="message-body">{{ editChargeResponse.message }}</div>
            </article>

            <div class="field">
              <label class="label">Title</label>
              <div class="control">
                <input class="input" type="text" :value="[[this.charge.title]]" @change="updateCopy('title', $event)">
              </div>
            </div>

            <div class="field">
              <label class="label">Purpose</label>
              <div class="control">
                <input class="input" type="text" :value="[[this.charge.description]]" @change="updateCopy('description', $event)">
              </div>
            </div>

            <div class="field">
              <label class="label">Progress Note</label>
              <div class="control">
                <input class="input" type="text" :value="[[this.charge.progress]]" @change="updateCopy('progress', $event)">
              </div>
            </div>

            <div class = "field">
              <label class="label">Status</label>
              <div class="select">
                <select v-model="localCharge.status" @change="updateCopy('status', $event)">
                  <option selected disabled>Select an Option</option>
                  <option value="0">In Progress</option>
                  <option value="1">Completed</option>
                  <option value="2">Indefinite</option>
                </select>
              </div>
            </div>

            <div class="field">
              <label class="label">PawPrints Link</label>
                <div class="control">
                  <input class="input" type="text" :value="[[this.charge.paw_links]]" @change="updateCopy('paw_links', $event)">
                </div>
            </div>

            <div class="field">
              <label class="label">Change Committee</label>
                <div class="control">
                  <input class="input" type="text" :value="[[this.charge.committee]]" @change="updateCopy('committee', $event)">
                </div>
            </div>

            <div class="field" style="display: inline-flex;">
              <label class="container label">Public  
                <input type="radio" class="is-primary" v-model="localCharge.private" :value="false" @change="updateCopy('private', $event)">
                <span class="radio is-primary"></span>
              </label>

              <label class="container label" style="margin-left: 25px;">Private  
                <input type="radio" class="is-primary" v-model="localCharge.private" :value="true" @change="updateCopy('private', $event)">
                <span class="radio is-primary"></span>
              </label>
            </div>

          </section>
          <footer class="modal-card-foot">
            <button class="button is-primary" v-on:click="editCharge()">Confirm Edit</button>
            <button class="button" v-on:click="closeModals()">Cancel</button>
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
      localCharge: {},
      updateValue: null,
      showEditModal: false,
      showConfirmModal: false,
      editChargeResponse: {
        show: false,
        message: null,
        success: null
      }
    }
  },
  methods: {
    handleChargeEdits (data) {
      if (data.success) {
        this.editChargeResponse.show = true
        this.editChargeResponse.success = true
        this.editChargeResponse.message = data.success
        var that = this
        setTimeout(function () {
          that.closeModals()
        }, 2000)
      } else if (data.error) {
        this.editChargeResponse.show = true
        this.editChargeResponse.success = false
        this.editChargeResponse.message = data.error
      }
    },
    editCharge () {
      this.$socket.emit('edit_charge', {
        token: this.getToken(),
        charge: this.localCharge.id, // The user cannot edit this field
        title: this.localCharge.title,
        description: this.localCharge.description,
        committee: this.localCharge.committee,
        status: this.localCharge.status,
        paw_links: this.localCharge.paw_links,
        private: this.localCharge.private
      })
    },
    closeCharge () {
      this.$socket.emit('close_charge', {
        token: this.getToken(),
        charge: this.charge.id,
        committee_id: this.charge.committee,
        status: 5 // This status closes the charge
      })
    },
    closeModals () {
      this.showConfirmModal = false
      this.showEditModal = false
      this.editChargeResponse.show = false
      this.editChargeResponse.message = null
      this.editChargeResponse.success = null
    },
    openConfirmModal () {
      this.showConfirmModal = true
    },
    openEditModal () {
      this.localCharge = JSON.parse(JSON.stringify(this.charge))
      this.showEditModal = true
    },
    // Dynamically emits updates to the parent component, updating the prop as the user types
    updateCopy (field, event) {
      this.updateValue = event.target.value
      if (field === 'private') {
        this.convertPrivateToBool(event)
      } else if (field === 'status') {
        this.convertStatusToInt(event)
      }
      Object.assign(this.localCharge, {[field]: this.updateValue})
    },
    convertPrivateToBool (event) {
      if (event.target.value === 'true') {
        this.updateValue = true
      } else { // 'false'
        this.updateValue = false
      }
    },
    convertStatusToInt (event) {
      this.updateValue = parseInt(event.target.value)
    }
  },
  sockets: {
    edit_charge: function (data) {
      this.handleChargeEdits(data)
      // Only update the prop if the edit was successful
      if (data.success) {
        this.$emit('updateCharge', this.localCharge)
      }
    },
    close_charge: function (data) {
      this.handleChargeEdits(data)
      // If the user closes the charge or requests a close, then redirect
      if (data.success) {
        setTimeout(() => { this.$router.push('/committee/' + this.charge.committee) }, 2000)
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

  .field {
    padding-right: 20px;
  }
</style>
