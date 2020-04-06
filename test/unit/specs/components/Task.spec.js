import { shallowMount } from '@vue/test-utils'
import Task from '@/components/Task'

describe('Task.vue', () => {
  it('renders a task correctly', () => {
    const task = {
      title: 'Sample Task',
      description: 'This is the description'
    }
    const wrapper = shallowMount(Task, {
      propsData: {
        task
      }
    })
    expect(wrapper.find('.title').text()).to.equal(task.title)
    expect(wrapper.text()).to.include(task.description)
  })

  it('doesn\'t show empty notes', () => {
    const task = {
      title: 'Sample Task',
      description: 'This is the description',
      notes: []
    }
    const wrapper = shallowMount(Task, {
      propsData: {
        task
      }
    })
    expect(wrapper.find('.update').exists()).to.be.false
  })

  it('emits task when clicked', async () => {
    const task = {
      title: 'Sample Task',
      description: 'This is the description',
      notes: []
    }
    const wrapper = shallowMount(Task, {
      propsData: {
        task
      }
    })
    wrapper.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('task-clicked')).to.exist
    expect(wrapper.emitted('task-clicked')[0]).to.deep.equal([task])
  })

  it('renders notes', () => {
    const task = {
      title: 'Sample Task',
      description: 'This is the description',
      notes: [
        {
          id: 1,
          author: 'Billy',
          created_at: 'September 21, 2022',
          description: 'Wow'
        },
        {
          id: 2,
          author: 'Cletus',
          created_at: 'October 30, 2022',
          description: 'Yeehaw'
        }
      ]
    }
    const wrapper = shallowMount(Task, {
      propsData: {
        task
      }
    })
    wrapper.findAll('.update-body')
      .wrappers
      .forEach( (note, index) => {
        let originalNote = task.notes[index]
        expect(note.find('.update-name').text()).to.equal(originalNote.author)
        expect(note.find('.update-timestamp').text()).to.include(originalNote.created_at)
        expect(note.find('.update-body-text').text()).to.equal(originalNote.description)
      })
  })
})
