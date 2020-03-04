<!--

filename: Purpose.vue
description: Tasks

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div class="description">

      <div class="modal" v-bind:class="{ 'is-active': showNewNoteModal }">
        <div class="modal-background" v-on:click="closeModals()"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Add new progress note</p>
          </header>
          <section class="modal-card-body">

            <div class="field">
              <label class="label">Note</label>
              <div class="control">
                <input class="input" type="text" v-model="newNote">
              </div>
            </div>

          </section>
          <footer class="modal-card-foot">
            <button class="button is-primary" v-on:click="addNote()">Save note</button>
            <button class="button" v-on:click="closeModals()">Cancel</button>
          </footer>
        </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="description_title">Charge progress notes</div>
      </div>
      <div class="column">
        <button class="button is-primary" @click="openAddModal()">Add Note</button>
      </div>
    </div>
    <div class="divider"></div>
    <div class="rows">
        <li v-for="value in charge.progress_notes" v-bind:key = value>
            {{ value }}
        </li>
    </div>
  </div>
</template>

<script>
export default {
  name: 'progress_notes',
  props: ['charge'],
  components: {},
  data () {
    return {
      localCharge: {},
      newNote: '',
      showNewNoteModal: false,
      showEditNoteModal: false,
      showDeleteNoteModal: false,
      editChargeResponse: {
        show: false,
        message: null,
        success: null
      }
    }
  },
  methods: {
    addNote () {
      console.log(this.newNote)
      console.log(this.charge.progress_notes.length)
    },
    openAddModal () {
      console.log('gottem')
      this.showNewNoteModal = true
    },
    closeModals () {
      this.showNewNoteModal = false
      this.showEditNoteModal = false
      this.showDeleteNoteModal = false
    },
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
    }
  },
  sockets: {
    edit_charge: function (data) {
      this.handleChargeEdits(data)
      // Only update the prop if the edit was successful
      if (data.success) {
        this.$emit('updateCharge', this.localCharge)
      }
    }
  }
}
</script>

<style scoped>
  .description {
    background-color: #fff;
    border: 1px solid #ddd;
    width: 70%;
    margin: 25px auto 10px auto;
  }

  .description_title {
    text-align: left;
    font-size: 18pt;
  }

  .description_date {
    text-align: right;
    font-size: 14pt;
    color: #555;
  }

  .description_content {
    font-size: 13pt;
    padding: 20px;
  }

  .columns {
    padding: 0;
    margin: 0;
  }

  .divider {
    border-top: 1px solid #000;
  }

  .button {
      float: right;
  }

  .field {
      padding-right: 20px;
  }

</style>
