import React from 'react'
import styles from '../../../styles/portal.module.css'

interface AttributionChartProps {
  fund: string
}

export default function AttributionChart({ fund }: AttributionChartProps) {
  const attributions = [
    { name: 'Long/Short Equity', value: 45, color: '#00FF00' },
    { name: 'Market Neutral', value: 25, color: '#00CC00' },
    { name: 'Arbitrage', value: 20, color: '#009900' },
    { name: 'Event Driven', value: 10, color: '#006600' }
  ]
  
  return (
    <div className={styles.attributionChart}>
      {attributions.map((attr) => (
        <div key={attr.name} className={styles.attributionItem}>
          <div className={styles.attributionHeader}>
            <span>{attr.name}</span>
            <span>{attr.value}%</span>
          </div>
          <div className={styles.attributionBar}>
            <div 
              className={styles.attributionFill}
              style={{ width: `${attr.value}%`, backgroundColor: attr.color }}
            />
          </div>
        </div>
      ))}
    </div>
  )
} 