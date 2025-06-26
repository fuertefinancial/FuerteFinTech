import React from 'react'
import styles from '../../styles/portal.module.css'

export default function AccountSummary() {
  return (
    <div className={styles.metricCard}>
      <h3>Account Summary</h3>
      <div className={styles.accountDetails}>
        <div className={styles.detailRow}>
          <span>AI Quant Fund</span>
          <span className={styles.detailValue}>$15,000,000</span>
        </div>
        <div className={styles.detailRow}>
          <span>DeFi Yield Fund</span>
          <span className={styles.detailValue}>$7,500,000</span>
        </div>
        <div className={styles.detailRow}>
          <span>Blockchain Venture</span>
          <span className={styles.detailValue}>$2,500,000</span>
        </div>
      </div>
      <a href="/investors/documents" className={styles.viewStatement}>
        View Latest Statement →
      </a>
    </div>
  )
} 