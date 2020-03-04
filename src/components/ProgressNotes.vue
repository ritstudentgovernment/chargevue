<!--

filename: Purpose.vue
description: Tasks

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div class="description">
    <div class="columns">
      <div class="column">
        <div class="description_title">Charge progress notes</div>
      </div>
      <div class="column">
        <button class="button is-primary">Add Note</button>
      </div>
    </div>
    <div class="divider"></div>
    <div class="rows">
        <li v-for="value in charge.progress_notes" v-bind:key = value>
            {{ value }}
  </li>
    </div>
  </div>
</template>

<script>
export default {
  name: 'progress_notes',
  props: ['charge'],
  components: {},
  data () {
    return {
    }
  }
}
</script>

<style scoped>
  .description {
    background-color: #fff;
    border: 1px solid #ddd;
    width: 70%;
    margin: 25px auto 10px auto;
  }

  .description_title {
    text-align: left;
    font-size: 18pt;
  }

  .description_date {
    text-align: right;
    font-size: 14pt;
    color: #555;
  }

  .description_content {
    font-size: 13pt;
    padding: 20px;
  }

  .columns {
    padding: 0;
    margin: 0;
  }

  .divider {
    border-top: 1px solid #000;
  }

  .button {
      float: right;
  }

</style>
