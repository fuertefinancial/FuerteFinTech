import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import PortalLayout from '../../src/components/portal/PortalLayout'
import styles from '../../src/styles/portal.module.css'

// Dynamic import for chart components to avoid SSR issues
const PerformanceChart = dynamic(
  () => import('../../src/components/portal/charts/PerformanceChart'),
  { ssr: false }
)

const AttributionChart = dynamic(
  () => import('../../src/components/portal/charts/AttributionChart'),
  { ssr: false }
)

const RiskMetrics = dynamic(
  () => import('../../src/components/portal/charts/RiskMetrics'),
  { ssr: false }
)

const CorrelationMatrix = dynamic(
  () => import('../../src/components/visualizations/CorrelationMatrix'),
  { ssr: false }
)

export default function AnalyticsPage() {
  const router = useRouter()
  const [timeRange, setTimeRange] = useState('YTD')
  const [selectedFund, setSelectedFund] = useState('all')
  
  useEffect(() => {
    // Check authentication
    const isAuth = sessionStorage.getItem('investorAuth')
    if (!isAuth) {
      router.push('/investors/login')
    }
  }, [router])
  
  return (
    <>
      <Head>
        <title>Portfolio Analytics - Fuerte Investor Portal</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <PortalLayout>
        <div className={styles.analyticsContainer}>
          {/* Header with Controls */}
          <div className={styles.analyticsHeader}>
            <h1>Portfolio Analytics</h1>
            <div className={styles.analyticsControls}>
              <div className={styles.controlGroup}>
                <label>Fund Selection</label>
                <select 
                  value={selectedFund} 
                  onChange={(e) => setSelectedFund(e.target.value)}
                  className={styles.selectControl}
                >
                  <option value="all">All Funds</option>
                  <option value="ai-quant">AI Quantitative Fund</option>
                  <option value="defi-yield">DeFi Yield Fund</option>
                  <option value="blockchain-venture">Blockchain Venture Fund</option>
                </select>
              </div>
              
              <div className={styles.controlGroup}>
                <label>Time Range</label>
                <div className={styles.timeRangeButtons}>
                  {['1M', '3M', '6M', 'YTD', '1Y', '3Y', 'ALL'].map((range) => (
                    <button
                      key={range}
                      className={`${styles.timeButton} ${timeRange === range ? styles.active : ''}`}
                      onClick={() => setTimeRange(range)}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Performance Chart */}
          <div className={styles.chartSection}>
            <h2>Performance Over Time</h2>
            <div className={styles.chartContainer}>
              <PerformanceChart timeRange={timeRange} fund={selectedFund} />
            </div>
          </div>
          
          {/* Key Metrics Grid */}
          <div className={styles.metricsSection}>
            <h2>Key Risk Metrics</h2>
            <RiskMetrics fund={selectedFund} />
          </div>
          
          {/* Attribution Analysis */}
          <div className={styles.chartSection}>
            <h2>Performance Attribution</h2>
            <div className={styles.chartContainer}>
              <AttributionChart fund={selectedFund} />
            </div>
          </div>
          
          {/* Benchmark Comparison */}
          <div className={styles.benchmarkSection}>
            <h2>Benchmark Comparison</h2>
            <div className={styles.benchmarkGrid}>
              <div className={styles.benchmarkItem}>
                <span className={styles.benchmarkLabel}>vs S&P 500</span>
                <span className={`${styles.benchmarkValue} ${styles.positive}`}>+12.3%</span>
              </div>
              <div className={styles.benchmarkItem}>
                <span className={styles.benchmarkLabel}>vs NASDAQ</span>
                <span className={`${styles.benchmarkValue} ${styles.positive}`}>+8.7%</span>
              </div>
              <div className={styles.benchmarkItem}>
                <span className={styles.benchmarkLabel}>vs BTC</span>
                <span className={`${styles.benchmarkValue} ${styles.negative}`}>-3.2%</span>
              </div>
              <div className={styles.benchmarkItem}>
                <span className={styles.benchmarkLabel}>vs DeFi Index</span>
                <span className={`${styles.benchmarkValue} ${styles.positive}`}>+15.6%</span>
              </div>
            </div>
          </div>
          
          {/* Asset Correlation Analysis */}
          <div className={styles.chartSection}>
            <h2>Asset Correlation Matrix</h2>
            <div className={styles.chartContainer}>
              <CorrelationMatrix 
                data={[
                  { x: 'BTC', y: 'BTC', value: 1.0 },
                  { x: 'BTC', y: 'ETH', value: 0.82 },
                  { x: 'BTC', y: 'SPY', value: 0.35 },
                  { x: 'BTC', y: 'DeFi', value: 0.67 },
                  { x: 'ETH', y: 'BTC', value: 0.82 },
                  { x: 'ETH', y: 'ETH', value: 1.0 },
                  { x: 'ETH', y: 'SPY', value: 0.31 },
                  { x: 'ETH', y: 'DeFi', value: 0.89 },
                  { x: 'SPY', y: 'BTC', value: 0.35 },
                  { x: 'SPY', y: 'ETH', value: 0.31 },
                  { x: 'SPY', y: 'SPY', value: 1.0 },
                  { x: 'SPY', y: 'DeFi', value: 0.22 },
                  { x: 'DeFi', y: 'BTC', value: 0.67 },
                  { x: 'DeFi', y: 'ETH', value: 0.89 },
                  { x: 'DeFi', y: 'SPY', value: 0.22 },
                  { x: 'DeFi', y: 'DeFi', value: 1.0 }
                ]}
                assets={['BTC', 'ETH', 'SPY', 'DeFi']}
                width={600}
                height={600}
              />
            </div>
          </div>
          
          {/* Export Options */}
          <div className={styles.exportSection}>
            <button className={styles.exportButton}>
              📊 Export to Excel
            </button>
            <button className={styles.exportButton}>
              📄 Generate PDF Report
            </button>
          </div>
        </div>
      </PortalLayout>
    </>
  )
} 