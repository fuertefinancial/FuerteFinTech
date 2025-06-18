import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import styles from './visualizations.module.css'

interface Company {
  id: string
  name: string
  sector: string
  stage: string
  investment: number
  x?: number
  y?: number
}

interface Link {
  source: string
  target: string
  type: string
}

export default function BlockchainVentureVisualization() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  
  const companies: Company[] = [
    { id: 'fuerte', name: 'Fuerte', sector: 'Fund', stage: 'Core', investment: 0 },
    { id: 'layer1-a', name: 'ChainCore', sector: 'Layer 1', stage: 'Series B', investment: 15 },
    { id: 'layer1-b', name: 'QuantumNet', sector: 'Layer 1', stage: 'Series A', investment: 8 },
    { id: 'defi-a', name: 'YieldMax', sector: 'DeFi', stage: 'Series A', investment: 12 },
    { id: 'defi-b', name: 'LiquidityPro', sector: 'DeFi', stage: 'Seed', investment: 5 },
    { id: 'infra-a', name: 'NodeWatch', sector: 'Infrastructure', stage: 'Series B', investment: 10 },
    { id: 'infra-b', name: 'DataOracle', sector: 'Infrastructure', stage: 'Series A', investment: 7 },
    { id: 'gaming-a', name: 'MetaVerse Studios', sector: 'Gaming', stage: 'Seed', investment: 3 },
    { id: 'nft-a', name: 'ArtChain', sector: 'NFT Platform', stage: 'Series A', investment: 6 }
  ]
  
  const links: Link[] = [
    { source: 'fuerte', target: 'layer1-a', type: 'investment' },
    { source: 'fuerte', target: 'layer1-b', type: 'investment' },
    { source: 'fuerte', target: 'defi-a', type: 'investment' },
    { source: 'fuerte', target: 'defi-b', type: 'investment' },
    { source: 'fuerte', target: 'infra-a', type: 'investment' },
    { source: 'fuerte', target: 'infra-b', type: 'investment' },
    { source: 'fuerte', target: 'gaming-a', type: 'investment' },
    { source: 'fuerte', target: 'nft-a', type: 'investment' },
    { source: 'layer1-a', target: 'defi-a', type: 'partnership' },
    { source: 'infra-a', target: 'infra-b', type: 'partnership' },
    { source: 'defi-a', target: 'defi-b', type: 'ecosystem' }
  ]
  
  useEffect(() => {
    if (!svgRef.current) return
    
    const width = 700
    const height = 500
    
    // Clear previous render
    d3.select(svgRef.current).selectAll('*').remove()
    
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
    
    // Create force simulation
    const simulation = d3.forceSimulation(companies)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(40))
    
    // Create links
    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', d => d.type === 'investment' ? '#00BFFF' : '#666')
      .attr('stroke-width', d => d.type === 'investment' ? 2 : 1)
      .attr('stroke-dasharray', d => d.type === 'partnership' ? '5,5' : 'none')
      .attr('opacity', 0.6)
    
    // Create nodes
    const node = svg.append('g')
      .selectAll('g')
      .data(companies)
      .join('g')
      .attr('cursor', 'pointer')
      .on('click', (event, d) => setSelectedCompany(d))
    
    // Add circles
    node.append('circle')
      .attr('r', d => d.id === 'fuerte' ? 30 : 20 + Math.sqrt(d.investment))
      .attr('fill', d => {
        if (d.id === 'fuerte') return '#00BFFF'
        switch (d.sector) {
          case 'Layer 1': return '#FF3300'
          case 'DeFi': return '#00BFFF'
          case 'Infrastructure': return '#C0C0C0'
          default: return '#666'
        }
      })
      .attr('stroke', '#0A0A10')
      .attr('stroke-width', 2)
    
    // Add labels
    node.append('text')
      .text(d => d.name)
      .attr('text-anchor', 'middle')
      .attr('dy', d => d.id === 'fuerte' ? 0 : 35)
      .attr('font-size', d => d.id === 'fuerte' ? 14 : 10)
      .attr('fill', '#FFF')
      .attr('font-weight', d => d.id === 'fuerte' ? 'bold' : 'normal')
    
    // Add investment amounts
    node.filter(d => d.investment > 0)
      .append('text')
      .text(d => `$${d.investment}M`)
      .attr('text-anchor', 'middle')
      .attr('dy', 3)
      .attr('font-size', 8)
      .attr('fill', '#0A0A10')
      .attr('font-weight', 'bold')
    
    // Update positions on tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)
      
      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`)
    })
    
  }, [])
  
  return (
    <div className={styles.ventureViz}>
      <div className={styles.portfolioStats}>
        <div className={styles.statCard}>
          <h4>Total Invested</h4>
          <div className={styles.statValue}>$71M</div>
        </div>
        <div className={styles.statCard}>
          <h4>Portfolio Companies</h4>
          <div className={styles.statValue}>8</div>
        </div>
        <div className={styles.statCard}>
          <h4>Average Multiple</h4>
          <div className={styles.statValue}>3.2x</div>
        </div>
      </div>
      
      <svg ref={svgRef} className={styles.networkGraph}></svg>
      
      {selectedCompany && selectedCompany.id !== 'fuerte' && (
        <div className={styles.companyDetail}>
          <h3>{selectedCompany.name}</h3>
          <div className={styles.companyInfo}>
            <div className={styles.infoRow}>
              <span>Sector:</span>
              <span>{selectedCompany.sector}</span>
            </div>
            <div className={styles.infoRow}>
              <span>Stage:</span>
              <span>{selectedCompany.stage}</span>
            </div>
            <div className={styles.infoRow}>
              <span>Investment:</span>
              <span>${selectedCompany.investment}M</span>
            </div>
          </div>
          <button 
            className={styles.closeDetail}
            onClick={() => setSelectedCompany(null)}
          >
            Close
          </button>
        </div>
      )}
      
      <div className={styles.legendVenture}>
        <div className={styles.legendItem}>
          <div className={styles.legendDot} style={{ backgroundColor: '#FF3300' }}></div>
          <span>Layer 1</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendDot} style={{ backgroundColor: '#00BFFF' }}></div>
          <span>DeFi</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendDot} style={{ backgroundColor: '#C0C0C0' }}></div>
          <span>Infrastructure</span>
        </div>
      </div>
    </div>
  )
}
