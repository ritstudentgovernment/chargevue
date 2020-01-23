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

    <div class="modal" v-bind:class="{ 'is-active': showEditModal }">
        <div class="modal-background" v-on:click="closeEditModal()"></div>
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

            <div class="field">
              <label class="container label"> Make this charge public?  
                <input type="checkbox" class="is-primary" autocomplete="off" :checked="[[this.charge.private]]" @change="updateProp('private', $event)">
                <span class="checkmark is-primary"></span>
              </label>
            </div>

          </section>
          <footer class="modal-card-foot">
            <button class="button is-primary" v-on:click="editCharge()">Confirm Edit</button>
            <button class="button" v-on:click="closeEditModal()">Cancel</button>
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
      newTitle: null,
      newDescription: null,
      newCommittee: null,
      newPawlink: null,
      newPrivate: null,
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
        charge: this.charge.id,
        status: 5 // This status saves the charge as closed
      })
    },
    closeConfirmModal () {
      this.showConfirmModal = false
      this.editChargeResponse.show = false
      this.editChargeResponse.message = null
      this.editChargeResponse.success = null
    },
    closeEditModal () {
      this.showEditModal = false
    },
    openConfirmModal () {
      this.showConfirmModal = true
    },
    openEditModal () {
      this.showEditModal = true
    },
    // Stores the incoming prop locally
    onProp (charge) {
      this.localCharge = charge
    },
    // Dynamically updates the new prop as the user types
    updateProp (field, event) {
      if (field === 'title') {
        this.charge.title = event.target.value
      } else if (field === 'description') {
        this.charge.description = event.target.value
      } else if (field === 'pawlink') {
        this.charge.paw_link = event.target.value
      } else if (field === 'committee') {
        this.charge.committee = event.target.value
      } else {
        this.charge.private = !(event.target.checked) // TODO this will be changed once this is made a radio selector
      }
    }
  },
  mounted () {
    this.onProp(this.charge)
    this.$watch('charge', this.onProp)
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
