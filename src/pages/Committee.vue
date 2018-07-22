<!--

filename: Committee.vue
description: Page for viewing charges assigned to specific committees

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div class="dashboard">
    <LoadingIndicator v-if="false"/>
    <HeaderMenu />
    <CommitteesMenu />
    <div class="pagename" :style="{ 'background-image': 'url(' + backgroundImage + ')' }">
      <h1>{{ committee.description }}</h1>
    </div>

    <CommitteeOverview inProgressCount="1" incompleteCount="3" completedCount="10" indefiniteCount="3" stoppedCount="2" />

    <div class="modal" v-bind:class="{ 'is-active': showAddNewCharge}">
      <div class="modal-background" @click="closeAddNewCharge()"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Create Charge</p>
        </header>
        <section class="modal-card-body" @keyup.enter="createNewCharge()">
          <article class="message" v-if="createChargeResponse.show" v-bind:class="createChargeResponse.success ? 'is-success' : 'is-danger'">
            <div class="message-body">{{ createChargeResponse.message }}</div>
          </article>
          <div class="field">
            <label class="label">Title</label>
            <div class="control">
              <input class="input" type="text" placeholder="Title" v-model="createChargeTitle">
            </div>
          </div>

          <div class="field">
            <label class="label">Description</label>
            <div class="control">
              <input class="input" type="text" placeholder="Description" v-model="createChargeDescription">
            </div>
          </div>

          <label class="label">Priority</label>
            <div class="field">
              <div class="control">
                <div class="select">
                  <select v-model="createChargePriority">
                    <option value="0">Low</option>
                    <option value="1">Medium</option>
                    <option value="2">High</option>
                  </select>
                </div>
              </div>
            </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-primary" @click="createNewCharge()">Create</button>
          <button class="button" @click="closeAddNewCharge()">Cancel</button>
        </footer>
      </div>
    </div>

    <div class="controlPanel">
      <div class="controlPanelHeader">
        <h2>Committee Member/Head Control Panel</h2>
      </div>
      <div class="controlPanelContent">
        <button id="addNewTask" class="button is-primary" @click="openAddNewCharge()">Add a Charge</button>
      </div>
    </div>

    <CommitteeMembers />

    <h1>Projects In Progress</h1>
    <h2>Projects that are currently in progress.</h2>
    <div v-for="charge in charges" :key="charge.id">
      <ProjectThumbnail v-if="charge.status != 5" v-bind:charge="charge" />
    </div>
  </div>
</template>

<script>
import HeaderMenu from '../components/HeaderMenu'
import CommitteesMenu from '../components/CommitteesMenu'
import CommitteeOverview from '../components/CommitteeOverview'
import Auth from '../mixins/auth'
import ProjectThumbnail from '../components/ProjectThumbnail'
import ProjectThumbnailSmall from '../components/ProjectThumbnailSmall'
import LoadingIndicator from '../components/LoadingIndicator'
import CommitteeMembers from '../components/CommitteeMembers'

export default {
  name: 'dashboard',
  mixins: [Auth],
  components: {
    'HeaderMenu': HeaderMenu,
    'CommitteesMenu': CommitteesMenu,
    'CommitteeOverview': CommitteeOverview,
    'ProjectThumbnail': ProjectThumbnail,
    'ProjectThumbnailSmall': ProjectThumbnailSmall,
    'LoadingIndicator': LoadingIndicator,
    'CommitteeMembers': CommitteeMembers
  },
  data () {
    return {
      committee: {'description': 'committee'},
      backgroundImage: null,
      showLoadingIndicator: true,
      showAddNewCharge: false,
      createChargeTitle: null,
      createChargePriority: null,
      createChargeDescription: null,
      createChargeResponse: {
        show: false,
        message: null,
        success: null
      },
      charges: null
    }
  },
  methods: {
    openAddNewCharge () {
      this.showAddNewCharge = true
    },
    closeAddNewCharge () {
      this.createChargeTitle = null
      this.createChargeDescription = null
      this.createChargePriority = null
      this.showAddNewCharge = false
      this.createChargeResponse.show = false
      this.createChargeResponse.message = null
      this.createChargeResponse.success = null
    },
    createNewCharge () {
      console.log('Title: ' + this.createChargeTitle)
      console.log('Desc: ' + this.createChargeDescription)
      console.log('Priority: ' + this.createChargePriority)
      console.log('Committee Id: ' + this.committee.id)
      this.$socket.emit('create_charge', {
        token: this.getToken(),
        title: this.createChargeTitle,
        committee: this.committee.id,
        priority: parseInt(this.createChargePriority),
        description: this.createChargeDescription
      })
    }
  },
  sockets: {
    get_committee: function (data) {
      this.committee = data

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
    },
    get_charges: function (data) {
      this.charges = data
    },
    create_charge: function (data) {
      console.log(data)
      if (data.success) {
        // console.log('Charge created')
        this.createChargeResponse.show = true
        this.createChargeResponse.success = true
        this.createChargeResponse.message = data.success
      } else if (data.error) {
        this.createChargeResponse.show = true
        this.createChargeResponse.success = false
        this.createChargeResponse.message = data.error
      }
    }
  },
  beforeMount () {
    this.$socket.emit('get_committee', this.$router.history.current.params['committee'])
    this.$socket.emit('get_charges', this.$router.history.current.params['committee'])
  },
  /* Since this component is used for each committee page, we have to
    watch for changes in the URL and update the props on the page
    when the route changes */
  watch: {
    '$route.params.committee': function (committee) {
      this.$socket.emit('get_committee', committee)
      this.$socket.emit('get_charges', committee)
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: 300;
  text-align: center;
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
