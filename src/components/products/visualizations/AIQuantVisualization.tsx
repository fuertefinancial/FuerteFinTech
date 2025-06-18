import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import styles from './visualizations.module.css'

interface AllocationData {
  asset: string
  percentage: number
  color: string
}

export default function AIQuantVisualization() {
  const [riskTolerance, setRiskTolerance] = useState(50)
  const [marketVolatility, setMarketVolatility] = useState(50)
  const [timeHorizon, setTimeHorizon] = useState(50)
  const chartRef = useRef<SVGSVGElement>(null)
  
  // Calculate dynamic allocation based on inputs
  const calculateAllocation = (): AllocationData[] => {
    const equityBase = 40
    const bondsBase = 30
    const digitalBase = 20
    const commoditiesBase = 10
    
    // Adjust allocation based on risk tolerance
    const equityAdjustment = (riskTolerance - 50) * 0.3
    const bondsAdjustment = -(riskTolerance - 50) * 0.2
    
    // Adjust for market volatility
    const volatilityFactor = (100 - marketVolatility) / 100
    
    // Adjust for time horizon
    const horizonFactor = timeHorizon / 50
    
    const equity = Math.max(10, Math.min(70, equityBase + equityAdjustment * volatilityFactor * horizonFactor))
    const bonds = Math.max(10, Math.min(60, bondsBase + bondsAdjustment))
    const digital = Math.max(5, Math.min(30, digitalBase * volatilityFactor))
    const commodities = Math.max(5, Math.min(20, commoditiesBase))
    
    // Normalize to 100%
    const total = equity + bonds + digital + commodities
    
    return [
      { asset: 'Equities', percentage: (equity / total) * 100, color: '#00BFFF' },
      { asset: 'Fixed Income', percentage: (bonds / total) * 100, color: '#4A90E2' },
      { asset: 'Digital Assets', percentage: (digital / total) * 100, color: '#FF3300' },
      { asset: 'Commodities', percentage: (commodities / total) * 100, color: '#C0C0C0' }
    ]
  }
  
  // Update chart when inputs change
  useEffect(() => {
    if (!chartRef.current) return
    
    const data = calculateAllocation()
    const width = 400
    const height = 300
    const radius = Math.min(width, height) / 2 - 40
    
    // Clear previous chart
    d3.select(chartRef.current).selectAll('*').remove()
    
    const svg = d3.select(chartRef.current)
      .attr('width', width)
      .attr('height', height)
    
    const g = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)
    
    // Create pie layout
    const pie = d3.pie<AllocationData>()
      .value(d => d.percentage)
      .sort(null)
    
    const arc = d3.arc<d3.PieArcDatum<AllocationData>>()
      .innerRadius(radius * 0.6)
      .outerRadius(radius)
    
    // Create arcs
    const arcs = g.selectAll('.arc')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'arc')
    
    // Add paths with animation
    arcs.append('path')
      .attr('d', arc)
      .style('fill', d => d.data.color)
      .style('stroke', '#0A0A10')
      .style('stroke-width', 2)
      .transition()
      .duration(750)
      .attrTween('d', function(d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d)
        return function(t) {
          return arc(interpolate(t)) || ''
        }
      })
    
    // Add percentage labels
    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .style('fill', '#FFF')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .style('opacity', 0)
      .text(d => `${Math.round(d.data.percentage)}%`)
      .transition()
      .delay(750)
      .duration(250)
      .style('opacity', 1)
    
    // Add center text
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.2em')
      .style('font-size', '24px')
      .style('font-weight', 'bold')
      .style('fill', '#FFF')
      .text('AI')
    
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1em')
      .style('font-size', '16px')
      .style('fill', '#00BFFF')
      .text('Optimized')
    
  }, [riskTolerance, marketVolatility, timeHorizon])
  
  return (
    <div className={styles.aiQuantViz}>
      <div className={styles.controlPanel}>
        <div className={styles.sliderControl}>
          <label>
            Risk Tolerance
            <span className={styles.sliderValue}>{riskTolerance}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={riskTolerance}
            onChange={(e) => setRiskTolerance(Number(e.target.value))}
            className={styles.slider}
          />
          <div className={styles.sliderLabels}>
            <span>Conservative</span>
            <span>Aggressive</span>
          </div>
        </div>
        
        <div className={styles.sliderControl}>
          <label>
            Market Volatility
            <span className={styles.sliderValue}>{marketVolatility}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={marketVolatility}
            onChange={(e) => setMarketVolatility(Number(e.target.value))}
            className={styles.slider}
          />
          <div className={styles.sliderLabels}>
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
        
        <div className={styles.sliderControl}>
          <label>
            Time Horizon
            <span className={styles.sliderValue}>{Math.round(timeHorizon / 10)} years</span>
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={timeHorizon}
            onChange={(e) => setTimeHorizon(Number(e.target.value))}
            className={styles.slider}
          />
          <div className={styles.sliderLabels}>
            <span>1 year</span>
            <span>10 years</span>
          </div>
        </div>
      </div>
      
      <div className={styles.chartContainer}>
        <svg ref={chartRef}></svg>
        <div className={styles.legend}>
          {calculateAllocation().map((item) => (
            <div key={item.asset} className={styles.legendItem}>
              <div 
                className={styles.legendColor} 
                style={{ backgroundColor: item.color }}
              ></div>
              <span>{item.asset}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
