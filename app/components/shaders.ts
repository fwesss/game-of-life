export const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`

export const colorizeShader = `
  uniform vec2 iResolution;
  uniform sampler2D iTexture;
  uniform vec3 iBackgroundColor;
  uniform vec3 iMainColor;

  void main() {
    vec2 uv = gl_FragCoord.xy / iResolution;
    gl_FragColor = vec4(mix(iBackgroundColor, iMainColor, texture2D(iTexture, uv).r), 1.0);
  }
`

export const gameOfLife = `
  uniform vec2 iResolution;
  uniform vec2 iMouse;
  uniform sampler2D iTexture;
  uniform float iPixelSize;

  vec2 pos;
  vec2 texColor;
  vec2 offset;
  
  void main() {
    pos = vec2(floor(gl_FragCoord.x / iPixelSize) * iPixelSize + iPixelSize / 2.0, floor(gl_FragCoord.y / iPixelSize) * iPixelSize + iPixelSize / 2.0);

    vec3 color = texture2D(iTexture, pos / iResolution).rgb;

    float neighbors = 0.0;
    for(float y = -1.0; y<=1.0; y++) {
      for(float x = -1.0; x<=1.0; x++) {
        neighbors += step(0.5, texture2D(iTexture, (pos + vec2(x * iPixelSize, y * iPixelSize)) / iResolution).r);
      }
    }

    float status = step(0.5, color.r);
    neighbors -= status;

    // Dying
    if(status == 1.0 && (neighbors >= 4.0 || neighbors <= 1.0)) {
      color = vec3(0.3);
    }

    // Birth
    else if(status == 0.0 && neighbors == 3.0) {
      color = vec3(1.0);
    }
    
    else if(floor(pos / iPixelSize) == floor(iMouse / iPixelSize)) {
      color = vec3(1.0);
    }

    // Stasis
    else color = vec3(status);
    
    gl_FragColor = vec4(color, 1.0);
  }
`
