import * as THREE from "three"
import { extend } from "react-three-fiber"

export default class Fade extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        effectFactor: { type: "f", value: 1.2 },
        dispFactor: { type: "f", value: 0 },
        texture1: { type: "t", value: undefined },
        texture2: { type: "t", value: undefined },
        disp: { type: "t", value: undefined }
      },
      vertexShader: `
        out vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,
      fragmentShader: `
        in vec2 vUv;
        uniform sampler2D texture1;
        uniform sampler2D texture2;
        uniform sampler2D disp;
        uniform float _rot;
        uniform float dispFactor;
        uniform float effectFactor;
        
        void main() {
          vec2 uv = vUv;
          vec4 disp = texture(disp, uv);
          vec2 distortedPosition = vec2(uv.x, uv.y + dispFactor * (disp.r*effectFactor));
          vec2 distortedPosition2 = vec2(uv.x, uv.y - (1.0 - dispFactor) * (disp.r*effectFactor));
          vec4 _texture1 = texture(texture1, distortedPosition);
          vec4 _texture2 = texture(texture2, distortedPosition2);
          vec4 finalTexture = mix(_texture1, _texture2, dispFactor);
          gl_FragColor = finalTexture;
        }`
    })
  }

  get texture1() {
    return this.uniforms.texture1.value
  }
  set texture1(v) {
    this.uniforms.texture1.value = v
  }
  get texture2() {
    return this.uniforms.texture2.value
  }
  set texture2(v) {
    this.uniforms.texture2.value = v
  }
  get disp() {
    return this.uniforms.disp.value
  }
  set disp(v) {
    this.uniforms.disp.value = v
  }
  get dispFactor() {
    return this.uniforms.dispFactor.value
  }
  set dispFactor(v) {
    this.uniforms.dispFactor.value = v
  }
}

// register element in r3f (<fade />)
extend({ Fade })
