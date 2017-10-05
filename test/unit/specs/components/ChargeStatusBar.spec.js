import Vue from 'vue'
import ChargeStatusBar from '@/components/ChargeStatusBar'

describe('ChargeStatusBar.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(ChargeStatusBar)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.charge_status_bar').tagName)
      .to.equal('DIV')
  })
})
