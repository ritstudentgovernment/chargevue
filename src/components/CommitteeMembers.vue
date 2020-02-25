<!--
  filename: CommitteeMembers.vue
  description: Component for listing members in a committee

  author: Alex Heerding <aah3099@rit.edu>
-->

<template>
  <div class="committee_members">
    <div class="title">Committee Members</div>
    <div class="divider"></div>

    <div class="member-labels">
      <div class="members">
        <div class="head">
          <span class="head-label">HEAD</span>
          <span class="head-container">{{ committeeHead }}</span>
        </div>

        <div v-for="member in members" :key="member.id">
          <span v-if="member.id != committeeHead" class="member-container">{{ member.id }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'committee-members',
  props: {
    members: {
      type: Array,
      default: []
    },
    committeeHead: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
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
  
  .member-container {
    background-color: #f36e21;
    display: inline-block;
    padding: 10px 45px 10px 45px;
    margin: 10px 0px 10px 10px;
    text-align: center;
  }

  .members {
    color: #fff;
    font-size: 14pt;
    font-weight: 300;
    display: flex;  
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .member-labels {
    padding: 10px;
    display: flex;
    flex-direction: row;
  }

  .head {
    color: #fff;
    font-size: 14pt;
    font-weight: 300;
    display: inline-block;
  }
  .head-container {
    background-color: #f36e21;
    display: inline-block;
    padding: 10px 45px 10px 45px;
    margin: 10px 0 10px 0;
    text-align: center;
  }

  .head-label {
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
</style>
