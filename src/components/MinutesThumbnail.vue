<template>
  <div class="minutes_thumbnail" @click="openMinutes()">
      <div class="minutes_thumbnail_header">{{minutes.date}}</div>
      <div>
        <div class="minutes_tag" v-for="tag in minutes.tags" :key='tag'><span>{{tag}}</span></div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'minutes-thumbnail',
  data () {
    return {
      minutes: {
        date: '2/18/2018',
        tags: ['Test', 'Urgent', 'Fake']
      }
    }
  },
  props: ['committee'],
  methods: {
    openMinutes () {
      this.$router.push({ path: '/minutes/' + this.committee.id })
    }
  }
}
</script>
<style scoped lang="sass">
  @import '../assets/vars.sass'

  .minutes_tag 
    color: #fff
    font-size: 14pt
    font-weight: 300
    display: inline-block
    width: 17%

  .minutes_tag span 
    background-color: #f36e21
    padding: 10px
    margin: 10px
    display: inline-block
    width: 80%
    text-align: center

  .minutes_thumbnail
    background-color: #fff
    width: 70%
    margin: 15px auto
    padding: 20px
    -webkit-animation: pop-in 0.5s
    -moz-animation: pop-in 0.5s
    -ms-animation: pop-in 0.5s
    animation: pop-in 0.5s
    cursor: pointer

  .minutes_thumbnail_header
    font-size: 16pt
    font-weight: 300

  .minutes_thumbnail_subheader
    color: #333
    font-size: 10pt
    font-weight: 300
    font-family: Verdana

  @-webkit-keyframes pop-in
    0%
      opacity: 0
      -webkit-transform: scale(0.5)

  100%
    opacity: 1
    -webkit-transform: scale(1)


  @-moz-keyframes pop-in
    0%
      opacity: 0
      -moz-transform: scale(0.5)

    100%
      opacity: 1
      -moz-transform: scale(1)


  @keyframes pop-in
    0%
      opacity: 0
      transform: scale(0.5)

    100%
      opacity: 1
      transform: scale(1)
</style>
