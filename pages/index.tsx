import Head from 'next/head'
import { Heading } from '@chakra-ui/core'
import { useEffect } from 'react'
import fonts from '../app/fonts'

export const Home = (): JSX.Element => {
  useEffect(() => {
    fonts()
  }, [])

  return (
    <div className="container">
      <Head>
        <title>Conway&apos;s Game of Life</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Heading as="h1" fontSize="5xl" fontFamily="title" fontWeight="600">
          Conway&apos;s Game of Life
        </Heading>
      </main>
    </div>
  )
}

export default Home
