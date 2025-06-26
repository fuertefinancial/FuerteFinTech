import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import styles from './visualizations.module.css'

interface CorrelationData {
  x: string
  y: string
  value: number
}

interface CorrelationMatrixProps {
  data: CorrelationData[]
  assets: string[]
  width?: number
  height?: number
}

export default function CorrelationMatrix({ 
  data, 
  assets,
  width = 600, 
  height = 600 
}: CorrelationMatrixProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  
  useEffect(() => {
    if (!svgRef.current || !data.length) return
    
    // Clear previous render
    d3.select(svgRef.current).selectAll('*').remove()
    
    const margin = { top: 80, right: 80, bottom: 80, left: 80 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom
    
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
    
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
    
    // Create scales
    const xScale = d3.scaleBand()
      .domain(assets)
      .range([0, innerWidth])
      .padding(0.05)
    
    const yScale = d3.scaleBand()
      .domain(assets)
      .range([0, innerHeight])
      .padding(0.05)
    
    // Custom color scale: Red (high correlation) -> Gray (0) -> Blue (negative correlation)
    const colorScale = d3.scaleLinear<string>()
      .domain([-1, 0, 1])
      .range(['#00BFFF', '#333333', '#FF3300'])
    
    // Create tooltip
    const tooltip = d3.select('body').append('div')
      .attr('class', styles.tooltip)
      .style('opacity', 0)
    
    // Draw cells
    const cells = g.selectAll('.cell')
      .data(data)
      .enter().append('g')
      .attr('class', 'cell')
      .attr('transform', d => `translate(${xScale(d.x)},${yScale(d.y)})`)
    
    cells.append('rect')
      .attr('width', xScale.bandwidth())
      .attr('height', yScale.bandwidth())
      .attr('fill', d => colorScale(d.value))
      .attr('stroke', '#0A0A10')
      .attr('stroke-width', 1)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        // Highlight effect
        d3.select(this)
          .transition()
          .duration(100)
          .attr('stroke', '#00BFFF')
          .attr('stroke-width', 2)
        
        // Show tooltip
        tooltip.transition()
          .duration(200)
          .style('opacity', .9)
        
        tooltip.html(`
          <strong>${d.x} ↔ ${d.y}</strong><br/>
          Correlation: ${d.value.toFixed(3)}
        `)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px')
      })
      .on('mouseout', function() {
        // Remove highlight
        d3.select(this)
          .transition()
          .duration(100)
          .attr('stroke', '#0A0A10')
          .attr('stroke-width', 1)
        
        // Hide tooltip
        tooltip.transition()
          .duration(500)
          .style('opacity', 0)
      })
    
    // Add correlation values for high correlations
    cells.filter(d => Math.abs(d.value) > 0.7)
      .append('text')
      .attr('x', xScale.bandwidth() / 2)
      .attr('y', yScale.bandwidth() / 2)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .style('fill', d => Math.abs(d.value) > 0.8 ? '#FFF' : '#999')
      .style('font-size', '11px')
      .style('font-family', 'Fira Code, monospace')
      .style('pointer-events', 'none')
      .text(d => d.value.toFixed(2))
    
    // Add X axis labels
    g.append('g')
      .selectAll('.x-label')
      .data(assets)
      .enter().append('text')
      .attr('class', 'x-label')
      .attr('x', d => xScale(d)! + xScale.bandwidth() / 2)
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .style('fill', '#999')
      .style('font-size', '12px')
      .text(d => d)
    
    // Add Y axis labels
    g.append('g')
      .selectAll('.y-label')
      .data(assets)
      .enter().append('text')
      .attr('class', 'y-label')
      .attr('x', -10)
      .attr('y', d => yScale(d)! + yScale.bandwidth() / 2)
      .attr('text-anchor', 'end')
      .attr('dominant-baseline', 'middle')
      .style('fill', '#999')
      .style('font-size', '12px')
      .text(d => d)
    
    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .style('fill', '#FFF')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('Asset Correlation Matrix')
    
    // Add legend
    const legendWidth = 200
    const legendHeight = 20
    
    const legendScale = d3.scaleLinear()
      .domain([-1, 1])
      .range([0, legendWidth])
    
    const legendAxis = d3.axisBottom(legendScale)
      .ticks(5)
      .tickFormat(d3.format('.1f'))
    
    const legend = svg.append('g')
      .attr('transform', `translate(${width - legendWidth - 40}, ${height - 40})`)
    
    // Create gradient for legend
    const gradientId = 'correlation-gradient'
    const gradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', gradientId)
      .attr('x1', '0%')
      .attr('x2', '100%')
    
    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#00BFFF')
    
    gradient.append('stop')
      .attr('offset', '50%')
      .attr('stop-color', '#333333')
    
    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#FF3300')
    
    legend.append('rect')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .style('fill', `url(#${gradientId})`)
    
    legend.append('g')
      .attr('transform', `translate(0, ${legendHeight})`)
      .call(legendAxis)
      .style('color', '#999')
    
    // Cleanup
    return () => {
      tooltip.remove()
    }
  }, [data, assets, width, height])
  
  return <svg ref={svgRef} className={styles.correlationMatrix}></svg>
} 