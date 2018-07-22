<!--

filename: Charge.vue
description: Page for an indiviudual charge

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div>
    <HeaderMenu />
    <CommitteesMenu />
    <div class="charge_header">
      <div class="charge_header_text">{{ this.charge.title }}</div>
      <div class="charge_header_tag"><span>{{ this.charge.committee }}</span></div>
    </div>
    <ChargeStatusBar />
    <Purpose v-bind:chargeDesc="this.charge.description" />
    <Tasks v-bind:tasks="actions" />
  </div>
</template>

<script>
import HeaderMenu from '../components/HeaderMenu'
import CommitteesMenu from '../components/CommitteesMenu'
import ChargeStatusBar from '../components/ChargeStatusBar'
import Tasks from '../components/Tasks'
import Purpose from '../components/Purpose'

export default {
  name: 'dashboard',
  components: {
    'HeaderMenu': HeaderMenu,
    'CommitteesMenu': CommitteesMenu,
    'ChargeStatusBar': ChargeStatusBar,
    'Tasks': Tasks,
    'Purpose': Purpose
  },
  data () {
    return {
      charge: {
        title: '',
        committee: ''
      },
      actions: []
    }
  },
  sockets: {
    get_charge: function (data) {
      this.charge = data
    },
    get_actions: function (data) {
      this.actions = data
    }
  },
  beforeMount () {
    this.$socket.emit('get_charge', this.$router.history.current.params['charge'])
    this.$socket.emit('get_actions', this.$router.history.current.params['charge'])
  }
}
</script>

<style scoped>
.charge_header {
  background-color: #fff;
  text-align: center;
  padding: 20px;
}

.charge_header_text {
  font-size: 24pt;
  color: #FD9131;
  font-weight: 500;
}

.charge_header_tag {
  color: #fff;
  font-size: 12pt;
  text-transform: uppercase;
  font-weight: 400;
  margin-top: 30px;
}

.charge_header_tag span {
  background-color: #FD9131;
  padding: 5px;
}
</style>
