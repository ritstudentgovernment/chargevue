<!--
  filename: CommitteeMembers.vue
  description: Component for listing members in a committee

  author: Alex Heerding <aah3099@rit.edu>
-->

<template>
  <div class = 'committee_members_list'>
    <h2 class = 'committee_members_header'>Members</h2>
    <div class = 'committee_members_member' v-for='member in members'>
      <span>{{ member }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'committee-members',
    data () {
      return {
        members: [
          'Member A',
          'Member B',
          'Member C',
          'Member D',
          'Member E',
          'Member F',
          'Member G',
          'Member H',
          'Member I',
          'Member K'
        ]
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
</style>
