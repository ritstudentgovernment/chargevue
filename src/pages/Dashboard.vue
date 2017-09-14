<template>
  <div class="dashboard">
    <Header />
    <Carousel />
    <CommitteesMenu />
    <h1 id="dashboard_title">Projects In Progress</h1>
    <h2>Projects that are currently in progress.</h2>
    <ProjectThumbnail />
    <ProjectThumbnail />
  </div>
</template>

<script>
import Header from '../components/Header'
import Carousel from '../components/Carousel'
import ProjectThumbnail from '../components/ProjectThumbnail'
import CommitteesMenu from '../components/CommitteesMenu'

export default {
  name: 'dashboard',
  components: {
    'Header': Header,
    'Carousel': Carousel,
    'ProjectThumbnail': ProjectThumbnail,
    'CommitteesMenu': CommitteesMenu
  },
  data () {
    return {
      title: 'Charge Tracker'
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: 300;
  text-align: center;
}
</style>
