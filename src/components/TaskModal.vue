<template>
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
    <button class="modal-close is-large" @click="clearTaskModal"></button>
  </div>
</template>

<script>
export default {
    name: 'TaskModal',
    props: {
        task: {
            type: Object,
            required: true
        }
    },

}
</script>