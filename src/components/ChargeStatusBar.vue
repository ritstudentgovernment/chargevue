<!--

filename: ChargeStatusBar.vue
description: Status bar for a charge page

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div>
    <div class="charge_status_bar">In Progress</div>
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
.charge_status_bar {
  background-color: #1B761D;
  color: #fff;
  width: 100%;
  margin: 0;
  padding: 5px;
  text-align: center;
  box-shadow: 2px 0 10px #000 inset;
}
</style>
