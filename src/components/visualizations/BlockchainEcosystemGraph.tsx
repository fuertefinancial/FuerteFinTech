import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import styles from './visualizations.module.css'

interface Node {
  id: string
  name: string
  category: string
  value: number
}

interface Link {
  source: string
  target: string
  type: string
}

interface BlockchainEcosystemGraphProps {
  nodes: Node[]
  links: Link[]
  width?: number
  height?: number
}

export default function BlockchainEcosystemGraph({ 
  nodes, 
  links,
  width = 800, 
  height = 600 
}: BlockchainEcosystemGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  
  useEffect(() => {
    if (!svgRef.current || !nodes.length) return
    
    // Clear previous render
    d3.select(svgRef.current).selectAll('*').remove()
    
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
    
    // Create container for zoom
    const container = svg.append('g')
    
    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        container.attr('transform', event.transform)
      })
    
    svg.call(zoom)
    
    // Create tooltip
    const tooltip = d3.select('body').append('div')
      .attr('class', styles.tooltip)
      .style('opacity', 0)
    
    // Create force simulation
    const simulation = d3.forceSimulation(nodes as any)
      .force('link', d3.forceLink(links)
        .id((d: any) => d.id)
        .distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius((d: any) => d.value * 2 + 10))
    
    // Create defs for gradients and filters
    const defs = svg.append('defs')
    
    // Create glow filter
    const filter = defs.append('filter')
      .attr('id', 'glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%')
    
    filter.append('feGaussianBlur')
      .attr('stdDeviation', '3')
      .attr('result', 'coloredBlur')
    
    const feMerge = filter.append('feMerge')
    feMerge.append('feMergeNode').attr('in', 'coloredBlur')
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic')
    
    // Create links
    const link = container.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', d => d.type === 'investment' ? '#00BFFF' : '#666')
      .attr('stroke-width', d => d.type === 'investment' ? 2 : 1)
      .attr('stroke-opacity', 0.6)
    
    // Create nodes container
    const node = container.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(d3.drag<any, any>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))
    
    // Add circles for nodes
    node.append('circle')
      .attr('r', d => d.value * 2)
      .attr('fill', d => {
        switch(d.category) {
          case 'core': return '#00BFFF'
          case 'defi': return '#00FF88'
          case 'infrastructure': return '#C0C0C0'
          case 'gaming': return '#FF00FF'
          default: return '#666'
        }
      })
      .attr('stroke', '#0A0A10')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .attr('filter', 'url(#glow)')
      .on('mouseover', function(event, d) {
        // Highlight connected nodes
        const connectedNodeIds = new Set<string>()
        links.forEach(l => {
          if (l.source === d || l.target === d || 
              (l.source as any).id === d.id || (l.target as any).id === d.id) {
            connectedNodeIds.add(typeof l.source === 'string' ? l.source : (l.source as any).id)
            connectedNodeIds.add(typeof l.target === 'string' ? l.target : (l.target as any).id)
          }
        })
        
        // Dim non-connected nodes
        node.style('opacity', n => connectedNodeIds.has(n.id) ? 1 : 0.3)
        link.style('opacity', l => {
          const sourceId = typeof l.source === 'string' ? l.source : (l.source as any).id
          const targetId = typeof l.target === 'string' ? l.target : (l.target as any).id
          return sourceId === d.id || targetId === d.id ? 1 : 0.1
        })
        
        // Show tooltip
        tooltip.transition()
          .duration(200)
          .style('opacity', .9)
        
        tooltip.html(`
          <strong>${d.name}</strong><br/>
          Category: ${d.category}<br/>
          Investment: $${d.value}M
        `)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px')
      })
      .on('mouseout', function() {
        // Reset opacity
        node.style('opacity', 1)
        link.style('opacity', 0.6)
        
        // Hide tooltip
        tooltip.transition()
          .duration(500)
          .style('opacity', 0)
      })
    
    // Add pulsing animation
    node.select('circle')
      .each(function(d: any) {
        if (d.category === 'core') return
        
        const circle = d3.select(this)
        const originalRadius = d.value * 2
        
        const pulse = () => {
          circle.transition()
            .duration(2000)
            .attr('r', originalRadius * 1.1)
            .attr('opacity', 0.8)
            .transition()
            .duration(2000)
            .attr('r', originalRadius)
            .attr('opacity', 1)
            .on('end', pulse)
        }
        
        // Start pulse with random delay
        setTimeout(pulse, Math.random() * 2000)
      })
    
    // Add labels
    node.append('text')
      .text(d => d.name)
      .attr('text-anchor', 'middle')
      .attr('dy', d => d.value * 2 + 15)
      .style('fill', '#FFF')
      .style('font-size', '11px')
      .style('pointer-events', 'none')
    
    // Update positions on tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)
      
      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`)
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
    
    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .style('fill', '#FFF')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .text('Blockchain Ecosystem Network')
    
    // Add instructions
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height - 10)
      .attr('text-anchor', 'middle')
      .style('fill', '#666')
      .style('font-size', '11px')
      .text('Drag nodes to explore • Scroll to zoom • Hover to highlight connections')
    
    // Cleanup
    return () => {
      simulation.stop()
      tooltip.remove()
    }
  }, [nodes, links, width, height])
  
  return <svg ref={svgRef} className={styles.ecosystemGraph}></svg>
} 