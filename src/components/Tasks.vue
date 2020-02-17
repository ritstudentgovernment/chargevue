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
          <button class="tasks_button button is-primary" @click="showCreateTaskModal">New</button>
        </div>
      </div>
      <div class="taskbar">
        <span class="icon" :class="{ 'active_task': active_task === 0 }" @click="makeActive(0)"><i class="mdi mdi-play-circle-outline"></i> {{ tasks.filter(task => task.status == 0).length }} In Progress</span>
        <span class="icon" :class="{ 'active_task': active_task === 1 }" @click="makeActive(1)"><i class="mdi mdi-minus-circle-outline"></i> {{ tasks.filter(task => task.status == 1).length }} Stopped</span>
        <span class="icon" :class="{ 'active_task': active_task === 2 }" @click="makeActive(2)"><i class="mdi mdi-checkbox-marked-circle-outline"></i> {{ tasks.filter(task => task.status == 2).length }} Completed</span>
        <span class="icon" :class="{ 'active_task': active_task === 3 }" @click="makeActive(3)"><i class="mdi mdi-pause-circle-outline"></i> {{ tasks.filter(task => task.status == 3).length }} On Hold</span>
        <span class="icon" :class="{ 'active_task': active_task === 4 }" @click="makeActive(4)"><i class="mdi mdi-information-outline"></i> {{ tasks.filter(task => task.status == 4).length }} Indefinite</span>
      </div>
    </div>

    <Task v-for="task in filteredTasks" :key="task.id" :task="task" @task-clicked="showTaskModal"/>
    <task-modal ref="taskModal" :task="selectedTask"/>
    <create-task-modal ref="createTaskModal" :members="members"/>
  </div>
</template>

<script>
import Task from './Task'
import Auth from '../mixins/auth'
import { mapGetters } from 'vuex'
import VueSimpleSuggest from 'vue-simple-suggest/dist/cjs'
import 'vue-simple-suggest/dist/styles.css'
import CreateTaskModal from './CreateTaskModal'
import TaskModal from './TaskModal'

export default {
  name: 'tasks',
  mixins: [Auth],
  props: ['tasks', 'committee'],
  components: {
    Task,
    VueSimpleSuggest,
    TaskModal,
    CreateTaskModal
  },
  data () {
    return {
      active_task: 0,
      selectedTask: {},
      members: []
    }
  },
  methods: {
    makeActive (status) {
      this.active_task = status
    },
    showCreateTaskModal () {
      this.$refs.createTaskModal.show()
    },
    showTaskModal (task) {
      this.selectedTask = task
      this.$refs.taskModal.show()
    }
  },
  sockets: {
    get_members: function (data) {
      this.members = data.members
    }
  },
  beforeMount () {
    this.$socket.emit('get_members', this.committee)
  },
  computed: {
    filteredTasks: function () {
      return this.tasks.filter(task => task.status === this.active_task)
    },
    ...mapGetters({
      taskId: 'taskId'
    })
  },
  watch: {
    tasks (newTasks, oldTasks) {
      let selectedTask = newTasks.find(task => task.id === this.taskId)
      if (selectedTask) {
        this.showTaskModal(selectedTask)
      }
    },
    taskId (newTaskId, oldTaskId) {
      let selectedTask = this.tasks.find(task => task.id === newTaskId)
      if (selectedTask) {
        this.showTaskModal(selectedTask)
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
    float: right;
    margin-top: 6.5px;
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
</style>
