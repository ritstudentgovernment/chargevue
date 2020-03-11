<!--

filename: CommitteeOverview.vue
description: Component for overseeing committee charge info

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div class="columns">
    <div class="column">
      <a v-on:click="filterCharges(0)">
        <div class="overview_count">{{ inProgressCount }}</div>
        <div class="overview_description">In Progress</div>
      </a>
    </div>
    <div class="column">
      <a v-on:click="filterCharges(1)">
        <div class="overview_count">{{ incompleteCount }}</div>
        <div class="overview_description">Incomplete</div>
      </a>
    </div>
    <div class="column">
      <a v-on:click="filterCharges(2)">
        <div class="overview_count">{{ completedCount }}</div>
        <div class="overview_description">Completed</div>
      </a>
    </div>
    <div class="column">
      <a v-on:click="filterCharges(3)">
        <div class="overview_count">{{ indefiniteCount }}</div>
        <div class="overview_description">Indefinite</div>
      </a>
    </div>
    <div class="column last">
      <a v-on:click="filterCharges(4)">
        <div class="overview_count">{{ stoppedCount }}</div>
        <div class="overview_description">Stopped</div>
      </a>
    </div>
  </div>
</template>

<script>
import { EventBus } from './EventBus'

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
      charges: []
    }
  },
  sockets: {
    get_all_charges: function (data) {
      this.charges = data
    }
  },
  beforeMount () {
    this.$socket.emit('get_all_charges', 'technology')
  },
  methods: {
    filterCharges (type) {
      EventBus.$on('get-charges', emittedCharges => {
        this.charges = emittedCharges.filter(charge => charge.status === type)
        console.log(this.charges)
      })
      this.sendFiltered()
    },
    sendFiltered () {
      EventBus.$emit('send-filtered', this.charges)
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
