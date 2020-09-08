import * as THREE from "three"
import React, { Suspense, useState, useRef } from "react"
import ReactDOM from "react-dom"
import { Canvas, useLoader, useFrame } from "react-three-fiber"
import lerp from "lerp"
import img1 from "./img/image1.jpg"
import img2 from "./img/image2.jpg"
import disp from "./img/displacement/disp.png"
import "./shaders/Fade"
import "./styles.css"

function Image({ url1, url2, disp, ...props }) {
  const ref = useRef()
  const [hovered, setHover] = useState(false)
  const [texture1, texture2, dispTexture] = useLoader(THREE.TextureLoader, [url1, url2, disp])
  useFrame(() => (ref.current.material.dispFactor = lerp(ref.current.material.dispFactor, hovered ? 1 : 0, 0.1)))
  return (
    <mesh ref={ref} {...props} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
      <planeBufferGeometry attach="geometry" args={[8, 5]} />
      <fade attach="material" texture1={texture1} texture2={texture2} disp={dispTexture} />
    </mesh>
  )
}

ReactDOM.render(
  <Canvas>
    <Suspense fallback={null}>
      <Image url1={img1} url2={img2} disp={disp} />
    </Suspense>
  </Canvas>,
  document.getElementById("root")
)
