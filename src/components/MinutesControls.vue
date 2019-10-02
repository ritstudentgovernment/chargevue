<template>
  <div>
    <div class="minutes_controls">
      <div class="title">Committee Controls</div>
      <div class='divider'></div>
      <div class='content'>
        <span><button class='button is-primary'>Delete Minutes</button></span>
        <span><button class='button is-primary'>Add Summary</button></span>
        <span><button class='button is-primary'>Add Minute Taker</button></span>
        <span><button class='button is-primary'>Publish Meeting</button></span>
      </div>
    </div>

    <div class="meeting_charges">
      <div class="title">Relevant Charges</div>
      <div class='divider'></div>
      <div class='content'>
        <div class="control">
          <div class="select">
            <select v-model="selected_charge">
              <option v-for="x in charges" :key="x">{{x.title}}</option>
            </select>
          </div>
          <button class='button is-primary'>Add Charge</button>
        </div>
        <div class='charge' v-for="charge in minute_charges" :key="charge">
          <span>{{charge}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '../mixins/auth'

export default {
  name: 'minutesControls',
  mixins: [Auth],
  data () {
    return {
      charges: [],
      selected_charge: {},
      minute_charges: []
    }
  },
  sockets: {
    get_charges: function (data) {
      this.charges = data
    }
  },
  beforeMount () {
    this.$socket.emit('get_charges', {
      token: this.getToken(),
      committee_id: this.$router.history.current.params['committee']
    })
  },
  methods: {
  }
}
</script>
<style scoped>
  .minutes_controls, .meeting_charges {
    background-color: #fff;
    border: 1px solid #ddd;
    width: 70%;
    margin: 25px auto 10px auto;
  }
  .title {
    text-align: left;
    font-size: 18pt;
    margin: 10px;
  }

  .divider {
    border-top: 1px solid #000;
  }

  .content {
    padding: 10px;
  }

  .charge {
    color: #fff;
    font-size: 14pt;
    font-weight: 300;
    display: inline-block;
    width: 25%;
  }

  .charge span {
    background-color: #f36e21;
    padding: 10px;
    margin: 10px;
    display: inline-block;
    width: 80%;
    text-align: center;
  }
</style>

