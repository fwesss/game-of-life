import { FC, useLayoutEffect, useRef } from 'react'
import {
  Camera,
  Scene,
  Vector3,
  WebGLRenderer,
  WebGLRenderTarget,
  Texture,
  LinearFilter,
  RGBAFormat,
  FloatType,
  ClampToEdgeWrapping,
  Vector2,
  ShaderMaterial,
  PlaneBufferGeometry,
  Mesh,
  NearestFilter
} from 'three'
import { State, AnyEventObject, Interpreter } from 'xstate'

import { colorizeShader, gameOfLife, vertexShader } from './shaders'
import { GameContext } from '../machines/game'

type BoardProps = {
  send: Interpreter<GameContext, any, AnyEventObject>['send']
  gameState: State<GameContext, AnyEventObject>
  seed: {
    top: string
    middle: string
    bottom: string
  }
}

const Board: FC<BoardProps> = ({ send, gameState, seed }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    let renderTargets: { main: WebGLRenderTarget; buffer: WebGLRenderTarget }

    const size = {
      width: window.innerWidth - window.innerWidth * 0.05,
      height: window.innerHeight - window.innerHeight * 0.25
    }

    const colors = {
      main: new Vector3(135 / 255, 191 / 255, 207 / 255),
      background: new Vector3(47 / 255, 53 / 255, 65 / 255)
    }

    const scenes = {
      main: new Scene(),
      buffer: new Scene()
    }
    const renderer = new WebGLRenderer({ preserveDrawingBuffer: true })

    const renderTargetParams = {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      format: RGBAFormat,
      type: FloatType
    }

    renderTargets = {
      main: new WebGLRenderTarget(size.width, size.height, renderTargetParams),
      buffer: new WebGLRenderTarget(size.width, size.height, renderTargetParams)
    }
    const camera = new Camera()
    const mouse = { x: 0, y: 0 }
    const container = containerRef.current

    let canvas = document.getElementsByTagName('canvas')[0]
    if (canvas && canvas.parentNode) {
      canvas.parentNode.removeChild(canvas)
    }
    canvas = document.createElement('canvas')
    const startTexture = new Texture(canvas)
    canvas.width = size.width
    canvas.height = size.height

    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, 800, 800)
      ctx.font = '800 400px Raleway'
      ctx.fillStyle = 'white'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(`${seed.top}`, size.width / 2, 200)
      ctx.fillText(`${seed.middle}`, size.width / 2, 400)
      ctx.fillText(`${seed.bottom}`, size.width / 2, 600)
    }

    renderTargets.main.texture.wrapS = ClampToEdgeWrapping
    renderTargets.main.texture.wrapT = ClampToEdgeWrapping
    renderTargets.buffer.texture.wrapS = ClampToEdgeWrapping
    renderTargets.buffer.texture.wrapT = ClampToEdgeWrapping

    const [bufferUniforms, mainUniforms] = [
      {
        iResolution: {
          type: 'v2',
          value: new Vector2()
        },
        iMouse: {
          type: 'v2',
          value: new Vector2()
        },
        iBackgroundColor: {
          type: 'v3',
          value: colors.background
        },
        iMainColor: {
          type: 'v3',
          value: colors.main
        },
        iTexture: {
          type: 't',
          value: startTexture
        },
        iPixelSize: {
          type: 'f',
          value: gameState.context.resolution
        }
      },

      {
        iResolution: {
          type: 'v2',
          value: new Vector2(size.width, size.height)
        },
        iTexture: {
          type: 't',
          value: renderTargets.buffer.texture,
          minFilter: NearestFilter
        },
        iBackgroundColor: {
          type: 'v3',
          value: colors.background
        },
        iMainColor: {
          type: 'v3',
          value: colors.main
        }
      }
    ]

    const bufferMaterial = new ShaderMaterial({
      uniforms: bufferUniforms,
      vertexShader,
      fragmentShader: gameOfLife
    })

    const bufferGeometry = new PlaneBufferGeometry(2, 2)
    const bufferMesh = new Mesh(bufferGeometry, bufferMaterial)
    scenes.buffer.add(bufferMesh)
    startTexture.needsUpdate = true

    if (renderer) {
      renderer.setPixelRatio(1)
      renderer.setClearColor(0x665544, 1)
    }
    if (container) {
      container.appendChild(renderer.domElement)
    }
    camera.position.z = 1

    const mainGeometry = new PlaneBufferGeometry(2, 2)
    const mainMaterial = new ShaderMaterial({
      uniforms: mainUniforms,
      vertexShader,
      fragmentShader: colorizeShader
    })

    const mainMesh = new Mesh(mainGeometry, mainMaterial)
    scenes.main.add(mainMesh)

    if (renderer) {
      renderer.domElement.addEventListener('mousedown', event => {
        const rect = renderer.domElement.getBoundingClientRect()
        mouse.x = event.clientX - rect.left
        mouse.y = event.clientY - rect.top
        bufferUniforms.iMouse.value.x = mouse.x
        bufferUniforms.iMouse.value.y = size.height - mouse.y
      })
    }

    const onWindowResize = () => {
      if (renderer) {
        renderer.setSize(size.width, size.height)
      }

      if (mainUniforms) {
        mainUniforms.iResolution.value.x = size.width
        mainUniforms.iResolution.value.y = size.height
      }

      if (renderTargets) {
        renderTargets.main.setSize(size.width, size.height)
        renderTargets.buffer.setSize(size.width, size.height)
      }

      if (bufferUniforms) {
        bufferUniforms.iResolution.value.x = size.width
        bufferUniforms.iResolution.value.y = size.height
        bufferUniforms.iTexture.value = startTexture
      }
    }
    onWindowResize()
    window.addEventListener('resize', onWindowResize, false)

    let id: number
    let time = 0
    const render: FrameRequestCallback = () => {
      time += 1
      id = requestAnimationFrame(render)

      if (time % gameState.context.speed === 0 && renderer) {
        send('TICK', { time })
        renderer.setRenderTarget(renderTargets.main)
        renderer.render(scenes.buffer, camera)
        renderer.setRenderTarget(null)

        const temp = renderTargets.buffer
        renderTargets = { main: temp, buffer: renderTargets.main }
        if (gameState.value === 'running') {
          bufferUniforms.iTexture.value = renderTargets.buffer.texture
          mainUniforms.iTexture.value = renderTargets.main.texture
        }
        renderer.render(scenes.main, camera)
      }
    }

    render(time)

    return () => {
      cancelAnimationFrame(id)
    }
  }, [
    gameState.context.resolution,
    gameState.context.speed,
    gameState.value,
    seed.bottom,
    seed.middle,
    seed.top,
    send
  ])

  return <div ref={containerRef} />
}

export default Board
