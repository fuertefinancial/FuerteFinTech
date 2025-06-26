import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../../styles/portal.module.css'

interface PortalLayoutProps {
  children: React.ReactNode
}

export default function PortalLayout({ children }: PortalLayoutProps) {
  const router = useRouter()
  
  const navItems = [
    { href: '/investors/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/investors/analytics', label: 'Analytics', icon: '📈' },
    { href: '/investors/documents', label: 'Documents', icon: '📁' },
    { href: '/investors/messages', label: 'Messages', icon: '💬' },
    { href: '/investors/settings', label: 'Settings', icon: '⚙️' },
  ]
  
  const handleLogout = () => {
    sessionStorage.removeItem('investorAuth')
    router.push('/investors/login')
  }
  
  return (
    <div className={styles.portalLayout}>
      <aside className={styles.portalSidebar}>
        <nav className={styles.portalNav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${router.pathname === item.href ? styles.active : ''}`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <button onClick={handleLogout} className={styles.logoutButton}>
          LOGOUT
        </button>
      </aside>
      <main className={styles.portalContent}>
        {children}
      </main>
    </div>
  )
} 