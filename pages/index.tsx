import React, { Suspense } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Navigation from '../src/components/navigation/Navigation'
import { useDeviceCapabilities } from '../src/hooks/useDeviceCapabilities'
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

const MobileHero = dynamic(
  () => import('../src/components/hero/MobileHero'),
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
  const { isMobile } = useDeviceCapabilities()
  
  return (
    <>
      <Head>
        <title>Fuerte Financial Technologies | Harnessing Chaos, Engineering Alpha</title>
        <meta name="description" content="Where artificial intelligence transforms market volatility into structured returns. Institutional-grade AI investment strategies." />
        <meta property="og:title" content="Fuerte Financial Technologies" />
        <meta property="og:description" content="Harnessing Chaos, Engineering Alpha" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <main>
        {/* Hero Section with WebGL Visualization or Mobile Optimized Version */}
        <section className={styles.heroContainer}>
          <Suspense fallback={
            <div className={styles.heroLoading}>
              <div className={styles.loadingSpinner}></div>
            </div>
          }>
            {isMobile ? <MobileHero /> : <FuerteEngine />}
          </Suspense>
          
          {/* Scroll Indicator - hide on mobile */}
          {!isMobile && (
            <div className={styles.scrollIndicator} aria-label="Scroll down"></div>
          )}
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
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .section {
            padding: 60px 0;
          }
          
          .container {
            padding: 0 20px;
          }
        }
      `}</style>
    </>
  )
} 