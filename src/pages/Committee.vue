<template>
  <div class="dashboard">
    <Header />
    <p>Page name: {{ this.committee.friendlyname }}</p>
  </div>
</template>

<script>
import CommitteeInfo from '../mixins/committeeinfo'
import Header from '../components/Header'

export default {
  name: 'dashboard',
  mixins: [CommitteeInfo],
  components: {
    'Header': Header
  },
  data () {
    return {
      committee: this.getCommitteeInfo(this.$route.params.committee)
    }
  }
}
</script>

<style scoped>

</style>
