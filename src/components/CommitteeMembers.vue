<!--
  filename: CommitteeMembers.vue
  description: Component for listing members in a committee

  author: Alex Heerding <aah3099@rit.edu>
-->

<template>
  <div class = 'committee_members_list'>
    <div class = 'committee_members_header'>
      <h2>Members</h2>
      <h4>{{ committee.description }}</h4>
    </div>
    <div class = 'committee_members_member' v-for='member in members'>
      <span>{{ member.id }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'committee-members',
    data () {
      return {
        members: null,
        committee: {'description': 'committee'}
      }
    },
    sockets: {
      get_committee: function (data) {
        this.committee = data
      },
      get_members: function (data) {
        this.members = data.members
      }
    },
    beforeMount () {
      this.$socket.emit('get_committee', this.$router.history.current.params['committee'])
      this.$socket.emit('get_members', this.$router.history.current.params['committee'])
    },
    /* Since this component is used for each committee page, we have to
    watch for changes in the URL and update the props on the page
    when the route changes */
    watch: {
      '$route.params.committee': function (committee) {
        this.$socket.emit('get_committee', committee)
      }
    }
  }
</script>

<style scoped lang="sass">
  @import '../assets/vars.sass'

  .committee_members_list
    background-color: #fff
    width: 70%
    margin: 15px auto
    padding: 20px

  .committee_members_member
    color: #fff
    font-size: 14pt
    font-weight: 300
    display: inline-block
    width: 25%
    span
      background-color: $primary
      padding: 10px
      margin: 10px
      display: inline-block
      width: 80%
      text-align: center

  .committee_members_header
    width: 100%
    border-bottom: 1px solid #555
    color: #555
    margin-top: 0
    h4
      margin-top: 0
      margin-bottom: 1%
      font-weight: 300
    h2
      margin-bottom: 1%
      font-weight: 300
      margin-top: 0
</style>
