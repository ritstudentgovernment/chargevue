<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400')
@import '../node_modules/bulma/sass/utilities/_all'
@import '../node_modules/bulma/sass/grid/columns'
@import '../node_modules/bulma/sass/components/modal'
@import '../node_modules/bulma/sass/elements/button'

html, body
  padding: 0
  margin: 0
  background-color: #eee

#app
  font-family: 'Montserrat', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
</style>
