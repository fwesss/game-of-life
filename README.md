# [Production](https://game-of-life-eta.vercel.app/)

## Tech Stack
- Typescript
- Next.js
- three.js
- XState

## Rules

For each colored pixel on the canvas, sum its eight neighbors.
- If the pixel is alive and does not have exactly 2 or 3 neighbors, then it dies.
- If the pixel is dead and has exactly 3 neighbors, then it comes to life.

This implementation has an additional rule that colors a pixel with a dimmer color if it is alive and it has 4 or more neighbors or 1 or 0. This simulates a dying pixel and gives the animation a more fluid look.

## About this Algorithm

This version of Conway's Game of Life was implemented with one of the simplest algorithms. Check each surrounding cell, add up those that are alive, then use that sum to determine if a cell lives or dies. This isn't the fastest way to calculate generations so I've used alternative methods to increase performance.

Rather than implementing the game using JS and the canvas API, I've used three.js to write the game in a fragment shader. All of the state for the game is actually stored on textures! We attach a texture to a plane to render it. While that texture is rendered, we calculate the next state of the game on another buffer texture. Once that buffer is finished calculating, we swap it onto the plane to render it.

Shaders are processed by GPU which is much better at these kinds of tasks than the CPU. This allows us to run at high frame rates even without optimizing our algorithm. To build a shader, it needs to be written in GLSL (OpenGL Shader Language), then passed as a string to the shader along with the variables (uniforms) needed to run the shader program.
