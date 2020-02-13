<template>
  <div class="add-task modal" :class="{ 'is-active': showModal }">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content">
      <div class="box">
        <article class="message" v-if="responseMessage" :class="responseSuccess ? 'is-success' : 'is-danger'">
          <div class="message-body">{{ responseMessage }}</div>
        </article>
        
        <slot></slot>

        <slot name="footer"></slot>
      </div>
    </div>
    <button class="modal-close is-large" @click="closeModal"></button>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    closeModal: {
      type: Function,
      required: true
    },
    showModal: {
      type: Boolean,
      default: false
    },
    responseMessage: {
      type: String,
      default: ''
    },
    responseSuccess: {
      type: Boolean,
      default: true
    }
  }
}
</script>