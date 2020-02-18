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
                <input class="input" type="text" :value="[[this.charge.title]]" @change="updateProp('title', $event)">
              </div>
            </div>

            <div class="field">
              <label class="label">Purpose</label>
              <div class="control">
                <input class="input" type="text" :value="[[this.charge.description]]" @change="updateProp('description', $event)">
              </div>
            </div>

            <div class="field">
              <label class="label">Progress Note</label>
              <div class="control">
                <input class="input" type="text" :value="[[this.charge.progress]]" @change="updateProp('progress', $event)">
              </div>
            </div>

            <div class = "field">
              <label class="label">Status</label>
              <div class="select">
                <select v-model="charge.status" @change="updateProp('status', $event)">
                  <option selected disabled>Select an Option</option>
                  <option value="0">Unapproved</option>
                  <option value="1">Failed</option>
                  <option value="2">InProgress</option>
                  <option value="3">Indefinite</option>
                  <option value="4">Unknown</option>
                  <option value="5">Completed</option>
                  <option value="6">NotStarted</option>
                  <option value="7">Stopped</option>
                </select>
              </div>
            </div>

            <div class="field">
              <label class="label">PawPrints Link</label>
                <div class="control">
                  <input class="input" type="text" :value="[[this.charge.paw_links]]" @change="updateProp('paw_links', $event)">
                </div>
            </div>

            <div class="field">
              <label class="label">Change Committee</label>
                <div class="control">
                  <input class="input" type="text" :value="[[this.charge.committee]]" @change="updateProp('committee', $event)">
                </div>
            </div>

            <div class="field" style="display: inline-flex;">
              <label class="container label">Public  
                <input type="radio" class="is-primary" v-model="charge.private" :value="false" @change="updateProp('private', $event)">
                <span class="radio is-primary"></span>
              </label>

              <label class="container label" style="margin-left: 25px;">Private  
                <input type="radio" class="is-primary" v-model="charge.private" :value="true" @change="updateProp('private', $event)">
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
import { mapGetters } from 'vuex'

export default {
  name: 'charge-admin',
  mixins: [Auth],
  props: ['charge'],
  data () {
    return {
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
    editCharge () {
      this.$socket.emit('edit_charge', {
        token: this.getToken(),
        charge: this.charge.id, // The user cannot edit this field
        title: this.charge.title,
        description: this.charge.description,
        committee: this.charge.committee,
        status: this.charge.status,
        paw_links: this.charge.paw_links,
        private: this.charge.private
      })
    },
    closeCharge () {
      if (this.admin) {
        this.$socket.emit('edit_charge', {
          token: this.getToken(),
          title: this.charge.title,
          charge: this.charge.id,
          status: 5 // This status saves the charge as closed
        })
      } else {
        console.log('did this even work...')
        this.$socket.emit('close', {
          subtype: 'A test',
          title: 'Mic Check',
          sender: ['Me', 'ep5756@rit.edu'],
          recipients: ['elijah.parrish321@gmail.com'],
          html: '<h1>Hello World!</h1>'
        })
      }
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
      this.showEditModal = true
    },
    // Dynamically emits updates to the parent component, updating the prop as the user types
    updateProp (field, event) {
      this.updateValue = event.target.value
      if (field === 'private') {
        this.convertPrivateToString(event)
      } else if (field === 'status') {
        this.convertStatusToInt(event)
      }
      this.$emit('updateCharge', Object.assign({}, this.charge, {[field]: this.updateValue}))
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
  computed: {
    ...mapGetters({
      admin: 'admin'
    })
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

  .field {
    padding-right: 20px;
  }
</style>
