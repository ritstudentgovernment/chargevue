<template>
  <div class='dashboard'>
    <HeaderMenu />
    <CommitteesMenu />
    <div class="pagename" :style="{ 'background-image': 'url(' + backgroundImage + ')' }">
      <div v-if="currentMode === mode.VIEW">
        <h1>{{ minute.title }}</h1>
      </div>
      <div v-else>
        <input v-model="minute.title" type="text" placeholder="Insert Minute Title"/>
      </div>
    </div>
    <MinutesControls @updateCharges="updateCharges" v-if="minute.committee_id" :committee_id="minute.committee_id" :currentMode="currentMode" :existing_charges="minute.charges"/>
    <button @click="showCreateTaskModal">yer</button>
    <minute-task-modal ref="createTaskModal" :committee-id="minute.committee_id"/>
    <article class="message" v-if="saveMinuteResponse.show" :class="saveMinuteResponse.success ? 'is-success' : 'is-danger'">
      <div class="message-body">{{ saveMinuteResponse.message }}</div>
    </article>
    <div class="minute-body">
      <div class="body-header">
        <div class="title">Description</div>
        <button v-if="currentMode == mode.VIEW" class="button is-primary" @click="currentMode = mode.EDIT">Edit</button>
      </div>
      <div style="padding: 10px;" v-if="currentMode == mode.VIEW" v-html="minute.body"></div>
      <div v-else>
        <text-editor :text="minute.body" @input="updateMinuteText"/>
        <div class="action-menu">
          <div class="field">
            <input class="is-checkradio" id="isPrivate" type="checkbox" v-model="minute.private">
            <label class="noselect" for="isPrivate">Private</label>
          </div>
          <button class="button is-primary" id='saveMinutes' v-if="currentMode == mode.NEW" @click="createMinute()">Create Minute</button>
          <button class="button is-primary" id='saveMinutes' v-if="currentMode == mode.EDIT" @click="editMinute()">Edit Minute</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderMenu from '../components/HeaderMenu'
import CommitteesMenu from '../components/CommitteesMenu'
import MinutesControls from '../components/MinutesControls'
import MinuteTaskModal from '../components/MinuteTaskModal'
import TextEditor from '../components/TextEditor'
import Auth from '../mixins/auth'

export default {
  name: 'minutes',
  mixins: [Auth],
  components: {
    HeaderMenu,
    CommitteesMenu,
    MinutesControls,
    TextEditor,
    MinuteTaskModal
  },
  data () {
    return {
      minute: {
        id: null,
        charges: [],
        committee_id: '',
        title: '',
        body: '',
        private: true
      },
      mode: {
        VIEW: 'view',
        EDIT: 'edit',
        NEW: 'new'
      },
      currentMode: '',
      backgroundImage: null,
      showLoadingIndicator: true,
      saveMinuteResponse: {
        show: false,
        message: null,
        success: null
      }
    }
  },
  methods: {
    updateCharges (charges) {
      this.minute.charges = charges
    },
    createMinute () {
      this.checkAuth().then((token) => {
        this.$socket.emit('create_minute', {
          token: token,
          committee_id: this.minute.committee_id,
          title: this.minute.title,
          date: Date.now(),
          private: this.minute.private,
          body: this.minute.body,
          charges: this.minute.charges.map(charge => charge.id)
        })
      })
    },
    editMinute () {
      this.checkAuth().then((token) => {
        this.$socket.emit('edit_minute', {
          token: token,
          minute_id: this.minute.id,
          title: this.minute.title,
          private: this.minute.private,
          body: this.minute.body,
          charges: this.minute.charges.map(charge => charge.id)
        })
      })
    },
    removeSaveMinuteResponse () {
      this.saveMinuteResponse.show = false
    },
    updateMinuteText (updatedText) {
      this.minute.body = updatedText
    },
    showCreateTaskModal () {
      this.$refs.createTaskModal.show()
    }
  },
  sockets: {
    create_minute: function (data) {
      if (data.error) {
        this.saveMinuteResponse.show = true
        this.saveMinuteResponse.success = false
        this.saveMinuteResponse.message = data.error
      } else if (data.success) {
        this.saveMinuteResponse.show = true
        this.saveMinuteResponse.success = true
        this.saveMinuteResponse.message = data.success
      }
      setTimeout(() => {
        this.removeSaveMinuteResponse()
        if (data.success) this.$router.push(`/committee/${this.minute.committee_id}`)
      }, 3000)
    },
    edit_minute: function (data) {
      if (data.error) {
        this.saveMinuteResponse.show = true
        this.saveMinuteResponse.success = false
        this.saveMinuteResponse.message = data.error
      } else if (data.success) {
        this.saveMinuteResponse.show = true
        this.saveMinuteResponse.success = true
        this.saveMinuteResponse.message = data.success
      }
      setTimeout(this.window.reload(), 3000)
    },
    get_minute: function (data) {
      if (!data.error) {
        this.minute = data
        this.currentMode = this.mode.VIEW
      }
    }
  },
  beforeMount () {
    if (this.$router.history.current.params['minute'] === 'new') {
      this.minute.committee_id = this.$router.history.current.query['committee_id']
      this.minute.charges = []
      this.minute.private = true
      this.currentMode = this.mode.NEW
      return
    }
    this.checkAuth().then((token) => {
      this.$socket.emit('get_minute', {
        token: token,
        minute_id: this.$router.history.current.params['minute']
      })
    })
  }
}
</script>
<style scoped>
  h1, h2 {
    font-weight: 300;
    text-align: center;
  }

  .minute-body{
    width: 70%;
    margin: 15px auto;
    background-color: #fff;
    border: 1px solid #ddd;
  }

  .body-header{
    padding: 7px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #000;
  }

  .title {
    text-align: left;
    font-size: 18pt;
    width: 100%;
  }

  #editor {
    background-color: #fff;
  }

  #saveMinutes {
    margin: 1vh 0 1vh 1vh;
  }

  .pagename {
    background: #000;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    text-align: center;
  }

  .pagename input{
    font-family: 'Montserrat', Helvetica, Arial, sans-serif;
    text-transform: uppercase;
    font-size: 40px;
    margin: 60px 0;
    width: 50%;
    background-color: transparent;
    border-radius: 0;
    border-width: 0 0 2px;
    border-color: white;
    color: white;
    text-align: center;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  .pagename h1 {
    margin: 0;
    text-align: center;
    text-transform: uppercase;
    padding: 75px 0;
    color: #fff;
    animation: fadein 0.5s;
    -webkit-animation: fadein 0.5s;
    -moz-animation: fadein 0.5s;
    -ms-animation: fadein 0.5s;
  }

  .controlPanel {
    background-color: #fff;
    width: 70%;
    margin: 15px auto;
    padding: 20px;
  }

  .controlPanelHeader {
    width: 100%;
    border-bottom: 1px solid #555;
    color: #555;
    margin-top: 0;
  }

  .controlPanelContent {
    padding: 10px;
  }

  .minutesPlaceholder {
    width: 70vw;
    text-align: center;
    margin-left: 15vw;
    margin-right: 15vw;
    margin-top:5vh;
    margin-bottom:5vh;
  }

  .noselect {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .action-menu{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 5px;
  }

  .field:not(:last-child) {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 1%;
    font-weight: 300;
  }

  .message {
    position: fixed;
    top: 0;
    width: 70%;
    margin-left: 15vw;
    margin-right: 15vw;
  }

  .container {
    padding-top: 15px;
  }

  @keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Firefox < 16 */
  @-moz-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Safari, Chrome and Opera > 12.1 */
  @-webkit-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Internet Explorer */
  @-ms-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
</style>