import React, { useEffect, useRef } from 'react'
import Head from 'next/head'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from '../src/components/navigation/Navigation'
import DataDeluge from '../src/components/philosophy/DataDeluge'
import SignalFromNoise from '../src/components/philosophy/SignalFromNoise'
import QuantitativeRigor from '../src/components/philosophy/QuantitativeRigor'
import AutomatedExecution from '../src/components/philosophy/AutomatedExecution'
import GeneratingAlpha from '../src/components/philosophy/GeneratingAlpha'
import styles from '../src/styles/philosophy.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function PhilosophyPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Initialize smooth scrolling
    gsap.set('body', { overflow: 'auto' })
    
    // Create master timeline
    gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        pin: false
      }
    })
    
    // Clean up on unmount
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])
  
  return (
    <>
      <Head>
        <title>Investment Philosophy - Fuerte Financial Technologies</title>
        <meta name="description" content="Discover how Fuerte transforms chaotic market data into structured alpha through quantitative rigor and automated execution." />
      </Head>
      
      <Navigation />
      
      <main className={styles.philosophyContainer} ref={containerRef}>
        
        {/* Section 1: The Data Deluge */}
        <section className={styles.section} id="data-deluge">
          <div className={styles.contentWrapper}>
            <div className={styles.textContent}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>01</span>
                The Data Deluge
              </h2>
              <p className={styles.sectionText}>
                In today's hyperconnected markets, every microsecond generates an avalanche of information. 
                Price movements, order flows, sentiment indicators, macroeconomic signals—the modern financial 
                landscape is a cacophony of noise where traditional analysis falls short.
              </p>
              <p className={styles.sectionText}>
                This overwhelming torrent of unstructured data represents both the greatest challenge and 
                the greatest opportunity in quantitative finance. Where human cognition reaches its limits, 
                advanced algorithms find their purpose.
              </p>
            </div>
            <div className={styles.visualWrapper}>
              <DataDeluge />
            </div>
          </div>
        </section>
        
        {/* Section 2: Signal From Noise */}
        <section className={styles.section} id="signal-from-noise">
          <div className={styles.contentWrapper}>
            <div className={styles.textContent}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>02</span>
                Signal From Noise
              </h2>
              <p className={styles.sectionText}>
                Fuerte's proprietary AI models are engineered to identify meaningful patterns within chaos. 
                Through advanced machine learning techniques, our algorithms detect subtle correlations and 
                emerging trends invisible to traditional analysis.
              </p>
              <p className={styles.sectionText}>
                Like a master sculptor revealing form from marble, our systems extract actionable intelligence 
                from raw market data, transforming noise into knowledge, chaos into clarity.
              </p>
            </div>
            <div className={styles.visualWrapper} data-pin="true">
              <SignalFromNoise />
            </div>
          </div>
        </section>
        
        {/* Section 3: Quantitative Rigor */}
        <section className={styles.section} id="quantitative-rigor">
          <div className={styles.contentWrapper}>
            <div className={styles.textContent}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>03</span>
                Quantitative Rigor
              </h2>
              <p className={styles.sectionText}>
                At the heart of our approach lies uncompromising mathematical precision. Our neural networks 
                process millions of data points through sophisticated layers of analysis, each node a 
                decision point, each connection a learned relationship.
              </p>
              <p className={styles.sectionText}>
                Stochastic calculus, Bayesian inference, deep learning architectures—these aren't just 
                buzzwords but the fundamental tools that power our edge. Every model is rigorously 
                backtested across decades of market conditions, stress-tested against black swan events, 
                and continuously refined through reinforcement learning.
              </p>
            </div>
            <div className={styles.visualWrapper}>
              <QuantitativeRigor />
            </div>
          </div>
        </section>
        
        {/* Section 4: Automated Execution */}
        <section className={styles.section} id="automated-execution">
          <div className={styles.contentWrapper}>
            <div className={styles.textContent}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>04</span>
                Automated Execution
              </h2>
              <p className={styles.sectionText}>
                Speed is survival in modern markets. Our high-frequency trading infrastructure operates at 
                the speed of light, executing thousands of trades per second with microsecond latency. 
                Every order is optimized for minimal market impact and maximum efficiency.
              </p>
              <p className={styles.sectionText}>
                This isn't just about being fast—it's about being intelligently fast. Our execution 
                algorithms adapt in real-time to market conditions, dynamically adjusting strategies to 
                capture fleeting opportunities while managing risk with surgical precision.
              </p>
            </div>
            <div className={styles.visualWrapper}>
              <AutomatedExecution />
            </div>
          </div>
        </section>
        
        {/* Section 5: Generating Alpha */}
        <section className={styles.section} id="generating-alpha">
          <div className={styles.contentWrapper}>
            <div className={styles.textContent}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>05</span>
                Generating Alpha
              </h2>
              <p className={styles.sectionText}>
                The culmination of our process: consistent, uncorrelated returns that outperform traditional 
                benchmarks. While markets fluctuate wildly, our strategies maintain steady growth through 
                all conditions.
              </p>
              <p className={styles.sectionText}>
                This is alpha in its purest form—not just beating the market, but transcending its 
                limitations. Returns generated not from luck or timing, but from the systematic application 
                of intelligence to chaos.
              </p>
            </div>
            <div className={styles.visualWrapper}>
              <GeneratingAlpha />
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Ready to Harness Intelligence?</h2>
          <p className={styles.ctaText}>
            Join the select group of investors who have discovered the power of quantitative excellence.
          </p>
          <a href="/contact" className={styles.ctaButton}>
            Start Your Journey
          </a>
        </section>
      </main>
      
      <ScrollProgressIndicator />
    </>
  )
}

// Scroll progress indicator component
function ScrollProgressIndicator() {
  useEffect(() => {
    const progressBar = document.getElementById('scrollProgress')
    if (!progressBar) return
    
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      progressBar.style.width = `${scrollPercent}%`
    }
    
    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])
  
  return null
}
