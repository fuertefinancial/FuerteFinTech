import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './ai.module.css'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  confidence?: number
}

interface AIChatbotProps {
  isQualifiedUser?: boolean
  onClose?: () => void
}

export default function AIChatbot({ isQualifiedUser = false, onClose }: AIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: isQualifiedUser 
        ? "Hello! I'm Fuerte's AI assistant. I can help you with questions about our funds, redemption terms, performance data, and more. How may I assist you today?"
        : "Welcome! I'm Fuerte's AI assistant. I can help you learn about our investment strategies and answer general questions. For detailed fund information, please log in to the investor portal.",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  const generateAIResponse = async (userMessage: string): Promise<{ response: string; confidence: number }> => {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const lowerMessage = userMessage.toLowerCase()
    
    // Knowledge base for qualified users
    if (isQualifiedUser) {
      if (lowerMessage.includes('redemption') && lowerMessage.includes('terms')) {
        return {
          response: "The redemption terms for our funds are as follows:\n\n• AI Quantitative Fund: Quarterly redemptions with 45-day notice\n• DeFi Yield Fund: Monthly redemptions with 30-day notice\n• Blockchain Venture Fund: Annual redemptions with 90-day notice\n\nAll redemptions are subject to a 2% early withdrawal fee if held less than 12 months.",
          confidence: 0.95
        }
      }
      
      if (lowerMessage.includes('cybersecurity') || lowerMessage.includes('security')) {
        return {
          response: "Fuerte employs institutional-grade cybersecurity measures:\n\n• Multi-factor authentication for all accounts\n• Cold storage for 95% of digital assets\n• SOC 2 Type II certification\n• 24/7 security monitoring\n• Regular third-party penetration testing\n• Encrypted data transmission and storage\n\nWould you like more details on any specific security aspect?",
          confidence: 0.92
        }
      }
      
      if (lowerMessage.includes('performance') || lowerMessage.includes('returns')) {
        return {
          response: "Here's our latest performance summary:\n\n• AI Quantitative Fund: +18.7% YTD (net of fees)\n• DeFi Yield Fund: +24.3% YTD\n• Blockchain Venture Fund: 2.8x MOIC (since inception)\n\nDetailed performance reports are available in your investor dashboard. Would you like me to explain our performance attribution?",
          confidence: 0.88
        }
      }
    }
    
    // General responses for all users
    if (lowerMessage.includes('ai') && (lowerMessage.includes('strategy') || lowerMessage.includes('how'))) {
      return {
        response: "Fuerte uses AI across our investment process:\n\n• Pattern recognition in market microstructure data\n• Natural language processing for sentiment analysis\n• Reinforcement learning for portfolio optimization\n• Neural networks for risk prediction\n\nOur proprietary models analyze millions of data points in real-time to identify alpha opportunities invisible to traditional methods.",
        confidence: 0.90
      }
    }
    
    if (lowerMessage.includes('minimum') && lowerMessage.includes('investment')) {
      return {
        response: "Our minimum investment requirements are:\n\n• AI Quantitative Fund: $1,000,000\n• DeFi Yield Fund: $500,000\n• Blockchain Venture Fund: $250,000\n\nAll investors must be accredited. Would you like information on our qualification process?",
        confidence: 0.93
      }
    }
    
    // Default response with lower confidence
    return {
      response: "I understand you're asking about " + userMessage + ". While I don't have specific information on that topic in my current knowledge base, I can connect you with our investor relations team who can provide detailed answers. Would you like me to arrange that?",
      confidence: 0.65
    }
  }
  
  const handleSend = async () => {
    if (!inputValue.trim()) return
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)
    
    try {
      const { response, confidence } = await generateAIResponse(inputValue)
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response,
        timestamp: new Date(),
        confidence
      }
      
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('AI response error:', error)
    } finally {
      setIsTyping(false)
    }
  }
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }
  
  return (
    <motion.div
      className={styles.chatbotContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className={styles.chatHeader}>
        <div className={styles.chatTitle}>
          <div className={styles.aiAvatar}>
            <span>AI</span>
          </div>
          <div>
            <h3>Fuerte AI Assistant</h3>
            <span className={styles.status}>
              {isQualifiedUser ? 'Investor Mode' : 'Public Mode'}
            </span>
          </div>
        </div>
        {onClose && (
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        )}
      </div>
      
      <div className={styles.chatMessages}>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            className={`${styles.message} ${styles[message.type]}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={styles.messageContent}>
              {message.content}
            </div>
            {message.confidence && (
              <div className={styles.confidence}>
                Confidence: {Math.round(message.confidence * 100)}%
              </div>
            )}
            <div className={styles.timestamp}>
              {message.timestamp.toLocaleTimeString()}
            </div>
          </motion.div>
        ))}
        
        <AnimatePresence>
          {isTyping && (
            <motion.div
              className={`${styles.message} ${styles.ai}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className={styles.typingIndicator}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className={styles.chatInput}>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything..."
          className={styles.inputField}
        />
        <button
          onClick={handleSend}
          disabled={!inputValue.trim() || isTyping}
          className={styles.sendButton}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M2 10l16-8-6 8 6 8-16-8z" fill="currentColor"/>
          </svg>
        </button>
      </div>
      
      <div className={styles.disclaimer}>
        AI responses are for informational purposes only and do not constitute investment advice.
      </div>
    </motion.div>
  )
} 