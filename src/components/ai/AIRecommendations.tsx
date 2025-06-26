import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './ai.module.css'

interface Recommendation {
  id: string
  type: 'research' | 'webinar' | 'update' | 'insight'
  title: string
  description: string
  relevanceScore: number
  reason: string
  date: string
  readTime?: string
  tags: string[]
}

interface UserProfile {
  holdings: string[]
  interests: string[]
  recentViews: string[]
}

interface AIRecommendationsProps {
  userProfile: UserProfile
  maxRecommendations?: number
}

export default function AIRecommendations({ 
  userProfile, 
  maxRecommendations = 5 
}: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  
  useEffect(() => {
    generateRecommendations()
  }, [userProfile])
  
  const generateRecommendations = async () => {
    setIsLoading(true)
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1200))
    
    // Mock recommendation engine - in production this would be ML-based
    const mockRecommendations: Recommendation[] = [
      {
        id: '1',
        type: 'research',
        title: 'DeFi Protocol Risk Assessment: Post-Shanghai Update',
        description: 'Comprehensive analysis of liquidity risks in major DeFi protocols following Ethereum\'s Shanghai upgrade.',
        relevanceScore: 0.95,
        reason: 'Based on your DeFi Yield Fund holdings and recent interest in Ethereum updates',
        date: '2024-01-18',
        readTime: '12 min',
        tags: ['DeFi', 'Risk Analysis', 'Ethereum']
      },
      {
        id: '2',
        type: 'webinar',
        title: 'AI Portfolio Optimization Masterclass',
        description: 'Join our CTO for a deep dive into the machine learning models powering our quantitative strategies.',
        relevanceScore: 0.92,
        reason: 'You viewed 3 articles about AI trading strategies this week',
        date: '2024-01-25',
        tags: ['AI', 'Portfolio Management', 'Education']
      },
      {
        id: '3',
        type: 'update',
        title: 'Bitcoin Halving Impact Analysis',
        description: 'Our quantitative models project market dynamics for the upcoming Bitcoin halving event.',
        relevanceScore: 0.88,
        reason: 'Related to your Blockchain Venture Fund allocation',
        date: '2024-01-20',
        readTime: '8 min',
        tags: ['Bitcoin', 'Market Analysis', 'Crypto']
      },
      {
        id: '4',
        type: 'insight',
        title: 'Correlation Shifts in Digital Assets',
        description: 'AI-detected changes in correlation patterns between crypto and traditional markets.',
        relevanceScore: 0.85,
        reason: 'Matches your multi-asset portfolio composition',
        date: '2024-01-22',
        readTime: '6 min',
        tags: ['Correlation', 'Market Dynamics', 'AI Analysis']
      },
      {
        id: '5',
        type: 'research',
        title: 'Layer 2 Scaling Solutions: Investment Opportunities',
        description: 'Evaluating the investment potential of Ethereum Layer 2 protocols and their tokens.',
        relevanceScore: 0.82,
        reason: 'Aligns with your technology-focused investment profile',
        date: '2024-01-19',
        readTime: '15 min',
        tags: ['Layer 2', 'Investment', 'Technology']
      }
    ]
    
    // Filter and personalize based on user profile
    const personalizedRecommendations = mockRecommendations
      .map(rec => {
        let score = rec.relevanceScore
        
        // Boost score based on user holdings
        userProfile.holdings.forEach(holding => {
          if (rec.tags.some(tag => tag.toLowerCase().includes(holding.toLowerCase()))) {
            score += 0.1
          }
        })
        
        // Boost score based on interests
        userProfile.interests.forEach(interest => {
          if (rec.title.toLowerCase().includes(interest.toLowerCase()) ||
              rec.description.toLowerCase().includes(interest.toLowerCase())) {
            score += 0.05
          }
        })
        
        return { ...rec, relevanceScore: Math.min(score, 1) }
      })
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, maxRecommendations)
    
    setRecommendations(personalizedRecommendations)
    setIsLoading(false)
  }
  
  const handleRefresh = async () => {
    setRefreshing(true)
    await generateRecommendations()
    setRefreshing(false)
  }
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'research': return '📊'
      case 'webinar': return '🎥'
      case 'update': return '📰'
      case 'insight': return '💡'
      default: return '📄'
    }
  }
  
  return (
    <div className={styles.recommendationsContainer}>
      <div className={styles.recommendationsHeader}>
        <h3>
          <span className={styles.aiIcon}>🤖</span>
          AI-Powered Recommendations
        </h3>
        <button
          className={styles.refreshButton}
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            animate={{ rotate: refreshing ? 360 : 0 }}
            transition={{ duration: 1, repeat: refreshing ? Infinity : 0 }}
          >
            <path
              d="M14 8a6 6 0 11-6-6"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M8 2l2 2-2 2"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
          Refresh
        </button>
      </div>
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            className={styles.loadingState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={styles.aiThinking}>
              <div className={styles.thinkingDots}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <p>AI is analyzing your profile and generating personalized recommendations...</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            className={styles.recommendationsList}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {recommendations.map((rec, index) => (
              <motion.div
                key={rec.id}
                className={styles.recommendationCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={styles.recHeader}>
                  <div className={styles.recType}>
                    <span className={styles.typeIcon}>{getTypeIcon(rec.type)}</span>
                    <span>{rec.type}</span>
                  </div>
                  <div className={styles.relevanceIndicator}>
                    <div
                      className={styles.relevanceBar}
                      style={{ width: `${rec.relevanceScore * 100}%` }}
                    />
                    <span>{Math.round(rec.relevanceScore * 100)}% match</span>
                  </div>
                </div>
                
                <h4 className={styles.recTitle}>{rec.title}</h4>
                <p className={styles.recDescription}>{rec.description}</p>
                
                <div className={styles.recReason}>
                  <span className={styles.sparkle}>✨</span>
                  {rec.reason}
                </div>
                
                <div className={styles.recMeta}>
                  <span>{rec.date}</span>
                  {rec.readTime && <span>• {rec.readTime}</span>}
                </div>
                
                <div className={styles.recTags}>
                  {rec.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
                
                <button className={styles.viewButton}>
                  View Content →
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className={styles.aiNote}>
        <p>
          <strong>How this works:</strong> Our AI analyzes your portfolio holdings, 
          content viewing patterns, and market trends to surface the most relevant 
          insights for your investment strategy.
        </p>
      </div>
    </div>
  )
} 