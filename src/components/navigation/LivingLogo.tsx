import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { useRouter } from 'next/router'
import styles from './navigation.module.css'

export default function LivingLogo() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const logoMeshRef = useRef<THREE.Mesh>()
  const particlesRef = useRef<THREE.Points>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const frameRef = useRef<number>()
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    if (!mountRef.current) return
    
    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      1, // Square aspect ratio
      0.1,
      100
    )
    camera.position.z = 3
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'low-power'
    })
    renderer.setSize(40, 40)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    rendererRef.current = renderer
    mountRef.current.appendChild(renderer.domElement)
    
    // Create geometric "F" logo
    const createFuerteF = () => {
      const shape = new THREE.Shape()
      
      // Draw "F" shape
      shape.moveTo(-0.4, -0.6)
      shape.lineTo(-0.4, 0.6)
      shape.lineTo(0.4, 0.6)
      shape.lineTo(0.4, 0.4)
      shape.lineTo(-0.2, 0.4)
      shape.lineTo(-0.2, 0.1)
      shape.lineTo(0.2, 0.1)
      shape.lineTo(0.2, -0.1)
      shape.lineTo(-0.2, -0.1)
      shape.lineTo(-0.2, -0.6)
      shape.closePath()
      
      const extrudeSettings = {
        depth: 0.2,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 1,
        bevelSize: 0.02,
        bevelThickness: 0.02
      }
      
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
      geometry.center()
      
      return geometry
    }
    
    // Create logo mesh
    const logoGeometry = createFuerteF()
    const logoMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x00BFFF,
      metalness: 0.8,
      roughness: 0.2,
      transmission: 0.5,
      thickness: 0.5,
      emissive: 0x00BFFF,
      emissiveIntensity: 0.1,
      transparent: true,
      opacity: 1
    })
    
    const logo = new THREE.Mesh(logoGeometry, logoMaterial)
    logoMeshRef.current = logo
    scene.add(logo)
    
    // Add rim light
    const rimLight = new THREE.DirectionalLight(0x00BFFF, 2)
    rimLight.position.set(1, 1, 2)
    scene.add(rimLight)
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5)
    scene.add(ambientLight)
    
    // Create particles for transitions
    const particleCount = 100
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2
      
      colors[i * 3] = 0
      colors[i * 3 + 1] = 0.75
      colors[i * 3 + 2] = 1
    }
    
    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0
    })
    
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    particlesRef.current = particles
    scene.add(particles)
    
    // Animation variables
    let time = 0
    let pulsePhase = 0
    let hoverRotation = 0
    let targetHoverRotation = 0
    
    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)
      time += 0.01
      
      if (logoMeshRef.current && !isLoading) {
        // Idle pulsing glow
        pulsePhase = Math.sin(time * 0.5) * 0.5 + 0.5
        const material = logoMeshRef.current.material as THREE.MeshPhysicalMaterial
        material.emissiveIntensity = 0.1 + pulsePhase * 0.1
        
        // Subtle idle rotation
        logoMeshRef.current.rotation.y = Math.sin(time * 0.3) * 0.1
        
        // Hover rotation
        targetHoverRotation = isHovered ? Math.PI * 0.25 : 0
        hoverRotation += (targetHoverRotation - hoverRotation) * 0.1
        logoMeshRef.current.rotation.y += hoverRotation
        
        // Hover scale
        const targetScale = isHovered ? 1.1 : 1
        logoMeshRef.current.scale.lerp(
          new THREE.Vector3(targetScale, targetScale, targetScale),
          0.1
        )
      }
      
      // Loading state animation
      if (isLoading && particlesRef.current && logoMeshRef.current) {
        const material = logoMeshRef.current.material as THREE.MeshPhysicalMaterial
        material.opacity = Math.max(0, material.opacity - 0.05)
        
        const particleMat = particlesRef.current.material as THREE.PointsMaterial
        particleMat.opacity = Math.min(1, particleMat.opacity + 0.05)
        
        // Animate particles outward
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] *= 1.05
          positions[i + 1] *= 1.05
          positions[i + 2] *= 1.05
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true
        
        particlesRef.current.rotation.y += 0.02
      }
      
      renderer.render(scene, camera)
    }
    
    animate()
    
    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [isHovered, isLoading])
  
  // Handle navigation loading states
  useEffect(() => {
    const handleStart = () => setIsLoading(true)
    const handleComplete = () => {
      setIsLoading(false)
      // Reset particles
      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] = (Math.random() - 0.5) * 2
          positions[i + 1] = (Math.random() - 0.5) * 2
          positions[i + 2] = (Math.random() - 0.5) * 2
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true
        
        const material = particlesRef.current.material as THREE.PointsMaterial
        material.opacity = 0
      }
      
      // Reset logo opacity
      if (logoMeshRef.current) {
        const material = logoMeshRef.current.material as THREE.MeshPhysicalMaterial
        material.opacity = 1
      }
    }
    
    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)
    
    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])
  
  return (
    <div 
      ref={mountRef}
      className={styles.livingLogo}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  )
} 