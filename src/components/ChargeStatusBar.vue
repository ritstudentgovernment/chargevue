<!--

filename: ChargeStatusBar.vue
description: Status bar for a charge page

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div class="bar_container">
    <div class="bar">&nbsp;</div>
    In Progress
  </div>
</template>

<script>
export default {
  name: 'chargestatusbar',
  data () {
    return {
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
  }

  .bar {
    background-color: #f36e21;
    width: 10%;
    height: 40px;
    position: absolute;
  }

  .bar_text {
    padding-top: 40px;
  }
</style>
