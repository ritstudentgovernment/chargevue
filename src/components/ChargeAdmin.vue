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
              <label class="label">Description</label>
              <div class="control">
                <input class="input" type="text" :value="[[this.charge.description]]" @change="updateProp('description', $event)">
              </div>
            </div>

            <div class="field">
              <label class="label">PawPrints Link</label>
                <div class="control">
                  <input class="input" type="text" :value="[[this.charge.paw_links]]" @change="updateProp('pawlink', $event)">
                </div>
            </div>

            <div class="field">
              <label class="label">Committee</label>
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
        // TODO status and priority, dead code?
        private: this.charge.private
      })
    },
    closeCharge () {
      this.$socket.emit('edit_charge', {
        token: this.getToken(),
        title: this.charge.title,
        charge: this.charge.id,
        status: 5 // This status saves the charge as closed
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
      this.showEditModal = true
    },
    // Dynamically emits updates to the parent component, updating the prop as the user types
    updateProp (field, event) {
      this.updateValue = event.target.value
      if (field === 'private') {
        if (event.target.value === 'true') {
          this.updateValue = true
        } else { // 'false'
          this.updateValue = false
        }
      }
      this.$emit('updateCharge', Object.assign({}, this.charge, {[field]: this.updateValue}))
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
