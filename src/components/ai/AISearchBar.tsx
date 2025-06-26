import React, { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAISearch } from '../../hooks/useAISearch'
import styles from './ai.module.css'

interface SearchResult {
  id: string
  type: 'article' | 'chart' | 'data' | 'insight'
  title: string
  excerpt: string
  relevance: number
  date: string
  author?: string
  tags: string[]
}

export default function AISearchBar() {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const [aiThinking, setAiThinking] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { searchWithAI } = useAISearch()
  
  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      setShowResults(false)
      return
    }
    
    setIsSearching(true)
    setAiThinking(true)
    setShowResults(true)
    
    try {
      // Simulate AI processing with a slight delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // In production, this would call your AI API
      const aiResults = await searchWithAI(searchQuery)
      
      setResults(aiResults)
      setAiThinking(false)
    } catch (error) {
      console.error('AI search error:', error)
      setAiThinking(false)
    } finally {
      setIsSearching(false)
    }
  }, [searchWithAI])
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    
    // Debounced search
    const timeoutId = setTimeout(() => {
      handleSearch(newQuery)
    }, 500)
    
    return () => clearTimeout(timeoutId)
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }
  
  return (
    <div className={styles.aiSearchContainer}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <div className={styles.searchInputWrapper}>
          <motion.div
            className={styles.aiIcon}
            animate={aiThinking ? { rotate: 360 } : { rotate: 0 }}
            transition={aiThinking ? { duration: 2, repeat: Infinity, ease: "linear" } : {}}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#00BFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="#00BFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="#00BFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Ask anything: 'What is Fuerte's outlook on Ethereum staking yields?'"
            className={styles.searchInput}
            aria-label="AI-powered search"
          />
          
          <button
            type="submit"
            className={styles.searchButton}
            disabled={isSearching}
            aria-label="Search"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M9 17A8 8 0 109 1a8 8 0 000 16z" stroke="currentColor" strokeWidth="2"/>
              <path d="M17 17l-2-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        
        <AnimatePresence>
          {query && (
            <motion.div
              className={styles.aiHint}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <span className={styles.sparkle}>✨</span>
              AI is understanding your question...
            </motion.div>
          )}
        </AnimatePresence>
      </form>
      
      <AnimatePresence>
        {showResults && (
          <motion.div
            className={styles.searchResults}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {aiThinking ? (
              <div className={styles.aiThinking}>
                <div className={styles.thinkingDots}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <p>AI is analyzing your query and searching through our knowledge base...</p>
              </div>
            ) : results.length > 0 ? (
              <>
                <div className={styles.resultsHeader}>
                  <h3>AI found {results.length} relevant results</h3>
                  <span className={styles.aiPowered}>Powered by Fuerte AI</span>
                </div>
                
                {results.map((result) => (
                  <motion.a
                    key={result.id}
                    href={`/insights/${result.id}`}
                    className={styles.resultItem}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ x: 4 }}
                  >
                    <div className={styles.resultType}>
                      {getTypeIcon(result.type)}
                      <span>{result.type}</span>
                    </div>
                    
                    <h4>{result.title}</h4>
                    <p>{result.excerpt}</p>
                    
                    <div className={styles.resultMeta}>
                      <span>{result.date}</span>
                      {result.author && <span>by {result.author}</span>}
                      <div className={styles.relevanceScore}>
                        <span>Relevance: {Math.round(result.relevance * 100)}%</span>
                      </div>
                    </div>
                    
                    <div className={styles.resultTags}>
                      {result.tags.map(tag => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                  </motion.a>
                ))}
              </>
            ) : (
              <div className={styles.noResults}>
                <p>No results found. Try rephrasing your question.</p>
                <p className={styles.suggestion}>
                  For example: "How does Fuerte use AI in portfolio management?"
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function getTypeIcon(type: string) {
  switch (type) {
    case 'article':
      return '📄'
    case 'chart':
      return '📊'
    case 'data':
      return '📈'
    case 'insight':
      return '💡'
    default:
      return '📌'
  }
} 