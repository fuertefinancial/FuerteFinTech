import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './philosophy.module.css'

export default function DataDeluge() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = container.offsetWidth
      canvas.height = container.offsetHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // Data stream particles
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      char: string
    }> = []
    
    const chars = '01∑∫∂∆πφ$%@#&*()[]{}/<>?+='
    
    // Create particles
    for (let i = 0; i < 200; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: Math.random() * 2 + 1,
        size: Math.random() * 14 + 8,
        opacity: Math.random() * 0.5 + 0.1,
        char: chars[Math.floor(Math.random() * chars.length)]
      })
    }
    
    // Animation loop
    let animationId: number
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 16, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Draw particles
      particles.forEach(p => {
        ctx.font = `${p.size}px 'Fira Code', monospace`
        ctx.fillStyle = `rgba(192, 192, 192, ${p.opacity})`
        ctx.fillText(p.char, p.x, p.y)
        
        // Update position
        p.x += p.vx
        p.y += p.vy
        
        // Wrap around
        if (p.y > canvas.height) {
          p.y = -20
          p.x = Math.random() * canvas.width
          p.char = chars[Math.floor(Math.random() * chars.length)]
        }
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
      })
      
      animationId = requestAnimationFrame(animate)
    }
    
    animate()
    
    // GSAP scroll animation
    gsap.to(particles, {
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true
      },
      vy: 0.5,
      opacity: 0.05,
      stagger: 0.001
    })
    
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])
  
  return (
    <div ref={containerRef} className={styles.dataDelugeContainer}>
      <canvas ref={canvasRef} className={styles.dataCanvas} />
      <div className={styles.dataOverlay}>
        <h3 className={styles.dataTitle}>MARKET DATA STREAM</h3>
        <div className={styles.dataStats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>DATA POINTS/SEC</span>
            <span className={styles.statValue}>1.2M</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>NOISE RATIO</span>
            <span className={styles.statValue}>97.3%</span>
          </div>
        </div>
      </div>
    </div>
  )
} 