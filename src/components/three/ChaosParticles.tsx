import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface ParticlesProps {
  count: number
  chaos: number
}

function Particles({ count, chaos }: ParticlesProps) {
  const ref = useRef<THREE.Points>(null!)
  const particlesRef = useRef<Float32Array>()
  
  // Generate random particle positions
  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      // Initial chaotic positions
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50
      
      // Random velocities for chaos
      velocities[i * 3] = (Math.random() - 0.5) * chaos
      velocities[i * 3 + 1] = (Math.random() - 0.5) * chaos
      velocities[i * 3 + 2] = (Math.random() - 0.5) * chaos
    }
    
    particlesRef.current = positions
    return [positions, velocities]
  }, [count, chaos])
  
  // Animate particles from chaos to order
  useFrame((state, delta) => {
    if (!ref.current || !particlesRef.current) return
    
    const positions = ref.current.geometry.attributes.position.array as Float32Array
    const time = state.clock.elapsedTime
    
    for (let i = 0; i < count; i++) {
      const idx = i * 3
      
      // Chaos phase (first 3 seconds)
      if (time < 3) {
        positions[idx] += velocities[idx] * delta
        positions[idx + 1] += velocities[idx + 1] * delta
        positions[idx + 2] += velocities[idx + 2] * delta
        
        // Boundary check
        for (let j = 0; j < 3; j++) {
          if (Math.abs(positions[idx + j]) > 25) {
            velocities[idx + j] *= -1
          }
        }
      } 
      // Transition phase (3-6 seconds)
      else if (time < 6) {
        const t = (time - 3) / 3 // 0 to 1
        const radius = 15
        const angle = (i / count) * Math.PI * 2
        
        // Lerp from chaos to orbital positions
        const targetX = Math.cos(angle) * radius
        const targetY = Math.sin(angle) * radius
        const targetZ = (i / count - 0.5) * 10
        
        positions[idx] += (targetX - positions[idx]) * t * delta * 2
        positions[idx + 1] += (targetY - positions[idx + 1]) * t * delta * 2
        positions[idx + 2] += (targetZ - positions[idx + 2]) * t * delta * 2
      }
      // Order phase (after 6 seconds)
      else {
        const radius = 15
        const angle = (i / count) * Math.PI * 2 + time * 0.1
        
        positions[idx] = Math.cos(angle) * radius
        positions[idx + 1] = Math.sin(angle) * radius
        positions[idx + 2] = (i / count - 0.5) * 10 + Math.sin(time + i * 0.1) * 2
      }
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true
    ref.current.rotation.y = time * 0.05
  })
  
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00BFFF"
        size={0.5}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

export default function ChaosParticles() {
  return (
    <div className="chaos-particles-container">
      <Canvas
        camera={{ position: [0, 0, 50], fov: 75 }}
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'transparent'
        }}
      >
        <ambientLight intensity={0.5} />
        <Particles count={5000} chaos={2} />
        
        {/* Secondary particle system for volcanic red */}
        <group rotation={[0, Math.PI / 4, 0]}>
          <Points positions={new Float32Array(1000 * 3)} stride={3}>
            <PointMaterial
              transparent
              color="#FF3300"
              size={0.3}
              sizeAttenuation={true}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </Points>
        </group>
      </Canvas>
    </div>
  )
} 