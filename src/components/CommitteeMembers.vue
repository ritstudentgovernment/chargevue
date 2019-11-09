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
      <div class="membersbox" v-for="member in members" :key="member.id">
        <span v-if="member.role === 'CommitteeHead'" class="members-label">HEAD</span>
        <span class="members-container">{{ member.id }}</span>
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

  .membersbox {
    color: #fff;
    font-size: 14pt;
    font-weight: 300;
    display: inline-block;
    padding: 5px;
  }
  
  .members-container {
    background-color: #f36e21;
    display: inline-block;
    padding: 10px 45px 10px 45px;
    margin: 10px 0 10px 0;
    text-align: center;
  }

  .members-label {
    float: left;
    -webkit-writing-mode: vertical-rl;
    -ms-writing-mode: tb-rl;
    writing-mode: vertical-rl;
    background-color: #000;
    color: white;
    font-size: 0.7rem;
    letter-spacing: 0.05rem;
    padding: 0.2rem;
    margin: 10px 0 10px 10px;
  }

  .content {
    padding: 10px;
  }
</style>
