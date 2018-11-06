<!--

filename: ProjectThumbnail.vue
description: Thumbnail component for projects, for use on dashboard and committee pages

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div class="project_thumbnail" @click="openCharge()">
		<div class="project_thumbnail_header">{{charge.title}}</div>
		<div class="project_thumbnail_description">{{charge.description}}</div>
	</div>
</template>

<script>
export default {
  name: 'project-thumbnail',
  data () {
    return {
    }
  },
  props: ['charge'],
  methods: {
    openCharge () {
      this.$router.push({ path: '/charge/' + this.charge.id })
    }
  }
}
</script>

<style scoped lang="sass">
@import '../assets/vars.sass'

.project_thumbnail
  background-color: #fff
  width: 70%
  margin: 15px auto
  padding: 20px
  -webkit-animation: pop-in 0.5s
  -moz-animation: pop-in 0.5s
  -ms-animation: pop-in 0.5s
  animation: pop-in 0.5s
  cursor: pointer

.project_thumbnail_header
  color: $primary
  font-size: 16pt
  font-weight: 300

.project_thumbnail_subheader
  color: #333
  font-size: 10pt
  font-weight: 300
  font-family: Verdana

.project_thumbnail_description
  color: #333
  font-size: 10pt
  font-weight: 300
  font-family: Verdana
  margin-top: 10px

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
