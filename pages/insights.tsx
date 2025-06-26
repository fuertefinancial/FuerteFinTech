import React, { useState, useMemo } from 'react'
import Head from 'next/head'
import Navigation from '../src/components/navigation/Navigation'
import InsightCard from '../src/components/insights/InsightCard'
import InsightFilters from '../src/components/insights/InsightFilters'
import AISearchBar from '../src/components/ai/AISearchBar'
import styles from '../src/styles/insights.module.css'

// Mock data for insights
const mockInsights = [
  {
    id: '1',
    title: 'The Convergence of AI and DeFi: A New Financial Paradigm',
    excerpt: 'Exploring how artificial intelligence is revolutionizing decentralized finance through automated market making, risk assessment, and yield optimization strategies.',
    author: 'Dr. Sarah Chen',
    date: '2024-01-15',
    category: 'AI in Finance',
    type: 'White Paper',
    readTime: '12 min',
    image: '/images/ai-defi-cover.jpg',
    isGated: true
  },
  {
    id: '2',
    title: 'Q4 2023 Digital Asset Market Review',
    excerpt: 'Comprehensive analysis of digital asset performance, institutional adoption trends, and regulatory developments in the fourth quarter.',
    author: 'Marcus Rodriguez',
    date: '2024-01-10',
    category: 'Digital Assets',
    type: 'Market Commentary',
    readTime: '8 min',
    image: '/images/q4-review-cover.jpg',
    isGated: false
  },
  {
    id: '3',
    title: 'Quantitative Methods in Crypto Volatility Prediction',
    excerpt: 'Advanced statistical models and machine learning approaches for predicting and capitalizing on cryptocurrency market volatility.',
    author: 'Dr. James Liu',
    date: '2024-01-08',
    category: 'Quantitative Methods',
    type: 'Research Paper',
    readTime: '15 min',
    image: '/images/quant-methods-cover.jpg',
    isGated: true
  },
  {
    id: '4',
    title: 'Institutional Perspectives on Digital Asset Allocation',
    excerpt: 'Survey results and analysis of how leading institutional investors are approaching digital asset allocation in 2024.',
    author: 'Emily Thompson',
    date: '2024-01-05',
    category: 'Digital Assets',
    type: 'Video',
    readTime: '20 min',
    image: '/images/institutional-perspectives-cover.jpg',
    isGated: false
  },
  {
    id: '5',
    title: 'The Rise of AI Trading Agents: Risks and Opportunities',
    excerpt: 'Examining the proliferation of autonomous trading systems and their impact on market microstructure and systemic risk.',
    author: 'Dr. Sarah Chen',
    date: '2023-12-28',
    category: 'AI in Finance',
    type: 'Podcast',
    readTime: '35 min',
    image: '/images/ai-trading-cover.jpg',
    isGated: false
  },
  {
    id: '6',
    title: 'Macro Outlook 2024: Navigating Uncertainty',
    excerpt: 'Our comprehensive outlook for global markets, focusing on the interplay between monetary policy, geopolitics, and digital assets.',
    author: 'Robert Singh',
    date: '2023-12-20',
    category: 'Macroeconomic Outlook',
    type: 'White Paper',
    readTime: '18 min',
    image: '/images/macro-outlook-cover.jpg',
    isGated: true
  }
]

const categories = ['All', 'AI in Finance', 'Digital Assets', 'Quantitative Methods', 'Macroeconomic Outlook']
const contentTypes = ['All', 'White Paper', 'Market Commentary', 'Research Paper', 'Video', 'Podcast']
const authors = ['All', 'Dr. Sarah Chen', 'Marcus Rodriguez', 'Dr. James Liu', 'Emily Thompson', 'Robert Singh']

export default function InsightsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedType, setSelectedType] = useState('All')
  const [selectedAuthor, setSelectedAuthor] = useState('All')
  const [sortBy, setSortBy] = useState('date')
  
  // Filter and sort insights
  const filteredInsights = useMemo(() => {
    let filtered = mockInsights
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(insight => 
        insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        insight.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        insight.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(insight => insight.category === selectedCategory)
    }
    
    // Apply type filter
    if (selectedType !== 'All') {
      filtered = filtered.filter(insight => insight.type === selectedType)
    }
    
    // Apply author filter
    if (selectedAuthor !== 'All') {
      filtered = filtered.filter(insight => insight.author === selectedAuthor)
    }
    
    // Sort results
    if (sortBy === 'date') {
      filtered = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } else if (sortBy === 'title') {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title))
    }
    
    return filtered
  }, [searchQuery, selectedCategory, selectedType, selectedAuthor, sortBy])
  
  return (
    <>
      <Head>
        <title>Insights - Fuerte Financial Technologies</title>
        <meta name="description" content="Research, commentary, and thought leadership on AI, digital assets, and quantitative finance." />
      </Head>
      
      <Navigation />
      
      <main className={styles.insightsContainer}>
        {/* Hero Section */}
        <section className={styles.insightsHero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Insights & <span className={styles.titleAccent}>Research</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Thought leadership at the intersection of AI and digital assets
            </p>
          </div>
        </section>
        
        {/* AI Search Bar */}
        <section className={styles.searchSection}>
          <AISearchBar />
        </section>
        
        {/* Main Content Area */}
        <section className={styles.mainContent}>
          <div className={styles.contentWrapper}>
            {/* Filters Sidebar */}
            <aside className={styles.filtersSidebar}>
              <InsightFilters
                categories={categories}
                contentTypes={contentTypes}
                authors={authors}
                selectedCategory={selectedCategory}
                selectedType={selectedType}
                selectedAuthor={selectedAuthor}
                sortBy={sortBy}
                onCategoryChange={setSelectedCategory}
                onTypeChange={setSelectedType}
                onAuthorChange={setSelectedAuthor}
                onSortChange={setSortBy}
              />
            </aside>
            
            {/* Results Grid */}
            <div className={styles.resultsArea}>
              {/* Results Header */}
              <div className={styles.resultsHeader}>
                <p className={styles.resultsCount}>
                  {filteredInsights.length} {filteredInsights.length === 1 ? 'result' : 'results'}
                </p>
              </div>
              
              {/* Insights Grid */}
              <div className={styles.insightsGrid}>
                {filteredInsights.map(insight => (
                  <InsightCard
                    key={insight.id}
                    insight={insight}
                  />
                ))}
              </div>
              
              {filteredInsights.length === 0 && (
                <div className={styles.noResults}>
                  <p>No insights found matching your criteria.</p>
                  <button 
                    className={styles.clearFilters}
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory('All')
                      setSelectedType('All')
                      setSelectedAuthor('All')
                    }}
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Newsletter CTA */}
        <section className={styles.newsletterSection}>
          <div className={styles.newsletterContent}>
            <h2>Stay Ahead of the Curve</h2>
            <p>Get our latest insights delivered directly to your inbox</p>
            <form className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.emailInput}
                required
              />
              <button type="submit" className={styles.subscribeButton}>
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  )
} 