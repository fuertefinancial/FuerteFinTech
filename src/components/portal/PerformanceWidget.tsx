import React from 'react'
import styles from '../../styles/portal.module.css'

interface PerformanceWidgetProps {
  mtd: number
  qtd: number
  ytd: number
}

export default function PerformanceWidget({ mtd, qtd, ytd }: PerformanceWidgetProps) {
  const formatReturn = (value: number) => {
    const formatted = (value * 100).toFixed(2)
    return value >= 0 ? `+${formatted}%` : `${formatted}%`
  }
  
  return (
    <div className={styles.metricCard}>
      <h3>Performance Returns</h3>
      <div className={styles.performanceGrid}>
        <div className={styles.performanceItem}>
          <span className={styles.performanceLabel}>MTD</span>
          <span className={`${styles.performanceValue} ${mtd >= 0 ? styles.positive : styles.negative}`}>
            {formatReturn(mtd)}
          </span>
        </div>
        <div className={styles.performanceItem}>
          <span className={styles.performanceLabel}>QTD</span>
          <span className={`${styles.performanceValue} ${qtd >= 0 ? styles.positive : styles.negative}`}>
            {formatReturn(qtd)}
          </span>
        </div>
        <div className={styles.performanceItem}>
          <span className={styles.performanceLabel}>YTD</span>
          <span className={`${styles.performanceValue} ${ytd >= 0 ? styles.positive : styles.negative}`}>
            {formatReturn(ytd)}
          </span>
        </div>
      </div>
    </div>
  )
} 