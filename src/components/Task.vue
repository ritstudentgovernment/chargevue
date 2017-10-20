<!--

filename: Task.vue
description: Tasks

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div>
    <div class="task" @click="active = true">
      <div><span class="icon active_task thumbnail"><i class="mdi" v-bind:class="[style, icon]"></i> {{title}}</span></div>
      <div class="subtitle">{{subtitle}}</div>
    </div>

    <div class="task modal" v-bind:class="{ 'is-active': active }">
      <div class="modal-background" @click="active = false"></div>
      <div class="modal-content">
        <div class="box">
          <div class="modal-header">
            <span class="icon"><i class="mdi header-icon" v-bind:class="[style, icon]"></i></span>
            <span class="modal-titles">
              <span class="modal-title">{{title}}</span><br />
              <span class="modal-subtitle">{{subtitle}} | Assigned to <span class="link">gll1872</span></span>
            </span>
          </div>
          <p>Hello this is a description of the task on this charge.</p>
          <p class="updates-header">Updates (2)</p>

          <div class="update">
            <div class="update-image">
              <img src="../assets/avatar.png" />
            </div>
            <div class="update-body">
              <div class="update-header">
                <span class="update-name">Gabe Landau</span>
                <span class="update-timestamp">Posted on 3/10/2017 at 5:23PM</span>
              </div>
              <p class="update-body-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat pretium sem, id accumsan mauris consequat at. Nam dolor velit, efficitur id malesuada ac, sodales at ligula. Vivamus convallis enim id risus elementum, eget mattis ante hendrerit.</p>
            </div>
          </div>

          <div class="update">
            <div class="update-image">
              <img src="../assets/avatar.png" />
            </div>
            <div class="update-body">
              <div class="update-header">
                <span class="update-name">Gabe Landau</span>
                <span class="update-timestamp">Posted on 3/10/2017 at 5:23PM</span>
              </div>
              <p class="update-body-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat pretium sem, id accumsan mauris consequat at. Nam dolor velit, efficitur id malesuada ac, sodales at ligula. Vivamus convallis enim id risus elementum, eget mattis ante hendrerit.</p>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <textarea class="textarea" placeholder="Write a comment or update..."></textarea>
            </div>
          </div>
          <button class="button is-primary">Submit Comment</button>
        </div>
      </div>
      <button class="modal-close is-large" @click="active = false"></button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tasks',
    components: {},
    props: ['status', 'title', 'subtitle'],
    data () {
      return {
        active: false
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
  /* Statuses for icons */
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

  /* Thumbnail styles */
  .task {
    border-top: 1px solid #ddd;
    padding: 10px;
    font-size: 14pt;
  }

  .thumbnail {
    padding-left: 15px;
  }

  .subtitle {
    padding-left: 40px;
    color: #7f7f7f;
    font-size: 10pt;
  }

  /* Modal styles */
  .modal-content {
    width: 60%;
  }

  .modal-header {
    overflow: hidden;
  }

  .header-icon {
    float: left;
    font-size: 28pt;
    vertical-align: middle;
  }

  .modal-titles {
    float: left;
    padding-left: 10px;
  }

  .modal-title {
    font-size: 16pt;
  }

  .modal-subtitle {
    color: #7f7f7f;
  }

  .updates-header {
    font-weight: 700;
  }

  .link {
    text-decoration: underline;
  }

  .control {
    padding-right: 20px;
  }

  .update {
    overflow: hidden;
    padding-left: 10px;
    padding-bottom: 10px;
  }

  .update-image {
    float: left;
  }

  .update-body {
    padding-left: 20px;
    padding-bottom: 10px;
    overflow:hidden;
    word-wrap: break-word;
    float:none
  }

  .update-body-text {
    font-size: 11pt;
  }

  .update-header {
    line-height: 16pt;
  }

  .update-name {
    font-size: 16pt;
  }

  .update-timestamp {
    vertical-align: top;
    font-size: 10pt;
    text-decoration: underline;
  }

  .update-image img {
    height: 65px;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border: 1px solid #404040;
  }
</style>
