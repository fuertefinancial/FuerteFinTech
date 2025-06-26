import React from 'react'
import styles from '../../../styles/portal.module.css'

interface RiskMetricsProps {
  fund: string
}

export default function RiskMetrics({ fund }: RiskMetricsProps) {
  const metrics = [
    { label: 'Sharpe Ratio', value: '2.84', benchmark: '1.20' },
    { label: 'Sortino Ratio', value: '3.92', benchmark: '1.85' },
    { label: 'Max Drawdown', value: '-8.3%', benchmark: '-15.2%' },
    { label: 'Volatility', value: '12.4%', benchmark: '18.6%' },
    { label: 'Beta', value: '0.65', benchmark: '1.00' },
    { label: 'Alpha', value: '18.2%', benchmark: '0.0%' }
  ]
  
  return (
    <div className={styles.riskMetricsGrid}>
      {metrics.map((metric) => (
        <div key={metric.label} className={styles.riskMetricCard}>
          <h4>{metric.label}</h4>
          <div className={styles.metricValues}>
            <div className={styles.primaryValue}>{metric.value}</div>
            <div className={styles.benchmarkValue}>
              Benchmark: {metric.benchmark}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 