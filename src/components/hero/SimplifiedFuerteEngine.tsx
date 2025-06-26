import React, { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Icosahedron, Environment } from '@react-three/drei'
import * as THREE from 'three'

// Simplified particle count for mobile
const MOBILE_PARTICLE_COUNT = 1000

function SimplifiedParticles() {
  const meshRef = useRef<THREE.Points>(null!)
  
  // Generate particle positions
  const positions = React.useMemo(() => {
    const positions = new Float32Array(MOBILE_PARTICLE_COUNT * 3)
    for (let i = 0; i < MOBILE_PARTICLE_COUNT; i++) {
      const radius = 10 + Math.random() * 10
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
    }
    return positions
  }, [])
  
  // Simple rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })
  
  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={MOBILE_PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={3}
        color="#FF3300"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function SimplifiedEngine() {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })
  
  return (
    <Icosahedron ref={meshRef} args={[2, 1]}>
      <meshPhysicalMaterial
        color="#00BFFF"
        metalness={0.8}
        roughness={0.2}
        transmission={0.5}
        thickness={0.5}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={0}
      />
    </Icosahedron>
  )
}

export default function SimplifiedFuerteEngine() {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        gl={{ 
          antialias: false, // Disable for performance
          powerPreference: 'high-performance',
          alpha: true 
        }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
      >
        <color attach="background" args={['#0A0A10']} />
        <fog attach="fog" args={['#0A0A10', 10, 30]} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <Suspense fallback={null}>
          <SimplifiedParticles />
          <SimplifiedEngine />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  )
} 