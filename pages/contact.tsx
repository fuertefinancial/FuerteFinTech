import React, { useState } from 'react'
import Head from 'next/head'
import Navigation from '../src/components/navigation/Navigation'
import AIChatbot from '../src/components/ai/AIChatbot'
import { motion } from 'framer-motion'
import styles from '../src/styles/contact.module.css'

export default function ContactPage() {
  const [showChatbot, setShowChatbot] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    investorType: '',
    message: ''
  })
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
  return (
    <>
      <Head>
        <title>Contact - Fuerte Financial Technologies</title>
        <meta name="description" content="Get in touch with Fuerte Financial Technologies" />
      </Head>
      
      <Navigation />
      
      <main className={styles.contactContainer}>
        <section className={styles.contactHero}>
          <h1 className={styles.heroTitle}>
            Let's <span className={styles.titleAccent}>Connect</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Begin your journey with institutional-grade AI investment strategies
          </p>
        </section>
        
        <div className={styles.contentWrapper}>
          <motion.div 
            className={styles.contactGrid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Contact Form */}
            <div className={styles.formSection}>
              <h2>Investor Inquiries</h2>
              <p className={styles.formDescription}>
                For qualified investors seeking information about our funds
              </p>
              
              <form onSubmit={handleSubmit} className={styles.contactForm}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={styles.formInput}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={styles.formInput}
                    />
                  </div>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="institution">Institution</label>
                  <input
                    type="text"
                    id="institution"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    className={styles.formInput}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="investorType">Investor Type *</label>
                  <select
                    id="investorType"
                    name="investorType"
                    value={formData.investorType}
                    onChange={handleChange}
                    required
                    className={styles.formSelect}
                  >
                    <option value="">Select...</option>
                    <option value="family-office">Family Office</option>
                    <option value="institutional">Institutional Investor</option>
                    <option value="hnw-individual">High Net Worth Individual</option>
                    <option value="fund-of-funds">Fund of Funds</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={styles.formTextarea}
                  />
                </div>
                
                <button type="submit" className={styles.submitButton}>
                  Send Message
                </button>
              </form>
              
              <p className={styles.disclaimer}>
                * Required fields. By submitting this form, you agree to our privacy policy.
              </p>
            </div>
            
            {/* Contact Info & AI Assistant */}
            <div className={styles.infoSection}>
              <div className={styles.contactInfo}>
                <h3>Direct Contact</h3>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Email</span>
                  <a href="mailto:investors@fuerte.tech">investors@fuerte.tech</a>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Phone</span>
                  <a href="tel:+12125551234">+1 (212) 555-1234</a>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Address</span>
                  <address>
                    One World Trade Center<br />
                    Suite 8500<br />
                    New York, NY 10007
                  </address>
                </div>
              </div>
              
              <div className={styles.aiAssistantSection}>
                <h3>AI Assistant</h3>
                <p className={styles.aiDescription}>
                  Have questions? Our AI assistant can help you learn about our investment strategies,
                  fund structures, and general information.
                </p>
                
                {!showChatbot ? (
                  <button
                    className={styles.launchChatButton}
                    onClick={() => setShowChatbot(true)}
                  >
                    <span className={styles.aiIcon}>🤖</span>
                    Launch AI Assistant
                  </button>
                ) : (
                  <div className={styles.chatbotWrapper}>
                    <AIChatbot
                      isQualifiedUser={false}
                      onClose={() => setShowChatbot(false)}
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
          
          {/* Office Hours */}
          <motion.div 
            className={styles.officeHours}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3>Office Hours</h3>
            <div className={styles.hoursGrid}>
              <div className={styles.hoursItem}>
                <span className={styles.day}>Monday - Friday</span>
                <span className={styles.time}>9:00 AM - 6:00 PM EST</span>
              </div>
              <div className={styles.hoursItem}>
                <span className={styles.day}>Saturday - Sunday</span>
                <span className={styles.time}>Closed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  )
} 