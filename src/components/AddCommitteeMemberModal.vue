<template>
  <div class="modal is-clipped" v-bind:class="{ 'is-active': showAddMemberToCommitteeForm }">
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
            <vue-simple-suggest
                v-model="addMemberMember"
                :list="this.memberSuggestions()"
                :filter-by-query="true"
                :min-length="1">
              </vue-simple-suggest>
          </div>
        </div>

        <label class="label">Role</label>
        <div class="control">
          <div class="select">
            <select v-model="addMemberRole">
              <option selected disabled>Select an Option</option>
              <option value="NormalMember">Normal Member</option>
              <option value="ActiveMember">Active Member</option>
              <option value="MinuteTaker">Minute Taker</option>
            </select>
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
  import VueSimpleSuggest from 'vue-simple-suggest/dist/cjs'
  import 'vue-simple-suggest/dist/styles.css'

  export default {
    name: 'AddCommitteeMemberModal',
    mixins: [Auth],
    props: { addMemberCommittee: String, allMembers: Array },
    components: {
      'VueSimpleSuggest': VueSimpleSuggest
    },
    data () {
      document.documentElement.style.overflow = 'hidden'
      return {
        showAddMemberToCommitteeForm: true,
        addMemberMember: null,
        addMemberRole: null,
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
        this.addMemberRole = null
        this.showAddMemberToCommitteeForm = false
        document.documentElement.style.overflow = 'visible'
        this.$emit('close-add-member')
      },
      memberSuggestions () {
        var members = []
        this.$props.allMembers.forEach((member) => {
          members.push(`${member.name} (${member.username})`)
        })
        return members
      },
      addMemberToCommittee () {
        // switch to id if username
        this.$socket.emit('add_member_committee', {
          token: this.getToken(),
          user_id: this.addMemberMember.match(/\(([^)]+)\)/)[1],
          committee_id: this.addMemberCommittee,
          role: this.addMemberRole
        })
      }
    },
    sockets: {
      add_member_committee: function (data) {
        if (data.success) {
          this.addMemberResponse.show = true
          this.addMemberResponse.success = true
          this.addMemberResponse.message = data.success
          setTimeout(() => { this.closeAddMember() }, 2000)
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
  .modal-card{
    overflow: visible;
  }
  .modal-card-body{
    overflow: visible;
  }
  .vue-simple-suggest.designed .input-wrapper input{
    font-display: 'Montserrat', Helvetica, Arial, sans-serif !important;
    font-size: 1rem !important;
  }

  .vue-simple-suggest.designed .suggestions{
    max-height: 200px;
    overflow-y: auto;
  }

  .select{
    margin-bottom: 10%;
  }
</style>
