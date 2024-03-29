import { describe, it, expect } from 'vitest'
import { createRenderer } from 'react-test-renderer/shallow'
import App from './App'
import Header from './containers/Header'
import MainSection from './containers/MainSection'

const setup = () => {
  const renderer = createRenderer()
  renderer.render(<App />)
  const output = renderer.getRenderOutput()
  return output
}

describe('components', () => {
  describe('Header', () => {
    it('should render', () => {
      const output = setup()
      const [heaer] = output.props.children
      expect(heaer.type).toBe(Header)
    })
  })

  describe('MainSection', () => {
    it('should render', () => {
      const output = setup()
      const [, mainSection] = output.props.children
      expect(mainSection.type).toBe(MainSection)
    })
  })
})
