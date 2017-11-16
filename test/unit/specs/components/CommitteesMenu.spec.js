import Vue from 'vue'
import CommitteesMenu from '@/components/CommitteesMenu'

describe('CommitteesMenu.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(CommitteesMenu)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.menu').tagName)
      .to.equal('UL')
  })

  describe('Sockets', () => {
    it('Should have correct data', () => {
      expect(typeof CommitteesMenu.sockets.get_committees).to.equal('function')
    })
  })
})
