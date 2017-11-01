<!--

filename: Admin.vue
description: Admin page

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div>
    <HeaderMenu />
      <div class="columns">
        <div class="column is-two-thirds">
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
                <td class="action-buttons"><button class="button is-primary" @click="openEditCommitteeForm(committee.id)">Edit</button> <button class="button is-primary" @click="openAddMemberToCommitteeForm(committee.id)">Add Member</button> <button class="button is-primary" @click="openRemoveMemberFromCommitteeForm(committee.id)">Remove Member</button> <button class="button is-danger">Deactivate</button></td>
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
              <label class="label">Meeting Location</label>
              <div class="control">
                <input class="input" type="text" placeholder="Meeting Location" v-model="createLocation">
              </div>
            </div>

            <label class="label">Meeting Time</label>
            <div class="field is-grouped">
              <div class="control">
                <div class="select">
                  <select v-model="createMeetingDay">
                    <option>Sunday</option>
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                  </select>
                </div>
              </div>
              <div class="control">
                <div class="select">
                  <select v-model="createMeetingHour">
                    <option v-for="x in 12">{{x}}</option>
                  </select>
                </div>
                <div class="select">
                  <select v-model="createMeetingMinute">
                    <option v-for="x in minutes">{{x}}</option>
                  </select>
                </div>
                <div class="select">
                  <select v-model="createMeetingAmPm">
                    <option>AM</option>
                    <option>PM</option>
                  </select>
                </div>
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
              <label class="label">Meeting Location</label>
              <div class="control">
                <input class="input" type="text" placeholder="Location" v-model="editLocation">
              </div>
            </div>

            <label class="label">Meeting Time</label>
            <div class="field is-grouped">
              <div class="control">
                <div class="select">
                  <select v-model="editMeetingDay">
                    <option>Sunday</option>
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                  </select>
                </div>
              </div>
              <div class="control">
                <div class="select">
                  <select v-model="editMeetingHour">
                    <option v-for="x in 12">{{x}}</option>
                  </select>
                </div>
                <div class="select">
                  <select v-model="editMeetingMinute">
                    <option v-for="x in minutes">{{x}}</option>
                  </select>
                </div>
                <div class="select">
                  <select v-model="editMeetingAmPm">
                    <option>AM</option>
                    <option>PM</option>
                  </select>
                </div>
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
            <article class="message" v-if="addMemberResponse.show" v-bind:class="addMemberResponse.success ? 'is-success' : 'is-danger'">
              <div class="message-body">{{ addMemberResponse.message }}</div>
            </article>

            <div class="field">
              <label class="label">Member</label>
              <div class="control">
                <input class="input" type="text" placeholder="RIT Username" v-model="addMemberMember">
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
            <div class="field" v-show="showRemoveMemberDropdown">
              <label class="label">Member</label>
              <div class="control">
                <div class="select" v-bind:class="{ 'is-loading': showRemoveMemberDropdownLoading }">
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
      showRemoveMemberDropdownLoading: true,
      addMemberResponse: {
        show: false,
        message: null,
        success: null
      },
      removeMemberResponse: null,
      createTitle: null,
      createDescription: null,
      createLocation: null,
      createCommitteeHead: null,
      createMeetingDay: null,
      createMeetingAmPm: null,
      createMeetingHour: null,
      createMeetingMinute: null,
      editTitle: null,
      editDescription: null,
      editLocation: null,
      editMeetingDay: null,
      editMeetingHour: null,
      editMeetingMinute: null,
      editMeetingAmPm: null,
      editCommitteeHead: null,
      addMemberMember: null,
      addMemberCommittee: null,
      removeMemberCommittee: null,
      removeMemberMember: null,
      minutes: ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55']
    }
  },
  methods: {
    createNewCommittee () {
      let time = ''
      if (this.createMeetingAmPm === 'PM') {
        time = parseInt(this.createMeetingHour) + 12
        time += '' + this.createMeetingMinute
      } else {
        time = '' + this.createMeetingHour + this.createMeetingMinute
      }

      let day = 0
      switch (this.createMeetingDay) {
        case 'Sunday':
          day = 0
          break
        case 'Monday':
          day = 1
          break
        case 'Tuesday':
          day = 2
          break
        case 'Wednesday':
          day = 3
          break
        case 'Thursday':
          day = 4
          break
        case 'Friday':
          day = 5
          break
        case 'Saturday':
          day = 6
          break
        default:
          day = 0
      }

      this.$socket.emit('create_committee', {
        token: this.getToken(),
        title: this.createTitle,
        description: this.createDescription,
        location: this.createLocation,
        meeting_time: time,
        meeting_day: day,
        head: this.createCommitteeHead
      })
    },
    openEditCommitteeForm (id) {
      this.$socket.emit('get_committee', id)
    },
    openAddMemberToCommitteeForm (id) {
      this.showAddMemberToCommitteeForm = true
      this.addMemberCommittee = id
    },
    openRemoveMemberFromCommitteeForm (id) {
      this.$socket.emit('get_members', id)
      this.showRemoveMemberFromCommitteeForm = true
      this.removeMemberCommittee = id
    },
    addMemberToCommittee () {
      console.log(this.addMemberCommittee)
      console.log(this.addMemberMember)
      this.$socket.emit('add_member_committee', {
        token: this.getToken(),
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

      let day = ''
      switch (data.meeting_day) {
        case 0:
          day = 'Sunday'
          break
        case 1:
          day = 'Monday'
          break
        case 2:
          day = 'Tuesday'
          break
        case 3:
          day = 'Wednesday'
          break
        case 4:
          day = 'Thursday'
          break
        case 5:
          day = 'Friday'
          break
        case 6:
          day = 'Saturday'
          break
        default:
          day = 'Sunday'
      }

      let hour = parseInt(data.meeting_time.substr(0, 2))
      if (hour > 12) {
        hour = hour - 12 + ''
        this.editMeetingAmPm = 'PM'
      } else {
        hour = hour + ''
        this.editMeetingAmPm = 'AM'
      }

      this.editMeetingHour = hour
      this.editMeetingMinute = data.meeting_time.substring(2, 5)
      this.editMeetingDay = day
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
      if (data.success) {
        this.addMemberResponse.show = true
        this.addMemberResponse.success = true
        this.addMemberResponse.message = data.success
      } else if (data.error) {
        this.addMemberResponse.show = true
        this.addMemberResponse.success = false
        this.addMemberResponse.message = data.error
      }
    },
    get_members: function (data) {
      this.members = data.members
      this.showRemoveMemberDropdown = true
      this.showRemoveMemberDropdownLoading = false
    }
  },
  beforeMount () {
    if (!(this.isAuthenticated())) {
      this.$router.push({ path: '/' })
    }
    this.$socket.emit('get_committees')
  }
}
</script>

<style scoped>
  .action-buttons button {
    margin-right: 10px;
  }

  .columns {
    margin: 10px;
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
