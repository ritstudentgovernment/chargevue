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
    export default {
      name: 'AddCommitteeMemberModal'
    }
</script>

<style scoped>

</style>
