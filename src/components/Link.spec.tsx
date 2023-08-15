import { describe, it, expect, vi } from 'vitest'
import { createRenderer } from 'react-test-renderer/shallow'
import Link from './Link'
import { Props } from './Link'

const setup = (propOverrides?: Partial<Props>) => {
  const props = Object.assign(
    {
      active: false,
      children: 'All',
      setFilter: vi.fn(),
    },
    propOverrides,
  )

  const utils = createRenderer()
  utils.render(<Link {...props} />)
  const output = utils.getRenderOutput()
  return {
    props,
    output,
  }
}

describe('component', () => {
  describe('Link', () => {
    it('should render correctly', () => {
      const { output } = setup()
      expect(output.type).toBe('a')
      expect(output.props.style.cursor).toBe('pointer')
      expect(output.props.children).toBe('All')
    })

    it('should have class selected if active', () => {
      const { output } = setup({ active: true })

      expect(output.props.className).toBe('selected')
    })

    it('should call setFilter on click', () => {
      const { output, props } = setup()
      output.props.onClick()
      expect(props.setFilter).toBeCalled()
    })
  })
})
