import React, { useState } from 'react'
import Head from 'next/head'
import Navigation from '../src/components/navigation/Navigation'
import { Button, FormInput, Accordion, SoundToggle } from '../src/components/ui'
import styles from '../src/styles/microinteractions-demo.module.css'

export default function MicrointeractionsDemo() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })
  
  // Email validation
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return {
      valid: regex.test(email),
      message: regex.test(email) ? '' : 'Please enter a valid email address'
    }
  }
  
  // Password validation
  const validatePassword = (password: string) => {
    const hasMinLength = password.length >= 8
    const hasNumber = /\d/.test(password)
    const hasSpecial = /[!@#$%^&*]/.test(password)
    
    const valid = hasMinLength && hasNumber && hasSpecial
    
    return {
      valid,
      message: valid ? '' : 'Password must be 8+ characters with numbers and special characters'
    }
  }
  
  // Accordion content
  const accordionItems = [
    {
      id: '1',
      title: 'What makes Fuerte different?',
      content: (
        <p>
          Fuerte combines cutting-edge AI technology with deep financial expertise. 
          Our proprietary algorithms analyze millions of data points in real-time, 
          identifying opportunities that traditional methods miss.
        </p>
      )
    },
    {
      id: '2',
      title: 'How does the investment process work?',
      content: (
        <p>
          Our investment process is fully automated yet transparent. After initial 
          qualification, investors gain access to our secure portal where they can 
          monitor performance, access reports, and communicate with our team.
        </p>
      )
    },
    {
      id: '3',
      title: 'What are the minimum requirements?',
      content: (
        <p>
          Minimum investment varies by fund: AI Quantitative Fund ($1M), 
          Crypto DeFi Yield Fund ($500K), and Blockchain Venture Fund ($250K). 
          All investors must be accredited and pass our compliance checks.
        </p>
      )
    }
  ]
  
  return (
    <>
      <Head>
        <title>Microinteractions Demo - Fuerte Financial Technologies</title>
        <meta name="description" content="Experience premium UI interactions with haptic feedback and sound design" />
      </Head>
      
      <Navigation />
      
      <main className={styles.demoContainer}>
        {/* Sound Toggle - Fixed Position */}
        <SoundToggle />
        
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1>The Language of Precision</h1>
          <p>Experience microinteractions that make every click feel premium</p>
        </section>
        
        {/* Button Interactions */}
        <section className={styles.section}>
          <h2>Button Interactions</h2>
          <p className={styles.sectionDescription}>
            Buttons feature geometric fill animations and optional glitch effects for a cyberpunk aesthetic
          </p>
          
          <div className={styles.buttonGrid}>
            <Button variant="primary" onClick={() => console.log('Primary clicked')}>
              Primary Action
            </Button>
            
            <Button variant="secondary" onClick={() => console.log('Secondary clicked')}>
              Secondary Action
            </Button>
            
            <Button variant="ghost" onClick={() => console.log('Ghost clicked')}>
              Ghost Button
            </Button>
            
            <Button variant="primary" glitch onClick={() => console.log('Glitch clicked')}>
              Glitch Effect
            </Button>
            
            <Button variant="primary" size="large" onClick={() => console.log('Large clicked')}>
              Large Button
            </Button>
            
            <Button variant="primary" disabled onClick={() => console.log('Disabled')}>
              Disabled State
            </Button>
          </div>
        </section>
        
        {/* Form Interactions */}
        <section className={styles.section}>
          <h2>Form Interactions</h2>
          <p className={styles.sectionDescription}>
            Form inputs feature floating labels, real-time validation, and smooth animations
          </p>
          
          <div className={styles.formDemo}>
            <FormInput
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(value) => setFormData({ ...formData, email: value })}
              validation={validateEmail}
              required
            />
            
            <FormInput
              label="Password"
              type="password"
              value={formData.password}
              onChange={(value) => setFormData({ ...formData, password: value })}
              validation={validatePassword}
              required
            />
            
            <FormInput
              label="Full Name"
              value={formData.name}
              onChange={(value) => setFormData({ ...formData, name: value })}
            />
            
            <Button 
              variant="primary" 
              size="large"
              onClick={() => alert('Form submitted!')}
            >
              Submit Form
            </Button>
          </div>
        </section>
        
        {/* Accordion Interactions */}
        <section className={styles.section}>
          <h2>Accordion Panels</h2>
          <p className={styles.sectionDescription}>
            Expandable content with spring animations and haptic feedback on mobile
          </p>
          
          <div className={styles.accordionDemo}>
            <Accordion items={accordionItems} />
          </div>
        </section>
        
        {/* Mobile Features */}
        <section className={styles.section}>
          <h2>Mobile Experience</h2>
          <p className={styles.sectionDescription}>
            On mobile devices, interactions include haptic feedback for a tactile experience
          </p>
          
          <div className={styles.mobileFeatures}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>📱</div>
              <h3>Haptic Feedback</h3>
              <p>Subtle vibrations confirm actions and provide tactile response</p>
            </div>
            
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🔊</div>
              <h3>Sound Design</h3>
              <p>Optional UI sounds enhance the high-tech feel (toggle in corner)</p>
            </div>
            
            <div className={styles.feature}>
              <div className={styles.featureIcon}>✨</div>
              <h3>Smooth Animations</h3>
              <p>60fps animations ensure fluid, responsive interactions</p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
} 