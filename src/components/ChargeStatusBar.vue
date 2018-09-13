<!--

filename: ChargeStatusBar.vue
description: Status bar for a charge page

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div class="bar_container">
    <div class="bar" v-bind:style="{ width: progWidth + '%' }">&nbsp;</div>
    <p>In Progress</p>
  </div>
</template>

<script>
export default {
  name: 'chargestatusbar',
  props: ['actions'],
  watch: {
    actions: function (newVal, oldVal) {
      this.setProgBar()
    }
  },
  data () {
    return {
      progWidth: 0.0,
      testAgain: true
    }
  },
  methods: {
    setProgBar () {
      var length = (this.actions.filter(task => task.status === 2)).length / this.actions.length
      // make sure prog bar doesn't go further than the parent div
      length *= 0.7
      const prog = Math.max(Math.round(length * 10) / 10).toFixed(2)
      this.progWidth = prog * 100
    }
  }
}
</script>

<style scoped>
  .bar_container {
    background-color: rgba(243, 110, 33, .27);
    border: 1px solid #ddd;
    width: 70%;
    height: 40px;
    margin: 25px auto 0 auto;
    text-align: center;
    box-sizing: border-box;
  }

  .bar_container p {
    margin-top: 10px !important;
    color: #000;
    font-weight: 500;
    z-index: 100;
    position: relative;
  }

  .bar {
    background-color: #f36e21;
    height: 40px;
    position: absolute;
  }
</style>
