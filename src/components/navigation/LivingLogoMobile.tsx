import React, { useRef, useEffect } from 'react'
import styles from './navigation.module.css'

export default function LivingLogoMobile() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas size
    canvas.width = 40
    canvas.height = 40
    
    let time = 0
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw "F" shape
      ctx.save()
      ctx.translate(20, 20)
      
      // Pulsing glow effect
      const pulse = Math.sin(time * 0.002) * 0.3 + 0.7
      
      // Glow
      ctx.shadowBlur = 10 * pulse
      ctx.shadowColor = '#00BFFF'
      
      // Draw F
      ctx.fillStyle = '#00BFFF'
      ctx.beginPath()
      ctx.moveTo(-8, -12)
      ctx.lineTo(-8, 12)
      ctx.lineTo(8, 12)
      ctx.lineTo(8, 8)
      ctx.lineTo(-4, 8)
      ctx.lineTo(-4, 2)
      ctx.lineTo(4, 2)
      ctx.lineTo(4, -2)
      ctx.lineTo(-4, -2)
      ctx.lineTo(-4, -12)
      ctx.closePath()
      ctx.fill()
      
      ctx.restore()
      
      time += 16
      animationRef.current = requestAnimationFrame(draw)
    }
    
    draw()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])
  
  return (
    <canvas 
      ref={canvasRef}
      className={styles.livingLogoMobile}
    />
  )
} 