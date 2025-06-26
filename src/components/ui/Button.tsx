import React, { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import styles from './ui.module.css'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  onClick?: () => void
  disabled?: boolean
  glitch?: boolean
  haptic?: boolean
  className?: string
}

export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  glitch = false,
  haptic = true,
  className = ''
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])
  const buttonRef = useRef<HTMLButtonElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Transform mouse position to button-relative coordinates
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }
  
  // Create ripple effect on click
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return
    
    // Haptic feedback for mobile
    if (haptic && 'vibrate' in navigator) {
      navigator.vibrate(10)
    }
    
    // Play click sound if enabled
    playSound('click')
    
    // Create ripple
    const rect = buttonRef.current?.getBoundingClientRect()
    if (rect) {
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = Date.now()
      setRipples(prev => [...prev, { x, y, id }])
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id))
      }, 600)
    }
    
    onClick?.()
  }
  
  // Glitch effect for cyberpunk aesthetic
  const glitchVariants = {
    hover: {
      x: [0, -2, 2, -1, 1, 0],
      transition: {
        x: {
          duration: 0.3,
          repeat: Infinity,
          repeatType: "reverse" as const
        }
      }
    }
  }
  
  return (
    <motion.button
      ref={buttonRef}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      animate={glitch && isHovered ? "hover" : ""}
      variants={glitch ? glitchVariants : undefined}
    >
      {/* Geometric fill effect */}
      <motion.div
        className={styles.geometricFill}
        style={{
          originX: useTransform(mouseX, (x) => x + 'px'),
          originY: useTransform(mouseY, (y) => y + 'px'),
        }}
        animate={{
          scale: isHovered ? 30 : 0,
          opacity: isHovered ? 1 : 0
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
      />
      
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className={styles.ripple}
          style={{
            left: ripple.x,
            top: ripple.y
          }}
        />
      ))}
      
      {/* Glitch layers for text */}
      {glitch && (
        <>
          <span className={styles.glitchLayer} data-text={children}>
            {children}
          </span>
          <span className={styles.glitchLayer2} data-text={children}>
            {children}
          </span>
        </>
      )}
      
      {/* Main content */}
      <span className={styles.buttonContent}>{children}</span>
    </motion.button>
  )
}

// Sound utilities (defined in separate module)
function playSound(type: string) {
  if (typeof window !== 'undefined' && window.soundEnabled) {
    // Sound implementation in separate module
    window.playUISound?.(type)
  }
} 