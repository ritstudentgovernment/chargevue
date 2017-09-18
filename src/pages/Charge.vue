<!--

filename: Charge.vue
description: Page for an indiviudual charge

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div>
    <Header />
    <CommitteesMenu />
  </div>
</template>

<script>
import Header from '../components/Header'
import CommitteesMenu from '../components/CommitteesMenu'

export default {
  name: 'dashboard',
  components: {
    'Header': Header,
    'CommitteesMenu': CommitteesMenu
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
</style>
