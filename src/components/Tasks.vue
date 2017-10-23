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
      <span class="icon active_task"><i class="mdi mdi-play-circle-outline"></i> 1 In Progress</span>
      <span class="icon"><i class="mdi mdi-minus-circle-outline"></i> 1 Stopped</span>
      <span class="icon"><i class="mdi mdi-checkbox-marked-circle-outline"></i> 1 Completed</span>
      <span class="icon"><i class="mdi mdi-pause-circle-outline"></i> 1 On Hold</span>
      <span class="icon"><i class="mdi mdi-information-outline"></i> 1 Indefinite</span>
    </div>
    <Task status="inProgress" title="In progress task for a project." subtitle="In progress since 3/17/2017"/>
    <Task status="stop" title="Stopped task for a project." subtitle="Stopped on 3/17/2017"/>
    <Task status="complete" title="Completed task for a project." subtitle="Completed on 3/17/2017"/>
    <Task status="onHold" title="On hold task for a project." subtitle="On hold since 3/17/2017"/>
    <Task status="indefinite" title="Indefinite task for a project." subtitle="Indefinite since 3/17/2017"/>



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
        showAddTaskForm: false
      }
    }
  }
</script>

<style scoped>
  @import "../../node_modules/mdi/css/materialdesignicons.css";

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
