import React, { useState } from 'react'
import Head from 'next/head'
import ProductCard from '../src/components/products/ProductCard'
import ProductModal from '../src/components/products/ProductModal'
import styles from '../src/styles/products.module.css'

const products = [
  {
    id: 'ai-quant',
    name: 'AI Quantitative Fund',
    tagline: 'Machine Learning Meets Market Dynamics',
    description: 'Our flagship quantitative strategy leverages deep learning algorithms to identify and exploit market inefficiencies across global equities, fixed income, and derivatives.',
    targetReturn: '18-22%',
    strategyType: 'Systematic Trading',
    assetClass: 'Multi-Asset',
    minimumInvestment: '$1M',
    riskLevel: 'Moderate',
    color: '#00BFFF'
  },
  {
    id: 'defi-yield',
    name: 'Crypto DeFi Yield Fund',
    tagline: 'Harvesting Returns in Decentralized Finance',
    description: 'Sophisticated yield optimization across leading DeFi protocols, employing automated strategies to maximize returns while managing smart contract and liquidity risks.',
    targetReturn: '25-35%',
    strategyType: 'Yield Farming',
    assetClass: 'Digital Assets',
    minimumInvestment: '$500K',
    riskLevel: 'High',
    color: '#FF3300'
  },
  {
    id: 'blockchain-venture',
    name: 'Blockchain Venture Fund',
    tagline: 'Investing in the Future of Finance',
    description: 'Early-stage investments in transformative blockchain infrastructure, DeFi protocols, and Web3 applications with strategic value-add from our technical expertise.',
    targetReturn: '3-5x MOIC',
    strategyType: 'Venture Capital',
    assetClass: 'Private Equity',
    minimumInvestment: '$250K',
    riskLevel: 'Very High',
    color: '#C0C0C0'
  }
]

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  
  const handleProductClick = (productId: string) => {
    setSelectedProduct(productId)
  }
  
  const handleCloseModal = () => {
    setSelectedProduct(null)
  }
  
  return (
    <>
      <Head>
        <title>Products & Services - Fuerte Financial Technologies</title>
        <meta name="description" content="Explore our innovative investment products powered by AI and blockchain technology." />
      </Head>
      
      <main className={styles.productsContainer}>
        {/* Hero Section */}
        <section className={styles.productsHero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <span className={styles.titleAccent}>Intelligent</span> Investment Products
            </h1>
            <p className={styles.heroSubtitle}>
              Where sophisticated algorithms meet institutional-grade execution
            </p>
          </div>
          
          {/* Animated background pattern */}
          <div className={styles.heroPattern}></div>
        </section>
        
        {/* Products Grid */}
        <section className={styles.productsSection}>
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleProductClick(product.id)}
              />
            ))}
          </div>
        </section>
        
        {/* Key Features */}
        <section className={styles.featuresSection}>
          <h2 className={styles.featuresTitle}>Why Choose Fuerte</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M24 4L6 14v16l18 10 18-10V14L24 4z" stroke="#00BFFF" strokeWidth="2"/>
                  <path d="M24 20v20M6 14l18 10 18-10M15 19l18 10" stroke="#00BFFF" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Institutional Infrastructure</h3>
              <p>Enterprise-grade technology stack with microsecond execution and 99.99% uptime</p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="20" stroke="#00BFFF" strokeWidth="2"/>
                  <path d="M24 12v12l8 8" stroke="#00BFFF" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>24/7 Market Coverage</h3>
              <p>Continuous monitoring and trading across global markets and digital assets</p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M12 24c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12" stroke="#00BFFF" strokeWidth="2"/>
                  <path d="M24 8c8.837 0 16 7.163 16 16s-7.163 16-16 16" stroke="#00BFFF" strokeWidth="2" opacity="0.5"/>
                </svg>
              </div>
              <h3>Risk Management</h3>
              <p>Advanced portfolio optimization with real-time risk monitoring and mitigation</p>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <h2>Ready to Invest in Intelligence?</h2>
          <p>Join sophisticated investors who trust Fuerte with their capital</p>
          <a href="/contact" className={styles.ctaButton}>
            Schedule a Consultation
          </a>
        </section>
        
        {/* Product Modal */}
        {selectedProduct && (
          <ProductModal
            product={products.find(p => p.id === selectedProduct)!}
            onClose={handleCloseModal}
          />
        )}
      </main>
    </>
  )
}
