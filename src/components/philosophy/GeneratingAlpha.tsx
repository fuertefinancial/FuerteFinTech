import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './philosophy.module.css'

export default function GeneratingAlpha() {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const svg = svgRef.current
    const container = containerRef.current
    if (!svg || !container) return
    
    // Generate market data (volatile)
    const marketData: number[] = [100]
    for (let i = 1; i < 50; i++) {
      const change = (Math.random() - 0.5) * 4
      marketData.push(marketData[i - 1] + change)
    }
    
    // Generate Fuerte data (smooth upward)
    const fuerteData: number[] = [100]
    for (let i = 1; i < 50; i++) {
      const trend = 0.8 // Upward bias
      const volatility = 0.3
      const change = trend + (Math.random() - 0.5) * volatility
      fuerteData.push(fuerteData[i - 1] + change)
    }
    
    // Normalize data to fit in chart
    const maxValue = Math.max(...marketData, ...fuerteData)
    const minValue = Math.min(...marketData, ...fuerteData)
    const range = maxValue - minValue
    
    const normalize = (value: number) => {
      return 450 - ((value - minValue) / range) * 400
    }
    
    // Create paths
    const marketPath = marketData.map((value, index) => {
      const x = (index / (marketData.length - 1)) * 750 + 25
      const y = normalize(value)
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
    }).join(' ')
    
    const fuertePath = fuerteData.map((value, index) => {
      const x = (index / (fuerteData.length - 1)) * 750 + 25
      const y = normalize(value)
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
    }).join(' ')
    
    // Add paths to SVG
    const marketLine = svg.querySelector('#market-line') as SVGPathElement
    const fuerteLine = svg.querySelector('#fuerte-line') as SVGPathElement
    
    marketLine.setAttribute('d', marketPath)
    fuerteLine.setAttribute('d', fuertePath)
    
    // Calculate path lengths for animation
    const marketLength = marketLine.getTotalLength()
    const fuerteLength = fuerteLine.getTotalLength()
    
    // Set initial states
    gsap.set(marketLine, {
      strokeDasharray: marketLength,
      strokeDashoffset: marketLength
    })
    
    gsap.set(fuerteLine, {
      strokeDasharray: fuerteLength,
      strokeDashoffset: fuerteLength
    })
    
    // Create grid lines
    const gridGroup = svg.querySelector('#grid-group') as SVGGElement
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = 50 + i * 80
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      line.setAttribute('x1', '25')
      line.setAttribute('y1', y.toString())
      line.setAttribute('x2', '775')
      line.setAttribute('y2', y.toString())
      line.setAttribute('stroke', '#333')
      line.setAttribute('stroke-dasharray', '2,4')
      line.setAttribute('opacity', '0.3')
      gridGroup.appendChild(line)
    }
    
    // Scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top center',
        end: 'bottom center',
        scrub: true
      }
    })
    
    // Animate lines drawing
    tl.to(marketLine, {
      strokeDashoffset: 0,
      duration: 2,
      ease: 'none'
    })
    .to(fuerteLine, {
      strokeDashoffset: 0,
      duration: 2,
      ease: 'none'
    }, '-=1.5')
    
    // Add final values
    .to({}, {
      duration: 0.5,
      onComplete: () => {
        const marketFinal = marketData[marketData.length - 1]
        const fuerteFinal = fuerteData[fuerteData.length - 1]
        const marketReturn = ((marketFinal - 100) / 100 * 100).toFixed(1)
        const fuerteReturn = ((fuerteFinal - 100) / 100 * 100).toFixed(1)
        
        // Update display values
        const marketDisplay = document.getElementById('market-return')
        const fuerteDisplay = document.getElementById('fuerte-return')
        
        if (marketDisplay) marketDisplay.textContent = `${marketReturn}%`
        if (fuerteDisplay) fuerteDisplay.textContent = `+${fuerteReturn}%`
      }
    })
    
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])
  
  return (
    <div ref={containerRef} className={styles.alphaContainer}>
      <svg
        ref={svgRef}
        width="800"
        height="500"
        viewBox="0 0 800 500"
        className={styles.alphaSvg}
      >
        <defs>
          <filter id="glow-blue">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <g id="grid-group"></g>
        
        {/* Market line */}
        <path
          id="market-line"
          fill="none"
          stroke="#FF3300"
          strokeWidth="2"
          opacity="0.8"
        />
        
        {/* Fuerte line */}
        <path
          id="fuerte-line"
          fill="none"
          stroke="#00BFFF"
          strokeWidth="3"
          filter="url(#glow-blue)"
        />
        
        {/* Axis labels */}
        <text x="25" y="480" fill="#999" fontSize="12">0</text>
        <text x="775" y="480" fill="#999" fontSize="12" textAnchor="end">TIME</text>
        <text x="10" y="55" fill="#999" fontSize="12">RETURN</text>
      </svg>
      
      <div className={styles.alphaLegend}>
        <div className={styles.legendItem}>
          <div className={styles.legendLine} style={{ backgroundColor: '#FF3300' }}></div>
          <span className={styles.legendLabel}>S&P 500</span>
          <span className={styles.legendValue} id="market-return">-</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendLine} style={{ backgroundColor: '#00BFFF' }}></div>
          <span className={styles.legendLabel}>Fuerte Alpha</span>
          <span className={styles.legendValue} id="fuerte-return">-</span>
        </div>
      </div>
      
      <div className={styles.alphaStats}>
        <div className={styles.alphaStat}>
          <h4>Sharpe Ratio</h4>
          <div className={styles.alphaValue}>2.47</div>
        </div>
        <div className={styles.alphaStat}>
          <h4>Max Drawdown</h4>
          <div className={styles.alphaValue}>-3.2%</div>
        </div>
        <div className={styles.alphaStat}>
          <h4>Correlation</h4>
          <div className={styles.alphaValue}>0.12</div>
        </div>
      </div>
    </div>
  )
}
