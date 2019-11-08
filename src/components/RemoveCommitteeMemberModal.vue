<template>
  <div class="modal is-active" >
    <div class="modal-background" v-on:click="closeRemoveMember()"></div>
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
                <option v-for="member in members" :key="member.id" v-bind:value="member.id"><span>{{member.id}}</span></option>
              </select>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary" v-on:click="removeMemberFromCommittee()">Remove Member</button>
        <button class="button" v-on:click="closeRemoveMember()">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import Auth from '../mixins/auth'

export default {
  name: 'RemoveCommitteeMemberModal',
  mixins: [Auth],
  props: {removeMemberCommittee: String, members: Array},
  data () {
    return {
      removeMemberMember: null,
      showRemoveMemberDropdown: true,
      showRemoveMemberDropdownLoading: false,
      removeMemberResponse: {
        show: false,
        message: null,
        success: null
      }
    }
  },
  methods: {
    closeRemoveMember () {
      this.removeMemberResponse.show = false
      this.removeMemberResponse.message = null
      this.removeMemberResponse.success = null
      this.removeMemberMember = null
      this.showRemoveMemberFromCommitteeForm = false
      this.$emit('close-remove-member')
    },
    removeMemberFromCommittee () {
      this.$socket.emit('remove_member_committee', {
        token: this.getToken(),
        user_id: this.removeMemberMember,
        committee_id: this.removeMemberCommittee
      })
    }
  },
  sockets: {
    remove_member_committee: function (data) {
      if (data.success) {
        this.removeMemberResponse.show = true
        this.removeMemberResponse.success = true
        this.removeMemberResponse.message = data.success
        setTimeout(() => { this.closeRemoveMember() }, 2000)
      } else if (data.error) {
        this.removeMemberResponse.show = true
        this.removeMemberResponse.success = false
        this.removeMemberResponse.message = data.error
      }
    }
  }
}
</script>
