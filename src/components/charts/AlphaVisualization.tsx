import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface DataNode {
  id: string
  value: number
  type: 'chaos' | 'processing' | 'alpha'
  x?: number
  y?: number
}

interface DataLink {
  source: string
  target: string
  strength: number
}

interface AlphaVisualizationProps {
  data: {
    nodes: DataNode[]
    links: DataLink[]
  }
}

export default function AlphaVisualization({ data }: AlphaVisualizationProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  
  useEffect(() => {
    if (!svgRef.current || !data) return
    
    // Clear previous render
    d3.select(svgRef.current).selectAll('*').remove()
    
    const width = 1200
    const height = 800
    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
    
    // Create container groups
    const g = svg.append('g')
    
    // Add zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.5, 5])
      .on('zoom', (event) => {
        g.attr('transform', event.transform)
      })
    
    svg.call(zoom as any)
    
    // Force simulation
    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links)
        .id((d: any) => d.id)
        .distance(100)
        .strength((d: any) => d.strength))
      .force('charge', d3.forceManyBody().strength(-500))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius((d: any) => d.value * 2))
    
    // Create gradients
    const defs = svg.append('defs')
    
    // Chaos to order gradient
    const gradient = defs.append('linearGradient')
      .attr('id', 'chaos-order-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%')
    
    gradient.append('stop')
      .attr('offset', '0%')
      .style('stop-color', '#FF3300')
    
    gradient.append('stop')
      .attr('offset', '50%')
      .style('stop-color', '#00BFFF')
    
    gradient.append('stop')
      .attr('offset', '100%')
      .style('stop-color', '#C0C0C0')
    
    // Glow filter
    const filter = defs.append('filter')
      .attr('id', 'glow')
    
    filter.append('feGaussianBlur')
      .attr('stdDeviation', '3')
      .attr('result', 'coloredBlur')
    
    const feMerge = filter.append('feMerge')
    feMerge.append('feMergeNode').attr('in', 'coloredBlur')
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic')
    
    // Links
    const link = g.append('g')
      .selectAll('line')
      .data(data.links)
      .enter().append('line')
      .style('stroke', 'url(#chaos-order-gradient)')
      .style('stroke-opacity', 0.6)
      .style('stroke-width', (d: any) => Math.sqrt(d.strength) * 2)
    
    // Nodes
    const node = g.append('g')
      .selectAll('circle')
      .data(data.nodes)
      .enter().append('circle')
      .attr('r', (d: DataNode) => d.value)
      .style('fill', (d: DataNode) => {
        switch (d.type) {
          case 'chaos': return '#FF3300'
          case 'processing': return '#00BFFF'
          case 'alpha': return '#C0C0C0'
          default: return '#00BFFF'
        }
      })
      .style('filter', 'url(#glow)')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any)
    
    // Labels
    const label = g.append('g')
      .selectAll('text')
      .data(data.nodes)
      .enter().append('text')
      .text((d: DataNode) => d.id)
      .style('fill', '#FFFFFF')
      .style('font-size', '12px')
      .style('font-family', 'Inter, sans-serif')
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
    
    // Animation
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)
      
      node
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y)
      
      label
        .attr('x', (d: any) => d.x)
        .attr('y', (d: any) => d.y)
    })
    
    // Drag functions
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }
    
    function dragged(event: any, d: any) {
      d.fx = event.x
      d.fy = event.y
    }
    
    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }
    
    // Animate nodes appearing
    node
      .attr('r', 0)
      .transition()
      .duration(1000)
      .attr('r', (d: DataNode) => d.value)
    
    return () => {
      simulation.stop()
    }
  }, [data])
  
  return (
    <div className="alpha-visualization">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  )
} 