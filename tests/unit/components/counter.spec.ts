import { shallowMount, mount, VueWrapper } from '@vue/test-utils'
import Counter from '@/components/Counter.vue'

describe('Counter Component', function () {
  let wrapper = shallowMount(Counter)
  beforeEach(() => {
    wrapper = shallowMount(Counter)
  })

  test('debe de hacer match con el snapshot', function () {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('h2 debe tener el valor por defecto "Counter"', () => {
    // Expecting <h31></h31> to exist
    expect(wrapper.find('h31').exists()).toBeTruthy()
    // -- WILL FAIL

    // Getting <h2></h2> element
    const h2 = wrapper.find('h2')
    // Expecting h2 value to be Counter
    expect(h2.text()).toBe('Counter')
  })

  test('El valor por defecto debe ser 100 en el p', () => {
    // pTags
    // const lastPTagText = wrapper.findAll('p').pop()?.text()
    const lastPTagText = wrapper.find('p[data-testid="counter"]').text()

    // expect segundo p === 100
    expect(lastPTagText).toBe('100')
  })

  test('Debe incrementar y decrementar el contador', async () => {
    const [increaseBtn, decreaseBtn] = wrapper.findAll('button')

    await increaseBtn.trigger('click')
    await increaseBtn.trigger('click')
    await increaseBtn.trigger('click')
    await decreaseBtn?.trigger('click')
    await decreaseBtn?.trigger('click')

    const value = wrapper.find('p[data-testid="counter"]').text()
    expect(value).toBe('101')
  })

  test('Debe de establecer el valor por defecto', () => {
    const { start } = wrapper.props()
    const value = wrapper.find('p[data-testid="counter"]').text()
    expect(+value).toBe(start)
  })

  test('Debe de mostrar la prop title', () => {
    const wrapper = shallowMount(Counter, {
      props: { title: 'Hola Mundo' },
    })
    const { title } = wrapper.props()
    const h2 = wrapper.find('h2')
    expect(h2.text()).toBe(title)
  })
})
