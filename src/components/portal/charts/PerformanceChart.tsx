import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import styles from '../../../styles/portal.module.css'

interface PerformanceChartProps {
  timeRange: string
  fund: string
}

export default function PerformanceChart({ timeRange, fund }: PerformanceChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  
  useEffect(() => {
    if (!svgRef.current) return
    
    // Mock data
    const data = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(2024, 0, i + 1),
      value: 100 + Math.random() * 20 + i * 0.8
    }))
    
    const margin = { top: 20, right: 30, bottom: 40, left: 50 }
    const width = 800 - margin.left - margin.right
    const height = 400 - margin.top - margin.bottom
    
    d3.select(svgRef.current).selectAll('*').remove()
    
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
    
    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([0, width])
    
    const y = d3.scaleLinear()
      .domain(d3.extent(data, d => d.value) as [number, number])
      .range([height, 0])
    
    const line = d3.line<typeof data[0]>()
      .x(d => x(d.date))
      .y(d => y(d.value))
    
    // Add axes
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5))
      .style('color', '#808080')
    
    g.append('g')
      .call(d3.axisLeft(y).ticks(5))
      .style('color', '#808080')
    
    // Add line
    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#00FF00')
      .attr('stroke-width', 2)
      .attr('d', line)
    
  }, [timeRange, fund])
  
  return <svg ref={svgRef} style={{ width: '100%', height: '100%' }}></svg>
} 