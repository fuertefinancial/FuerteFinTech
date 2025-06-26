import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Navigation from '../../src/components/navigation/Navigation'
import styles from '../../src/styles/article.module.css'

// Mock article data - in production this would come from CMS
const mockArticles: Record<string, any> = {
  '1': {
    title: 'The Convergence of AI and DeFi: A New Financial Paradigm',
    author: 'Dr. Sarah Chen',
    date: '2024-01-15',
    category: 'AI in Finance',
    type: 'White Paper',
    readTime: '12 min',
    isGated: true,
    abstract: 'This research paper explores the transformative intersection of artificial intelligence and decentralized finance, examining how machine learning algorithms are revolutionizing automated market making, risk assessment, and yield optimization strategies in the DeFi ecosystem.',
    content: `
      <h2>Executive Summary</h2>
      <p>The convergence of artificial intelligence (AI) and decentralized finance (DeFi) represents one of the most significant technological shifts in the financial industry. This paper examines how AI-driven approaches are solving fundamental challenges in DeFi, from liquidity provision to risk management.</p>
      
      <h2>Key Findings</h2>
      <ul>
        <li>AI algorithms have improved DeFi protocol efficiency by 34% on average</li>
        <li>Machine learning models can predict impermanent loss with 87% accuracy</li>
        <li>Automated strategies have reduced gas costs by up to 45%</li>
      </ul>
      
      <p class="gated-notice">To access the full research paper including detailed methodologies, case studies, and investment implications, please request access below.</p>
    `
  },
  '2': {
    title: 'Q4 2023 Digital Asset Market Review',
    author: 'Marcus Rodriguez',
    date: '2024-01-10',
    category: 'Digital Assets',
    type: 'Market Commentary',
    readTime: '8 min',
    isGated: false,
    content: `
      <h2>Market Overview</h2>
      <p>The fourth quarter of 2023 marked a significant turning point for digital assets, with institutional adoption reaching new heights and regulatory clarity emerging in key jurisdictions.</p>
      
      <h2>Key Metrics</h2>
      <ul>
        <li>Total crypto market cap increased 45% to $1.8 trillion</li>
        <li>DeFi TVL grew to $65 billion, up 38% QoQ</li>
        <li>Institutional holdings reached $120 billion</li>
      </ul>
      
      <h2>Sector Performance</h2>
      <p>Layer 1 protocols outperformed with an average return of 67%, while DeFi tokens lagged at 23%. AI-related tokens emerged as a new category, posting impressive 156% average gains.</p>
      
      <h2>Looking Ahead</h2>
      <p>We expect continued momentum in Q1 2024, driven by ETF approvals, increased institutional participation, and the maturation of Layer 2 solutions.</p>
    `
  }
}

export default function ArticlePage() {
  const router = useRouter()
  const { id } = router.query
  const [showGatedForm, setShowGatedForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    email: ''
  })
  
  const article = mockArticles[id as string] || mockArticles['1']
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would send data to your CRM/backend
    console.log('Lead captured:', formData)
    alert('Thank you! The full paper will be sent to your email.')
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }
  
  return (
    <>
      <Head>
        <title>{article.title} - Fuerte Financial Technologies</title>
        <meta name="description" content={article.abstract || article.content.substring(0, 160)} />
      </Head>
      
      <Navigation />
      
      <main className={styles.articleContainer}>
        {/* Article Header */}
        <header className={styles.articleHeader}>
          <div className={styles.breadcrumb}>
            <a href="/insights">← Back to Insights</a>
          </div>
          
          <div className={styles.articleMeta}>
            <span className={styles.articleType}>{article.type}</span>
            <span className={styles.articleCategory}>{article.category}</span>
            <span className={styles.readTime}>{article.readTime}</span>
          </div>
          
          <h1 className={styles.articleTitle}>{article.title}</h1>
          
          <div className={styles.authorSection}>
            <div className={styles.authorInfo}>
              <span className={styles.authorName}>{article.author}</span>
              <span className={styles.publishDate}>{formatDate(article.date)}</span>
            </div>
          </div>
        </header>
        
        {/* Article Content */}
        <article className={styles.articleContent}>
          {article.isGated && article.abstract && (
            <div className={styles.abstract}>
              <h2>Abstract</h2>
              <p>{article.abstract}</p>
            </div>
          )}
          
          <div 
            className={styles.articleBody}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          {article.isGated && (
            <div className={styles.gatedContent}>
              <div className={styles.gatedOverlay}></div>
              
              <div className={styles.gatedCTA}>
                <h3>Access Full Research</h3>
                <p>Get instant access to our complete analysis including:</p>
                <ul>
                  <li>Detailed methodology and data analysis</li>
                  <li>Investment strategies and recommendations</li>
                  <li>Risk assessment and mitigation approaches</li>
                  <li>Future outlook and projections</li>
                </ul>
                
                {!showGatedForm ? (
                  <button 
                    className={styles.requestAccessBtn}
                    onClick={() => setShowGatedForm(true)}
                  >
                    Request Full Paper
                  </button>
                ) : (
                  <form className={styles.accessForm} onSubmit={handleFormSubmit}>
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    <input
                      type="text"
                      placeholder="Institution"
                      required
                      value={formData.institution}
                      onChange={(e) => setFormData({...formData, institution: e.target.value})}
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <button type="submit" className={styles.submitBtn}>
                      Get Access
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </article>
        
        {/* Share Section */}
        <div className={styles.shareSection}>
          <h4>Share this insight</h4>
          <div className={styles.shareButtons}>
            <button className={styles.shareBtn} aria-label="Share on Twitter">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M19 3a8.001 8.001 0 0 1-2.357.646A3.936 3.936 0 0 0 18.37 1.5a7.873 7.873 0 0 1-2.508.958A3.938 3.938 0 0 0 9.31 5.048 11.155 11.155 0 0 1 1.32 1.89a3.938 3.938 0 0 0 1.218 5.256A3.92 3.92 0 0 1 .8 6.654v.05a3.939 3.939 0 0 0 3.157 3.86 3.953 3.953 0 0 1-1.777.067 3.94 3.94 0 0 0 3.678 2.735A7.9 7.9 0 0 1 0 14.986 11.157 11.157 0 0 0 6.032 17c7.237 0 11.195-5.997 11.195-11.195 0-.17-.004-.34-.01-.509A7.985 7.985 0 0 0 19 3z" fill="currentColor"/>
              </svg>
            </button>
            <button className={styles.shareBtn} aria-label="Share on LinkedIn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4.478 2.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM.5 6.5h4v13h-4v-13zM7.5 6.5h3.828v1.783h.055C12.055 7.118 13.484 6.25 15.5 6.25c4.163 0 4.93 2.738 4.93 6.299V19.5h-4.108v-6.217c0-1.534-.027-3.508-2.137-3.508-2.14 0-2.468 1.672-2.468 3.397V19.5H7.5v-13z" fill="currentColor"/>
              </svg>
            </button>
            <button className={styles.shareBtn} aria-label="Copy link">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13.333 7.5h-2.5a4.167 4.167 0 0 0 0 8.333h2.5m-6.666-8.333h2.5a4.167 4.167 0 0 1 0 8.333h-2.5m-1.667-4.166h6.667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </main>
    </>
  )
} 