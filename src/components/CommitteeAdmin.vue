<!--

filename: Purpose.vue
description: Tasks

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div>

    <div class="committee_admin">
      <div class="title">Committee Controls</div>
      <div class="divider"></div>
      <div class="content"><button class="button is-primary" @click="openAddNewCharge()">Create Charge</button></div>
    </div>

    <div class="modal" v-bind:class="{ 'is-active': showAddNewCharge}">
      <div class="modal-background" @click="closeAddNewCharge()"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Create Charge</p>
        </header>
        <section class="modal-card-body" @keyup.enter="createNewCharge()">
          <article class="message" v-if="createChargeResponse.show" v-bind:class="createChargeResponse.success ? 'is-success' : 'is-danger'">
            <div class="message-body">{{ createChargeResponse.message }}</div>
          </article>
          <div class="field">
            <label class="label">Title</label>
            <div class="control">
              <input class="input" type="text" placeholder="Title" v-model="createChargeTitle">
            </div>
          </div>

          <div class="field">
            <label class="label">Description</label>
            <div class="control">
              <input class="input" type="text" placeholder="Description" v-model="createChargeDescription">
            </div>
          </div>

          <label class="label">Priority</label>
            <div class="field">
              <div class="control">
                <div class="select">
                  <select v-model="createChargePriority">
                    <option value="0">Low</option>
                    <option value="1">Medium</option>
                    <option value="2">High</option>
                  </select>
                </div>
              </div>
            </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-primary" @click="createNewCharge()">Create</button>
          <button class="button" @click="closeAddNewCharge()">Cancel</button>
        </footer>
      </div>
    </div>

  </div>
</template>

<script>
  import Auth from '../mixins/auth'

  export default {
    name: 'committee-admin',
    components: {},
    mixins: [Auth],
    props: ['committee'],
    data () {
      return {
        showAddNewCharge: false,
        createChargeTitle: null,
        createChargePriority: null,
        createChargeDescription: null,
        createChargeResponse: {
          show: false,
          message: null,
          success: null
        }
      }
    },
    methods: {
      openAddNewCharge () {
        this.showAddNewCharge = true
      },
      closeAddNewCharge () {
        this.createChargeTitle = null
        this.createChargeDescription = null
        this.createChargePriority = null
        this.showAddNewCharge = false
        this.createChargeResponse.show = false
        this.createChargeResponse.message = null
        this.createChargeResponse.success = null
      },
      createNewCharge () {
        this.$socket.emit('create_charge', {
          token: this.getToken(),
          title: this.createChargeTitle,
          committee: this.committee.id,
          priority: parseInt(this.createChargePriority),
          description: this.createChargeDescription
        })
      }
    },
    sockets: {
      create_charge: function (data) {
        if (data.success) {
          this.createChargeResponse.show = true
          this.createChargeResponse.success = true
          this.createChargeResponse.message = data.success
        } else if (data.error) {
          this.createChargeResponse.show = true
          this.createChargeResponse.success = false
          this.createChargeResponse.message = data.error
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
