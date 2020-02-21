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
      <h1>{{ committee.title }}</h1>
      <h5>{{getDay}} {{getHour}}:{{getMinutes}} {{getAMPM}}</h5>
      <h5>{{committee.location}}</h5>
    </div>

    <CommitteeOverview :inProgressCount="inProgressCount" :incompleteCount="incompleteCount" :completedCount="completedCount" :indefiniteCount="indefiniteCount" :stoppedCount="stoppedCount" />
    <CommitteeAdmin v-if="inCommittee || admin" :committee="committee" :is-privileged="committee.head == username || admin" @chargeCreated="updatePage(committee.id)"/>
    <CommitteeMembers :members="members" :committee-head="committee.head"/>
    <div class="tabs is-boxed is-centered">
      <ul>
        <li v-bind:class="{'is-active': showProjects}" v-on:click="showProjects = true"><a>Charges</a></li>
        <li   v-bind:class="{'is-active': !showProjects}" v-on:click="showProjects = false"><a>Minutes</a></li>
      </ul>
    </div>
    <div id='projects' v-if="showProjects">
      <h1>Charges In Progress</h1>
      <h2>Charges that are currently in progress.</h2>
      <div v-for="charge in charges" :key="charge.id">
        <ProjectThumbnail v-if="charge.status != 5" v-bind:charge="charge" />
      </div>
    </div>
    <div id='minutes' v-if="!showProjects">
      <div v-for="minute in minutes" :key="minute.id">
        <MinutesThumbnail v-bind:minute="minute"></MinutesThumbnail>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderMenu from '../components/HeaderMenu'
import CommitteesMenu from '../components/CommitteesMenu'
import CommitteeOverview from '../components/CommitteeOverview'
import ProjectThumbnail from '../components/ProjectThumbnail'
import ProjectThumbnailSmall from '../components/ProjectThumbnailSmall'
import LoadingIndicator from '../components/LoadingIndicator'
import CommitteeMembers from '../components/CommitteeMembers'
import CommitteeAdmin from '../components/CommitteeAdmin'
import MinutesThumbnail from '../components/MinutesThumbnail'
import { mapGetters } from 'vuex'
import Auth from '../mixins/auth'

export default {
  name: 'committee',
  mixins: [Auth],
  components: {
    'HeaderMenu': HeaderMenu,
    'CommitteesMenu': CommitteesMenu,
    'CommitteeOverview': CommitteeOverview,
    'ProjectThumbnail': ProjectThumbnail,
    'ProjectThumbnailSmall': ProjectThumbnailSmall,
    'LoadingIndicator': LoadingIndicator,
    'CommitteeMembers': CommitteeMembers,
    'CommitteeAdmin': CommitteeAdmin,
    'MinutesThumbnail': MinutesThumbnail
  },
  data () {
    return {
      committee: {'description': 'committee'},
      members: [],
      backgroundImage: null,
      showLoadingIndicator: true,
      showProjects: true,
      charges: [],
      minutes: []
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
    },
    get_charges: function (data) {
      this.charges = data
    },
    get_minutes: function (data) {
      this.minutes = data
    },
    get_members: function (data) {
      this.members = data.members
    }
  },
  beforeMount () {
    let committeeId = this.$router.history.current.params['committee']
    this.updatePage(committeeId)
  },
  beforeRouteUpdate (to, from, next) {
    let committeeId = to.params['committee']
    this.updatePage(committeeId)
    next()
  },
  methods: {
    updatePage (committeeId) {
      this.$socket.emit('get_committee', committeeId)
      this.$socket.emit('get_members', committeeId)
      this.checkAuth().then((token) => {
        this.$socket.emit('get_charges', {
          token: token,
          committee_id: committeeId
        })
        this.$socket.emit('get_minutes', {
          token: token,
          committee_id: committeeId
        })
      })
    },
    convertTimeDay (committeeDay, committeeTime) {
      let day = ''
      let ampm = ''
      let hour = ''
      let minute = ''

      if (committeeDay != null) {
        switch (committeeDay) {
          case 0:
            day = 'Sunday'
            break
          case 1:
            day = 'Monday'
            break
          case 2:
            day = 'Tuesday'
            break
          case 3:
            day = 'Wednesday'
            break
          case 4:
            day = 'Thursday'
            break
          case 5:
            day = 'Friday'
            break
          case 6:
            day = 'Saturday'
            break
          default:
            day = 'Sunday'
            break
        }
      }

      if (committeeTime != null) {
        hour = committeeTime.length > 3 ? committeeTime.substring(0, 2) : committeeTime.substring(0, 1)
        if (hour > 12) {
          hour = hour - 12 + ''
          ampm = 'PM'
        } else {
          hour = hour + ''
          ampm = 'AM'
        }

        minute = committeeTime.length > 3 ? committeeTime.substring(2) : committeeTime.substring(1)
      }

      return {ampm, day, hour, minute}
    }
  },
  computed: {
    inCommittee () {
      let usernames = this.members.map(member => member.id)
      return usernames.indexOf(this.username) !== -1
    },
    inProgressCount () {
      return this.charges.filter(x => x.status === 0).length
    },
    completedCount () {
      return this.charges.filter(x => x.status === 1).length
    },
    indefiniteCount () {
      return this.charges.filter(x => x.status === 2).length
    },
    ...mapGetters({
      username: 'username',
      admin: 'admin'
    }),
    getDay () {
      return this.convertTimeDay(this.committee.meeting_day, this.committee.meeting_time).day
    },
    getHour () {
      return this.convertTimeDay(this.committee.meeting_day, this.committee.meeting_time).hour
    },
    getMinutes () {
      return this.convertTimeDay(this.committee.meeting_day, this.committee.meeting_time).minute
    },
    getAMPM () {
      return this.convertTimeDay(this.committee.meeting_day, this.committee.meeting_time).ampm
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

  .pagename h1, .pagename h5 {
    margin: 0;
    text-align: center;
    text-transform: uppercase;
    padding-top: 75px;
    color: #fff;
    animation: fadein 0.5s;
    -webkit-animation: fadein 0.5s;
    -moz-animation: fadein 0.5s;
    -ms-animation: fadein 0.5s;
  }

  .pagename h5 {
    padding-top: 25px;
  }

  .pagename h5:nth-of-type(2){
    padding-bottom: 75px;
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

  li {
    cursor: pointer;
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
