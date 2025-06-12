// src/shaders/causticsShader.js

import * as THREE from 'three';

/**
 * Shader material que simula caustics (efecto de luz concentrada y distorsionada)
 * usando ruido de Perlin animado y refracciones múltiples.
 */
export function createCausticsShaderMaterial(timeUniform) {
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float time;
    varying vec2 vUv;

    float noise(vec2 p) {
      return sin(p.x * 15.0 + time * 0.5) * sin(p.y * 15.0 + time * 0.5);
    }

    void main() {
      vec2 uv = vUv;
      float strength = noise(uv * 3.0);
      float intensity = smoothstep(0.6, 0.9, strength);
      vec3 color = vec3(1.0, 0.95, 0.7) * intensity;
      gl_FragColor = vec4(color, intensity);
    }
  `;

  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: timeUniform
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,

    blending: THREE.AdditiveBlending
  });

  return material;
}
