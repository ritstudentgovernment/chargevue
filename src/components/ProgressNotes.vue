<!--

filename: ProgressNotes.vue
description: ProgressNotes

author: Eli Parrish <ep5756@rit.edu>

-->

<template>
  <div class="description">

      <div class="modal" :class="{ 'is-active': showNewNoteModal }">
        <div class="modal-background" @click="closeModals()"></div>
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
            <button class="button is-primary" @click="addNote()">Save note</button>
            <button class="button" @click="closeModals()">Cancel</button>
          </footer>
            <article class="message" v-if="editChargeResponse.show" :class="editChargeResponse.success ? 'is-success' : 'is-danger'">
              <div class="message-body">{{ editChargeResponse.message }}</div>
            </article>
        </div>
    </div>

    <div class="modal" :class="{ 'is-active': showEditNoteModal }">
        <div class="modal-background" @click="closeModals()"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Edit a progress note</p>
          </header>
          <section class="modal-card-body">

            <div class="field">
              <label class="label">Note</label>
              <div class="control">
                <input class="input" type="text" v-model="currentString">
              </div>
            </div>

          </section>
          <footer class="modal-card-foot">
            <button class="button is-primary" @click="editNote()">Save note</button>
            <button class="button" @click="closeModals()">Cancel</button>
          </footer>
            <article class="message" v-if="editChargeResponse.show" :class="editChargeResponse.success ? 'is-success' : 'is-danger'">
              <div class="message-body">{{ editChargeResponse.message }}</div>
            </article>
        </div>
    </div>

    <div class="modal" :class="{ 'is-active': showDeleteNoteModal }">
        <div class="modal-background" @click="closeModals()"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Are you sure you want to delete this progress note?</p>
          </header>
    
          <footer class="modal-card-foot">
            <button class="button is-primary" @click="deleteNote()">Delete note</button>
            <button class="button" @click="closeModals()">Cancel</button>
          </footer>
            <article class="message" v-if="editChargeResponse.show" :class="editChargeResponse.success ? 'is-success' : 'is-danger'">
              <div class="message-body">{{ editChargeResponse.message }}</div>
            </article>
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
        <li class="columns" v-for="value in charge.progress_notes" :key = value[2]>
          <div class="column note">
            <div>{{ value[0] }}</div>
          </div>
          <div class="column date">
            <div>{{ value[1] }}</div>
          </div>
          <div class="column">
            <button class="note_controls button is-primary" @click="openDeleteModal(value[2])">Delete</button>
            <button class="note_controls button is-primary" @click="openEditModal(value)">Edit</button>
          </div>
        </li>
    </div>
  </div>
</template>

<script>
import Auth from '../mixins/auth'
import { mapGetters } from 'vuex'

export default {
  name: 'progress_notes',
  props: ['charge'],
  mixins: [Auth],
  components: {},
  data () {
    return {
      committee: null,
      localNotes: {},
      newNote: '',
      currentString: null,
      noteToEdit: null,
      noteToDelete: null,
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
      this.$socket.emit('edit_charge', {
        token: this.getToken(),
        charge: this.charge.id,
        title: this.charge.title,
        add_note: {note: this.newNote, date: this.getFormattedDate()}
      })
    },
    deleteNote (noteId) {
      this.$socket.emit('edit_charge', {
        token: this.getToken(),
        charge: this.charge.id,
        title: this.charge.title,
        delete_note: {id: this.noteToDelete}
      })
    },
    editNote () {
      this.$socket.emit('edit_charge', {
        token: this.getToken(),
        charge: this.charge.id,
        title: this.charge.title,
        edit_note: {note: this.currentString, date: this.getFormattedDate(), id: this.noteToEdit}
      })
    },
    openAddModal () {
      this.showNewNoteModal = true
    },
    openEditModal (note) {
      this.localNotes = JSON.parse(JSON.stringify(this.charge.progress_notes))
      this.noteToEdit = note[2]
      this.currentString = (this.localNotes.find((element) => {
        return element[2] === note[2]
      }))[0]
      this.showEditNoteModal = true
    },
    openDeleteModal (noteId) {
      this.noteToDelete = noteId
      this.showDeleteNoteModal = true
    },
    getFormattedDate () {
      var date = new Date()
      var year = date.getFullYear()
      var month = (1 + date.getMonth()).toString()
      month = month.length > 1 ? month : '0' + month
      var day = date.getDate().toString()
      day = day.length > 1 ? day : '0' + day
      return month + '/' + day + '/' + year
    },
    closeModals () {
      this.showNewNoteModal = false
      this.showEditNoteModal = false
      this.showDeleteNoteModal = false
      this.editChargeResponse.show = false
      this.editChargeResponse.message = null
      this.editChargeResponse.success = null
      this.editChargeResponse.error = null
      this.newNote = ''
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
    },
    get_committee: function (data) {
      this.committee = data
    }
  },
  beforeMount () {
    this.$socket.emit('get_committee', this.charge.committee)
    // this.$socket.emit('get_committee', 'testing')
  },
  computed: {
    canAlterNotes () {
      return this.admin || (this.committee.head === this.username)
    },
    ...mapGetters([
      'taskId',
      'admin',
      'username'
    ])
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

  .note_controls {
    display: inline-block;
    float: right;
    margin: 2px;
  }

  .rows {
    display: flex;
    flex-direction: column;
  }

  .columns {
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
  }

  .note {
    display: inline-block;
    min-width: 50%;
    font-size: 1.25rem;
    color: #f36e21
  }

  .date {
    display: inline-block;
    text-align: center;
    font-size: 1rem;
  }

</style>
