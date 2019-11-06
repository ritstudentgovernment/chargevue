<!--

filename: CommitteesMenu.vue
description: Component showing the menu of committees with links to the Committee.vue page

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div id="committee_bar" class="committees-menu">
    <ul class="menu">
      <nav class="navbar" role="navigation" aria-label="committee navigation">
        <div class="navbar-menu is-active">
          <div class="navbar-start"></div>
          <a class='navbar-item' is-hoverable v-for="(item, index) in committees"><button @click="redirect(item.id)">{{item.title}}</button></a>
          <div class="navbar-end"></div>
        </div>
      </nav> 
    </ul>
  </div>
</template>

<script>
export default {
  name: 'committees-menu',
  data () {
    return {
      committees: null,
      loading: true,
      url: ''
    }
  },
  sockets: {
    get_committees: function (data) {
      this.committees = data
      this.loading = false
    }
  },
  beforeMount () {
    this.$socket.emit('get_committees')
  },
  methods: {
    redirect (itemId) {
      console.log(itemId)
      this.$router.push('/committee/' + itemId)
    }
  }
}

</script>

<style scoped>
  a {
    text-decoration: none;
    color: inherit;
  }

  #committee_bar {
    background-color: #ccc;
    color: #333;
    font-weight: 300;
    text-transform: uppercase;
    padding: 5px 0;
  }

  #committee_bar ul {
    list-style: none;
    text-align: center;
    padding: 0;
  }

  #committee_bar ul li {
    padding: 0 15px;
    display: inline;
  }
  .navbar {
    background-color: #ccc;
  }

  .navbar-item{
    text-align: center;
  }

  /* .navbar-menu {
    margin-left: 28vw;
    margin-right: 28vw; 
  } */

  .navbar-item:hover {
    background-color: #ccc;
  }
</style>
