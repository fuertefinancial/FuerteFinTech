import React, { useEffect, useRef } from 'react'
import AIQuantVisualization from './visualizations/AIQuantVisualization'
import DeFiYieldVisualization from './visualizations/DeFiYieldVisualization'
import BlockchainVentureVisualization from './visualizations/BlockchainVentureVisualization'
import styles from './products.module.css'

interface Product {
  id: string
  name: string
  tagline: string
  description: string
  targetReturn: string
  strategyType: string
  assetClass: string
  minimumInvestment: string
  riskLevel: string
  color: string
}

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    // Add event listener
    window.addEventListener('keydown', handleEscape)
    
    // Lock body scroll
    document.body.style.overflow = 'hidden'
    
    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [onClose])
  
  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      onClose()
    }
  }
  
  // Render appropriate visualization based on product
  const renderVisualization = () => {
    switch (product.id) {
      case 'ai-quant':
        return <AIQuantVisualization />
      case 'defi-yield':
        return <DeFiYieldVisualization />
      case 'blockchain-venture':
        return <BlockchainVentureVisualization />
      default:
        return null
    }
  }
  
  return (
    <div 
      ref={modalRef}
      className={styles.modalBackdrop}
      onClick={handleBackdropClick}
    >
      <div className={styles.modalContent}>
        <button 
          className={styles.modalClose} 
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle} style={{ color: product.color }}>
            {product.name}
          </h2>
          <p className={styles.modalTagline}>{product.tagline}</p>
        </div>
        
        <div className={styles.modalBody}>
          <div className={styles.modalDescription}>
            <p>{product.description}</p>
            
            <div className={styles.modalMetrics}>
              <div className={styles.modalMetric}>
                <span className={styles.modalMetricLabel}>Target Return</span>
                <span className={styles.modalMetricValue} style={{ color: product.color }}>
                  {product.targetReturn}
                </span>
              </div>
              <div className={styles.modalMetric}>
                <span className={styles.modalMetricLabel}>Minimum Investment</span>
                <span className={styles.modalMetricValue}>{product.minimumInvestment}</span>
              </div>
              <div className={styles.modalMetric}>
                <span className={styles.modalMetricLabel}>Risk Level</span>
                <span className={styles.modalMetricValue}>{product.riskLevel}</span>
              </div>
            </div>
          </div>
          
          <div className={styles.modalVisualization}>
            <h3 className={styles.visualizationTitle}>Interactive Model</h3>
            {renderVisualization()}
          </div>
        </div>
        
        <div className={styles.modalFooter}>
          <button className={styles.modalCta} style={{ backgroundColor: product.color }}>
            Request More Information
          </button>
          <p className={styles.modalDisclaimer}>
            Past performance is not indicative of future results. All investments carry risk.
          </p>
        </div>
      </div>
    </div>
  )
} 