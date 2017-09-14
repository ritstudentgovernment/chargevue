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
  </div>
</template>

<script>
import CommitteeInfo from '../mixins/committeeinfo'
import Header from '../components/Header'
import CommitteesMenu from '../components/CommitteesMenu'

export default {
  name: 'dashboard',
  mixins: [CommitteeInfo],
  components: {
    'Header': Header,
    'CommitteesMenu': CommitteesMenu
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
