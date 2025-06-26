import { useState, useCallback } from 'react'

// Mock content database - in production this would be your actual content
const mockContent = [
  {
    id: '1',
    type: 'article' as const,
    title: 'Ethereum Staking Yields: Q1 2024 Outlook',
    excerpt: 'Our analysis shows Ethereum staking yields are expected to stabilize between 4-6% APY in Q1 2024, driven by increased validator participation and the maturation of liquid staking protocols.',
    content: 'Full article content...',
    date: '2024-01-15',
    author: 'Dr. Sarah Chen',
    tags: ['Ethereum', 'Staking', 'DeFi', 'Yield'],
    keywords: ['ethereum', 'staking', 'yields', 'outlook', 'q1', '2024', 'apy', 'validator']
  },
  {
    id: '2',
    type: 'data' as const,
    title: 'Real-Time DeFi Yield Dashboard',
    excerpt: 'Track live yields across major DeFi protocols including Aave, Compound, and Curve. Updated every 15 minutes with AI-powered trend analysis.',
    content: 'Dashboard data...',
    date: '2024-01-20',
    tags: ['DeFi', 'Yield', 'Real-time', 'Dashboard'],
    keywords: ['defi', 'yield', 'dashboard', 'aave', 'compound', 'curve', 'real-time']
  },
  {
    id: '3',
    type: 'insight' as const,
    title: 'AI Portfolio Optimization: January Results',
    excerpt: 'Our AI-driven portfolio optimization achieved a 15.2% return in January, outperforming traditional strategies by 320 basis points.',
    content: 'Detailed analysis...',
    date: '2024-02-01',
    author: 'Marcus Rodriguez',
    tags: ['AI', 'Portfolio', 'Performance', 'Alpha'],
    keywords: ['ai', 'portfolio', 'optimization', 'performance', 'returns', 'alpha', 'strategy']
  },
  {
    id: '4',
    type: 'chart' as const,
    title: 'Market Volatility Correlation Analysis',
    excerpt: 'Interactive visualization showing correlations between crypto assets and traditional markets during periods of high volatility.',
    content: 'Chart data...',
    date: '2024-01-25',
    tags: ['Volatility', 'Correlation', 'Analysis', 'Visualization'],
    keywords: ['market', 'volatility', 'correlation', 'crypto', 'bitcoin', 'stocks', 'analysis']
  }
]

// Simple NLP-like keyword extraction
function extractKeywords(query: string): string[] {
  const stopWords = ['what', 'is', 'the', 'on', 'in', 'for', 'a', 'an', 'and', 'or', 'but', 'next']
  const words = query.toLowerCase().split(/\W+/).filter(word => 
    word.length > 2 && !stopWords.includes(word)
  )
  
  // Add synonyms and related terms
  const synonyms: Record<string, string[]> = {
    'outlook': ['forecast', 'prediction', 'analysis'],
    'yield': ['apy', 'return', 'rate'],
    'ethereum': ['eth', 'ether'],
    'quarter': ['q1', 'q2', 'q3', 'q4']
  }
  
  const expandedWords = [...words]
  words.forEach(word => {
    if (synonyms[word]) {
      expandedWords.push(...synonyms[word])
    }
  })
  
  return expandedWords
}

// Calculate relevance score
function calculateRelevance(content: any, keywords: string[]): number {
  let score = 0
  
  keywords.forEach(keyword => {
    // Title matches are worth more
    if (content.title.toLowerCase().includes(keyword)) {
      score += 3
    }
    // Excerpt matches
    if (content.excerpt.toLowerCase().includes(keyword)) {
      score += 2
    }
    // Tag matches
    if (content.tags.some((tag: string) => tag.toLowerCase().includes(keyword))) {
      score += 2
    }
    // Keyword matches
    if (content.keywords.includes(keyword)) {
      score += 1
    }
  })
  
  // Normalize score to 0-1 range
  return Math.min(score / (keywords.length * 8), 1)
}

export function useAISearch() {
  const [isProcessing, setIsProcessing] = useState(false)
  
  const searchWithAI = useCallback(async (query: string) => {
    setIsProcessing(true)
    
    try {
      // Extract keywords using simple NLP
      const keywords = extractKeywords(query)
      
      // Search and rank content
      const results = mockContent
        .map(content => ({
          ...content,
          relevance: calculateRelevance(content, keywords)
        }))
        .filter(result => result.relevance > 0.1) // Minimum relevance threshold
        .sort((a, b) => b.relevance - a.relevance)
        .slice(0, 5) // Top 5 results
      
      // In production, this would call your AI API endpoint
      // const response = await fetch('/api/ai-search', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ query })
      // })
      // const results = await response.json()
      
      return results
    } finally {
      setIsProcessing(false)
    }
  }, [])
  
  return {
    searchWithAI,
    isProcessing
  }
} 