<!--

filename: Tasks.vue
description: Tasks

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div class="tasks">
    <div class="tasks_header">
      <div class="columns">
        <div class="column">
          <div class="tasks_title">Tasks</div>
        </div>
        <div class="column">
          <div class="tasks_button" @click="showAddTaskForm = true">New</div>
        </div>
      </div>
      <div class="taskbar">
        <span class="icon" v-bind:class="{ 'active_task': active_task === 0 }" v-on:click="makeActive(0)"><i class="mdi mdi-play-circle-outline" v-bind:class="{ 'in-progress': active_task === 0 }"></i> {{ tasks.filter(task => task.status == 0).length }} In Progress</span>
        <span class="icon" v-bind:class="{ 'active_task': active_task === 1 }" v-on:click="makeActive(1)"><i class="mdi mdi-minus-circle-outline" v-bind:class="{ 'stop': active_task === 1 }"></i> {{ tasks.filter(task => task.status == 1).length }} Stopped</span>
        <span class="icon" v-bind:class="{ 'active_task': active_task === 2 }" v-on:click="makeActive(2)"><i class="mdi mdi-checkbox-marked-circle-outline" v-bind:class="{ 'complete': active_task === 2 }"></i> {{ tasks.filter(task => task.status == 2).length }} Completed</span>
        <span class="icon" v-bind:class="{ 'active_task': active_task === 3 }" v-on:click="makeActive(3)"><i class="mdi mdi-pause-circle-outline" v-bind:class="{ 'on-hold': active_task === 3 }"></i> {{ tasks.filter(task => task.status == 3).length }} On Hold</span>
        <span class="icon" v-bind:class="{ 'active_task': active_task === 4 }" v-on:click="makeActive(4)"><i class="mdi mdi-information-outline" v-bind:class="{ 'indefinite': active_task === 4 }"></i> {{ tasks.filter(task => task.status == 4).length }} Indefinite</span>
      </div>
    </div>

    <Task v-for="task in filteredTasks" :key="task.id" v-bind:task="task"/>

    <div class="add-task modal" v-bind:class="{ 'is-active': showAddTaskForm }">
      <div class="modal-background" @click="showAddTaskForm = false"></div>
      <div class="modal-content">
        <div class="box">
          <div class="field">
            <label class="label">Task Name</label>
            <div class="control">
              <input class="input" type="text" placeholder="Task Name" v-model="createTaskData.title">
            </div>
          </div>

          <div class="field">
            <label class="label">Assignee</label>
            <div class="control">
              <input class="input" type="text" placeholder="Assignee" v-model="createTaskData.assignee">
            </div>
          </div>

          <div class="field">
            <label class="label">Task Description</label>
            <div class="control">
              <textarea class="textarea" placeholder="Purpose and description of this task..." v-model="createTaskData.description"></textarea>
            </div>
          </div>

          <button class="button is-primary" @click="createTask()">Create Task</button>
        </div>
      </div>
      <button class="modal-close is-large" @click="showAddTaskForm = false"></button>
    </div>
  </div>
</template>

<script>
  import Task from './Task'
  import Auth from '../mixins/auth'

  export default {
    name: 'tasks',
    mixins: [Auth],
    props: ['tasks'],
    components: {
      'Task': Task
    },
    data () {
      return {
        showAddTaskForm: false,
        active_task: 0,
        createTaskData: {
          title: '',
          description: '',
          assignee: ''
        }
      }
    },
    methods: {
      createTask () {
        this.$socket.emit('create_action', {
          token: this.getToken(),
          charge: this.$router.history.current.params['charge'],
          assigned_to: this.createTaskData.assignee,
          title: this.createTaskData.title,
          description: this.createTaskData.description
        })
      },
      makeActive (status) {
        this.active_task = status
      }
    },
    sockets: {
      create_action: function (data) {
        console.log('CREATED ACTION: ', data)
      }
    },
    computed: {
      filteredTasks: function () {
        return this.tasks.filter(task => task.status === this.active_task)
      }
    }
  }
</script>

<style scoped>
  @import "../../node_modules/mdi/css/materialdesignicons.css";

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

  html, body {
    overflow: hidden !important;
  }

  .add-task {
    z-index: 1000;
  }

  .control {
    padding-right: 20px;
  }

  .tasks {
    background-color: #fff;
    width: 70%;
    margin: 50px auto 0 auto;
  }

  .tasks_header {
    border: 1px solid #ddd;
  }

  .tasks_title {
    text-align: left;
    font-size: 18pt;
    padding: 10px;
  }

  .tasks_button {
    text-align: right;
    font-size: 14pt;
    color: #555;
    padding: 10px;
    text-decoration: underline;
  }

  .columns, .column {
    padding: 0;
    margin: 0;
  }

  .taskbar {
    background-color: #eee;
    border-top: 1px solid #ddd;
    padding: 10px;
  }

  .taskbar .icon {
    padding-left: 15px;
    color: #888;
  }

  .active_task {
    color: #000 !important;
  }

  .modal-content {
    width: 60%;
  }
</style>
