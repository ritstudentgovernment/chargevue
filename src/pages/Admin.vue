<!--

filename: Admin.vue
description: Admin page

author: Gabe Landau & Matthew Castronova <gll1872@rit.edu>

-->

<template>
  <div>
    <HeaderMenu />
    <div class="box" id="admin_forms">
      <h3 class="title is-3">Actions</h3>
      <button class="button is-primary" v-on:click="showCreateCommitteeForm = true">Create Committee</button>
    </div>

    <div class="box" id="committee_table">
      <h3 class="title is-3">Manage Committees</h3>
      <table class="table is-fullwidth is-striped">
        <thead>
        <tr>
          <th>Committee ID</th>
          <th>Committee Name</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="committee in committees" :key="committee.id">
          <td>{{ committee.id }}</td>
          <td>{{ committee.title }}</td>
          <td class="action-buttons">
            <button class="button is-primary" @click="openEditCommitteeForm(committee.id)">Edit</button>
            <button class="button is-primary" @click="openAddMemberToCommitteeForm(committee.id)">Add Member</button>
            <button class="button is-primary" @click="openRemoveMemberFromCommitteeForm(committee.id)">Remove Member</button>
            <button v-if="committee.enabled" class="button is-danger" @click="deactivateCommittee(committee.id)">Deactivate</button>
            <button v-if="!committee.enabled" class="button reactivate" @click="activateCommittee(committee.id)">Reactivate</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="modal" v-bind:class="{ 'is-active': editCommitteeResponse.show }">
      <div class="modal-background" v-on:click="closeEditResponse()"></div>
      <div class="modal-card">
      <article class="message" v-if="editCommitteeResponse.show" v-bind:class="editCommitteeResponse.success ? 'is-success' : 'is-danger'">
        <div class="message-body">{{ editCommitteeResponse.message }}</div>
      </article>
      </div>
    </div>

    <div class="modal" v-bind:class="{ 'is-active': showCreateCommitteeForm }">
        <div class="modal-background" v-on:click="closeCreateCommittee()"></div>
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
                    <option v-for="x in 12" :key="x">{{x}}</option>
                  </select>
                </div>
                <div class="select">
                  <select v-model="createMeetingMinute">
                    <option v-for="x in minutes" :key="x">{{x}}</option>
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
                <input class="file-input" type="file" @change="createFileSelected($event.target.files)">
                <span class="file-cta"><span class="file-label">Choose a file...</span></span>
                <span class="file-name">{{createImageName}}</span>
              </label>
            </div>

          </section>
          <footer class="modal-card-foot">
            <button class="button is-primary" v-on:click="createNewCommittee()" v-bind:class="{ 'is-loading' : createDisabled }">Create Committee</button>
            <button class="button" v-on:click="closeCreateCommittee()">Cancel</button>
          </footer>
        </div>
      </div>

    <div class="modal" v-bind:class="{ 'is-active': showEditCommitteeForm }">
        <div class="modal-background" v-on:click="closeEditCommitteeForm()"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Edit Committee</p>
          </header>
          <section class="modal-card-body" @keyup.enter="editCommittee()">
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
                    <option v-for="x in 12" :key="x">{{x}}</option>
                  </select>
                </div>
                <div class="select">
                  <select v-model="editMeetingMinute">
                    <option v-for="x in minutes" :key="x">{{x}}</option>
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

            <label class="label">Committee Image</label>
            <div class="file has-name">
              <label class="file-label">
                <input class="file-input" type="file" @change="editFileSelected($event.target.files)">
                <span class="file-cta"><span class="file-label">Choose a file...</span></span>
                <span class="file-name">{{editImageName}}</span>
              </label>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-primary" v-on:click="editCommittee()" v-bind:class="{ 'is-loading' : editDisabled }">Edit Committee</button>
            <button class="button" v-on:click="showEditCommitteeForm = false">Cancel</button>
          </footer>
        </div>
      </div>

    <div v-if="showAddMemberToCommitteeForm">
      <add-committee-member-modal  v-on:close-add-member="closeAddMember()" v-bind:addMemberCommittee="this.addMemberCommittee" v-bind:allMembers="this.allMembers"/>
    </div>
    <div v-if="showRemoveMemberFromCommitteeForm">
      <remove-committee-member-modal v-on:close-remove-member="closeRemoveMember()" v-bind:members = "this.members" v-bind:removeMemberCommittee = "this.removeMemberCommittee"/>
    </div>
  </div>
</template>

<script>
import HeaderMenu from '@/components/HeaderMenu.vue'
import AddCommitteeMember from '@/components/AddCommitteeMemberModal.vue'
import RemoveCommitteeMember from '@/components/RemoveCommitteeMemberModal.vue'
import Auth from '../mixins/auth'
import Base64 from '../mixins/base64'
import Time from '../mixins/time'

export default {
  name: 'admin',
  mixins: [Auth, Base64, Time],
  components: {
    HeaderMenu: HeaderMenu,
    AddCommitteeMemberModal: AddCommitteeMember,
    RemoveCommitteeMemberModal: RemoveCommitteeMember
  },
  data () {
    return {
      committees: null,
      members: null,
      allMembers: null,
      addMemberCommittee: null,
      showCreateCommitteeForm: false,
      showEditCommitteeForm: false,
      showAddMemberToCommitteeForm: false,
      showRemoveMemberFromCommitteeForm: false,
      createCommitteeResponse: {
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
      editDisabled: null,
      editTitle: null,
      editDescription: null,
      editLocation: null,
      editMeetingDay: null,
      editMeetingHour: null,
      editMeetingMinute: null,
      editMeetingAmPm: null,
      editCommitteeHead: null,
      editImage: null,
      editImageName: '(no file selected)',
      removeMemberCommittee: null,
      minutes: ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55']
    }
  },
  methods: {
    createFileSelected (file) {
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
    editFileSelected (file) {
      this.editDisabled = true

      this.editImageName = file[file.length - 1].name
      this.convert(file).then((image) => {
        this.editImage = image
        this.editDisabled = false
      }).catch((error) => {
        this.editDisabled = false
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
    closeCreateCommittee () {
      this.createTitle = null
      this.createDescription = null
      this.createLocation = null
      this.createCommitteeHead = null
      this.createMeetingDay = null
      this.createMeetingAmPm = null
      this.createMeetingHour = null
      this.createMeetingMinute = null
      this.createImage = null
      this.createImageName = '(no file selected)'
      this.createCommitteeResponse.show = false
      this.showCreateCommitteeForm = false
    },
    editCommittee () {
      this.editCommitteeResponse.show = false
      let timeDateObj = this.convertFrontendToBackend(this.editMeetingAmPm, this.editMeetingHour, this.editMeetingMinute, this.editMeetingDay)
      let time = timeDateObj.time
      let day = timeDateObj.day

      if (this.editImage) {
        this.$socket.emit('edit_committee', {
          token: this.getToken(),
          id: this.editTitle.toLowerCase(),
          description: this.editDescription,
          location: this.editLocation,
          meeting_time: time,
          meeting_day: day,
          head: this.editCommitteeHead,
          committee_img: this.editImage
        })
      } else {
        this.$socket.emit('edit_committee', {
          token: this.getToken(),
          id: this.editTitle.toLowerCase().replace(/\s/g, ''),
          description: this.editDescription,
          location: this.editLocation,
          meeting_time: time,
          meeting_day: day,
          head: this.editCommitteeHead
        })
      }

      this.showEditCommitteeForm = false
    },
    deactivateCommittee (id) {
      this.$socket.emit('edit_committee', {
        token: this.getToken(),
        id: id,
        enabled: false
      })
    },
    activateCommittee (id) {
      this.$socket.emit('edit_committee', {
        token: this.getToken(),
        id: id,
        enabled: true
      })
    },
    openEditCommitteeForm (id) {
      this.$socket.emit('get_committee', id)
      this.showEditCommitteeForm = true
    },
    openAddMemberToCommitteeForm (id) {
      this.addMemberCommittee = id
      this.$socket.emit('get_all_users')
    },
    openRemoveMemberFromCommitteeForm (id) {
      this.$socket.emit('get_members', id)
      this.removeMemberCommittee = id
      this.showRemoveMemberFromCommitteeForm = true
    },
    closeEditCommitteeForm () {
      this.showEditCommitteeForm = false
      this.editCommitteeResponse.show = false
    },
    closeEditResponse () {
      this.editCommitteeResponse.show = false
    },
    closeAddMember () {
      this.showAddMemberToCommitteeForm = false
    },
    closeRemoveMember () {
      this.showRemoveMemberFromCommitteeForm = false
    }
  },
  sockets: {
    get_committees: function (data) {
      this.committees = data
    },
    get_committee: function (data) {
      let dateTimeObj = this.convertBackendToFrontend(data.meeting_day, data.meeting_time)

      this.editMeetingHour = dateTimeObj.hour
      this.editMeetingMinute = dateTimeObj.minute
      this.editMeetingDay = dateTimeObj.day
      this.editMeetingAmPm = dateTimeObj.ampm
      this.editTitle = data.title
      this.editDescription = data.description
      this.editLocation = data.location
      this.editCommitteeHead = data.head
    },
    create_committee: function (data) {
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
    get_members: function (data) {
      this.members = data.members
      // this.showRemoveMemberFromCommitteeForm = true
      // this.showRemoveMemberDropdown = true
      // this.showRemoveMemberDropdownLoading = false
      // this.removeMemberCommittee = id
    },
    get_all_users: function (data) {
      this.allMembers = data
      this.showAddMemberToCommitteeForm = true
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
  .box {
    margin: 20px;
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

  .reactivate {
    background-color: hsl(141, 71%, 48%);
  }

  .is-one-quarter {
    width: 20%;
  }

  .action-buttons {
    width: 32vw;
  }

  .action-buttons .button {
    margin: 0.25vw 0.1vw;
  }

</style>
