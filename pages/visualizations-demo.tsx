import React from 'react'
import Head from 'next/head'
import Navigation from '../src/components/navigation/Navigation'
import { CorrelationMatrix, AlphaWaterfallChart, BlockchainEcosystemGraph } from '../src/components/visualizations'
import styles from '../src/styles/visualizations-demo.module.css'

// Mock data for demonstrations
const correlationData = [
  { x: 'BTC', y: 'BTC', value: 1.0 },
  { x: 'BTC', y: 'ETH', value: 0.85 },
  { x: 'BTC', y: 'SPY', value: 0.42 },
  { x: 'BTC', y: 'GOLD', value: -0.15 },
  { x: 'BTC', y: 'BONDS', value: -0.68 },
  { x: 'ETH', y: 'BTC', value: 0.85 },
  { x: 'ETH', y: 'ETH', value: 1.0 },
  { x: 'ETH', y: 'SPY', value: 0.38 },
  { x: 'ETH', y: 'GOLD', value: -0.22 },
  { x: 'ETH', y: 'BONDS', value: -0.71 },
  { x: 'SPY', y: 'BTC', value: 0.42 },
  { x: 'SPY', y: 'ETH', value: 0.38 },
  { x: 'SPY', y: 'SPY', value: 1.0 },
  { x: 'SPY', y: 'GOLD', value: 0.12 },
  { x: 'SPY', y: 'BONDS', value: -0.45 },
  { x: 'GOLD', y: 'BTC', value: -0.15 },
  { x: 'GOLD', y: 'ETH', value: -0.22 },
  { x: 'GOLD', y: 'SPY', value: 0.12 },
  { x: 'GOLD', y: 'GOLD', value: 1.0 },
  { x: 'GOLD', y: 'BONDS', value: 0.35 },
  { x: 'BONDS', y: 'BTC', value: -0.68 },
  { x: 'BONDS', y: 'ETH', value: -0.71 },
  { x: 'BONDS', y: 'SPY', value: -0.45 },
  { x: 'BONDS', y: 'GOLD', value: 0.35 },
  { x: 'BONDS', y: 'BONDS', value: 1.0 }
]

const assets = ['BTC', 'ETH', 'SPY', 'GOLD', 'BONDS']

const waterfallData = [
  { name: 'Starting NAV', value: 100, category: 'start' as const },
  { name: 'Long/Short Equity', value: 8.5, category: 'positive' as const },
  { name: 'Market Neutral', value: 4.2, category: 'positive' as const },
  { name: 'Arbitrage', value: 3.1, category: 'positive' as const },
  { name: 'Event Driven', value: 2.8, category: 'positive' as const },
  { name: 'Management Fees', value: -2.0, category: 'negative' as const },
  { name: 'Trading Costs', value: -0.8, category: 'negative' as const },
  { name: 'Ending NAV', value: 115.8, category: 'total' as const }
]

const ecosystemNodes = [
  { id: 'fuerte', name: 'Fuerte Capital', category: 'core', value: 50 },
  { id: 'chaincore', name: 'ChainCore Labs', category: 'infrastructure', value: 15 },
  { id: 'defimax', name: 'DeFiMax Protocol', category: 'defi', value: 12 },
  { id: 'yieldgen', name: 'YieldGen Finance', category: 'defi', value: 8 },
  { id: 'metaverse', name: 'MetaVerse Studios', category: 'gaming', value: 10 },
  { id: 'oracle', name: 'DataOracle', category: 'infrastructure', value: 7 },
  { id: 'nftmarket', name: 'NFT Marketplace', category: 'gaming', value: 5 },
  { id: 'layer2', name: 'Layer2 Solutions', category: 'infrastructure', value: 9 }
]

const ecosystemLinks = [
  { source: 'fuerte', target: 'chaincore', type: 'investment' },
  { source: 'fuerte', target: 'defimax', type: 'investment' },
  { source: 'fuerte', target: 'yieldgen', type: 'investment' },
  { source: 'fuerte', target: 'metaverse', type: 'investment' },
  { source: 'fuerte', target: 'oracle', type: 'investment' },
  { source: 'chaincore', target: 'layer2', type: 'partnership' },
  { source: 'defimax', target: 'yieldgen', type: 'integration' },
  { source: 'metaverse', target: 'nftmarket', type: 'partnership' }
]

export default function VisualizationsDemoPage() {
  return (
    <>
      <Head>
        <title>Data Visualizations - Fuerte Financial Technologies</title>
        <meta name="description" content="Bespoke data visualization components showcasing Fuerte's quantitative expertise" />
      </Head>
      
      <Navigation />
      
      <main className={styles.demoContainer}>
        <section className={styles.demoHero}>
          <h1>Bespoke Data Visualizations</h1>
          <p>Custom-built components that extend the Fuerte brand identity</p>
        </section>
        
        {/* Correlation Matrix Demo */}
        <section className={styles.demoSection}>
          <h2>Fuerte Correlation Matrix</h2>
          <p className={styles.demoDescription}>
            A custom heatmap showing asset correlations with our signature color gradient: 
            Volcanic Red (high correlation) → Neutral Gray → Fuerte Blue (negative correlation)
          </p>
          <div className={styles.chartWrapper}>
            <CorrelationMatrix 
              data={correlationData}
              assets={assets}
              width={700}
              height={700}
            />
          </div>
        </section>
        
        {/* Alpha Waterfall Demo */}
        <section className={styles.demoSection}>
          <h2>Alpha Waterfall Chart</h2>
          <p className={styles.demoDescription}>
            Performance attribution visualization with rising blue bars for positive contributions 
            and descending red bars for detractors
          </p>
          <div className={styles.chartWrapper}>
            <AlphaWaterfallChart 
              data={waterfallData}
              width={800}
              height={500}
            />
          </div>
        </section>
        
        {/* Blockchain Ecosystem Demo */}
        <section className={styles.demoSection}>
          <h2>Blockchain Ecosystem Graph</h2>
          <p className={styles.demoDescription}>
            Interactive force-directed graph showing portfolio companies with pulsing nodes 
            and dynamic connections. Drag to explore, hover to highlight relationships.
          </p>
          <div className={styles.chartWrapper}>
            <BlockchainEcosystemGraph 
              nodes={ecosystemNodes}
              links={ecosystemLinks}
              width={800}
              height={600}
            />
          </div>
        </section>
        
        {/* Usage Examples */}
        <section className={styles.usageSection}>
          <h2>Integration Examples</h2>
          <div className={styles.codeExample}>
            <pre>{`import { CorrelationMatrix } from '@/components/visualizations'

// Use in Investor Portal
<CorrelationMatrix 
  data={portfolioCorrelations}
  assets={['BTC', 'ETH', 'SPY', 'GOLD']}
  width={600}
  height={600}
/>`}</pre>
          </div>
          <p className={styles.usageNote}>
            These components are designed to be reused across the Insights portal, 
            Strategy pages, and Investor Portal, maintaining visual consistency throughout.
          </p>
        </section>
      </main>
    </>
  )
} 