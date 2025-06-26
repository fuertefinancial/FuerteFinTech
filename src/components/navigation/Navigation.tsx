import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import styles from './navigation.module.css'

// Dynamic imports to avoid SSR issues
const LivingLogo = dynamic(() => import('./LivingLogo'), { 
  ssr: false,
  loading: () => <div className={styles.logoPlaceholder}>F</div>
})

const LivingLogoMobile = dynamic(() => import('./LivingLogoMobile'), { 
  ssr: false,
  loading: () => <div className={styles.logoPlaceholder}>F</div>
})

const MobileNav = dynamic(() => import('./MobileNav'), { 
  ssr: false
})

export default function Navigation() {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.navigator.maxTouchPoints > 1)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/philosophy', label: 'Philosophy' },
    { href: '/products', label: 'Products' },
    { href: '/insights', label: 'Insights' },
    { href: '/contact', label: 'Contact' },
  ]
  
  return (
    <>
      <nav className={styles.navigation}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.navLogo}>
            {isMobile ? <LivingLogoMobile /> : <LivingLogo />}
            <span className={styles.logoText}>FUERTE</span>
          </Link>
          
          {/* Desktop Navigation */}
          <ul className={styles.navLinks}>
            {navItems.map((item) => (
              <li key={item.href}>
                <a 
                  href={item.href}
                  className={router.pathname === item.href ? styles.active : ''}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      
      {/* Mobile Navigation */}
      {isMobile && <MobileNav />}
    </>
  )
} 