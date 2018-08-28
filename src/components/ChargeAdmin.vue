<!--

filename: Purpose.vue
description: Tasks

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div>
    <div class="committee_admin">
      <div class="title">Charge Controls</div>
      <div class="divider"></div>
      <div class="content"><button class="button is-primary is-disabled" disabled>Close Charge</button></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'charge-admin'
  }
</script>

<style scoped>
  .committee_admin {
    background-color: #fff;
    border: 1px solid #ddd;
    width: 70%;
    margin: 25px auto 10px auto;
  }

  .title {
    text-align: left;
    font-size: 18pt;
    margin: 10px;
    color: #000;
  }

  .divider {
    border-top: 1px solid #000;
  }

  .content {
    padding: 20px;
  }
</style>
