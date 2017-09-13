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
