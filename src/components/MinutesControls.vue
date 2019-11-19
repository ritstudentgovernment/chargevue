<template>
  <div>
    <div class="meeting_charges">
      <div class="title">Relevant Charges</div>
      <div class='divider'></div>
      <div class='content'>
        <div v-if="currentMode !== mode.VIEW" class="control">
          <div class="select">
            <select v-model="selected_charge">
              <option v-for="x in charges" :key="x.id" v-bind:value="x">{{x.title}}</option>
            </select>
          </div>
          <button class='button is-primary' v-on:click="addCharge()">Add Charge</button>
        </div>
        <div class="charges">
          <div class='charge' v-for="charge in minute_charges" :key="charge.id">
            <span v-on:click="openCharge(charge.id)">{{charge.title}}</span>
            <i v-if="currentMode !== mode.VIEW" v-on:click="removeCharge(charge)" class="mdi mdi-close"></i>
          </div>
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
      selected_charge: null,
      minute_charges: [],
      mode: {
        VIEW: 'view',
        EDIT: 'edit',
        NEW: 'new'
      }
    }
  },
  props: ['committee_id', 'existing_charges', 'currentMode'],
  sockets: {
    get_charges: function (data) {
      this.charges = data
    }
  },
  beforeMount () {
    this.checkAuth().then((token) => {
      this.$socket.emit('get_charges', {
        token: token,
        committee_id: this.$props.committee_id
      })
    })
    this.minute_charges = this.$props.existing_charges
  },
  methods: {
    openCharge (chargeId) {
      this.$router.push({ path: '/charge/' + chargeId })
    },
    addCharge: function () {
      if (this.selected_charge && this.minute_charges.filter(c => c.id === this.selected_charge.id).length === 0) {
        this.minute_charges.push(this.selected_charge)
      }
      this.$emit('updateCharges', this.minute_charges) // sends the list of charges to Minutes.vue
    },
    removeCharge: function (charge) {
      this.minute_charges = this.minute_charges.filter(e => e !== charge)
      this.$emit('updateCharges', this.minute_charges) // sends the list of charges to Minutes.vue
    }
  }
}
</script>
<style scoped>
  @import "../../node_modules/mdi/css/materialdesignicons.css";

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

  .control{
    margin: 10px 0 10px 0;
    display: flex;
    justify-content: space-between;
  }

  .select{
    width: 100%;
  }

  select{
    width: 100%;
  }
  
  .charges div:nth-child(odd){
    background-color: #ededed;
  }

  .charge {
    font-size: 12pt;
    font-weight: 300;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  div.charge:hover{
    color: white;
    background-color: #f36e21;
  }

  .charge span {
    padding: 5px;
    margin: 5px;
    display: inline-block;
    text-align: left;
    font-weight: 700;
    cursor: pointer;
  }

  .mdi-close{
    padding: 5px;
    margin: 5px;
    font-size: 30px;
    vertical-align: middle;
    color: red;
    cursor: pointer;
  }

  .mdi-close:hover{
    color: white;
  }
</style>

