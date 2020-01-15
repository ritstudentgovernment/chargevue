import Vue from 'vue'
import Dashboard from '@/pages/Dashboard'
import router from '@/router/index'

describe('Dashboard.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Dashboard)
    const vm = new Constructor({router}).$mount()
    expect(vm.$el.querySelector('#dashboard_title').textContent)
      .to.equal('Charges In Progress')
  })

  it('returns a function', () => {
    expect(typeof Dashboard.data).to.equal('function')
  })

  it('sets the correct default data', () => {
    const defaultData = Dashboard.data()
    expect(defaultData.title).to.equal('Charge Tracker')
  })
})
