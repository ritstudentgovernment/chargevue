<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal()"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ formData.title }}</p>
      </header>
      <section class="modal-card-body">
        <div v-for="field in formData.fields" :key="field.name">
          <div class="field" v-if="field.type == 'String'">
            <label class="label">{{field.name}}</label>
            <div class="control">
              <input class="input" type="text" :placeholder="field.name" v-model="field.value">
            </div>
          </div>
          <div v-if="field.type == 'DateTime'">
            <label class="label">Meeting Time</label>
            <div class="field is-grouped">
              <div class="control">
                <div class="select">
                  <select v-model="field.value.day">
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
                  <select v-model="field.value.hour">
                    <option v-for="x in 12" :key="x">{{x}}</option>
                  </select>
                </div>
                <div class="select">
                  <select v-model="field.value.minute">
                    <option v-for="x in minutes" :key="x">{{x}}</option>
                  </select>
                </div>
                <div class="select">
                  <select v-model="field.value.ampm">
                    <option>AM</option>
                    <option>PM</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div v-if="field.type == 'Checkbox'" class="field checkbox">
            <input class="is-checkradio" v-model="field.value" :id="field.name" type="checkbox">
            <label class="noselect" :for="field.name">{{field.name}}</label>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary" @click="createNewCharge()">Create</button>
        <button class="button" @click="closeModal()">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ModalForms',
    mixins: [],
    props: {
      formData: Object
    },
    data () {
      return {
        minutes: ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55']
      }
    },
    methods: {
      createNewCharge () {
        this.$props.formData.visible = false
      },
      closeModal () {
        this.$props.formData.visible = false
      }
    },
    sockets: {
    }
  }
</script>

<style scoped>
.content {
  padding: 20px;
}

.field {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 20px;
}

.checkbox:not(:last-child) {
  padding-bottom: 20px;
}

.noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>