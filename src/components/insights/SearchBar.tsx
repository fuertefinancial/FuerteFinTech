import React from 'react'
import styles from '../../styles/insights.module.css'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <div className={styles.searchBar}>
      <div className={styles.searchIcon}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path 
            d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="m19 19-4.35-4.35" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
      
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Search...'}
        className={styles.searchInput}
      />
      
      {value && (
        <button 
          className={styles.clearButton}
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path 
              d="M12 4 4 12M4 4l8 8" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  )
} 