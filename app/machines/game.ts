import { AnyEventObject, assign, Machine } from 'xstate'

export interface GameContext {
  generation: number
  speed: number
  resolution: number
}

const nums = [...Array(72).keys()]
const speeds = Object.fromEntries(
  nums.map((number, index) => [number + 1, nums.length - index])
)

const initialGameContext = {
  generation: 0,
  speed: speeds[24],
  resolution: 8
}

const gameMachine = Machine<GameContext>(
  {
    id: 'game',
    initial: 'running',
    context: initialGameContext,
    states: {
      running: {
        on: {
          STOP: {
            target: 'stopped',
            actions: ['resetGeneration']
          },
          TICK: {
            actions: ['incrementGeneration']
          },
          CHANGESPEED: {
            actions: ['changeSpeed', 'resetGeneration']
          },
          CHANGERESOLUTION: {
            actions: ['changeResolution', 'resetGeneration']
          }
        }
      },
      stopped: {
        on: {
          PLAY: {
            target: 'running'
          },
          CHANGESPEED: {
            actions: ['changeSpeed', 'resetGeneration']
          },
          CHANGERESOLUTION: {
            actions: ['changeResolution', 'resetGeneration']
          },
          TICK: undefined
        }
      }
    }
  },
  {
    actions: {
      resetGeneration: assign<GameContext>({ generation: 0 }),
      changeSpeed: assign<GameContext>({
        speed: (context, event: AnyEventObject) => speeds[event.speed]
      }),
      changeResolution: assign<GameContext>({
        resolution: (context, event: AnyEventObject) => event.resolution
      }),
      incrementGeneration: assign<GameContext>({
        generation: context => context.generation + 1
      })
    }
  }
)

export default gameMachine
