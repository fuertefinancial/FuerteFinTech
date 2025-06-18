import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function GridFloor() {
  const gridRef = useRef<THREE.GridHelper>(null!)
  
  useFrame((state) => {
    if (gridRef.current) {
      // Subtle pulsing effect
      const intensity = 0.3 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      ;(gridRef.current.material as THREE.Material).opacity = intensity
    }
  })
  
  return (
    <>
      {/* Main grid */}
      <gridHelper
        ref={gridRef}
        args={[100, 50, '#00BFFF', '#00BFFF']}
        position={[0, -5, 0]}
        material-transparent={true}
        material-opacity={0.3}
      />
      
      {/* Secondary finer grid */}
      <gridHelper
        args={[100, 100, '#00BFFF', '#00BFFF']}
        position={[0, -5.01, 0]}
        material-transparent={true}
        material-opacity={0.1}
      />
      
      {/* Plane for reflection effect */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5.02, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial
          color="#0A0A10"
          transparent
          opacity={0.8}
        />
      </mesh>
    </>
  )
} 