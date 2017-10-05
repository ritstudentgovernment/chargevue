<!--

filename: TaskThumbnail.vue
description: Tasks

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div class="task">
    <div><span class="icon active_task"><i class="mdi" v-bind:class="[style, icon]"></i> {{title}}</span></div>
    <div class="subtitle">{{subtitle}}</div>
  </div>
</template>

<script>
  export default {
    name: 'tasks',
    components: {},
    props: ['status', 'title', 'subtitle'],
    data () {
      return {
      }
    },
    beforeMount () {
      switch (this.status) {
        case 'inProgress':
          this.style = 'in-progress'
          this.icon = 'mdi-play-circle-outline'
          break
        case 'stop':
          this.style = 'stop'
          this.icon = 'mdi-minus-circle-outline'
          break
        case 'complete':
          this.style = 'complete'
          this.icon = 'mdi-checkbox-marked-circle-outline'
          break
        case 'onHold':
          this.style = 'on-hold'
          this.icon = 'mdi-pause-circle-outline'
          break
        case 'indefinite':
          this.style = 'indefinite'
          this.icon = 'mdi-information-outline'
          break
      }
    }
  }
</script>

<style scoped>
  .task {
    border-top: 1px solid #ddd;
    padding: 10px;
    font-size: 14pt;
  }

  .task .icon {
    padding-left: 15px;
  }

  .in-progress {
    color: #d6b829;
  }

  .stop {
    color: #f00;
  }

  .complete {
    color: #088512;
  }

  .on-hold {
    color: #ff8720;
  }

  .indefinite {
    color: #4f86ff;
  }

  .subtitle {
    padding-left: 40px;
    color: #7f7f7f;
    font-size: 10pt;
  }
</style>
