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
            <h3 class="title is-3">Manage Committees</h3>
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
      </div>
      <div class="columns">
        <div class="column">
          <div class="box" id="admin_forms">
            <h3 class="title is-3">Actions</h3>
            <button class="button is-primary" v-on:click="showCreateCommitteeForm = true">Create Committee</button>
          </div>
        </div>
        <div class="column is-two-thirds">
          <div class="box">
            <h3 class="title is-3">Committees</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam viverra nibh eu faucibus feugiat. Proin gravida nibh neque, aliquam gravida erat rutrum vel. Integer urna elit, tincidunt et ornare quis, bibendum nec massa. Proin nunc metus, ultrices eu purus quis, ornare commodo dolor. Vivamus et risus eu ipsum suscipit vestibulum. Etiam rhoncus nisl sit amet porttitor dignissim. Phasellus convallis erat at felis hendrerit, in vehicula est dapibus. Sed vulputate finibus libero et tristique. Nullam dignissim eu ipsum vel faucibus.</p>
          </div>
        </div>
      </div>



      <div class="modal" v-bind:class="{ 'is-active': showCreateCommitteeForm }">
        <div class="modal-background" v-on:click="showCreateCommitteeForm = false"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Create Committee</p>
          </header>
          <section class="modal-card-body" @keyup.enter="createNewCommittee()">
            <article class="message" v-if="createCommitteeResponse.show" v-bind:class="createCommitteeResponse.success ? 'is-success' : 'is-danger'">
              <div class="message-body">{{ createCommitteeResponse.message }}</div>
            </article>

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

            <label class="label">Committee Image</label>
            <div class="file has-name">
              <label class="file-label">
                <input class="file-input" type="file" @change="fileSelected($event.target.files)">
                <span class="file-cta"><span class="file-label">Choose a file...</span></span>
                <span class="file-name">{{createImageName}}</span>
              </label>
            </div>

          </section>
          <footer class="modal-card-foot">
            <button class="button is-primary" v-on:click="createNewCommittee()" v-bind:class="{ 'is-loading' : createDisabled }">Create Committee</button>
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
          <section class="modal-card-body" @keyup.enter="editCommittee()">
            <article class="message" v-if="editCommitteeResponse.show" v-bind:class="editCommitteeResponse.success ? 'is-success' : 'is-danger'">
              <div class="message-body">{{ editCommitteeResponse.message }}</div>
            </article>

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
            <button class="button is-primary" v-on:click="editCommittee()">Edit Committee</button>
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
          <section class="modal-card-body" @keyup.enter="addMemberToCommittee()">
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
          <section class="modal-card-body" @keyup.enter="removeMemberFromCommittee()">
            <article class="message" v-if="removeMemberResponse.show" v-bind:class="removeMemberResponse.success ? 'is-success' : 'is-danger'">
              <div class="message-body">{{ removeMemberResponse.message }}</div>
            </article>

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
            <button class="button is-primary" v-on:click="removeMemberFromCommittee()">Remove Member</button>
            <button class="button" v-on:click="showRemoveMemberFromCommitteeForm = false">Cancel</button>
          </footer>
        </div>
      </div>



    </div>
</template>

<script>
import HeaderMenu from '@/components/HeaderMenu.vue'
import Auth from '../mixins/auth'
import Base64 from '../mixins/base64'
import Time from '../mixins/time'

export default {
  name: 'admin',
  mixins: [Auth, Base64, Time],
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
      createCommitteeResponse: {
        show: false,
        message: null,
        success: null
      },
      addMemberResponse: {
        show: false,
        message: null,
        success: null
      },
      removeMemberResponse: {
        show: false,
        message: null,
        success: null
      },
      editCommitteeResponse: {
        show: false,
        message: null,
        success: null
      },
      createTitle: null,
      createDescription: null,
      createLocation: null,
      createCommitteeHead: null,
      createMeetingDay: null,
      createMeetingAmPm: null,
      createMeetingHour: null,
      createMeetingMinute: null,
      createImage: null,
      createImageName: '(no file selected)',
      createDisabled: null,
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
    fileSelected (file) {
      this.createDisabled = true

      this.createImageName = file[file.length - 1].name
      this.convert(file).then((image) => {
        this.createImage = image
        this.createDisabled = false
      }).catch((error) => {
        this.createDisabled = false
        console.log(error)
      })
    },
    createNewCommittee () {
      let timeDateObj = this.convertFrontendToBackend(this.createMeetingAmPm, this.createMeetingHour, this.createMeetingMinute, this.createMeetingDay)
      let time = timeDateObj.time
      let day = timeDateObj.day

      if (this.createImage) {
        this.$socket.emit('create_committee', {
          token: this.getToken(),
          title: this.createTitle,
          description: this.createDescription,
          location: this.createLocation,
          meeting_time: time,
          meeting_day: day,
          head: this.createCommitteeHead,
          committee_img: this.createImage
        })
      } else {
        this.$socket.emit('create_committee', {
          token: this.getToken(),
          title: this.createTitle,
          description: this.createDescription,
          location: this.createLocation,
          meeting_time: time,
          meeting_day: day,
          head: this.createCommitteeHead
        })
      }
    },
    editCommittee () {
      this.editCommitteeResponse.show = false
      let timeDateObj = this.convertFrontendToBackend(this.editMeetingAmPm, this.editMeetingHour, this.editMeetingMinute, this.editMeetingDay)
      let time = timeDateObj.time
      let day = timeDateObj.day

      this.$socket.emit('edit_committee', {
        token: this.getToken(),
        id: this.editTitle.toLowerCase(),
        description: this.editDescription,
        location: this.editLocation,
        meeting_time: time,
        meeting_day: day,
        head: this.editCommitteeHead
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
    removeMemberFromCommittee () {
      console.log(this.removeMemberCommittee)
      console.log(this.removeMemberMember)
      this.$socket.emit('remove_member_committee', {
        token: this.getToken(),
        user_id: this.removeMemberMember,
        committee_id: this.removeMemberCommittee
      })
    }
  },
  sockets: {
    get_committees: function (data) {
      this.committees = data
    },
    get_committee: function (data) {
      console.log(data)

      let dateTimeObj = this.convertBackendToFrontend(data.meeting_day, data.meeting_time)

      this.editMeetingHour = dateTimeObj.hour
      this.editMeetingMinute = dateTimeObj.minute
      this.editMeetingDay = dateTimeObj.day
      this.editMeetingAmPm = dateTimeObj.ampm
      this.editTitle = data.title
      this.editDescription = data.description
      this.editLocation = data.location
      this.editCommitteeHead = data.head
      this.showEditCommitteeForm = true
    },
    create_committee: function (data) {
      console.log(data)
      if (data.success) {
        this.createCommitteeResponse.show = true
        this.createCommitteeResponse.success = true
        this.createCommitteeResponse.message = data.success
      } else if (data.error) {
        this.createCommitteeResponse.show = true
        this.createCommitteeResponse.success = false
        this.createCommitteeResponse.message = data.error
      }
    },
    edit_committee: function (data) {
      console.log(data)
      if (data.success) {
        this.editCommitteeResponse.show = true
        this.editCommitteeResponse.success = true
        this.editCommitteeResponse.message = data.success
      } else if (data.error) {
        this.editCommitteeResponse.show = true
        this.editCommitteeResponse.success = false
        this.editCommitteeResponse.message = data.error
      }
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
    remove_member_committee: function (data) {
      console.log(data)
      if (data.success) {
        this.removeMemberResponse.show = true
        this.removeMemberResponse.success = true
        this.removeMemberResponse.message = data.success
      } else if (data.error) {
        this.removeMemberResponse.show = true
        this.removeMemberResponse.success = false
        this.removeMemberResponse.message = data.error
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

  .file-name {
    display: inherit;
  }
</style>
