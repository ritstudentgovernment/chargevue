<!--

filename: LoadingIndicator.vue
description: Loading indicator component for showing that data is loading from the server

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div class="indicator-wrapper">
    <div class="indicator">
      <button class="button is-large is-loading"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading-indicator',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
  .indicator-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 999;
    margin: 0 auto;
    text-align: center;
  }

  .indicator {
    position: absolute;
    top: calc(50% - 50px);
    left: calc(50% - 50px);
  }

  .indicator button {
    height: 100px;
    width: 100px;
  }
</style>
