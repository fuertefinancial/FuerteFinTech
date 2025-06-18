import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './philosophy.module.css'

export default function SignalFromNoise() {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const svg = svgRef.current
    const container = containerRef.current
    if (!svg || !container) return
    
    // Create noise background
    const noiseGroup = svg.querySelector('#noise-group') as SVGGElement
    const signalGroup = svg.querySelector('#signal-group') as SVGGElement
    
    // Generate random noise points
    const noisePoints: Array<{ x: number; y: number }> = []
    for (let i = 0; i < 500; i++) {
      noisePoints.push({
        x: Math.random() * 800,
        y: Math.random() * 600
      })
    }
    
    // Draw noise
    noisePoints.forEach(point => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', point.x.toString())
      circle.setAttribute('cy', point.y.toString())
      circle.setAttribute('r', '1')
      circle.setAttribute('fill', '#666')
      circle.setAttribute('opacity', '0.3')
      circle.classList.add('noise-point')
      noiseGroup.appendChild(circle)
    })
    
    // Create signal paths
    const signalPaths = [
      'M100,300 Q200,200 300,250 T500,200 T700,300',
      'M150,400 Q250,350 350,380 T550,320 T750,400',
      'M50,250 Q150,150 250,200 T450,150 T650,250'
    ]
    
    signalPaths.forEach((pathData, index) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.setAttribute('d', pathData)
      path.setAttribute('stroke', '#00BFFF')
      path.setAttribute('stroke-width', '2')
      path.setAttribute('fill', 'none')
      path.setAttribute('opacity', '0')
      path.classList.add(`signal-path-${index}`)
      signalGroup.appendChild(path)
      
      // Add glow effect
      const glow = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      glow.setAttribute('d', pathData)
      glow.setAttribute('stroke', '#00BFFF')
      glow.setAttribute('stroke-width', '6')
      glow.setAttribute('fill', 'none')
      glow.setAttribute('opacity', '0')
      glow.setAttribute('filter', 'blur(8px)')
      glow.classList.add(`signal-glow-${index}`)
      signalGroup.appendChild(glow)
    })
    
    // Create connection lines
    const connections: Array<{ start: number; end: number }> = [
      { start: 0, end: 1 },
      { start: 1, end: 2 },
      { start: 2, end: 0 }
    ]
    
    // Scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
        pin: true
      }
    })
    
    // Fade out noise
    tl.to('.noise-point', {
      opacity: 0.1,
      duration: 1,
      stagger: 0.001
    })
    
    // Reveal signal paths
    .to('.signal-path-0, .signal-glow-0', {
      opacity: 1,
      duration: 1
    }, '-=0.5')
    .to('.signal-path-1, .signal-glow-1', {
      opacity: 1,
      duration: 1
    }, '-=0.8')
    .to('.signal-path-2, .signal-glow-2', {
      opacity: 1,
      duration: 1
    }, '-=0.8')
    
    // Draw connecting lines
    connections.forEach((conn, index) => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      line.setAttribute('x1', '0')
      line.setAttribute('y1', '0')
      line.setAttribute('x2', '0')
      line.setAttribute('y2', '0')
      line.setAttribute('stroke', '#00BFFF')
      line.setAttribute('stroke-width', '1')
      line.setAttribute('opacity', '0.5')
      line.setAttribute('stroke-dasharray', '5,5')
      line.classList.add(`connection-${index}`)
      signalGroup.appendChild(line)
      
      tl.to(line, {
        attr: {
          x1: 200 + conn.start * 200,
          y1: 200 + conn.start * 50,
          x2: 200 + conn.end * 200,
          y2: 200 + conn.end * 50
        },
        duration: 0.5
      }, '-=0.3')
    })
    
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])
  
  return (
    <div ref={containerRef} className={styles.signalContainer}>
      <svg
        ref={svgRef}
        width="800"
        height="600"
        viewBox="0 0 800 600"
        className={styles.signalSvg}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <g id="noise-group"></g>
        <g id="signal-group"></g>
      </svg>
      <div className={styles.signalOverlay}>
        <h3 className={styles.signalTitle}>PATTERN DETECTION</h3>
        <div className={styles.signalMetrics}>
          <div className={styles.metricItem}>
            <span className={styles.metricLabel}>SIGNALS IDENTIFIED</span>
            <span className={styles.metricValue}>3</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricLabel}>CONFIDENCE</span>
            <span className={styles.metricValue}>94.7%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
