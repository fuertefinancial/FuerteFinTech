import React from 'react'
import styles from '../../styles/insights.module.css'

interface InsightFiltersProps {
  categories: string[]
  contentTypes: string[]
  authors: string[]
  selectedCategory: string
  selectedType: string
  selectedAuthor: string
  sortBy: string
  onCategoryChange: (category: string) => void
  onTypeChange: (type: string) => void
  onAuthorChange: (author: string) => void
  onSortChange: (sort: string) => void
}

export default function InsightFilters({
  categories,
  contentTypes,
  authors,
  selectedCategory,
  selectedType,
  selectedAuthor,
  sortBy,
  onCategoryChange,
  onTypeChange,
  onAuthorChange,
  onSortChange
}: InsightFiltersProps) {
  return (
    <div className={styles.filters}>
      <h3 className={styles.filtersTitle}>Filters</h3>
      
      {/* Sort By */}
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Sort By</label>
        <select 
          className={styles.filterSelect}
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="date">Latest First</option>
          <option value="title">Title (A-Z)</option>
        </select>
      </div>
      
      {/* Category Filter */}
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Category</label>
        <div className={styles.filterOptions}>
          {categories.map(category => (
            <button
              key={category}
              className={`${styles.filterOption} ${selectedCategory === category ? styles.filterOptionActive : ''}`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
              {selectedCategory === category && (
                <span className={styles.filterCount}>✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Content Type Filter */}
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Content Type</label>
        <div className={styles.filterOptions}>
          {contentTypes.map(type => (
            <button
              key={type}
              className={`${styles.filterOption} ${selectedType === type ? styles.filterOptionActive : ''}`}
              onClick={() => onTypeChange(type)}
            >
              {type}
              {selectedType === type && (
                <span className={styles.filterCount}>✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Author Filter */}
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Author</label>
        <div className={styles.filterOptions}>
          {authors.map(author => (
            <button
              key={author}
              className={`${styles.filterOption} ${selectedAuthor === author ? styles.filterOptionActive : ''}`}
              onClick={() => onAuthorChange(author)}
            >
              {author}
              {selectedAuthor === author && (
                <span className={styles.filterCount}>✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Reset Filters */}
      {(selectedCategory !== 'All' || selectedType !== 'All' || selectedAuthor !== 'All') && (
        <button 
          className={styles.resetFilters}
          onClick={() => {
            onCategoryChange('All')
            onTypeChange('All')
            onAuthorChange('All')
          }}
        >
          Reset All Filters
        </button>
      )}
    </div>
  )
} 