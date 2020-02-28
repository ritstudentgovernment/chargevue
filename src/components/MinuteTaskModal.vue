<template>
  <modal 
    class="add-task"
    :response-message="createTaskResponse.message"
    :response-success="createTaskResponse.success"
    :show-modal="showModal"
    @close-modal="hide"
  >
    <div class="field">
      <label class="label">Task Name</label>
      <div class="control">
        <input class="input" type="text" placeholder="Task Name" v-model="taskData.title">
      </div>
    </div>
    
    <div class="field">
      <label class="label">Charge</label>
      <div class="select">
        <select v-model="selectedChargeId">
          <option v-for="charge in charges" :key="charge.id" :value="charge.id">{{ charge.title }}</option>
        </select>
      </div>
    </div>

    <div class="field">
      <label class="label">Assignee</label>
      <div class="control">
        <vue-simple-suggest
          v-model="taskData.assignee"
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
        <textarea class="textarea" placeholder="Purpose and description of this task..." v-model="taskData.description"></textarea>
      </div>
    </div>

    <template v-slot:footer>
      <button class="button is-primary" @click="createTask">Create Task</button>
    </template>
  </modal>
</template>

<script>
import Modal from './Modal'
import Auth from '../mixins/auth'
import VueSimpleSuggest from 'vue-simple-suggest/dist/cjs'
import 'vue-simple-suggest/dist/styles.css'

export default {
  name: 'MinuteTaskModal',
  mixins: [Auth],
  components: {
    VueSimpleSuggest,
    Modal
  },
  props: {
    committeeId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showModal: false,
      charges: [],
      members: [],
      selectedChargeId: null,
      taskData: {
        description: '',
        assignee: '',
        title: ''
      },
      createTaskResponse: {
        success: true,
        message: ''
      }
    }
  },
  methods: {
    createTask () {
      // switch to id if username
      this.members.forEach((member) => {
        if (this.taskData.assignee === member.name) {
          this.taskData.assignee = member.id
          return
        }
        if (this.taskData.assignee === member.id) {
          return
        }
      })
      this.$socket.emit('create_action', {
        token: this.getToken(),
        charge: this.selectedChargeId,
        assigned_to: this.taskData.assignee,
        title: this.taskData.title,
        description: this.taskData.description
      })
    },
    getCharges () {
      this.checkAuth().then((token) => {
        this.$socket.emit('get_charges', {
          token: token,
          committee_id: this.committeeId
        })
      })
    },
    getMembers () {
      this.$socket.emit('get_members', this.committeeId)
    },
    hide () {
      this.taskData.description = ''
      this.taskData.assignee = ''
      this.taskData.title = ''
      this.createTaskResponse.success = true
      this.createTaskResponse.message = ''
      this.showModal = false
      this.charges = []
      this.members = []
      this.selectedChargeId = null
    },
    show () {
      this.showModal = true
      this.getCharges()
      this.getMembers()
    }
  },
  sockets: {
    create_action: function (data) {
      if (data.success) {
        this.createTaskResponse.success = true
        this.createTaskResponse.message = data.success
        setTimeout(() => { this.hide() }, 2000)
      } else if (data.error) {
        this.createTaskResponse.success = false
        this.createTaskResponse.message = data.error
      }
    },
    get_charges: function (data) {
      this.charges = data
    },
    get_members: function (data) {
      this.members = data.members
    }
  },
  computed: {
    memberSuggestions () {
      let suggestions = []
      this.members.forEach(member => {
        suggestions.push(member.id)
        suggestions.push(member.name)
      })
      return suggestions
    }
  }
}
</script>

<style scoped>
  html, body {
    overflow: hidden !important;
  }
  .add-task {
    z-index: 1000;
  }
  .control {
    padding-right: 20px;
  }
</style>