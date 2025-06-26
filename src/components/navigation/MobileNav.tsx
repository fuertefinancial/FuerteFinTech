import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './mobileNav.module.css'

const menuItems = [
  { href: '/', label: 'Home' },
  { href: '/philosophy', label: 'Philosophy' },
  { href: '/products', label: 'Products' },
  { href: '/insights', label: 'Insights' },
  { href: '/contact', label: 'Contact' },
  { href: '/investors/login', label: 'Investor Portal', accent: true }
]

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])
  
  const toggleMenu = () => {
    setIsOpen(!isOpen)
    
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(5)
    }
  }
  
  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    }
  }
  
  const itemVariants = {
    closed: {
      x: -50,
      opacity: 0
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  }
  
  const backdropVariants = {
    closed: {
      opacity: 0,
      backdropFilter: 'blur(0px)'
    },
    open: {
      opacity: 1,
      backdropFilter: 'blur(10px)'
    }
  }
  
  return (
    <>
      {/* Hamburger Button */}
      <button
        className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <motion.span
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 8 : 0
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          animate={{
            opacity: isOpen ? 0 : 1
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -8 : 0
          }}
          transition={{ duration: 0.3 }}
        />
      </button>
      
      {/* Full-screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className={styles.backdrop}
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={toggleMenu}
            />
            
            {/* Menu Panel */}
            <motion.nav
              className={styles.mobileMenu}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 30 
              }}
            >
              <motion.ul
                className={styles.menuList}
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                {menuItems.map((item) => (
                  <motion.li
                    key={item.href}
                    variants={itemVariants}
                    className={styles.menuItem}
                  >
                    <Link
                      href={item.href}
                      className={`${styles.menuLink} ${item.accent ? styles.accent : ''}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                      {item.accent && (
                        <svg 
                          className={styles.arrow} 
                          width="20" 
                          height="20" 
                          viewBox="0 0 20 20"
                        >
                          <path 
                            d="M7 10l4 4 4-4" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            fill="none"
                          />
                        </svg>
                      )}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
              
              {/* Contact Info */}
              <motion.div
                className={styles.contactInfo}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p>Contact Us</p>
                <a href="mailto:info@fuerte.tech">info@fuerte.tech</a>
                <a href="tel:+1234567890">+1 (234) 567-890</a>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
} 