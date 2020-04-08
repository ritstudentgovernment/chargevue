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
      <div class="charge_header_text">{{ charge.title }}</div>
      <div class="charge_header_tag">
        <span><button class="redirect_button" @click="redirect('committee')">{{ charge.committee }}</button></span>
        <span v-if="charge.paw_links"><button class="redirect_button" @click="redirect('paw_links')">Paw Links</button></span>
      </div>
    </div>
    <ChargeAdmin v-if="isPrivileged" @updateCharge="updateCharge" :charge="charge"/>
    <ChargeStatusBar :actions="actions"/>
    <Purpose :chargeDesc="charge.description" :createdAt="charge.created_at" />
    <ProgressNotes @updateCharge ="updateCharge" :charge="charge" />
    <Tasks v-if="charge.committee != ''" :tasks="actions" :committee="charge.committee" />
  </div>
</template>

<script>
import ProgressNotes from '../components/ProgressNotes'
import HeaderMenu from '../components/HeaderMenu'
import CommitteesMenu from '../components/CommitteesMenu'
import ChargeStatusBar from '../components/ChargeStatusBar'
import Tasks from '../components/Tasks'
import Purpose from '../components/Purpose'
import ChargeAdmin from '../components/ChargeAdmin'
import moment from 'moment'
import { mapGetters } from 'vuex'
import Auth from '../mixins/auth'

export default {
  name: 'charge',
  mixins: [Auth],
  components: {
    'HeaderMenu': HeaderMenu,
    'CommitteesMenu': CommitteesMenu,
    'ChargeStatusBar': ChargeStatusBar,
    'Tasks': Tasks,
    'Purpose': Purpose,
    'ChargeAdmin': ChargeAdmin,
    'ProgressNotes': ProgressNotes
  },
  data () {
    return {
      charge: {
        title: '',
        committee: ''
      },
      actions: [],
      members: []
    }
  },
  sockets: {
    get_charge (data) {
      this.charge = data
      this.charge.created_at = this.charge.created_at.substring(5, 7) + '/' + this.charge.created_at.substring(8, 10) + '/' + this.charge.created_at.substring(0, 4)
    },
    get_actions (data) {
      this.actions = data
      for (let action of this.actions) {
        this.$socket.emit('get_notes', action.id)
      }
    },
    get_members (data) {
      this.members = data.error ? [] : data.members
    },
    get_notes (data) {
      if (data.length > 0) {
        for (let note of data) {
          note.created_at = moment(note.created_at).format('L @ h:mma')
        }

        for (let action of this.actions) {
          if (action.id === data[0].action) {
            this.$set(action, 'notes', data)
          }
        }
      }
    }
  },
  beforeMount () {
    let chargeId = this.$router.history.current.params['charge']
    this.updatePage(chargeId)
  },
  beforeRouteUpdate (to, from, next) {
    let chargeId = to.params['charge']
    this.updatePage(chargeId)
    next()
  },
  methods: {
    redirect (destination) {
      if (destination === 'committee') {
        this.$router.push('/committee/' + this.charge.committee)
      } else if (destination === 'paw_links') {
        if (!this.charge.paw_links.includes('https://')) {
          this.charge.paw_links = 'https://' + this.charge.paw_links
        }
        window.location.assign(this.charge.paw_links)
      }
    },
    updateCharge (updatedCharge) {
      this.charge = updatedCharge
    },
    updatePage (chargeId) {
      this.$socket.emit('get_members', this.charge.committee)
      this.checkAuth().then((token) => {
        this.$socket.emit('get_charge', {
          token: token,
          charge: chargeId
        })
        this.$socket.emit('get_actions', chargeId)
      })
    }
  },
  computed: {
    ...mapGetters([
      'admin',
      'username'
    ]),
    isPrivileged () {
      let isHead = this.members.some(member => member.id === this.username && member.role === 'CommitteeHead')
      return this.admin || isHead
    }
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
    color: #f36e21;
    font-weight: 500;
  }

  .charge_header_tag {
    color: #fff;
    font-size: 12pt;
    text-transform: uppercase;
    font-weight: 400;
    margin-top: 30px;
  }

  .redirect_button {
    border: none;
    text-transform: uppercase;
    font-size: 1em;
    font-family: 'Montserrat', Helvetica, Arial, sans-serif;
    color: #fff;
    cursor: pointer;
    background-color: #f36e21;
    padding: 5px;
  }

</style>
