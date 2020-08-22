import { render } from '@testing-library/react'
import { FunctionComponent } from 'react'

const Providers: FunctionComponent<any> = ({ children }) => children

const customRender = (ui: JSX.Element, options = {}) =>
  render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
