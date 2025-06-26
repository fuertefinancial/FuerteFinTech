import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../../src/styles/portal.module.css'

export default function InvestorLogin() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    twoFactorCode: ''
  })
  const [step, setStep] = useState(1) // 1: credentials, 2: 2FA
  const [error, setError] = useState('')
  
  const handleCredentialSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    // Validate credentials (in production, this would be an API call)
    if (formData.username && formData.password) {
      setStep(2)
    } else {
      setError('Please enter your credentials')
    }
  }
  
  const handle2FASubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    // Validate 2FA code (in production, this would verify with backend)
    if (formData.twoFactorCode.length === 6) {
      // Store auth token and redirect to dashboard
      sessionStorage.setItem('investorAuth', 'true')
      router.push('/investors/dashboard')
    } else {
      setError('Invalid verification code')
    }
  }
  
  return (
    <>
      <Head>
        <title>Investor Portal - Fuerte Financial Technologies</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <main className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <div className={styles.loginHeader}>
            <h1 className={styles.portalLogo}>FUERTE</h1>
            <p className={styles.portalTagline}>Investor Portal</p>
          </div>
          
          {step === 1 ? (
            <form onSubmit={handleCredentialSubmit} className={styles.loginForm}>
              <div className={styles.formGroup}>
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  placeholder="Enter your username"
                  required
                  autoComplete="username"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
              </div>
              
              {error && <p className={styles.errorMessage}>{error}</p>}
              
              <button type="submit" className={styles.loginButton}>
                Continue to Verification
              </button>
            </form>
          ) : (
            <form onSubmit={handle2FASubmit} className={styles.loginForm}>
              <div className={styles.twoFactorHeader}>
                <h2>Two-Factor Authentication</h2>
                <p>Enter the 6-digit code from your authenticator app</p>
              </div>
              
              <div className={styles.formGroup}>
                <input
                  type="text"
                  value={formData.twoFactorCode}
                  onChange={(e) => setFormData({...formData, twoFactorCode: e.target.value.replace(/\D/g, '').slice(0, 6)})}
                  placeholder="000000"
                  maxLength={6}
                  pattern="\d{6}"
                  required
                  autoComplete="one-time-code"
                  className={styles.twoFactorInput}
                />
              </div>
              
              {error && <p className={styles.errorMessage}>{error}</p>}
              
              <button type="submit" className={styles.loginButton}>
                Verify & Access Portal
              </button>
              
              <button 
                type="button" 
                className={styles.backButton}
                onClick={() => setStep(1)}
              >
                ← Back
              </button>
            </form>
          )}
          
          <div className={styles.loginFooter}>
            <p className={styles.securityNote}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 1.5A5.5 5.5 0 1 1 8 13a5.5 5.5 0 0 1 0-11zm1 3.5v4l2 2-1 1-2.5-2.5V6h1.5z"/>
              </svg>
              This is a secure, encrypted connection
            </p>
            <a href="/contact" className={styles.supportLink}>Need assistance?</a>
          </div>
        </div>
      </main>
    </>
  )
} 