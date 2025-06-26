import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ChaosParticlesProps {
  count: number
  scrollProgress: React.MutableRefObject<number>
  processingPhase?: React.MutableRefObject<number>
  mousePosition: React.MutableRefObject<{ x: number; y: number }>
}

// Vertex shader with Perlin noise
const vertexShader = `
  uniform float uTime;
  uniform float uScrollProgress;
  uniform vec2 uMouse;
  uniform float uNoiseScale;
  uniform float uNoiseSpeed;
  
  attribute float aRandom;
  attribute vec3 aVelocity;
  
  varying float vDistance;
  varying float vProcessing;
  
  // Simple noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  void main() {
    vec3 pos = position;
    
    // Apply Perlin noise for chaotic movement
    float noiseX = snoise(vec2(pos.x * uNoiseScale, uTime * uNoiseSpeed + aRandom * 100.0));
    float noiseY = snoise(vec2(pos.y * uNoiseScale, uTime * uNoiseSpeed + aRandom * 200.0));
    float noiseZ = snoise(vec2(pos.z * uNoiseScale, uTime * uNoiseSpeed + aRandom * 300.0));
    
    vec3 noiseOffset = vec3(noiseX, noiseY, noiseZ) * (1.0 - uScrollProgress);
    pos += noiseOffset * 2.0;
    
    // Mouse interaction
    vec2 mouseOffset = uMouse - vec2(pos.x, pos.y) * 0.1;
    float mouseDist = length(mouseOffset);
    if (mouseDist < 5.0) {
      pos.xy += normalize(mouseOffset) * (5.0 - mouseDist) * 0.5;
    }
    
    // Processing phase - particles get drawn to engine
    if (uScrollProgress > 0.3 && uScrollProgress < 0.7) {
      float attractionForce = (uScrollProgress - 0.3) / 0.4;
      pos = mix(pos, vec3(0.0, 0.0, 0.0), attractionForce * 0.8);
      vProcessing = attractionForce;
    } else {
      vProcessing = 0.0;
    }
    
    vDistance = length(pos);
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = (50.0 / -mvPosition.z) * (1.0 + aRandom);
  }
`

// Fragment shader
const fragmentShader = `
  uniform float uScrollProgress;
  varying float vDistance;
  varying float vProcessing;
  
  void main() {
    // Circular particle shape
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    if (dist > 0.5) discard;
    
    // Color transition from red to blue during processing
    vec3 chaosColor = vec3(1.0, 0.2, 0.0); // Volcanic red
    vec3 processColor = vec3(0.0, 0.75, 1.0); // Fuerte blue
    vec3 color = mix(chaosColor, processColor, vProcessing);
    
    // Glow effect
    float strength = 1.0 - dist * 2.0;
    strength = pow(strength, 3.0);
    
    gl_FragColor = vec4(color, strength * (1.0 - uScrollProgress * 0.5));
  }
`

export default function ChaosParticles(props: ChaosParticlesProps) {
  const { count, scrollProgress, mousePosition } = props
  const meshRef = useRef<THREE.Points>(null!)
  
  // Generate initial positions and attributes
  const [positions, randoms, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const randoms = new Float32Array(count)
    const velocities = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const radius = 15 + Math.random() * 15
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      
      // Spherical distribution
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
      
      randoms[i] = Math.random()
      
      // Random velocities
      velocities[i * 3] = (Math.random() - 0.5) * 0.1
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.1
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1
    }
    
    return [positions, randoms, velocities]
  }, [count])
  
  // Update uniforms
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      if (material && material.uniforms) {
        material.uniforms.uTime.value = state.clock.elapsedTime
        material.uniforms.uScrollProgress.value = scrollProgress.current
        material.uniforms.uMouse.value.set(mousePosition.current.x, mousePosition.current.y)
      }
      
      // Rotate the entire particle system slowly
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05
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
          attach="attributes-aRandom"
          count={count}
          array={randoms}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aVelocity"
          count={count}
          array={velocities}
          itemSize={3}
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
          uMouse: { value: new THREE.Vector2() },
          uNoiseScale: { value: 0.1 },
          uNoiseSpeed: { value: 0.2 }
        }}
      />
    </points>
  )
} 