<!--

filename: Purpose.vue
description: Tasks

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div>

    <div class="committee_admin">
      <div class="title">Committee Controls</div>
      <div class="divider"></div>
      <div class="content">
        <button class="button is-primary" v-if="isPrivileged" @click="openAddNewCharge()">Create Charge</button>
        <button class="button is-primary" v-if="isPrivileged" @click="openAddCommitteeMember()">Add Member</button>
        <button class="button is-primary" v-if="isPrivileged" @click="openRemoveMemberFromCommitteeForm()">Remove Member</button>
        <button class="button is-primary" @click="showAddMeetingMinutes()">New Minutes</button>
      </div>
    </div>

    <div class="modal" v-bind:class="{ 'is-active': showAddNewCharge}">
      <div class="modal-background" @click="closeAddNewCharge()"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Create Charge</p>
        </header>
        <section class="modal-card-body" @keyup.enter="createNewCharge()">
          <article class="message" v-if="createChargeResponse.show" v-bind:class="createChargeResponse.success ? 'is-success' : 'is-danger'">
            <div class="message-body">{{ createChargeResponse.message }}</div>
          </article>
          <div class="field">
            <label class="label">Title</label>
            <div class="control">
              <input class="input" type="text" placeholder="Title" v-model="createChargeTitle">
            </div>
          </div>

          <div class="field">
            <label class="label">Purpose</label>
            <div class="control">
              <input class="input" type="text" placeholder="Purpose" v-model="createChargeDescription" maxlength="255">
            </div>
          </div>

          <div class = "field">
            <label class="label">Status</label>
            <div class="select">
              <select v-model="createChargeStatus">
                <option selected disabled>Select an Option</option>
                  <option value="0">In Progress</option>
                  <option value="1">Completed</option>
                  <option value="2">Indefinite</option>
              </select>
            </div>
          </div>
          
          <div class="field">
            <label class="label">PawPrints Link</label>
            <div class="control">
              <input class="input" type="text" placeholder="PawPrints Petition Link" v-model="createChargePawLink">
            </div>
          </div>

          <div class="field" style="display: inline-flex;">
            <label class="container label">Public  
              <input type="radio" class="is-primary" v-model="isPrivate" :value="false">
              <span class="radio is-primary"></span>
            </label>

            <label class="container label" style="margin-left: 25px;">Private  
              <input type="radio" class="is-primary" v-model="isPrivate" :value="true">
              <span class="radio is-primary"></span>
            </label>
          </div>
          
        </section>
        <footer class="modal-card-foot">
          <button class="button is-primary" @click="createNewCharge()">Create</button>
          <button class="button" @click="closeAddNewCharge()">Cancel</button>
        </footer>
      </div>
    </div>
    <div v-if="showAddMemberToCommitteeForm">
      <add-committee-member-modal  v-on:close-add-member="closeAddMember()" :addMemberCommittee="committee.id" :allMembers="allMembers"/>
    </div>
    <div v-if="showRemoveMemberFromCommitteeForm">
      <remove-committee-member-modal v-on:close-remove-member="closeRemoveMember()" :members="members" :removeMemberCommittee="removeMemberCommittee" />
    </div>
  </div>
</template>

<script>
import Auth from '../mixins/auth'
import AddCommitteeMember from '@/components/AddCommitteeMemberModal.vue'
import RemoveCommitteeMember from '@/components/RemoveCommitteeMemberModal.vue'

export default {
  name: 'committee-admin',
  components: {AddCommitteeMemberModal: AddCommitteeMember, RemoveCommitteeMemberModal: RemoveCommitteeMember},
  mixins: [Auth],
  props: {
    committee: {
      type: Object,
      required: true
    },
    isPrivileged: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showAddNewCharge: false,
      members: null,
      showAddMemberToCommitteeForm: false,
      showRemoveMemberFromCommitteeForm: false,
      createChargeStatus: 0,
      createChargeTitle: null,
      createChargePriority: 1,
      createChargeDescription: null,
      createChargePawLink: null,
      isPrivate: true,
      createChargeResponse: {
        show: false,
        message: null,
        success: null
      },
      allMembers: null,
      showMeetingMinutes: false
    }
  },
  methods: {
    openAddNewCharge () {
      this.showAddNewCharge = true
    },
    closeAddNewCharge () {
      this.createChargeTitle = null
      this.createChargeDescription = null
      this.createChargePriority = 1
      this.showAddNewCharge = false
      this.createChargeResponse.show = false
      this.createChargeResponse.message = null
      this.createChargeResponse.success = null
      this.isPrivate = true
    },
    createNewCharge () {
      this.$socket.emit('create_charge', {
        token: this.getToken(),
        title: this.createChargeTitle,
        committee: this.committee.id,
        status: parseInt(this.createChargeStatus),
        priority: parseInt(this.createChargePriority),
        description: this.createChargeDescription,
        paw_links: this.createChargePawLink,
        private: this.isPrivate
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
        this.$emit('chargeCreated')
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

  .button {
    margin-bottom: 5px;
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
