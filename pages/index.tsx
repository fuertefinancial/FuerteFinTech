import React, { Suspense, lazy } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import styles from '../src/styles/hero.module.css'

// Dynamic import for Three.js components to avoid SSR issues
const FuerteEngine = dynamic(
  () => import('../src/components/hero/FuerteEngine'),
  { 
    ssr: false,
    loading: () => (
      <div className={styles.heroLoading}>
        <div className={styles.loadingSpinner}></div>
      </div>
    )
  }
)

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Fuerte Financial Technologies - Harnessing Chaos, Engineering Alpha</title>
        <meta name="description" content="Structure from Chaos. Alpha from Intelligence. Fuerte Financial Technologies leverages advanced AI to transform market volatility into structured returns." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Preload critical assets */}
        <link rel="preload" href="/fonts/SpaceGrotesk-Bold.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/Inter-Regular.woff2" as="font" type="font/woff2" crossOrigin="" />
      </Head>

      <main>
        {/* Hero Section with WebGL Visualization */}
        <section className={styles.heroContainer}>
          <Suspense fallback={
            <div className={styles.heroLoading}>
              <div className={styles.loadingSpinner}></div>
            </div>
          }>
            <FuerteEngine />
          </Suspense>
          
          {/* Scroll Indicator */}
          <div className={styles.scrollIndicator} aria-label="Scroll down"></div>
        </section>

        {/* Philosophy Section (Prompt 5) */}
        <section id="philosophy" className="section">
          <div className="container">
            <h2>Our Philosophy</h2>
            <p>Content for the philosophy section will be implemented in Prompt 5</p>
          </div>
        </section>

        {/* Strategies Section */}
        <section id="strategies" className="section">
          <div className="container">
            <h2>Investment Strategies</h2>
            <p>Content for strategies will be implemented in future prompts</p>
          </div>
        </section>
      </main>

      {/* Global styles */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        
        .section {
          min-height: 100vh;
          padding: var(--space-4xl) 0;
          position: relative;
        }
        
        #philosophy {
          background: var(--color-deep-space);
          border-top: 1px solid var(--color-blue-alpha-10);
        }
        
        #strategies {
          background: var(--color-black-alpha-80);
        }
      `}</style>
    </>
  )
} 