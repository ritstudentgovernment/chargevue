<!--

filename: CommitteeOverview.vue
description: Component for overseeing committee charge info

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div class="columns">
    <div class="column">
      <div class="overview_count">{{ inProgressCount }}</div>
      <div class="overview_description">In Progress</div>
    </div>
    <div class="column">
      <div class="overview_count">{{ incompleteCount }}</div>
      <div class="overview_description">Incomplete</div>
    </div>
    <div class="column">
      <div class="overview_count">{{ completedCount }}</div>
      <div class="overview_description">Completed</div>
    </div>
    <div class="column">
      <div class="overview_count">{{ indefiniteCount }}</div>
      <div class="overview_description">Indefinite</div>
    </div>
    <div class="column last">
      <div class="overview_count">{{ stoppedCount }}</div>
      <div class="overview_description">Stopped</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'committeeoverview',
  props: [
    'inProgressCount',
    'incompleteCount',
    'completedCount',
    'indefiniteCount',
    'stoppedCount'
  ],
  data () {
    return {
    }
  }
}
</script>

<style lang="sass" scoped>
  .columns
    text-align: center
    width: 800px
    margin: 20px auto 0 auto
    color: #555

  .column
    border-right: 1px solid #555

  .last
    border-right: none !important

  .overview_count
    font-weight: 200
    font-size: 26pt

  .overview_description
    margin: 10px 0 0 0
    font-weight: 300
</style>
