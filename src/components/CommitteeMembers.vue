<!--
  filename: CommitteeMembers.vue
  description: Component for listing members in a committee

  author: Alex Heerding <aah3099@rit.edu>
-->

<template>
  <div class="committee_members">
    <div class="title">Committee Members</div>
    <div class="divider"></div>
    <div class="content">
      <div class="head" :key="committee.head">
        <span>{{ committee.head }}</span>
      </div>
      <div class="member" v-for="member in members" :key="member.id">
        <span>{{ member.id }}</span>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'committee-members',
  data () {
    return {
      members: null,
      committee: {
        'description': 'committee',
        'head': ''
      }
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
    this.$socket.emit('get_members', this.$router.history.current.params['committee'])
    this.$socket.emit('get_committee', this.$router.history.current.params['committee'])
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

<style scoped>
  .committee_members {
    background-color: #fff;
    border: 1px solid #ddd;
    width: 70%;
    margin: 25px auto 10px auto;
  }

  .title {
    text-align: left;
    font-size: 18pt;
    margin: 10px;
  }

  .divider {
    border-top: 1px solid #000;
  }

  .member {
    color: #fff;
    font-size: 14pt;
    font-weight: 300;
    display: inline-block;
    width: 25%;
  }

  .member span {
    background-color: #f36e21;
    padding: 10px;
    margin: 10px;
    display: inline-block;
    width: 80%;
    text-align: center;
  }

  .head {
    color: #fff;
    font-size: 14pt;
    font-weight: 300;
    display: inline-block;
    width: 25%;
  }
  .head span {
    background-color: grey;
    padding: 10px;
    margin: 10px;
    display: inline-block;
    width: 80%;
    text-align: center;
  }

  .content {
    padding: 10px;
  }
</style>
