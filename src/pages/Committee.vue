<!--

filename: Committee.vue
description: Page for viewing charges assigned to specific committees

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div class="dashboard">
    <Header />
    <CommitteesMenu />
    <div class="pagename">
      <h1>{{ this.committee.friendlyname }}</h1>
    </div>
    <CommitteeOverview inProgressCount="1" incompleteCount="3" completedCount="10" indefiniteCount="3" stoppedCount="2" />
    <h1 id="active_projects_title">Active Projects</h1>
    <h2>Projects that have been recently updated.</h2>
    <ProjectThumbnail />
    <h1 id="active_projects_title">Projects In Progress</h1>
    <h2>Projects that are currently in progress.</h2>
    <ProjectThumbnail />
    <ProjectThumbnail />
    <h1 id="active_projects_title">Projects Completed</h1>
    <h2>Projects that have been completed.</h2>
    <div class="columns">
      <div class="column"><ProjectThumbnailSmall /></div>
      <div class="column"><ProjectThumbnailSmall /></div>
      <div class="column"><ProjectThumbnailSmall /></div>
    </div>
    <div class="columns">
      <div class="column"><ProjectThumbnailSmall /></div>
      <div class="column"><ProjectThumbnailSmall /></div>
      <div class="column"><ProjectThumbnailSmall /></div>
    </div>
  </div>
</template>

<script>
import CommitteeInfo from '../mixins/committeeinfo'
import Header from '../components/Header'
import CommitteesMenu from '../components/CommitteesMenu'
import CommitteeOverview from '../components/CommitteeOverview'
import ProjectThumbnail from '../components/ProjectThumbnail'
import ProjectThumbnailSmall from '../components/ProjectThumbnailSmall'

export default {
  name: 'dashboard',
  mixins: [CommitteeInfo],
  components: {
    'Header': Header,
    'CommitteesMenu': CommitteesMenu,
    'CommitteeOverview': CommitteeOverview,
    'ProjectThumbnail': ProjectThumbnail,
    'ProjectThumbnailSmall': ProjectThumbnailSmall
  },
  data () {
    return {
      committee: this.getCommitteeInfo(this.$route.params.committee)
    }
  },
  /* Since this component is used for each committee page, we have to
    watch for changes in the URL and update the props on the page
    when the route changes */
  watch: {
    '$route.params.committee': function (committee) {
      this.committee = this.getCommitteeInfo(committee)
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
}

.pagename h1 {
  margin: 0;
  text-align: center;
  text-transform: uppercase;
  padding: 75px 0;
  color: #fff;
}
</style>
