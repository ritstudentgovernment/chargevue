<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Create a new task</p>
      </header>
      <section class="modal-card-body">
        <article class="message" v-if="addTaskResponse.show" :class="addTaskResponse.success ? 'is-success' : 'is-danger'">
          <div class="message-body">{{ addTaskResponse.message }}</div>
        </article>

      <div class="field">
        <label class="label">Task Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Task Name" v-model="taskData.title" maxlength="255">
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

      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary" @click="createTask">Create Task</button>
        <button class="button is-primary" @click="closeModal">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import Modal from './Modal'
import Auth from '../mixins/auth'
import VueSimpleSuggest from 'vue-simple-suggest/dist/cjs'
import 'vue-simple-suggest/dist/styles.css'

export default {
  name: 'CreateTaskModal',
  mixins: [Auth],
  components: {
    VueSimpleSuggest,
    Modal
  },
  props: {
    members: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      showModal: false,
      taskData: {
        description: '',
        assignee: '',
        title: ''
      },
      addTaskResponse: {
        success: true,
        message: '',
        show: false
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
        charge: this.$router.history.current.params['charge'],
        assigned_to: this.taskData.assignee,
        title: this.taskData.title,
        description: this.taskData.description
      })
    },
    closeModal () {
      this.taskData.description = ''
      this.taskData.assignee = ''
      this.taskData.title = ''
      this.addTaskResponse.success = null
      this.addTaskResponse.message = null
      this.addTaskResponse.show = false
      this.$emit('closeModal')
    },
    show () {
      this.showModal = true
    }
  },
  sockets: {
    create_action: function (data) {
      if (data.success) {
        this.addTaskResponse.show = true
        this.addTaskResponse.success = true
        this.addTaskResponse.message = data.success
        setTimeout(() => { this.$emit('closeModal') }, 2000)
      } else if (data.error) {
        this.addTaskResponse.show = true
        this.addTaskResponse.success = false
        this.addTaskResponse.message = data.error
      }
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

  .modal-content {
    width: 60%;
  }
</style>