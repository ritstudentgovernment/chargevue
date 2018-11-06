<template>
  <div class="modal" v-bind:class="{ 'is-active': showAddMemberToCommitteeForm }">
    <div class="modal-background" v-on:click="closeAddMember()"></div>
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
        <button class="button is-primary" v-on:click="addMemberToCommittee()">Add
          Member</button>
        <button class="button" v-on:click="closeAddMember()">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
  import Auth from '../mixins/auth'

  export default {
    name: 'AddCommitteeMemberModal',
    mixins: [Auth],
    props: { addMemberCommittee: String },
    data () {
      return {
        showAddMemberToCommitteeForm: true,
        addMemberMember: null,
        addMemberResponse: {
          show: false,
          message: null,
          success: null
        }
      }
    },
    methods: {
      closeAddMember () {
        this.addMemberResponse.show = false
        this.addMemberResponse.message = null
        this.addMemberResponse.success = null
        this.addMemberMember = null
        this.showAddMemberToCommitteeForm = false
        this.$emit('close-add-member')
      },
      addMemberToCommittee () {
        console.log(this.addMemberMember)
        console.log(this.addMemberCommittee)
        this.$socket.emit('add_member_committee', {
          token: this.getToken(),
          user_id: this.addMemberMember,
          committee_id: this.addMemberCommittee
        })
      }
    },
    sockets: {
      add_member_committee: function (data) {
        console.log(data)
        if (data.success) {
          this.addMemberResponse.show = true
          this.addMemberResponse.success = true
          this.addMemberResponse.message = data.success
        } else if (data.error) {
          this.addMemberResponse.show = true
          this.addMemberResponse.success = false
          this.addMemberResponse.message = data.error
        }
      }
    }
  }
</script>

<style scoped>

</style>
