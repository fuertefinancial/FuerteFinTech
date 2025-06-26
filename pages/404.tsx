import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Navigation from '../src/components/navigation/Navigation'
import styles from '../src/styles/error.module.css'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | Fuerte Financial Technologies</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Head>
      
      <Navigation />
      
      <main className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <h1 className={styles.errorCode}>404</h1>
          <div className={styles.glitchEffect} data-text="404">404</div>
          
          <h2 className={styles.errorTitle}>Page Not Found</h2>
          <p className={styles.errorMessage}>
            The page you're looking for has been moved, deleted, or never existed.
            Like alpha in volatile markets, sometimes things disappear.
          </p>
          
          <div className={styles.errorActions}>
            <Link href="/" className={styles.primaryButton}>
              Return Home
            </Link>
            <Link href="/insights" className={styles.secondaryButton}>
              Explore Insights
            </Link>
          </div>
        </div>
        
        <div className={styles.backgroundEffect}>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
        </div>
      </main>
    </>
  )
} 