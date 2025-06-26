import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './ui.module.css'

interface AccordionItem {
  id: string
  title: string
  content: React.ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
  haptic?: boolean
}

export default function Accordion({ 
  items, 
  allowMultiple = false,
  haptic = true 
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  
  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      if (!allowMultiple) {
        newOpenItems.clear()
      }
      newOpenItems.add(id)
    }
    
    setOpenItems(newOpenItems)
    
    // Haptic feedback
    if (haptic && 'vibrate' in navigator) {
      navigator.vibrate(5)
    }
    
    // Play sound
    playSound('click')
  }
  
  const contentVariants = {
    closed: { 
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
        opacity: { duration: 0.2 }
      }
    },
    open: { 
      height: 'auto',
      opacity: 1,
      transition: {
        height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
        opacity: { duration: 0.3, delay: 0.1 }
      }
    }
  }
  
  return (
    <div className={styles.accordionContainer}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id)
        
        return (
          <motion.div
            key={item.id}
            className={styles.accordion}
            initial={false}
            animate={{ 
              backgroundColor: isOpen ? 'rgba(0, 191, 255, 0.05)' : 'rgba(255, 255, 255, 0.02)'
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className={styles.accordionHeader}
              onClick={() => toggleItem(item.id)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className={styles.accordionTitle}>{item.title}</h3>
              <motion.div
                className={`${styles.accordionIcon} ${isOpen ? styles.open : ''}`}
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path 
                    d="M5 8l5 5 5-5" 
                    stroke="#00BFFF" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </motion.div>
            
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className={styles.accordionContent}
                  variants={contentVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <div className={styles.accordionBody}>
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}

// Sound utility
function playSound(type: string) {
  if (typeof window !== 'undefined' && window.soundEnabled) {
    window.playUISound?.(type)
  }
} 