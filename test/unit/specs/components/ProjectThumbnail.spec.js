import { shallowMount, createLocalVue } from '@vue/test-utils'
import ProjectThumbnail from '@/components/ProjectThumbnail'
import VueRouter from 'vue-router'

describe('ProjectThumbnail.vue', () => {
  it('renders charge info correctly', () => {
    const charge = {
      title: 'Charge Title',
      description: 'This is the description'
    }
    const wrapper = shallowMount(ProjectThumbnail, {
      propsData: {
        charge
      }
    })
    expect(wrapper.find('.project_thumbnail_header').text()).to.equal(charge.title)
    expect(wrapper.find('.project_thumbnail_description').text()).to.equal(charge.description)
  })

  it('redirects to correct charge', async () => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    const charge = {
      id: 1,
      title: 'Charge Title',
      description: 'This is the description'
    }
    const wrapper = shallowMount(ProjectThumbnail, {
      localVue,
      router,
      propsData: {
        charge
      }
    })
    wrapper.find('.project_thumbnail').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$route.path).to.equal(`/charge/${charge.id}`)
  })
})
