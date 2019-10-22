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

    <CommitteeOverview :inProgressCount="inProgressCount" :incompleteCount="incompleteCount" :completedCount="completedCount" :indefiniteCount="indefiniteCount" :stoppedCount="stoppedCount" />
    <CommitteeAdmin v-if="committee.head === username || admin" v-bind:committee="this.committee"/>
    <CommitteeMembers />
    <div class="tabs is-boxed is-centered">
      <ul>
        <li v-bind:class="{'is-active': showProjects}" v-on:click="showProjects = true"><a>Charges</a></li>
        <li v-bind:class="{'is-active': !showProjects}" v-on:click="showProjects = false"><a>Meetings</a></li>
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
      <MinutesThumbnail v-bind:committee="this.committee"></MinutesThumbnail>
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
  name: 'dashboard',
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
      backgroundImage: null,
      showLoadingIndicator: true,
      showProjects: true,
      charges: []
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
    }
  },
  beforeMount () {
    this.$socket.emit('get_committee', this.$router.history.current.params['committee'])
    this.$socket.emit('get_charges', {
      token: this.getToken(),
      committee_id: this.$router.history.current.params['committee']
    })
  },
  computed: {
    inProgressCount () {
      return this.charges.filter(x => x.status === 0).length
    },
    incompleteCount () {
      return this.charges.filter(x => x.status === 1).length
    },
    completedCount () {
      return this.charges.filter(x => x.status === 2).length
    },
    indefiniteCount () {
      return this.charges.filter(x => x.status === 3).length
    },
    stoppedCount () {
      return this.charges.filter(x => x.status === 4).length
    },
    ...mapGetters({
      username: 'username',
      admin: 'admin'
    })
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
