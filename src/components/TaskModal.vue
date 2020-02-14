<template>
  <modal
    :response-message="createNoteResponse.message"
    :response-success="createNoteResponse.success"
    :show-modal="showModal"
    @close-modal="hide"
  >
    <div class="modal-header">
      <span class="icon"><i class="mdi header-icon" v-bind:class="[style, icon]"></i></span>
      <span class="modal-titles">
        <span class="modal-title">{{task.title}}</span><br />
        <span class="modal-subtitle">Assigned to <span class="link">{{task.assigned_to}}</span></span>
      </span>
    </div>
    <p>{{task.description}}</p>
    <p class="updates-header">Updates ({{task.notes ? task.notes.length : 0}})</p>

    <div class="update" v-for="note in task.notes" :key="note.id">
      <div class="update-image">
        <img src="../assets/avatar.png" />
      </div>
      <div class="update-body">
        <div class="update-header">
          <span class="update-name">{{note.author}}</span>
          <span class="update-timestamp">Posted on {{note.created_at}}</span>
        </div>
        <p class="update-body-text">{{note.description}}</p>
      </div>
    </div>

    <div class="modal-form">
      <div class="field">
        <div class="control">
          <textarea class="textarea" placeholder="Write a comment or update..." v-model="noteText"></textarea>
        </div>
      </div>
      <div class="field">
        <button class="button is-primary" id="submitCommentButton" @click="createNote">Submit Comment</button>
      </div>
      <p class="updates-header">Admin</p>
      <div class="field">
        <div class="field has-addons">
          <div class="control">
            <div class="select">
              <select name="country" v-model="status">
                <option value="0" selected>In Progress</option>
                <option value="1">Stopped</option>
                <option value="2">Complete</option>
                <option value="3">On Hold</option>
                <option value="4">Indefinite</option>
              </select>
            </div>
          </div>
          <div class="control">
            <button type="button" class="button is-primary" v-on:click="changeStatus()">Change Status</button>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from './Modal'
import Auth from '../mixins/auth'

export default {
  name: 'TaskModal',
  components: {
    Modal
  },
  mixins: [Auth],
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      noteText: '',
      status: this.task.status,
      showModal: false,
      createNoteResponse: {
        success: true,
        message: ''
      }
    }
  },
  computed: {
    style () {
      switch (this.task.status) {
        case 0:
          return 'in-progress'
        case 1:
          return 'stop'
        case 2:
          return 'complete'
        case 3:
          return 'on-hold'
        case 4:
        default:
          return 'indefinite'
      }
    },
    icon () {
      switch (this.task.status) {
        case 0:
          return 'mdi-play-circle-outline'
        case 1:
          return 'mdi-minus-circle-outline'
        case 2:
          return 'mdi-minus-circle-outline'
        case 3:
          return 'mdi-pause-circle-outline'
        case 4:
        default:
          return 'mdi-information-outline'
      }
    }
  },
  methods: {
    createNote () {
      this.$socket.emit('create_note', {
        token: this.getToken(),
        action: this.task.id,
        description: this.noteText
      })
    },
    changeStatus () {
      this.$socket.emit('edit_action', {
        token: this.getToken(),
        id: this.task.id,
        status: this.status
      })
    },
    hide () {
      this.createNoteResponse.success = true
      this.createNoteResponse.message = ''
      this.noteText = ''
      this.status = null
      this.showModal = false
    },
    show () {
      this.showModal = true
    }
  },
  sockets: {
    create_note: function (data) {
      if (data.success) {
        this.createNoteResponse.success = true
        this.createNoteResponse.message = data.success
        setTimeout(() => { this.hide() }, 2000)
      }
      if (data.error) {
        this.createNoteResponse.success = false
        this.createNoteResponse.message = data.error
      } else {
        this.noteText = ''
      }
    },
    edit_action: function (data) {
      if (data.error) {
        this.createNoteResponse.success = false
        this.createNoteResponse.message = data.error
      }
    }
  }
}
</script>

<style scoped>
  /* Statuses for icons */
  .in-progress {
    color: #d6b829;
  }

  .stop {
    color: #f00;
  }

  .complete {
    color: #088512;
  }

  .on-hold {
    color: #ff8720;
  }

  .indefinite {
    color: #4f86ff;
  }

  /* Modal styles */
  .modal-form {
    padding-right: 20px;
  }

  .modal-header {
    overflow: hidden;
  }

  .header-icon {
    float: left;
    font-size: 28pt;
    vertical-align: middle;
  }

  .modal-titles {
    float: left;
    padding-left: 10px;
  }

  .modal-title {
    font-size: 16pt;
  }

  .modal-subtitle {
    color: #7f7f7f;
  }

  .updates-header {
    font-weight: 700;
  }

  .link {
    text-decoration: underline;
  }

  #submitCommentButton {
    margin-right: 20px;
  }

  .update {
    overflow: hidden;
    padding-left: 10px;
    padding-bottom: 10px;
  }

  .update-image {
    float: left;
  }

  .update-body {
    padding-left: 20px;
    padding-bottom: 10px;
    overflow:hidden;
    word-wrap: break-word;
    float:none
  }

  .update-body-text {
    font-size: 11pt;
  }

  .update-header {
    line-height: 16pt;
  }

  .update-name {
    font-size: 16pt;
  }

  .update-timestamp {
    vertical-align: top;
    font-size: 10pt;
    text-decoration: underline;
  }

  .update-image img {
    height: 65px;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border: 1px solid #404040;
  }
</style>
