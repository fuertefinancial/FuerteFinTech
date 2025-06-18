import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './philosophy.module.css'

export default function QuantitativeRigor() {
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
    
    // Neural network structure
    const layers = [
      { nodes: 5, x: 150 },
      { nodes: 8, x: 350 },
      { nodes: 6, x: 550 },
      { nodes: 3, x: 750 }
    ]
    
    // Calculate node positions
    const nodes: Array<{ x: number; y: number; layer: number; index: number }> = []
    layers.forEach((layer, layerIndex) => {
      const spacing = canvas.height / (layer.nodes + 1)
      for (let i = 0; i < layer.nodes; i++) {
        nodes.push({
          x: layer.x,
          y: spacing * (i + 1),
          layer: layerIndex,
          index: i
        })
      }
    })
    
    // Draw connections
    function drawConnections(progress: number = 1) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw mathematical formulas in background
      ctx.font = '12px Fira Code'
      ctx.fillStyle = 'rgba(192, 192, 192, 0.1)'
      const formulas = [
        '∂E/∂w = -η∑δxᵢ',
        '∇f(x) = lim h→0',
        'σ(z) = 1/(1+e⁻ᶻ)',
        'E[X] = ∫xf(x)dx'
      ]
      formulas.forEach((formula, i) => {
        ctx.fillText(formula, 50 + i * 200, 50 + i * 100)
      })
      
      // Draw connections with animation
      for (let l = 0; l < layers.length - 1; l++) {
        const currentLayer = nodes.filter(n => n.layer === l)
        const nextLayer = nodes.filter(n => n.layer === l + 1)
        
        currentLayer.forEach(node1 => {
          nextLayer.forEach(node2 => {
            const distance = Math.sqrt(
              Math.pow(node2.x - node1.x, 2) + 
              Math.pow(node2.y - node1.y, 2)
            )
            const maxDistance = Math.sqrt(
              Math.pow(200, 2) + 
              Math.pow(canvas.height, 2)
            )
            const normalizedDistance = distance / maxDistance
            
            ctx.beginPath()
            ctx.moveTo(node1.x, node1.y)
            
            // Animate line drawing
            const endX = node1.x + (node2.x - node1.x) * progress
            const endY = node1.y + (node2.y - node1.y) * progress
            ctx.lineTo(endX, endY)
            
            // Color based on "weight"
            const weight = Math.sin(node1.index + node2.index) * 0.5 + 0.5
            ctx.strokeStyle = `rgba(0, 191, 255, ${weight * 0.3 * progress})`
            ctx.lineWidth = weight * 2
            ctx.stroke()
          })
        })
      }
      
      // Draw nodes
      nodes.forEach((node, i) => {
        // Node glow
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, 20
        )
        gradient.addColorStop(0, `rgba(0, 191, 255, ${0.8 * progress})`)
        gradient.addColorStop(1, 'rgba(0, 191, 255, 0)')
        
        ctx.beginPath()
        ctx.arc(node.x, node.y, 20 * progress, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
        
        // Node center
        ctx.beginPath()
        ctx.arc(node.x, node.y, 8 * progress, 0, Math.PI * 2)
        ctx.fillStyle = '#00BFFF'
        ctx.fill()
        
        // Pulsing data
        if (progress > 0.5) {
          const pulseSize = 3 + Math.sin(Date.now() * 0.003 + i) * 2
          ctx.beginPath()
          ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
          ctx.fill()
        }
      })
    }
    
    // Animation with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
        onUpdate: (self) => {
          drawConnections(self.progress)
        }
      }
    })
    
    // Initial draw
    drawConnections(0)
    
    // Continuous animation for pulsing
    let animationId: number
    const animate = () => {
      const st = ScrollTrigger.getById(container.id)
      if (st) {
        drawConnections(st.progress)
      }
      animationId = requestAnimationFrame(animate)
    }
    animate()
    
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resizeCanvas)
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])
  
  return (
    <div ref={containerRef} className={styles.rigorContainer}>
      <canvas ref={canvasRef} className={styles.neuralCanvas} />
      <div className={styles.rigorOverlay}>
        <h3 className={styles.rigorTitle}>NEURAL ARCHITECTURE</h3>
        <div className={styles.rigorStats}>
          <div className={styles.statRow}>
            <span className={styles.statLabel}>LAYERS</span>
            <span className={styles.statValue}>4</span>
          </div>
          <div className={styles.statRow}>
            <span className={styles.statLabel}>PARAMETERS</span>
            <span className={styles.statValue}>2.3M</span>
          </div>
          <div className={styles.statRow}>
            <span className={styles.statLabel}>TRAINING EPOCHS</span>
            <span className={styles.statValue}>10,000</span>
          </div>
        </div>
      </div>
    </div>
  )
}
