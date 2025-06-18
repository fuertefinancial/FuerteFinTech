import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ProcessedParticlesProps {
  count: number
  scrollProgress: React.MutableRefObject<number>
  processingPhase: React.MutableRefObject<number>
}

// Vertex shader for processed particles
const vertexShader = `
  uniform float uTime;
  uniform float uScrollProgress;
  uniform float uPhase;
  
  attribute float aOffset;
  attribute float aSpeed;
  
  varying float vAlpha;
  varying float vBrightness;
  
  void main() {
    vec3 pos = position;
    
    // Only show particles after processing phase
    float visibility = smoothstep(0.5, 0.7, uScrollProgress);
    
    if (visibility > 0.0) {
      // Spiral motion for processed particles
      float angle = uTime * aSpeed + aOffset * 6.28318;
      float radius = 5.0 + aOffset * 10.0;
      float height = (uTime * 0.5 + aOffset * 10.0);
      
      // Create ascending spiral
      pos.x = cos(angle) * radius * visibility;
      pos.z = sin(angle) * radius * visibility;
      pos.y = mod(height, 20.0) - 10.0;
      
      // Fade in/out based on height
      vAlpha = visibility * (1.0 - smoothstep(8.0, 10.0, abs(pos.y)));
      vBrightness = 0.5 + 0.5 * sin(uTime * 3.0 + aOffset * 10.0);
    } else {
      vAlpha = 0.0;
      vBrightness = 0.0;
    }
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = (30.0 / -mvPosition.z) * (1.0 + aOffset * 0.5);
  }
`

// Fragment shader for metallic appearance
const fragmentShader = `
  uniform float uTime;
  varying float vAlpha;
  varying float vBrightness;
  
  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    if (dist > 0.5) discard;
    
    // Metallic silver color with variations
    vec3 baseColor = vec3(0.75, 0.75, 0.75); // Metallic silver
    vec3 highlightColor = vec3(1.0, 1.0, 1.0); // White highlights
    vec3 color = mix(baseColor, highlightColor, vBrightness);
    
    // Soft glow
    float strength = 1.0 - dist * 2.0;
    strength = pow(strength, 2.0);
    
    gl_FragColor = vec4(color, strength * vAlpha);
  }
`

export default function ProcessedParticles(props: ProcessedParticlesProps) {
  const { count, scrollProgress, processingPhase } = props
  const meshRef = useRef<THREE.Points>(null!)
  
  // Generate attributes
  const [positions, offsets, speeds] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const offsets = new Float32Array(count)
    const speeds = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      // Initial positions (will be overridden in shader)
      positions[i * 3] = 0
      positions[i * 3 + 1] = 0
      positions[i * 3 + 2] = 0
      
      offsets[i] = i / count
      speeds[i] = 0.5 + Math.random() * 0.5
    }
    
    return [positions, offsets, speeds]
  }, [count])
  
  // Update uniforms
  useFrame((state) => {
    if (meshRef.current) {
      const uniforms = meshRef.current.material.uniforms
      uniforms.uTime.value = state.clock.elapsedTime
      uniforms.uScrollProgress.value = scrollProgress.current
      uniforms.uPhase.value = processingPhase.current
    }
  })
  
  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aOffset"
          count={count}
          array={offsets}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aSpeed"
          count={count}
          array={speeds}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uScrollProgress: { value: 0 },
          uPhase: { value: 0 }
        }}
      />
    </points>
  )
} 