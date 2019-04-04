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
            <div class="title">Meeting Charges</div>
            <div class ='buttons'>
              <button class='button is-primary' v-on:click='showAddCharge()'>Add Charge</button>
              <button class='button'>Remove Charge</button>
            </div>
            <div class='divider'></div>
            <div class='charge' v-for="charge in charges" :key="charge">
              <span>{{charge}}</span>
            </div>
        </div>

        <div class='modal' v-bind:class="{ 'is-active': showAddChargeModal }">
          <div class="modal-background" v-on:click="closeAddCharge()"></div>
          <div class='modal-card'>
            <header class='modal-card-head'>
              <p class='modal-card-title'>Add Charge</p>
            </header>
            <section class='modal-card-body'>
                <article class="message" v-if="addChargeResponse.show" v-bind:class="addChargeResponse.success ? 'is-success' : 'is-danger'">
                <div class="message-body">{{ addChargeResponse.message }}</div>
              </article>
              <div class='field'>
                <label class='label'>Charge</label>
                <input class='input' type='text' placeholder='Charge' v-model='newCharge'>
              </div>
            </section>
            <footer class='modal-card-foot'>
              <button class='button is-primary' v-on:click='addCharge()'>Add Charge</button>
              <button class='button' v-on:click='closeAddCharge()'>Cancel</button>
            </footer>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'minutesControls',
  data () {
    return {
      charges: [],
      showAddChargeModal: false,
      newCharge: '',
      addChargeResponse: {
        show: false,
        message: null,
        success: null
      }
    }
  },
  methods: {
    addCharge () {
      this.charges.push(this.newCharge)
    },
    showAddCharge () {
      this.showAddChargeModal = true
    },
    closeAddCharge () {
      this.showAddChargeModal = false
    }
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

