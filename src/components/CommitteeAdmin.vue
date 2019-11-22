<!--

filename: Purpose.vue
description: Tasks

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div>
    <ModalForms v-if="this.formData.visible" :formData="this.formData" />
    <div class="committee_admin">
      <div class="title">Committee Controls</div>
      <div class="divider"></div>
      <div class="content">
        <button class="button is-primary" @click="openAddNewCharge()">Create Charge</button>
        <button class="button is-primary" @click="openAddCommitteeMember()">Add Member</button>
        <button class="button is-primary" @click="openRemoveMemberFromCommitteeForm()">Remove Member</button>
        <button class="button is-primary" @click="showAddMeetingMinutes()">New Minutes</button>
      </div>
    </div>
    <div v-if="showAddMemberToCommitteeForm">
      <add-committee-member-modal  v-on:close-add-member="closeAddMember()" v-bind:addMemberCommittee="this.committee.id" v-bind:allMembers="this.allMembers"/>
    </div>
    <div v-if="showRemoveMemberFromCommitteeForm">
      <remove-committee-member-modal v-on:close-remove-member="closeRemoveMember()" v-bind:members = "this.members" v-bind:removeMemberCommittee = "this.removeMemberCommittee" />
    </div>
  </div>
</template>

<script>
import Auth from '../mixins/auth'
import AddCommitteeMember from '@/components/AddCommitteeMemberModal.vue'
import RemoveCommitteeMember from '@/components/RemoveCommitteeMemberModal.vue'
import ModalForms from '../components/ModalForms'

export default {
  name: 'committee-admin',
  components: {AddCommitteeMemberModal: AddCommitteeMember, RemoveCommitteeMemberModal: RemoveCommitteeMember, 'ModalForms': ModalForms},
  mixins: [Auth],
  props: ['committee'],
  data () {
    return {
      showAddNewCharge: false,
      members: null,
      showAddMemberToCommitteeForm: false,
      showRemoveMemberFromCommitteeForm: false,
      createChargeTitle: null,
      createChargePriority: 1,
      createChargeDescription: null,
      createChargePawLink: null,
      isPrivate: null,
      createChargeResponse: {
        show: false,
        message: null,
        success: null
      },
      allMembers: null,
      showMeetingMinutes: false,
      formData: Object
    }
  },
  methods: {
    openAddNewCharge () {
      this.formData = {
        'visible': true,
        'title': 'Create Charge',
        'fields': [
          {
            'name': 'Title',
            'type': 'String',
            'value': ''
          },
          {
            'name': 'Description',
            'type': 'String',
            'value': ''
          },
          {
            'name': 'PawPrints Link',
            'type': 'String',
            'value': ''
          },
          {
            'name': 'Private',
            'type': 'Checkbox',
            'value': true
          }
        ]
      }
    },
    createNewCharge () {
      this.$socket.emit('create_charge', {
        token: this.getToken(),
        title: this.createChargeTitle,
        committee: this.committee.id,
        priority: parseInt(this.createChargePriority),
        description: this.createChargeDescription,
        paw_links: this.createChargePawLink,
        private: !(this.isPrivate) // The logic of the checkbox is backwards intentionally
      })
    },
    openAddCommitteeMember () {
      this.$socket.emit('get_all_users')
    },
    openRemoveMemberFromCommitteeForm () {
      this.$socket.emit('get_members', this.committee.id)
      this.removeMemberCommittee = this.committee.id
      this.showRemoveMemberFromCommitteeForm = true
    },
    closeAddMember () {
      this.showAddMemberToCommitteeForm = false
    },
    closeRemoveMember () {
      this.showRemoveMemberFromCommitteeForm = false
    },
    showAddMeetingMinutes () {
      this.$router.push({
        path: '/minute/new',
        query: { committee_id: this.committee.id }
      })
    }
  },
  sockets: {
    create_charge: function (data) {
      if (data.success) {
        this.createChargeResponse.show = true
        this.createChargeResponse.success = true
        this.createChargeResponse.message = data.success
        setTimeout(() => { this.closeAddNewCharge() }, 2000)
      } else if (data.error) {
        this.createChargeResponse.show = true
        this.createChargeResponse.success = false
        this.createChargeResponse.message = data.error
      }
    },
    get_members: function (data) {
      this.members = data.members
    },
    get_all_users: function (data) {
      this.allMembers = data
      this.showAddMemberToCommitteeForm = true
    }
  }
}
</script>

<style scoped>
  .committee_admin {
    background-color: #fff;
    border: 1px solid #ddd;
    width: 70%;
    margin: 25px auto 10px auto;
  }

  .title {
    text-align: left;
    font-size: 18pt;
    margin: 10px;
    color: #000;
  }

  .divider {
    border-top: 1px solid #000;
  }

  .content {
    padding: 20px;
  }

  .field {
    padding-right: 20px;
  }
  
</style>
