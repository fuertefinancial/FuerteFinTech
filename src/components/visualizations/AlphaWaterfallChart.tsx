import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import styles from './visualizations.module.css'

interface WaterfallData {
  name: string
  value: number
  category: 'start' | 'positive' | 'negative' | 'total'
}

interface AlphaWaterfallChartProps {
  data: WaterfallData[]
  width?: number
  height?: number
}

export default function AlphaWaterfallChart({ 
  data, 
  width = 800, 
  height = 500 
}: AlphaWaterfallChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  
  useEffect(() => {
    if (!svgRef.current || !data.length) return
    
    // Clear previous render
    d3.select(svgRef.current).selectAll('*').remove()
    
    const margin = { top: 60, right: 40, bottom: 100, left: 60 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom
    
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
    
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
    
    // Calculate cumulative values
    let cumulative = 0
    const processedData = data.map(d => {
      const startY = cumulative
      if (d.category !== 'total') {
        cumulative += d.value
      } else {
        cumulative = d.value
      }
      return {
        ...d,
        start: startY,
        end: cumulative,
        class: d.value >= 0 ? 'positive' : 'negative'
      }
    })
    
    // Create scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([0, innerWidth])
      .padding(0.2)
    
    const yExtent = d3.extent([
      ...processedData.map(d => d.start),
      ...processedData.map(d => d.end)
    ]) as [number, number]
    
    const yScale = d3.scaleLinear()
      .domain([Math.min(0, yExtent[0]), Math.max(0, yExtent[1])])
      .range([innerHeight, 0])
    
    // Create tooltip
    const tooltip = d3.select('body').append('div')
      .attr('class', styles.tooltip)
      .style('opacity', 0)
    
    // Draw zero line
    g.append('line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', yScale(0))
      .attr('y2', yScale(0))
      .attr('stroke', '#666')
      .attr('stroke-dasharray', '2,2')
    
    // Draw bars
    const bars = g.selectAll('.bar')
      .data(processedData)
      .enter().append('g')
      .attr('class', 'bar')
      .attr('transform', d => `translate(${xScale(d.name)}, 0)`)
    
    bars.append('rect')
      .attr('y', d => Math.min(yScale(d.start), yScale(d.end)))
      .attr('height', d => Math.abs(yScale(d.end) - yScale(d.start)))
      .attr('width', xScale.bandwidth())
      .attr('fill', d => {
        if (d.category === 'start' || d.category === 'total') return '#666'
        return d.value >= 0 ? '#00BFFF' : '#FF3300'
      })
      .attr('stroke', '#0A0A10')
      .attr('stroke-width', 1)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        // Highlight effect
        d3.select(this)
          .transition()
          .duration(100)
          .attr('opacity', 0.8)
        
        // Show tooltip
        tooltip.transition()
          .duration(200)
          .style('opacity', .9)
        
        const sign = d.value >= 0 ? '+' : ''
        tooltip.html(`
          <strong>${d.name}</strong><br/>
          Contribution: ${sign}${d.value.toFixed(2)}%<br/>
          Cumulative: ${d.end.toFixed(2)}%
        `)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px')
      })
      .on('mouseout', function() {
        // Remove highlight
        d3.select(this)
          .transition()
          .duration(100)
          .attr('opacity', 1)
        
        // Hide tooltip
        tooltip.transition()
          .duration(500)
          .style('opacity', 0)
      })
    
    // Add connector lines
    processedData.forEach((d, i) => {
      if (i < processedData.length - 1 && d.category !== 'total') {
        g.append('line')
          .attr('class', 'connector')
          .attr('x1', xScale(d.name)! + xScale.bandwidth())
          .attr('x2', xScale(processedData[i + 1].name)!)
          .attr('y1', yScale(d.end))
          .attr('y2', yScale(d.end))
          .attr('stroke', '#666')
          .attr('stroke-width', 1)
          .attr('stroke-dasharray', '2,2')
      }
    })
    
    // Add value labels
    bars.append('text')
      .attr('x', xScale.bandwidth() / 2)
      .attr('y', d => {
        const barTop = Math.min(yScale(d.start), yScale(d.end))
        return barTop - 5
      })
      .attr('text-anchor', 'middle')
      .style('fill', '#FFF')
      .style('font-size', '12px')
      .style('font-family', 'Fira Code, monospace')
      .text(d => {
        const sign = d.value >= 0 ? '+' : ''
        return `${sign}${d.value.toFixed(1)}%`
      })
    
    // Add X axis
    const xAxis = g.append('g')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale))
    
    xAxis.selectAll('text')
      .style('fill', '#999')
      .style('font-size', '11px')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
    
    xAxis.select('.domain').style('stroke', '#666')
    xAxis.selectAll('.tick line').style('stroke', '#666')
    
    // Add Y axis
    const yAxis = g.append('g')
      .call(d3.axisLeft(yScale).tickFormat(d => d + '%'))
    
    yAxis.selectAll('text').style('fill', '#999')
    yAxis.select('.domain').style('stroke', '#666')
    yAxis.selectAll('.tick line').style('stroke', '#666')
    
    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .style('fill', '#FFF')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .text('Alpha Attribution Analysis')
    
    // Add legend
    const legendData = [
      { label: 'Positive Contribution', color: '#00BFFF' },
      { label: 'Negative Contribution', color: '#FF3300' }
    ]
    
    const legend = svg.append('g')
      .attr('transform', `translate(${width - 200}, 50)`)
    
    legendData.forEach((d, i) => {
      const legendRow = legend.append('g')
        .attr('transform', `translate(0, ${i * 20})`)
      
      legendRow.append('rect')
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', d.color)
      
      legendRow.append('text')
        .attr('x', 20)
        .attr('y', 12)
        .style('fill', '#999')
        .style('font-size', '12px')
        .text(d.label)
    })
    
    // Cleanup
    return () => {
      tooltip.remove()
    }
  }, [data, width, height])
  
  return <svg ref={svgRef} className={styles.waterfallChart}></svg>
} 