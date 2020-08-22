import * as React from 'react'
import { ChakraProvider, CSSReset } from '@chakra-ui/core'
import theme from '@chakra-ui/theme'
import { FunctionComponent } from 'react'

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
