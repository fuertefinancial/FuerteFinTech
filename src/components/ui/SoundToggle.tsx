import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import soundSystem from '../../utils/soundSystem'
import styles from './ui.module.css'

export default function SoundToggle() {
  const [isEnabled, setIsEnabled] = useState(false)
  
  useEffect(() => {
    // Initialize sound system
    soundSystem.init()
    setIsEnabled(soundSystem.isEnabled())
  }, [])
  
  const handleToggle = () => {
    const newState = soundSystem.toggle()
    setIsEnabled(newState)
  }
  
  return (
    <div className={styles.soundControl}>
      <motion.div
        className={styles.soundIcon}
        animate={{ 
          scale: isEnabled ? [1, 1.1, 1] : 1,
          opacity: isEnabled ? 1 : 0.6 
        }}
        transition={{ duration: 0.3 }}
      >
        {isEnabled ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 5L6 9H3v2h3l4 4V5z" fill="#00BFFF"/>
            <path d="M13.5 7.5a3 3 0 010 5M15 5a6 6 0 010 10" stroke="#00BFFF" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 5L6 9H3v2h3l4 4V5z" fill="#666"/>
            <line x1="14" y1="8" x2="18" y2="12" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
            <line x1="18" y1="8" x2="14" y2="12" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )}
      </motion.div>
      
      <div className={styles.toggleWrapper}>
        <div 
          className={`${styles.toggle} ${isEnabled ? styles.active : ''}`}
          onClick={handleToggle}
        >
          <div className={styles.toggleSlider} />
        </div>
        <span className={styles.toggleLabel}>
          {isEnabled ? 'Sound On' : 'Sound Off'}
        </span>
      </div>
    </div>
  )
} 