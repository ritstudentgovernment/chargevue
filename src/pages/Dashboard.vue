<!--

filename: Dashboard.vue
description: Dashboard/homepage for ChargeTracker application

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div class="dashboard">
    <HeaderMenu />
    <Carousel />
    <CommitteesMenu />
    <h1 id="dashboard_title">Projects In Progress</h1>
    <h2>Projects that are currently in progress.</h2>
    <div v-for="charge in charges" :key="charge.id">
      <ProjectThumbnail v-if="charge.status == 0" v-bind:charge="charge" />
    </div>
  </div>
</template>

<script>
import HeaderMenu from '../components/HeaderMenu'
import Carousel from '../components/Carousel'
import ProjectThumbnail from '../components/ProjectThumbnail'
import CommitteesMenu from '../components/CommitteesMenu'

export default {
  name: 'dashboard',
  components: {
    'HeaderMenu': HeaderMenu,
    'Carousel': Carousel,
    'ProjectThumbnail': ProjectThumbnail,
    'CommitteesMenu': CommitteesMenu
  },
  data () {
    return {
      title: 'Charge Tracker',
      charges: []
    }
  },
  sockets: {
    get_all_charges: function (data) {
      this.charges = data
      console.log(this.charges)
    }
  },
  beforeMount () {
    this.$socket.emit('get_all_charges', 'technology')
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: 300;
  text-align: center;
}
</style>
