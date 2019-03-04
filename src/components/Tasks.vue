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
        <span class="icon" v-bind:class="{ 'active_task': active_task === 0 }" v-on:click="makeActive(0)"><i class="mdi mdi-play-circle-outline"></i> {{ tasks.filter(task => task.status == 0).length }} In Progress</span>
        <span class="icon" v-bind:class="{ 'active_task': active_task === 1 }" v-on:click="makeActive(1)"><i class="mdi mdi-minus-circle-outline"></i> {{ tasks.filter(task => task.status == 1).length }} Stopped</span>
        <span class="icon" v-bind:class="{ 'active_task': active_task === 2 }" v-on:click="makeActive(2)"><i class="mdi mdi-checkbox-marked-circle-outline"></i> {{ tasks.filter(task => task.status == 2).length }} Completed</span>
        <span class="icon" v-bind:class="{ 'active_task': active_task === 3 }" v-on:click="makeActive(3)"><i class="mdi mdi-pause-circle-outline"></i> {{ tasks.filter(task => task.status == 3).length }} On Hold</span>
        <span class="icon" v-bind:class="{ 'active_task': active_task === 4 }" v-on:click="makeActive(4)"><i class="mdi mdi-information-outline"></i> {{ tasks.filter(task => task.status == 4).length }} Indefinite</span>
      </div>
    </div>

    <Task v-for="task in filteredTasks" :key="task.id" v-bind:task="task"/>

    <div class="add-task modal" v-bind:class="{ 'is-active': showAddTaskForm }">
      <div class="modal-background" @click="clearTaskModal()"></div>
      <div class="modal-content">
        <div class="box">
          <article class="message" v-if="addTaskResponse.show" v-bind:class="addTaskResponse.success ? 'is-success' : 'is-danger'">
            <div class="message-body">{{ addTaskResponse.message }}</div>
          </article>
          <div class="field">
            <label class="label">Task Name</label>
            <div class="control">
              <input class="input" type="text" placeholder="Task Name" v-model="createTaskData.title">
            </div>
          </div>

          <div class="field">
            <label class="label">Assignee</label>
            <div class="control">
              <vue-simple-suggest
                v-model="createTaskData.assignee"
                :list="memberSuggestions"
                :filter-by-query="true"
                :max-suggestions="5"
                :min-length="0">
              </vue-simple-suggest>
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
      <button class="modal-close is-large" @click="clearTaskModal"></button>
    </div>
  </div>
</template>

<script>
  import Task from './Task'
  import Auth from '../mixins/auth'
  import VueSimpleSuggest from 'vue-simple-suggest'
  import 'vue-simple-suggest/dist/styles.css'
  export default {
    name: 'tasks',
    mixins: [Auth],
    props: ['tasks', 'committee'],
    components: {
      'Task': Task,
      'VueSimpleSuggest': VueSimpleSuggest
    },
    data () {
      return {
        showAddTaskForm: false,
        active_task: 0,
        createTaskData: {
          title: '',
          description: '',
          assignee: ''
        },
        addTaskResponse: {
          show: false,
          success: null,
          message: null
        },
        members: [],
        memberSuggestions: []
      }
    },
    methods: {
      createTask () {
        // switch to id if username
        this.members.forEach((member) => {
          if (this.createTaskData.assignee === member.name) {
            this.createTaskData.assignee = member.id
            return
          }
          if (this.createTaskData.assignee === member.id) {
            return
          }
        })
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
      },
      clearTaskModal () {
        this.showAddTaskForm = false
        this.createTaskData.title = ''
        this.createTaskData.description = ''
        this.createTaskData.assignee = ''
        this.addTaskResponse.show = false
        this.addTaskResponse.success = null
        this.addTaskResponse.message = null
      }
    },
    sockets: {
      create_action: function (data) {
        if (data.success) {
          this.addTaskResponse.success = true
          this.addTaskResponse.show = true
          this.addTaskResponse.message = data.success
        } else if (data.error) {
          this.addTaskResponse.success = false
          this.addTaskResponse.show = true
          this.addTaskResponse.message = data.error
        }
      },
      get_members: function (data) {
        this.members = data.members
        this.members.forEach((member) => {
          this.memberSuggestions.push(member.id)
          this.memberSuggestions.push(member.name)
        })
      }
    },
    beforeMount () {
      this.$socket.emit('get_members', this.committee)
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
    cursor: pointer;
  }
  .columns, .column {
    padding: 0;
    margin: 0;
  }
  .taskbar {
    text-align: center;
    background-color: #eee;
    display: table;
    width: 100%;
    border-top: 1px solid #ddd;
  }

  .taskbar:after {
    clear: both;
  }

  .taskbar .icon {
    display: table-cell;
    padding-left: 15px;
    color: #888;
    cursor: pointer;
    padding: 6px;
    width: 20%;
  }

  .taskbar .icon:hover:not(.active_task){
    background-color: #DEDCDC;
  }

  .active_task {
    color: white !important;
    background-color: #f36e21;
  }
  .modal-content {
    width: 60%;
  }
</style>
