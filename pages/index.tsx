import Head from 'next/head'
import {
  Heading,
  Flex,
  HStack,
  Button,
  ListItem,
  Container,
  Text,
  Input,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  ListIcon,
  List,
  Box,
  IconButton,
  VStack
} from '@chakra-ui/core'
import { VscDebugBreakpointData } from 'react-icons/vsc'
import { useEffect, useState } from 'react'
import { useMachine } from '@xstate/react'
import { FaPlay, FaStop } from 'react-icons/fa'
import fonts from '../app/fonts'
import gameMachine from '../app/machines/game'
import Board from '../app/components/Board'

export const Home = (): JSX.Element => {
  const [gameState, send] = useMachine(gameMachine)
  const [seed, setSeed] = useState({
    top: "Conway's",
    middle: 'Game of',
    bottom: 'Life'
  })
  const [lines, setLines] = useState(seed)

  useEffect(() => {
    fonts()
  }, [])

  return (
    <div className="container">
      <Head>
        <title>Conway&apos;s Game of Life</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          property="og:description"
          content="Conway's Game of Life implemented on a fragment shader"
        />
        <meta property="og:type" content="Website" />
        <meta
          name="image"
          property="og:image"
          content="https://raw.githubusercontent.com/fwesss/game-of-life/master/game-of-life.png"
        />
        <meta name="author" content="Westley Feller" />
      </Head>

      <main>
        <Container maxW="2xl" centerContent py="4">
          <Heading as="h1" fontSize="5xl" fontFamily="title" fontWeight="600">
            Conway&apos;s Game of Life
          </Heading>

          <Flex direction="column" alignItems="center">
            <HStack justifyContent="space-around" my="4" spacing="10">
              <Heading>Generation: {gameState.context.generation}</Heading>
              <HStack spacing="4">
                <Input
                  value={lines.top}
                  onChange={event =>
                    setLines({ ...lines, top: event.target.value })
                  }
                  placeholder="Top"
                />
                <Input
                  value={lines.middle}
                  onChange={event =>
                    setLines({ ...lines, middle: event.target.value })
                  }
                  placeholder="Middle"
                />
                <Input
                  value={lines.bottom}
                  onChange={event =>
                    setLines({ ...lines, bottom: event.target.value })
                  }
                  placeholder="Bottom"
                />
                <Button w="lg" onClick={() => setSeed(lines)}>
                  Generate
                </Button>
              </HStack>
            </HStack>

            <Board gameState={gameState} send={send} seed={seed} />

            <Flex justifyContent="space-around" my="4">
              <HStack w="50%" spacing="8">
                <IconButton
                  variant="ghost"
                  colorScheme="red"
                  aria-label="Stop"
                  fontSize="20px"
                  icon={<FaStop />}
                  onClick={() => send('STOP')}
                />
                <IconButton
                  variant="ghost"
                  colorScheme="teal"
                  aria-label="Play"
                  fontSize="20px"
                  icon={<FaPlay />}
                  onClick={() => send('PLAY')}
                />
              </HStack>

              <HStack w="50%" spacing={6}>
                <Box w="xl">
                  <Heading as="h3" size="lg">
                    Speed
                  </Heading>
                  <Slider
                    colorScheme="cyan"
                    defaultValue={gameState.context.speed}
                    min={1}
                    max={72}
                    size="lg"
                    aria-label="speed"
                    onChange={value => send('CHANGESPEED', { speed: value })}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </Box>
                <Box w="xl">
                  <Heading as="h3" size="lg">
                    Resolution
                  </Heading>
                  <Slider
                    defaultValue={gameState.context.resolution}
                    min={1}
                    max={16}
                    size="lg"
                    aria-label="resolution"
                    onChange={value =>
                      send('CHANGERESOLUTION', { resolution: value })
                    }
                    isReversed
                  >
                    <SliderTrack bg="teal.400">
                      <SliderFilledTrack bg="gray.200" />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </Box>
              </HStack>
            </Flex>
          </Flex>

          <Container maxW="5xl">
            <VStack alignItems="start" spacing="4">
              <Heading>Rules</Heading>
              <Text>
                For each colored pixel on the canvas, sum its eight neighbors.
              </Text>
              <List>
                <ListItem>
                  <ListIcon as={VscDebugBreakpointData} color="cyan.500" />
                  If the pixel is alive and does not have exactly 2 or 3
                  neighbors, then it dies.
                </ListItem>
                <ListItem>
                  <ListIcon as={VscDebugBreakpointData} color="cyan.500" />
                  If the pixel is dead and has exactly 3 neighbors, then it
                  comes to life.
                </ListItem>
              </List>
              <Text>
                This implementation has an additional rule that colors a pixel
                with a dimmer color if it is alive and it has 4 or more
                neighbors or 1 or 0. This simulates a dying pixel and gives the
                animation a more fluid look.
              </Text>

              <Heading>About this Algorithm</Heading>
              <Text>
                This version of Conway&apos;s Game of Life was implemented with
                one of the simplest algorithms. Check each surrounding cell, add
                up those that are alive, then use that sum to determine if a
                cell lives or dies. This isn&apos;t the fastest way to calculate
                generations so I&apos;ve used alternative methods to increase
                performance.
              </Text>
              <Text>
                Rather than implementing the game using JS and the canvas API,
                I&apos;ve used three.js to write the game in a fragment shader.
                All of the state for the game is actually stored on textures! We
                attach a texture to a plane to render it. While that texture is
                rendered, we calculate the next state of the game on another
                buffer texture. Once that buffer is finished calculating, we
                swap it onto the plane to render it.
              </Text>
              <Text>
                Shaders are processed by GPU which is much better at these kinds
                of tasks than the CPU. This allows us to run at high frame rates
                even without optimizing our algorithm. To build a shader, it
                needs to be written in GLSL (OpenGL Shader Language), then
                passed as a string to the shader along with the variables
                (uniforms) needed to run the shader program.
              </Text>
            </VStack>
          </Container>
        </Container>
      </main>
    </div>
  )
}

export default Home
