<!--

filename: Admin.vue
description: Admin page

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div>
    <HeaderMenu />
      <div class="columns">
        <div class="column">
          <div class="box" id="committee_table">
            <table class="table is-fullwidth is-striped">
              <thead>
              <tr>
                <td>Committee ID</td>
                <td>Committee Name</td>
                <td>Actions</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="committee in committees">
                <td>{{ committee.id }}</td>
                <td>{{ committee.title }}</td>
                <td><button class="button edit-button is-primary" @click="openEditCommitteeForm(committee.id)">Edit</button> <button class="button is-danger">Deactivate</button></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="column">
          <div class="box" id="admin_forms">
            <aside class="menu">
              <p class="menu-label">Committee</p>
              <ul class="menu-list">
                <li><a v-on:click="showCreateCommitteeForm = true">Create Committee</a></li>
              </ul>
              <p class="menu-label">Members</p>
              <ul class="menu-list">
                <li><a v-on:click="showAddMemberToCommitteeForm = true">Add Member to Committee</a></li>
                <li><a v-on:click="showRemoveMemberFromCommitteeForm = true">Remove Member from Committee</a></li>
              </ul>
            </aside>
          </div>
        </div>
      </div>



      <div class="modal" v-bind:class="{ 'is-active': showCreateCommitteeForm }">
        <div class="modal-background" v-on:click="showCreateCommitteeForm = false"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Create Committee</p>
          </header>
          <section class="modal-card-body">
            <div class="field">
              <label class="label">Title</label>
              <div class="control">
                <input class="input" type="text" placeholder="Title" v-model="createTitle">
              </div>
            </div>

            <div class="field">
              <label class="label">Description</label>
              <div class="control">
                <input class="input" type="text" placeholder="Description" v-model="createDescription">
              </div>
            </div>

            <div class="field">
              <label class="label">Location</label>
              <div class="control">
                <input class="input" type="text" placeholder="Location" v-model="createLocation">
              </div>
            </div>

            <div class="field">
              <label class="label">Meeting Time</label>
              <div class="control">
                <input class="input" type="text" placeholder="Meeting Time" v-model="createMeetingTime">
              </div>
            </div>

            <div class="field">
              <label class="label">Committee Head</label>
              <div class="control">
                <input class="input" type="text" placeholder="Committee Head (RIT Username)" v-model="createCommitteeHead">
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-primary" v-on:click="createNewCommittee()">Create Committee</button>
            <button class="button" v-on:click="showCreateCommitteeForm = false">Cancel</button>
          </footer>
        </div>
      </div>



      <div class="modal" v-bind:class="{ 'is-active': showEditCommitteeForm }">
        <div class="modal-background" v-on:click="showEditCommitteeForm = false"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Edit Committee</p>
          </header>
          <section class="modal-card-body">
            <div class="field">
              <label class="label">Title</label>
              <div class="control">
                <input class="input" type="text" placeholder="Title" v-model="editTitle" disabled>
              </div>
            </div>

            <div class="field">
              <label class="label">Description</label>
              <div class="control">
                <input class="input" type="text" placeholder="Description" v-model="editDescription">
              </div>
            </div>

            <div class="field">
              <label class="label">Location</label>
              <div class="control">
                <input class="input" type="text" placeholder="Location" v-model="editLocation">
              </div>
            </div>

            <div class="field">
              <label class="label">Meeting Time</label>
              <div class="control">
                <input class="input" type="text" placeholder="Meeting Time" v-model="editMeetingTime">
              </div>
            </div>

            <div class="field">
              <label class="label">Committee Head</label>
              <div class="control">
                <input class="input" type="text" placeholder="Committee Head" v-model="editCommitteeHead">
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-primary">Edit Committee</button>
            <button class="button" v-on:click="showEditCommitteeForm = false">Cancel</button>
          </footer>
        </div>
      </div>



      <div class="modal" v-bind:class="{ 'is-active': showAddMemberToCommitteeForm }">
        <div class="modal-background" v-on:click="showAddMemberToCommitteeForm = false"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Add Member to Committee</p>
          </header>
          <section class="modal-card-body">
            <div class="field">
              <label class="label">Member</label>
              <div class="control">
                <input class="input" type="text" placeholder="RIT Username" v-model="addMemberMember">
              </div>
            </div>

            <div class="field">
              <label class="label">Committee</label>
              <div class="control">
                <div class="select">
                  <select v-model="addMemberCommittee">
                    <option v-for="committee in committees" v-bind:value="committee.id">{{committee.title}}</option>
                  </select>
                </div>
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-primary" v-on:click="addMemberToCommittee()">Add Member</button>
            <button class="button" v-on:click="showAddMemberToCommitteeForm = false">Cancel</button>
          </footer>
        </div>
      </div>



      <div class="modal" v-bind:class="{ 'is-active': showRemoveMemberFromCommitteeForm }">
        <div class="modal-background" v-on:click="showRemoveMemberFromCommitteeForm = false"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Remove Member from Committee</p>
          </header>
          <section class="modal-card-body">
            <div class="field">
              <label class="label">Committee</label>
              <div class="control">
                <div class="select">
                  <select v-model="removeMemberCommittee" v-on:change="generateCommitteeMembers()">
                    <option selected disabled></option>
                    <option v-for="committee in committees" v-bind:value="committee.id">{{committee.title}}</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="field" v-show="showRemoveMemberDropdown">
              <label class="label">Member</label>
              <div class="control">
                <div class="select">
                  <select v-model="removeMemberMember">
                    <option selected disabled></option>
                    <option v-for="member in members" v-bind:value="member.id">{{member.id}}</option>
                  </select>
                </div>
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-primary">Remove Member</button>
            <button class="button" v-on:click="showRemoveMemberFromCommitteeForm = false">Cancel</button>
          </footer>
        </div>
      </div>



    </div>
</template>

<script>
import HeaderMenu from '@/components/HeaderMenu.vue'
import Auth from '../mixins/auth'

export default {
  name: 'admin',
  mixins: [Auth],
  components: {
    HeaderMenu: HeaderMenu
  },
  data () {
    return {
      committees: null,
      members: null,
      showCreateCommitteeForm: false,
      showEditCommitteeForm: false,
      showAddMemberToCommitteeForm: false,
      showRemoveMemberFromCommitteeForm: false,
      showRemoveMemberDropdown: false,
      createTitle: null,
      createDescription: null,
      createLocation: null,
      createMeetingTime: null,
      createCommitteeHead: null,
      editTitle: null,
      editDescription: null,
      editLocation: null,
      editMeetingTime: null,
      editCommitteeHead: null,
      addMemberMember: null,
      addMemberCommittee: null,
      removeMemberCommittee: null,
      removeMemberMember: null
    }
  },
  methods: {
    createNewCommittee () {
      this.$socket.emit('create_committee', {
        token: localStorage.getItem('authToken'),
        title: this.createTitle,
        description: this.createDescription,
        location: this.createLocation,
        meeting_time: this.createMeetingTime,
        head: this.createCommitteeHead
      })
    },
    openEditCommitteeForm (id) {
      this.$socket.emit('get_committee', id)
    },
    addMemberToCommittee () {
      console.log(this.addMemberCommittee)
      this.$socket.emit('add_member_committee', {
        token: localStorage.getItem('authToken'),
        user_id: this.addMemberMember,
        committee_id: this.addMemberCommittee
      })
    },
    generateCommitteeMembers () {
      if (this.removeMemberCommittee) {
        this.$socket.emit('get_members', this.removeMemberCommittee)
      }
    }
  },
  sockets: {
    get_committees: function (data) {
      this.committees = data
    },
    get_committee: function (data) {
      console.log(data)
      this.editMeetingTime = data.meeting_time
      this.editTitle = data.title
      this.editDescription = data.description
      this.editLocation = data.location
      this.editCommitteeHead = data.head
      this.showEditCommitteeForm = true
    },
    create_committee: function (data) {
      console.log(data)
    },
    add_member_committee: function (data) {
      console.log(data)
    },
    get_members: function (data) {
      console.log(data)
      this.members = data.members
      this.showRemoveMemberDropdown = true
    }
  },
  beforeMount () {
    if (!(this.checkUserIsLoggedIn())) {
      this.$router.push({ path: '/' })
    }
    this.$socket.emit('get_committees')
  }
}
</script>

<style scoped>
  .columns {
    margin: 10px;
  }

  .edit-button {
    margin-right: 10px;
  }

  table {
    border-spacing: 0;
  }

  .modal-card-head {
    padding: 0 0 0 20px;
    text-align: left;
  }

  .control {
    padding-right: 20px;
  }

  ul li {
    list-style-type: none;
  }
</style>
