import React, { useRef, useEffect } from 'react'
import styles from './products.module.css'

interface Product {
  id: string
  name: string
  tagline: string
  description: string
  targetReturn: string
  strategyType: string
  assetClass: string
  minimumInvestment: string
  riskLevel: string
  color: string
}

interface ProductCardProps {
  product: Product
  onClick: () => void
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = 300
    canvas.height = 300
    
    let rotation = 0
    
    // Draw metallic spiral animation
    const drawSpiral = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(rotation)
      
      // Draw spiral
      ctx.beginPath()
      ctx.strokeStyle = product.color
      ctx.lineWidth = 2
      ctx.globalAlpha = 0.3
      
      for (let i = 0; i < 720; i++) {
        const angle = 0.1 * i
        const x = (0.5 + angle) * Math.cos(angle)
        const y = (0.5 + angle) * Math.sin(angle)
        
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      
      ctx.stroke()
      ctx.restore()
      
      rotation += 0.005
      animationRef.current = requestAnimationFrame(drawSpiral)
    }
    
    drawSpiral()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [product.color])
  
  return (
    <div 
      className={styles.productCard} 
      onClick={onClick}
      style={{ '--product-color': product.color } as React.CSSProperties}
    >
      <div className={styles.cardBackground}>
        <canvas ref={canvasRef} className={styles.spiralCanvas} />
      </div>
      
      <div className={styles.cardContent}>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productTagline}>{product.tagline}</p>
        
        <div className={styles.productMetrics}>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>Target Return</span>
            <span className={styles.metricValue}>{product.targetReturn}</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>Strategy</span>
            <span className={styles.metricValue}>{product.strategyType}</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>Asset Class</span>
            <span className={styles.metricValue}>{product.assetClass}</span>
          </div>
        </div>
        
        <div className={styles.cardFooter}>
          <span className={styles.minimumInvestment}>Min: {product.minimumInvestment}</span>
          <span className={styles.riskLevel} data-risk={product.riskLevel.toLowerCase().replace(' ', '-')}>
            {product.riskLevel} Risk
          </span>
        </div>
      </div>
      
      <div className={styles.cardHoverEffect}></div>
    </div>
  )
} 