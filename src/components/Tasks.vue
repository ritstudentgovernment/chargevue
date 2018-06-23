<!--

filename: Tasks.vue
description: Tasks

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div class="tasks">
    <div class="columns">
      <div class="column">
        <div class="tasks_title">Tasks</div>
      </div>
      <div class="column">
        <div class="tasks_button" @click="showAddTaskForm = true">New</div>
      </div>
    </div>
    <div class="taskbar">
      <span class="icon" v-bind:class="{ active_task:mockTasks[0].active }" @click="setActive(mockTasks[0].status)"><i class="mdi mdi-play-circle-outline"></i> 1 In Progress</span>
      <span class="icon" v-bind:class="{ active_task:mockTasks[1].active }" @click="setActive(mockTasks[1].status)"><i class="mdi mdi-minus-circle-outline"></i> 1 Stopped</span>
      <span class="icon" v-bind:class="{ active_task:mockTasks[2].active }" @click="setActive(mockTasks[2].status)"><i class="mdi mdi-checkbox-marked-circle-outline"></i> 1 Completed</span>
      <span class="icon" v-bind:class="{ active_task:mockTasks[3].active }" @click="setActive(mockTasks[3].status)"><i class="mdi mdi-pause-circle-outline"></i> 1 On Hold</span>
      <span class="icon" v-bind:class="{ active_task:mockTasks[4].active }" @click="setActive(mockTasks[4].status)"><i class="mdi mdi-information-outline"></i> 1 Indefinite</span>
    </div>

    <Task v-for="task in mockTasks" v-if="task.active" :key="task.status" v-bind:status="task.status" v-bind:title="task.title" v-bind:subtitle="task.subtitle"/>

    <div class="add-task modal" v-bind:class="{ 'is-active': showAddTaskForm }">
      <div class="modal-background" @click="showAddTaskForm = false"></div>
      <div class="modal-content">
        <div class="box">
          <div class="field">
            <label class="label">Task Name</label>
            <div class="control">
              <input class="input" type="text" placeholder="Task Name">
            </div>
          </div>

          <div class="field">
            <label class="label">Task Description</label>
            <div class="control">
              <textarea class="textarea" placeholder="Purpose and description of this task..."></textarea>
            </div>
          </div>

          <button class="button is-primary">Create Task</button>
        </div>
      </div>
      <button class="modal-close is-large" @click="showAddTaskForm = false"></button>
    </div>



  </div>
</template>

<script>
  import Task from './Task'

  export default {
    name: 'tasks',
    components: {
      'Task': Task
    },
    data () {
      return {
        showAddTaskForm: false,
        mockTasks: [
          {
            'title': 'In progress task for a project.',
            'subtitle': 'In progress since 3/17/2017',
            'status': 'inProgress',
            'active': true
          },
          {
            'title': 'Stopped task for a project.',
            'subtitle': 'Stopped since 3/17/2017',
            'status': 'stop',
            'active': false
          },
          {
            'title': 'Completed task for a project.',
            'subtitle': 'Completed since 3/17/2017',
            'status': 'complete',
            'active': false
          },
          {
            'title': 'On hold task for a project.',
            'subtitle': 'On hold since 3/17/2017',
            'status': 'onHold',
            'active': false
          },
          {
            'title': 'Indefinite task for a project.',
            'subtitle': 'Indefinite since 3/17/2017',
            'status': 'indefinite',
            'active': false
          },
          {
            'title': 'In progress task 2',
            'subtitle': 'In progress since 2/14/2017',
            'status': 'inProgress',
            'active': true
          },
          {
            'title': 'On hold task 2',
            'subtitle': 'On hold since 2/14/2017',
            'status': 'onHold',
            'active': true
          }
        ]
      }
    },
    methods: {
      setActive: function (status) {
        for (let k of this.mockTasks) {
          if (k.status === status) {
            k.active = true
          } else {
            k.active = false
          }
        }
      }
    }
  }
</script>

<style scoped>
  @import "../../node_modules/mdi/css/materialdesignicons.css";

  html, body {
    overflow: hidden !important;
  }

  .control {
    padding-right: 20px;
  }

  .tasks {
    background-color: #fff;
    border: 1px solid #ddd;
    width: 70%;
    margin: 50px auto 0 auto;
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
