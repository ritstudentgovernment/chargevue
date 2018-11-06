<!--

filename: Task.vue
description: Tasks

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div class="task">
    <div @click="active = true">
      <div><h3 class="title is-3">{{task.title}}</h3></div>
      <div class="taskList">
        <p>{{task.description}}</p>
      </div>

      <p class="updates-header">Notes ({{task.notes ? task.notes.length : 0}})</p>
      <div class="update" v-for="note in recentNotes" :key="note.id">
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
    </div>

    <div class="task modal" v-bind:class="{ 'is-active': active }">
      <div class="modal-background" @click="active = false"></div>
        <div class="modal-content">
          <div class="box">
            <article class="message" v-if="createNoteResponseStatus" v-bind:class="createNoteResponseStatus === 'success' ? 'is-success' : 'is-danger'">
              <div class="message-body">{{ createNoteResponseMessage }}</div>
            </article>
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

          <div class="modalForm">
            <div class="field">
              <div class="control">
                <textarea class="textarea" placeholder="Write a comment or update..." v-model="createNoteText"></textarea>
              </div>
            </div>
            <div class="field">
              <button class="button is-primary" id="submitCommentButton" v-on:click="createNote()">Submit Comment</button>
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
        </div>
      </div>
      <button class="modal-close is-large" @click="active = false"></button>
    </div>
  </div>
</template>

<script>
  import Auth from '../mixins/auth'

  export default {
    name: 'tasks',
    components: {},
    props: ['task'],
    mixins: [Auth],
    data () {
      return {
        active: false,
        style: '',
        icon: '',
        id: null,
        status: -1,
        createNoteText: '',
        createNoteResponseStatus: '',
        createNoteResponseMessage: ''
      }
    },
    sockets: {
      create_note: function (data) {
        if (data.error) {
          this.createNoteResponseStatus = 'error'
          this.createNoteResponseMessage = data.error
        } else {
          this.createNoteText = ''
        }
      },
      edit_action: function (data) {
        if (data.error) {
          this.createNoteResponseStatus = 'error'
          this.createNoteResponseMessage = data.error
        }
      }
    },
    methods: {
      createNote () {
        this.$socket.emit('create_note', {
          token: this.getToken(),
          action: this.task.id,
          description: this.createNoteText
        })
      },
      changeStatus () {
        this.$socket.emit('edit_action', {
          token: this.getToken(),
          id: this.task.id,
          status: this.status
        })
      }
    },
    computed: {
      recentNotes: function () {
        if (this.task.notes) {
          return this.task.notes.slice(this.task.notes.length - 2, this.task.notes.length)
        } else {
          return []
        }
      }
    },
    beforeMount () {
      this.status = this.task.status
      switch (this.task.status) {
        case 0:
          this.style = 'in-progress'
          this.icon = 'mdi-play-circle-outline'
          break
        case 1:
          this.style = 'stop'
          this.icon = 'mdi-minus-circle-outline'
          break
        case 2:
          this.style = 'complete'
          this.icon = 'mdi-checkbox-marked-circle-outline'
          break
        case 3:
          this.style = 'on-hold'
          this.icon = 'mdi-pause-circle-outline'
          break
        case 4:
          this.style = 'indefinite'
          this.icon = 'mdi-information-outline'
          break
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

  /* Thumbnail styles */
  .task {
    padding: 10px;
    font-size: 14pt;
    border-bottom: 10px solid #eee;
    cursor: pointer;
  }

  .thumbnail {
    padding-left: 15px;
  }

  h3 {
    margin-top: 0;
  }

  .subtitle {
    padding-left: 40px;
    color: #7f7f7f;
    font-size: 10pt;
  }

  /* Modal styles */
  .modalForm {
    padding-right: 20px;
  }

  .modal {
    z-index: 100000;
  }

  .modal-content {
    width: 60%;
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
