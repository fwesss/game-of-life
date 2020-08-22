import * as React from 'react'
import { ChakraProvider, CSSReset } from '@chakra-ui/core'
import { FunctionComponent } from 'react'
import theme from '../app/theme'

interface AppProps {
  Component: FunctionComponent
  props?: {
    [key: string]: any
  }
}

const App: FunctionComponent<AppProps> = ({ Component, props }) => (
  <ChakraProvider theme={theme}>
    <CSSReset />
    <Component {...props} />
  </ChakraProvider>
)

export default App
