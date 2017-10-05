import Vue from 'vue'
import Carousel from '@/components/Carousel'

describe('Carousel.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Carousel)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#carousel').tagName)
      .to.equal('DIV')
  })
})
