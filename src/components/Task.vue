<!--

filename: Task.vue
description: Tasks

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div class="task">
    <div @click="taskClicked">
      <div><h3 class="title is-3">{{task.title}}</h3></div>
      <div>
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
  </div>
</template>

<script>
export default {
  name: 'task',
  props: ['task'],
  methods: {
    taskClicked () {
      this.$emit('task-clicked', this.task)
    }
  },
  computed: {
    recentNotes () {
      return this.task.notes ? this.task.notes.slice(this.task.notes.length - 2, this.task.notes.length) : []
    }
  }
}
</script>

<style scoped>
  /* Thumbnail styles */
  .task {
    padding: 10px;
    font-size: 14pt;
    border-bottom: 10px solid #eee;
    cursor: pointer;
  }

  h3 {
    margin-top: 0;
  }

  .updates-header {
    font-weight: 700;
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
