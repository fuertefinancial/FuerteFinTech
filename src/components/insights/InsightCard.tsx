import React from 'react'
import styles from '../../styles/insights.module.css'

interface Insight {
  id: string
  title: string
  excerpt: string
  author: string
  date: string
  category: string
  type: string
  readTime: string
  image: string
  isGated: boolean
}

interface InsightCardProps {
  insight: Insight
}

export default function InsightCard({ insight }: InsightCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'White Paper':
      case 'Research Paper':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M9 1H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6L9 1z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 1v5h5M11 9H5M11 12H5M7 6H5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      case 'Video':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="3" width="12" height="10" rx="1" stroke="currentColor"/>
            <path d="M6 10V6l4 2-4 2z" fill="currentColor"/>
          </svg>
        )
      case 'Podcast':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3a3 3 0 0 0-3 3v2a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z" stroke="currentColor"/>
            <path d="M12 8a4 4 0 0 1-8 0M8 12v2M6 14h4" stroke="currentColor" strokeLinecap="round"/>
          </svg>
        )
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" stroke="currentColor"/>
            <path d="M5 7h6M5 10h4" stroke="currentColor" strokeLinecap="round"/>
          </svg>
        )
    }
  }
  
  return (
    <article className={styles.insightCard}>
      {/* Card Image */}
      <div className={styles.cardImage}>
        <img src={insight.image} alt={insight.title} />
        {insight.isGated && (
          <div className={styles.gatedBadge}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M9 5H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zM4 5V3a2 2 0 1 1 4 0v2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Gated</span>
          </div>
        )}
      </div>
      
      {/* Card Content */}
      <div className={styles.cardContent}>
        {/* Meta Information */}
        <div className={styles.cardMeta}>
          <span className={styles.metaType}>
            {getTypeIcon(insight.type)}
            {insight.type}
          </span>
          <span className={styles.metaDot}>•</span>
          <span className={styles.metaTime}>{insight.readTime}</span>
        </div>
        
        {/* Title */}
        <h3 className={styles.cardTitle}>
          <a href={`/insights/${insight.id}`} className={styles.titleLink}>
            {insight.title}
          </a>
        </h3>
        
        {/* Excerpt */}
        <p className={styles.cardExcerpt}>{insight.excerpt}</p>
        
        {/* Footer */}
        <div className={styles.cardFooter}>
          <div className={styles.authorInfo}>
            <span className={styles.authorName}>{insight.author}</span>
            <span className={styles.publishDate}>{formatDate(insight.date)}</span>
          </div>
          <span className={styles.categoryTag} data-category={insight.category.toLowerCase().replace(/\s+/g, '-')}>
            {insight.category}
          </span>
        </div>
      </div>
    </article>
  )
} 