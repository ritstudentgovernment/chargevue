import Vue from 'vue'
import CommitteeOverview from '@/components/CommitteeOverview'

describe('CommitteeOverview.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(CommitteeOverview)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.column').tagName)
      .to.equal('DIV')
  })
})
