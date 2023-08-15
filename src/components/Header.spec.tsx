import { describe, it, expect, vi } from 'vitest'
import { createRenderer } from 'react-test-renderer/shallow'
import Header from './Header'
import TodoTextInput from '../components/TodoTextInput'

const setup = () => {
  const props = {
    addTodo: vi.fn(),
  }

  const utils = createRenderer()
  utils.render(<Header {...props} />)
  const output = utils.getRenderOutput()

  return {
    props,
    output,
    utils,
  }
}

describe('components', () => {
  describe('Header', () => {
    it('should render correctly', () => {
      const { output } = setup()
      expect(output.type).toBe('header')
      expect(output.props.className).toBe('header')

      const [h1, input] = output.props.children
      expect(h1.type).toBe('h1')
      expect(h1.props.children).toBe('todos')
      expect(input.type).toBe(TodoTextInput)
      expect(input.props.newTodo).toBe(true)
      expect(input.props.placeholder).toBe('What needs to be done?')
    })

    it('should call addTodo if length of text is greater than 0', () => {
      const { output, props } = setup()
      const input = output.props.children[1] as TodoTextInput
      input.props.onSave('')
      expect(props.addTodo).not.toBeCalled()
      input.props.onSave('Use Redux')
      expect(props.addTodo).toBeCalled()
    })
  })
})
