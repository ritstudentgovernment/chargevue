<template>
  <div class="minutes_thumbnail" @click="openMinutes()">
      <div class="minutes_thumbnail_header">Minutes from {{minute.date | epochToDate }}</div>
      <div class="minutes_tag" v-for="charge in minute.charges" :key='charge.id'><span>{{charge.title}}</span></div>
  </div>
</template>

<script>
export default {
  name: 'minutes-thumbnail',
  props: ['minute'],
  methods: {
    openMinutes () {
      this.$router.push({ path: '/minute/' + this.minute.id })
    }
  },
  filters: {
    epochToDate: function (v) {
      var date = new Date(v)
      return date.toLocaleDateString()
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
    font-weight: 600

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
