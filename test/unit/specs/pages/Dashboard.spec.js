import Vue from 'vue'
import Dashboard from '@/pages/Dashboard'

describe('Dashboard.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Dashboard)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#dashboard_title').textContent)
      .to.equal('Projects In Progress')
  })
})
