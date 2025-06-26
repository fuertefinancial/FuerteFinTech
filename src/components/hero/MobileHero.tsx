import React, { Suspense, lazy } from 'react'
import { useDeviceCapabilities } from '../../hooks/useDeviceCapabilities'
import styles from '../../styles/hero.module.css'

// Lazy load components based on device capabilities
const SimplifiedFuerteEngine = lazy(() => import('./SimplifiedFuerteEngine'))

export default function MobileHero() {
  const { isHighEnd, hasWebGL } = useDeviceCapabilities()
  
  // High-end mobile: simplified WebGL
  if (isHighEnd && hasWebGL) {
    return (
      <div className={styles.mobileHero}>
        <Suspense fallback={<VideoFallback />}>
          <SimplifiedFuerteEngine />
        </Suspense>
        <HeroContent />
      </div>
    )
  }
  
  // Standard mobile: video fallback
  return (
    <div className={styles.mobileHero}>
      <VideoFallback />
      <HeroContent />
    </div>
  )
}

// Video fallback component
function VideoFallback() {
  return (
    <div className={styles.videoContainer}>
      <video
        className={styles.heroVideo}
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero-poster.jpg"
      >
        <source src="/videos/fuerte-hero-mobile.mp4" type="video/mp4" />
        <source src="/videos/fuerte-hero-mobile.webm" type="video/webm" />
        {/* Fallback image */}
        <img 
          src="/images/hero-fallback.jpg" 
          alt="Fuerte Financial Technologies - Harnessing Chaos, Engineering Alpha"
        />
      </video>
      
      {/* Gradient overlay for text contrast */}
      <div className={styles.videoOverlay} />
    </div>
  )
}

// Hero content (text)
function HeroContent() {
  return (
    <div className={styles.mobileHeroContent}>
      <h1 className={styles.mobileHeroTitle}>
        Harnessing Chaos,
        <br />
        <span className={styles.titleAccent}>Engineering Alpha</span>
      </h1>
      <p className={styles.mobileHeroSubtitle}>
        Where market volatility meets machine intelligence
      </p>
      <div className={styles.mobileHeroCTA}>
        <a href="#learn-more" className={styles.mobileCTAButton}>
          Discover Our Approach
        </a>
      </div>
    </div>
  )
} 