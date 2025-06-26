import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import PortalLayout from '../../src/components/portal/PortalLayout'
import PerformanceWidget from '../../src/components/portal/PerformanceWidget'
import AccountSummary from '../../src/components/portal/AccountSummary'
import NotificationWidget from '../../src/components/portal/NotificationWidget'
import AIRecommendations from '../../src/components/ai/AIRecommendations'
import styles from '../../src/styles/portal.module.css'

export default function InvestorDashboard() {
  const router = useRouter()
  const [lastLogin, setLastLogin] = useState<string>('')
  
  useEffect(() => {
    // Check authentication
    const isAuth = sessionStorage.getItem('investorAuth')
    if (!isAuth) {
      router.push('/investors/login')
      return
    }
    
    // Set last login info
    const now = new Date()
    setLastLogin(now.toLocaleString('en-US', { 
      dateStyle: 'medium', 
      timeStyle: 'short' 
    }))
  }, [router])
  
  // Mock investor data
  const investorData = {
    name: 'Institutional Investor',
    totalCapital: 25000000,
    totalReturn: 0.2847,
    mtdReturn: 0.0312,
    qtdReturn: 0.0856,
    ytdReturn: 0.2847,
    notifications: 3
  }
  
  // Mock user profile for AI recommendations
  const userProfile = {
    holdings: ['AI Quantitative Fund', 'DeFi Yield Fund', 'Blockchain Venture Fund'],
    interests: ['AI', 'DeFi', 'Ethereum', 'Risk Management'],
    recentViews: ['ethereum-staking-analysis', 'ai-portfolio-optimization', 'defi-protocol-risks']
  }
  
  return (
    <>
      <Head>
        <title>Dashboard - Fuerte Investor Portal</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <PortalLayout>
        <div className={styles.dashboardContainer}>
          {/* Security Info Bar */}
          <div className={styles.securityBar}>
            <span>Last login: {lastLogin} from 192.168.1.1</span>
            <span className={styles.sessionTimer}>Session expires in 14:58</span>
          </div>
          
          {/* Dashboard Header */}
          <div className={styles.dashboardHeader}>
            <h1>Dashboard</h1>
            <p className={styles.welcomeText}>Welcome back, {investorData.name}</p>
          </div>
          
          {/* Key Metrics Grid */}
          <div className={styles.metricsGrid}>
            {/* Total Capital Widget */}
            <div className={styles.metricCard}>
              <h3>Total Capital Invested</h3>
              <div className={styles.metricValue}>
                ${investorData.totalCapital.toLocaleString()}
              </div>
              <div className={styles.metricSubtext}>
                Across 3 funds
              </div>
            </div>
            
            {/* Performance Widget */}
            <PerformanceWidget
              mtd={investorData.mtdReturn}
              qtd={investorData.qtdReturn}
              ytd={investorData.ytdReturn}
            />
            
            {/* Account Summary */}
            <AccountSummary />
            
            {/* Notifications */}
            <NotificationWidget count={investorData.notifications} />
          </div>
          
          {/* AI-Powered Recommendations */}
          <div className={styles.recommendationsSection}>
            <AIRecommendations userProfile={userProfile} maxRecommendations={4} />
          </div>
          
          {/* Quick Actions */}
          <div className={styles.quickActions}>
            <h2>Quick Actions</h2>
            <div className={styles.actionButtons}>
              <a href="/investors/documents" className={styles.actionButton}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 4h12v12H4V4z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 10h4M8 12h4M8 8h4" stroke="currentColor"/>
                </svg>
                View Latest Statement
              </a>
              <a href="/investors/analytics" className={styles.actionButton}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 13l4-4 4 4 6-6" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Portfolio Analytics
              </a>
              <a href="/investors/messages" className={styles.actionButton}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="5" width="16" height="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M2 5l8 5 8-5" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Secure Messages
              </a>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className={styles.recentActivity}>
            <h2>Recent Activity</h2>
            <div className={styles.activityList}>
              <div className={styles.activityItem}>
                <div className={styles.activityIcon}>📄</div>
                <div className={styles.activityContent}>
                  <p className={styles.activityTitle}>Q4 2023 Statement Available</p>
                  <p className={styles.activityDate}>January 15, 2024</p>
                </div>
              </div>
              <div className={styles.activityItem}>
                <div className={styles.activityIcon}>📊</div>
                <div className={styles.activityContent}>
                  <p className={styles.activityTitle}>December Performance Update</p>
                  <p className={styles.activityDate}>January 5, 2024</p>
                </div>
              </div>
              <div className={styles.activityItem}>
                <div className={styles.activityIcon}>💬</div>
                <div className={styles.activityContent}>
                  <p className={styles.activityTitle}>New message from Investor Relations</p>
                  <p className={styles.activityDate}>December 28, 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PortalLayout>
    </>
  )
} 