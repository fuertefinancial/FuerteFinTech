import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './ui.module.css'

interface FormInputProps {
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  validation?: (value: string) => { valid: boolean; message?: string }
  required?: boolean
  haptic?: boolean
  className?: string
}

export default function FormInput({
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  validation,
  required = false,
  haptic = true,
  className = ''
}: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Validate on blur
  const handleBlur = () => {
    if (validation && value) {
      const result = validation(value)
      setIsValid(result.valid)
      setErrorMessage(result.message || '')
      
      // Haptic feedback for validation
      if (haptic && 'vibrate' in navigator) {
        navigator.vibrate(result.valid ? 5 : [10, 50, 10])
      }
      
      // Play validation sound
      playSound(result.valid ? 'success' : 'error')
    }
    
    setIsFocused(false)
    onBlur?.()
  }
  
  const handleFocus = () => {
    setIsFocused(true)
    playSound('focus')
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChange(newValue)
    
    // Clear validation state while typing
    if (isValid !== null) {
      setIsValid(null)
      setErrorMessage('')
    }
  }
  
  const labelVariants = {
    default: {
      y: 0,
      scale: 1,
      color: '#999'
    },
    float: {
      y: -24,
      scale: 0.75,
      color: '#00BFFF',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  }
  
  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 25
      }
    }
  }
  
  const shouldFloat = isFocused || value.length > 0
  
  return (
    <div className={`${styles.formInputWrapper} ${className}`}>
      <div className={styles.inputContainer}>
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          className={`${styles.formInput} ${isValid === false ? styles.invalid : ''}`}
        />
        
        {/* Animated label */}
        <motion.label
          className={styles.formLabel}
          animate={shouldFloat ? 'float' : 'default'}
          variants={labelVariants}
          onClick={() => inputRef.current?.focus()}
        >
          {label}
          {required && <span className={styles.required}>*</span>}
        </motion.label>
        
        {/* Focus line */}
        <motion.div
          className={styles.focusLine}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Validation icons */}
        <AnimatePresence>
          {isValid === true && (
            <motion.div
              className={styles.validationIcon}
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path 
                  d="M7 10l2 2 4-4" 
                  stroke="#00FF88" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <circle 
                  cx="10" 
                  cy="10" 
                  r="9" 
                  stroke="#00FF88" 
                  strokeWidth="2"
                />
              </svg>
            </motion.div>
          )}
          
          {isValid === false && (
            <motion.div
              className={styles.validationIcon}
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path 
                  d="M6 6l8 8M14 6l-8 8" 
                  stroke="#FF3300" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
                <circle 
                  cx="10" 
                  cy="10" 
                  r="9" 
                  stroke="#FF3300" 
                  strokeWidth="2"
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Error message */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            className={styles.errorMessage}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Sound utility
function playSound(type: string) {
  if (typeof window !== 'undefined' && window.soundEnabled) {
    window.playUISound?.(type)
  }
} 