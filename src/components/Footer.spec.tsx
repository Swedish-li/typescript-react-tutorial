import Footer, { Props } from './Footer'
import { createRenderer } from 'react-test-renderer/shallow'
import React from 'react'
import { SHOW_COMPLETED, SHOW_ACTIVE, SHOW_ALL } from '../constants/TodoFilters'
import FilterLink from '../containers/FilterLink'

const setup = (propsOverrides?: Partial<Props>) => {
  const props = Object.assign(
    {
      activeCount: 0,
      completedCount: 0,
      onClearCompleted: jest.fn(),
    },
    propsOverrides
  )

  const renderer = createRenderer()
  renderer.render(<Footer {...props} />)
  const output = renderer.getRenderOutput()

  return {
    props,
    output,
  }
}

const getTextContent = (ele: JSX.Element): string => {
  const children: JSX.Element[] = Array.isArray(ele.props.children)
    ? ele.props.children
    : [ele.props.children]

  return children.reduce((out: string, child) => {
    return out + (child.props ? getTextContent(child) : child)
  }, '')
}

describe('components', () => {
  describe('Footer', () => {
    it('should render container', () => {
      const { output } = setup()

      expect(output.type).toBe('footer')
      expect(output.props.className).toBe('footer')
    })

    it('should display active count when 0', () => {
      const { output } = setup({ activeCount: 0 })
      const [count] = output.props.children
      expect(getTextContent(count)).toBe('No items left')
    })

    it('should display active count when above 0', () => {
      const { output } = setup({ activeCount: 1 })
      const [count] = output.props.children

      expect(getTextContent(count)).toBe('1 item left')
    })

    it('should render filters', () => {
      const todoFilters = [SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED]
      const filterTitles = ['All', 'Active', 'Completed']

      const { output } = setup()

      const [, filters] = output.props.children
      expect(filters.type).toBe('ul')
      expect(filters.props.className).toBe('filters')
      expect(filters.props.children.length).toBe(3)
      filters.props.children.forEach((filter: JSX.Element, i: number) => {
        expect(filter.type).toBe('li')
        const a = filter.props.children
        expect(a.type).toBe(FilterLink)
        expect(a.props.filter).toBe(todoFilters[i])
        expect(a.props.children).toBe(filterTitles[i])
      })
    })

    it('shouldnt show clear button when no completed todos', () => {
      const { output } = setup()
      const [, , clear] = output.props.children
      expect(clear).toBe(false)
    })

    it('should render clear button when completed todos', () => {
      const { output } = setup({ completedCount: 1 })
      const [, , clear] = output.props.children
      expect(clear.type).toBe('button')
      expect(clear.props.className).toBe('clear-completed')
      expect(clear.props.children).toBe('Clear Completed')
    })

    it('should call onClearCompleted on clear button click', () => {
      const { props, output } = setup({ completedCount: 1 })
      const [, , clear] = output.props.children
      clear.props.onClick()

      expect(props.onClearCompleted).toBeCalled()
    })
  })
})
