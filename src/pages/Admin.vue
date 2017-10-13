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
                <td><button class="button edit-button is-primary" @click="openEditCommitteeForm(committee.id)">Edit</button> <button class="button is-danger">Delete</button></td>
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
                <li><a>Add Member to Committee</a></li>
                <li><a>Remove Member from Committee</a></li>
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
                <input class="input" type="time" placeholder="Meeting Time" v-model="createMeetingTime">
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
              <label class="label">Meeting Time (Current Time: {{this.hours}}:{{this.minutes}} {{this.twelvehour}})</label>
              <div class="control">
                <input class="input" type="time" placeholder="Meeting Time" v-model="editMeetingTime">
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




    </div>
</template>

<script>
  import HeaderMenu from '@/components/HeaderMenu.vue'

  export default {
    name: 'admin',
    components: {
      HeaderMenu: HeaderMenu
    },
    data () {
      return {
        committees: null,
        showCreateCommitteeForm: false,
        showEditCommitteeForm: false,
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
        hours: null,
        minutes: null,
        twelvehour: null
      }
    },
    methods: {
      createNewCommittee () {
        this.$socket.emit('create_committee', {
          token: localStorage.getItem('authToken'),
          title: this.createTitle,
          description: this.createDescription,
          location: this.createLocation,
          meeting_time: new Date(1, 1, 1, this.createMeetingTime),
          head: this.createCommitteeHead
        })
        console.log(new Date(1, 1, 1, this.createMeetingTime).getHours())
      },
      openEditCommitteeForm (id) {
        this.$socket.emit('get_committee', id)
      }
    },
    sockets: {
      get_committees: function (data) {
        this.committees = data
      },
      get_committee: function (data) {
        console.log(data)
        let time = new Date(data.meeting_time)
        this.hours = time.getHours()
        this.minutes = time.getMinutes()

        if (this.hours > 11) {
          this.hours = this.hours - 11
          this.twelvehour = 'PM'
        } else {
          this.hours--
          this.twelvehour = 'AM'
        }

        if (this.minutes === 0) {
          this.minutes = '00'
        }

        this.editTitle = data.title
        this.editDescription = data.description
        this.editLocation = data.location
        this.editCommitteeHead = data.head
        this.showEditCommitteeForm = true
      },
      create_committee: function (data) {
        console.log(data)
      }
    },
    beforeMount () {
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
