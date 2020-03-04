import { shallowMount } from '@vue/test-utils'
import Modal from '@/components/Modal'

describe('Modal.vue', () => {
  it('shows success response message', () => {
    const wrapper = shallowMount(Modal, {
      propsData: {
        responseSuccess: true,
        responseMessage: 'Hello, World!'
      }
    })
    expect(wrapper.find('.message').classes()).to.include('is-success')
    expect(wrapper.find('.message-body').text()).to.equal('Hello, World!')
  })

  it('shows error response message', () => {
    const wrapper = shallowMount(Modal, {
      propsData: {
        responseSuccess: false,
        responseMessage: 'Goodbye, World!'
      }
    })
    expect(wrapper.find('.message').classes()).to.include('is-danger')
    expect(wrapper.find('.message-body').text()).to.equal('Goodbye, World!')
  })

  it('is visible to user', () => {
    const wrapper = shallowMount(Modal, {
      propsData: {
        showModal: true
      }
    })
    expect(wrapper.find('.modal').classes()).to.include('is-active')
  })

  it('does not display empty message', () => {
    const wrapper = shallowMount(Modal, {
      propsData: {
        responseMessage: ''
      }
    })
    expect(wrapper.find('message').exists()).to.be.false
  })

  it('emits close event when background is clicked', async () => {
    const wrapper = shallowMount(Modal, {
      propsData: {
        showModal: true
      }
    })
    wrapper.find('.modal-background').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('close-modal')).to.exist
  })

  it('emits close event when button is clicked', async () => {
    const wrapper = shallowMount(Modal, {
      propsData: {
        showModal: true
      }
    })
    wrapper.find('.modal-close').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('close-modal')).to.exist
  })
})
