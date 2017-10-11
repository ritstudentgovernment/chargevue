<!--

filename: Admin.vue
description: Admin page

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div>
    <HeaderMenu />
    <div class="box" id="tablebox">
      <table class="table is-striped is-fullwidth">
        <thead>
        <tr>
          <td>Committee Name</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="committee in committees">
          <td>{{ committee.title }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import HeaderMenu from '@/components/HeaderMenu.vue'

  export default {
    name: 'admin',
    components: {
      HeaderMenu: HeaderMenu
    },
    data () {
      return {
        committees: null
      }
    },
    sockets: {
      get_committees: function (data) {
        this.committees = data
        console.log(data)
      }
    },
    beforeMount () {
      this.$socket.emit('get_committees')
    }
  }
</script>

<style scoped>
  #tablebox {
    margin: 30px;
  }
</style>
