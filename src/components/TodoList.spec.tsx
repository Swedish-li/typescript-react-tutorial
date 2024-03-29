import { describe, it, expect, vi } from 'vitest'
import { createRenderer } from 'react-test-renderer/shallow'
import TodoList from './TodoList'
import TodoItem from './TodoItem'

const setup = () => {
  const props = {
    filteredTodos: [
      {
        text: 'Use Redux',
        completed: false,
        id: 0,
      },
      {
        text: 'Run the tests',
        completed: true,
        id: 1,
      },
    ],
    actions: {
      editTodo: vi.fn(),
      deleteTodo: vi.fn(),
      completeTodo: vi.fn(),
      completeAll: vi.fn(),
      clearCompleted: vi.fn(),
    },
  }

  const utils = createRenderer()
  utils.render(<TodoList {...props} />)
  const output = utils.getRenderOutput()

  return {
    props: props,
    output: output,
  }
}

describe('components', () => {
  describe('TodoList', () => {
    it('should render container', () => {
      const { output } = setup()
      expect(output.type).toBe('ul')
      expect(output.props.className).toBe('todo-list')
    })

    it('should render todos', () => {
      const { output, props } = setup()
      expect(output.props.children.length).toBe(2)
      output.props.children.forEach((todo: JSX.Element, i: number) => {
        expect(todo.type).toBe(TodoItem)
        expect(Number(todo.key)).toBe(props.filteredTodos[i].id)
        expect(todo.props.todo).toBe(props.filteredTodos[i])
      })
    })
  })
})
