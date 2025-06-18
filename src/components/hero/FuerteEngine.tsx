import React, { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Sparkles, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ChaosParticles from './ChaosParticles'
import ProcessedParticles from './ProcessedParticles'
import GridFloor from './GridFloor'
import styles from '../../styles/hero.module.css'

gsap.registerPlugin(ScrollTrigger)

// The crystalline engine at the center
function FuerteEngineCore({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const materialRef = useRef<any>(null!)
  
  // Icosahedron geometry for crystalline structure
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(3, 1)
    geo.computeVertexNormals()
    return geo
  }, [])
  
  useFrame((state) => {
    if (meshRef.current) {
      // Slow, controlled rotation
      meshRef.current.rotation.x += 0.003
      meshRef.current.rotation.y += 0.005
      
      // Pulsing effect based on scroll
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05 + scrollProgress.current * 0.2
      meshRef.current.scale.setScalar(scale)
    }
    
    if (materialRef.current) {
      // Animate transmission properties during processing
      materialRef.current.thickness = 0.5 + scrollProgress.current * 2
      materialRef.current.roughness = 0.2 - scrollProgress.current * 0.1
    }
  })
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} geometry={geometry}>
        <MeshTransmissionMaterial
          ref={materialRef}
          color="#00BFFF"
          thickness={0.5}
          roughness={0.2}
          transmission={0.99}
          ior={1.5}
          chromaticAberration={0.05}
          anisotropy={0.2}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.1}
          clearcoat={0.5}
          clearcoatRoughness={0.1}
          attenuationDistance={0.5}
          attenuationColor="#00BFFF"
        />
      </mesh>
      
      {/* Glow effect */}
      <Sparkles
        count={50}
        scale={5}
        size={2}
        speed={0.5}
        color="#00BFFF"
      />
    </Float>
  )
}

// Main scene component
function Scene() {
  const { camera } = useThree()
  const scrollProgress = useRef(0)
  const processingPhase = useRef(0)
  const mousePosition = useRef({ x: 0, y: 0 })
  
  useEffect(() => {
    // Camera initial position
    camera.position.set(0, 5, 20)
    camera.lookAt(0, 0, 0)
    
    // Scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero-section',
        start: 'top top',
        end: 'bottom center',
        scrub: 1,
        onUpdate: (self) => {
          scrollProgress.current = self.progress
          
          // Define processing phases
          if (self.progress < 0.3) {
            processingPhase.current = 0 // Chaos phase
          } else if (self.progress < 0.7) {
            processingPhase.current = 1 // Processing phase
          } else {
            processingPhase.current = 2 // Output phase
          }
        }
      }
    })
    
    // Camera movement during scroll
    tl.to(camera.position, {
      z: 10,
      y: 3,
      duration: 1,
      ease: 'power2.inOut'
    })
    
    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      tl.kill()
    }
  }, [camera])
  
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00BFFF" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#FF3300" />
      
      {/* Fog for depth */}
      <fog attach="fog" color="#0A0A10" near={10} far={50} />
      
      {/* Grid floor */}
      <GridFloor />
      
      {/* The Fuerte Engine */}
      <FuerteEngineCore scrollProgress={scrollProgress} />
      
      {/* Particle systems */}
      <ChaosParticles 
        count={5000} 
        scrollProgress={scrollProgress}
        processingPhase={processingPhase}
        mousePosition={mousePosition}
      />
      
      <ProcessedParticles
        count={2000}
        scrollProgress={scrollProgress}
        processingPhase={processingPhase}
      />
    </>
  )
}

export default function FuerteEngine() {
  const [isMobile, setIsMobile] = React.useState(false)
  
  useEffect(() => {
    // Check for mobile/low-power devices
    const checkDevice = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const isLowPower = navigator.hardwareConcurrency <= 4
      setIsMobile(isMobileDevice || isLowPower)
    }
    
    checkDevice()
  }, [])
  
  // Fallback for mobile devices
  if (isMobile) {
    return (
      <div className="hero-fallback">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero-video"
        >
          <source src="/hero-animation.mp4" type="video/mp4" />
        </video>
      </div>
    )
  }
  
  return (
    <div id="hero-section" className="hero-container">
      <Canvas
        camera={{ fov: 50 }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        className="hero-canvas"
      >
        <Scene />
      </Canvas>
      
      {/* Headline and CTA overlay */}
      <div className="hero-content">
        <h1 className="hero-headline">
          <span className="reveal-text">Structure from Chaos.</span>
          <span className="reveal-text delay-200">Alpha from Intelligence.</span>
        </h1>
        <a href="/philosophy" className={styles.heroCta}>
          Discover Our Philosophy
        </a>
      </div>
    </div>
  )
} 