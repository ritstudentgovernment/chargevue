<template>
  <div class='dashboard'>
    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
    <HeaderMenu />
    <CommitteesMenu />
        <div class="pagename" :style="{ 'background-image': 'url(' + backgroundImage + ')' }">
      <h1>{{ committee.description }}</h1>
    </div>
    <MinutesControls />
    <div id='quillcontainer'>
      <div ref="scriptHolder"></div>
      <div id='editor' ></div>
      <button class="button is-primary" id='saveMinutes' @click="saveMinutes()">Save Minutes</button>
    </div>
  </div>
</template>

<script>
import HeaderMenu from '../components/HeaderMenu'
import CommitteesMenu from '../components/CommitteesMenu'
import MinutesControls from '../components/MinutesControls'

export default {
  name: 'minutes',
  components: {
    'HeaderMenu': HeaderMenu,
    'CommitteesMenu': CommitteesMenu,
    'MinutesControls': MinutesControls
  },
  data () {
    return {
      committee: {'description': 'committee'},
      backgroundImage: null,
      showLoadingIndicator: true,
      quill: null
    }
  },
  methods: {
    saveMinutes () {
      let delta = this.quill.getContents()
      console.log(delta)
      this.getDeltaHTML(delta)
    },
    getDeltaHTML (delta) {
      let commentHTML = document.querySelector('.ql-editor').innerHTML
      console.log(commentHTML)
    }
  },
  sockets: {
    get_committee: function (data) {
      this.committee = data
      if (this.committee.enabled === false) {
        this.$router.push({path: '/'})
      }
      let image = data.committee_img
      if (image) {
        if (image.charAt(0) === '/') {
          image = 'data:image/jpeg;base64,' + image
        } else if (image.charAt(0) === 'R') {
          image = 'data:image/gif;base64,' + image
        } else if (image.charAt(0) === 'i') {
          image = 'data:image/png;base64,' + image
        }
        this.backgroundImage = image
      } else {
        this.backgroundImage = null
      }
      this.showLoadingIndicator = false
    }
  },
  beforeMount () {
    this.$socket.emit('get_minute', this.$router.history.current.params['minute'])
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
    width: 95vw;
    margin: 5vh;
    background-color: #fff;
  }
  #editor {
    background-color: #fff;
  }

  #saveMinutes {
    margin: 1vh;
    float: right;
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
