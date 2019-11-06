<template>
  <div class='dashboard'>
    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
    <HeaderMenu />
    <CommitteesMenu />
    <div class="pagename" :style="{ 'background-image': 'url(' + backgroundImage + ')' }">
      <div v-if="isNew">
        <input v-model="minute.title" type="text" placeholder="Insert Minute Title"/>
      </div>
      <div v-else>
        <h1>{{ minute.title }}</h1>
      </div>
    </div>
    <MinutesControls @updateCharges ="updateCharges" v-if="minute.committee_id" v-bind:committee_id="minute.committee_id" v-bind:existing_charges="minute.charges"/>
    <article class="message" v-if="saveMinuteResponse.show" v-bind:class="saveMinuteResponse.success ? 'is-success' : 'is-danger'">
      <div class="message-body">{{ saveMinuteResponse.message }}</div>
    </article>
    <div id='quillcontainer'>
      <div ref="scriptHolder"></div>
      <div id='editor' ></div>
      <div style="display: flex; flex-direction: row; justify-content: flex-end;">
          <div><label class="container label"> Make this minute private?  
                <input type="checkbox" class="is-primary" autocomplete="off" v-model="minute.private">
                <span class="checkmark is-primary"></span>
          </label></div>
          <div><button class="button is-primary" id='saveMinutes' @click="saveMinutes()">Save Minutes</button></div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderMenu from '../components/HeaderMenu'
import CommitteesMenu from '../components/CommitteesMenu'
import MinutesControls from '../components/MinutesControls'
import Auth from '../mixins/auth'

export default {
  name: 'minutes',
  mixins: [Auth],
  components: {
    'HeaderMenu': HeaderMenu,
    'CommitteesMenu': CommitteesMenu,
    'MinutesControls': MinutesControls
  },
  data () {
    return {
      minute: Object,
      isNew: false,
      backgroundImage: null,
      showLoadingIndicator: true,
      quill: null,
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
    saveMinutes () {
      this.checkAuth().then((token) => {
        this.$socket.emit('create_minute', {
          token: token,
          committee_id: this.minute.committee_id,
          title: this.minute.title,
          date: Date.now(),
          private: true,
          body: document.querySelector('.ql-editor').innerHTML,
          charges: this.minute.charges
        })
      })
    },
    removeSaveMinuteResponse () {
      this.saveMinuteResponse.show = false
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
      setTimeout(this.removeSaveMinuteResponse, 3000)
    },
    get_minute: function (data) {
      this.minute = data
    }
  },
  beforeMount () {
    if (this.$router.history.current.params['minute'] === 'new') {
      this.minute.committee_id = this.$router.history.current.query['committee_id']
      this.minute.charges = []
      this.isNew = true
      return
    }
    this.checkAuth().then((token) => {
      this.$socket.emit('get_minute', {
        token: token,
        minute_id: this.$router.history.current.params['minute']
      })
    })
  },
  mounted () {
    let quillEle = document.createElement('script')
    quillEle.setAttribute('src', 'https://cdn.quilljs.com/1.3.6/quill.js')
    quillEle.setAttribute('id', 'quillScript')
    this.$refs.scriptHolder.appendChild(quillEle)
    let quillRef = document.getElementById('quillScript')
    quillRef.onload = () => {
      // initialize quill
      // eslint-disable-next-line
      this.quill = new Quill('#editor', {
        theme: 'snow',
        placeholder: 'Begin taking minutes here'
      })
    }
  },
  watch: {
    '$route.params.committee': function (committee) {
      this.$socket.emit('get_committee', committee)
    }
  }
}
</script>
<style scoped>
  h1, h2 {
    font-weight: 300;
    text-align: center;
  }

  #quillcontainer {
    height: 50vh;
    margin: 15px auto;
    width: 70%;
    background-color: #fff;
  }

  #editor {
    background-color: #fff;
  }

  #saveMinutes {
    margin: 1vh 0 1vh 1vh;
  }

  .columns {
    width: 70%;
    margin: 0 auto;
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