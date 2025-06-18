import React, { useEffect, useRef } from 'react'
import styles from './visualizations.module.css'

interface Protocol {
  name: string
  apy: number
  risk: string
  allocation: number
}

export default function DeFiYieldVisualization() {
  const svgRef = useRef<SVGSVGElement>(null)
  const animationRef = useRef<number>()
  
  const protocols: Protocol[] = [
    { name: 'Aave', apy: 8.2, risk: 'Low', allocation: 30 },
    { name: 'Compound', apy: 6.5, risk: 'Low', allocation: 25 },
    { name: 'Uniswap V3', apy: 24.3, risk: 'Medium', allocation: 20 },
    { name: 'Curve', apy: 12.7, risk: 'Low', allocation: 15 },
    { name: 'Yearn', apy: 15.8, risk: 'Medium', allocation: 10 }
  ]
  
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    
    let progress = 0
    
    const animate = () => {
      progress += 0.01
      if (progress > 1) progress = 0
      
      // Update token positions
      const tokens = svg.querySelectorAll('.yield-token')
      tokens.forEach((token, index) => {
        const offset = (progress + index * 0.2) % 1
        const path = svg.querySelector(`#flow-path-${Math.floor(index / 2)}`) as SVGPathElement
        
        if (path) {
          const length = path.getTotalLength()
          const point = path.getPointAtLength(offset * length)
          token.setAttribute('cx', point.x.toString())
          token.setAttribute('cy', point.y.toString())
        }
      })
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])
  
  return (
    <div className={styles.defiViz}>
      <div className={styles.yieldStats}>
        <div className={styles.totalYield}>
          <h4>Total APY</h4>
          <div className={styles.yieldValue}>28.4%</div>
          <div className={styles.yieldSubtext}>Weighted Average</div>
        </div>
      </div>
      
      <svg
        ref={svgRef}
        width="600"
        height="400"
        viewBox="0 0 600 400"
        className={styles.flowDiagram}
      >
        {/* Central Pool */}
        <g id="central-pool">
          <rect
            x="250"
            y="150"
            width="100"
            height="100"
            rx="10"
            fill="#0A0A10"
            stroke="#00BFFF"
            strokeWidth="2"
          />
          <text x="300" y="195" textAnchor="middle" fill="#00BFFF" fontSize="14" fontWeight="bold">
            CAPITAL
          </text>
          <text x="300" y="215" textAnchor="middle" fill="#FFF" fontSize="18">
            $100M
          </text>
        </g>
        
        {/* Protocol Nodes */}
        {protocols.map((protocol, index) => {
          const angle = (index / protocols.length) * 2 * Math.PI - Math.PI / 2
          const radius = 150
          const x = 300 + Math.cos(angle) * radius
          const y = 200 + Math.sin(angle) * radius
          
          return (
            <g key={protocol.name}>
              {/* Flow Path */}
              <path
                id={`flow-path-${index}`}
                d={`M 300 200 Q ${(300 + x) / 2} ${y < 200 ? 100 : 300} ${x} ${y}`}
                fill="none"
                stroke="#333"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              
              {/* Protocol Node */}
              <g transform={`translate(${x}, ${y})`}>
                <circle
                  r="40"
                  fill="#0A0A10"
                  stroke={protocol.risk === 'Low' ? '#00BFFF' : '#FF3300'}
                  strokeWidth="2"
                />
                <text y="-10" textAnchor="middle" fill="#FFF" fontSize="12" fontWeight="bold">
                  {protocol.name}
                </text>
                <text y="5" textAnchor="middle" fill="#00BFFF" fontSize="14">
                  {protocol.apy}%
                </text>
                <text y="20" textAnchor="middle" fill="#666" fontSize="10">
                  ${protocol.allocation}M
                </text>
              </g>
              
              {/* Animated Tokens */}
              <circle
                className="yield-token"
                r="4"
                fill="#00BFFF"
                opacity="0.8"
              />
              <circle
                className="yield-token"
                r="4"
                fill="#00BFFF"
                opacity="0.8"
              />
            </g>
          )
        })}
        
        {/* Legend */}
        <g transform="translate(20, 350)">
          <circle cx="10" cy="10" r="5" fill="#00BFFF" />
          <text x="20" y="14" fill="#999" fontSize="12">Low Risk</text>
          
          <circle cx="100" cy="10" r="5" fill="#FF3300" />
          <text x="110" y="14" fill="#999" fontSize="12">Medium Risk</text>
        </g>
      </svg>
      
      <div className={styles.protocolList}>
        <h4>Active Strategies</h4>
        {protocols.map((protocol) => (
          <div key={protocol.name} className={styles.protocolItem}>
            <div className={styles.protocolInfo}>
              <span className={styles.protocolName}>{protocol.name}</span>
              <span className={styles.protocolRisk} data-risk={protocol.risk.toLowerCase()}>
                {protocol.risk}
              </span>
            </div>
            <div className={styles.protocolMetrics}>
              <span className={styles.protocolApy}>{protocol.apy}% APY</span>
              <span className={styles.protocolAllocation}>${protocol.allocation}M</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
