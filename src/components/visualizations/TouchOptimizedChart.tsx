import React, { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'
import { useDeviceCapabilities } from '../../hooks/useDeviceCapabilities'
import styles from './visualizations.module.css'

interface DataPoint {
  label: string
  value: number
  color: string
}

interface TouchOptimizedChartProps {
  data: DataPoint[]
  width?: number
  height?: number
  type?: 'pie' | 'bar' | 'line'
}

export default function TouchOptimizedChart({
  data,
  width = 350,
  height = 300,
  type = 'pie'
}: TouchOptimizedChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const { hasTouchScreen } = useDeviceCapabilities()
  
  useEffect(() => {
    if (!svgRef.current || !data.length) return
    
    // Clear previous render
    d3.select(svgRef.current).selectAll('*').remove()
    
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
    
    if (type === 'pie') {
      drawPieChart(svg, data, width, height)
    } else if (type === 'bar') {
      drawBarChart(svg, data, width, height)
    }
  }, [data, width, height, type, selectedIndex])
  
  const drawPieChart = (
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    data: DataPoint[],
    width: number,
    height: number
  ) => {
    const radius = Math.min(width, height) / 2 - 20
    const g = svg.append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`)
    
    const pie = d3.pie<DataPoint>()
      .value(d => d.value)
      .sort(null)
    
    const arc = d3.arc<d3.PieArcDatum<DataPoint>>()
      .innerRadius(radius * 0.4)
      .outerRadius(radius)
    
    const expandedArc = d3.arc<d3.PieArcDatum<DataPoint>>()
      .innerRadius(radius * 0.4)
      .outerRadius(radius * 1.1)
    
    const arcs = g.selectAll('.arc')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'arc')
    
    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => d.data.color)
      .attr('stroke', '#0A0A10')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('touchstart', function(event, d) {
        event.preventDefault()
        handleTouch(d.index)
        
        // Haptic feedback
        if ('vibrate' in navigator) {
          navigator.vibrate(10)
        }
      })
      .on('click', function(event, d) {
        if (!hasTouchScreen) {
          handleTouch(d.index)
        }
      })
      .transition()
      .duration(300)
      .attrTween('d', function(d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d)
        return function(t) {
          return arc(interpolate(t))!
        }
      })
    
    // Selected state animation
    if (selectedIndex !== null) {
      arcs.select('path')
        .transition()
        .duration(200)
        .attr('d', (d, i) => i === selectedIndex ? expandedArc(d) : arc(d))
    }
    
    // Labels
    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .style('fill', '#FFF')
      .style('font-size', '12px')
      .style('pointer-events', 'none')
      .text(d => `${d.data.value}%`)
  }
  
  const drawBarChart = (
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    data: DataPoint[],
    width: number,
    height: number
  ) => {
    const margin = { top: 20, right: 20, bottom: 40, left: 40 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom
    
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
    
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, innerWidth])
      .padding(0.1)
    
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)!])
      .range([innerHeight, 0])
    
    // Bars
    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.label)!)
      .attr('y', innerHeight)
      .attr('width', xScale.bandwidth())
      .attr('height', 0)
      .attr('fill', d => d.color)
      .style('cursor', 'pointer')
      .on('touchstart', function(event, d, i) {
        event.preventDefault()
        handleTouch(i)
        
        // Visual feedback
        d3.select(this)
          .transition()
          .duration(100)
          .attr('opacity', 0.8)
          .transition()
          .duration(100)
          .attr('opacity', 1)
        
        // Haptic feedback
        if ('vibrate' in navigator) {
          navigator.vibrate(10)
        }
      })
      .transition()
      .duration(500)
      .delay((d, i) => i * 50)
      .attr('y', d => yScale(d.value))
      .attr('height', d => innerHeight - yScale(d.value))
    
    // X axis
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .style('fill', '#999')
      .style('font-size', '11px')
    
    // Y axis
    g.append('g')
      .call(d3.axisLeft(yScale).ticks(5))
      .selectAll('text')
      .style('fill', '#999')
  }
  
  const handleTouch = (index: number) => {
    setSelectedIndex(prevIndex => prevIndex === index ? null : index)
  }
  
  return (
    <div className={styles.touchChartContainer}>
      <svg ref={svgRef} className={styles.touchChart}></svg>
      
      {selectedIndex !== null && (
        <div className={styles.touchTooltip}>
          <strong>{data[selectedIndex].label}</strong>
          <br />
          Value: {data[selectedIndex].value}
        </div>
      )}
      
      <p className={styles.touchHint}>
        {hasTouchScreen ? 'Tap' : 'Click'} on elements for details
      </p>
    </div>
  )
} 