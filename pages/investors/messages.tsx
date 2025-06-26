import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import PortalLayout from '../../src/components/portal/PortalLayout'
import AIChatbot from '../../src/components/ai/AIChatbot'
import styles from '../../src/styles/portal.module.css'

interface Message {
  id: string
  subject: string
  from: string
  date: string
  preview: string
  read: boolean
  category: 'general' | 'urgent' | 'document'
}

const mockMessages: Message[] = [
  {
    id: '1',
    subject: 'Q4 2023 Performance Summary',
    from: 'Investor Relations',
    date: '2024-01-15',
    preview: 'We are pleased to share that all funds have exceeded their benchmarks...',
    read: false,
    category: 'general'
  },
  {
    id: '2',
    subject: 'New Document Available: K-1 Tax Forms',
    from: 'Operations Team',
    date: '2024-01-10',
    preview: 'Your 2023 K-1 tax forms are now available in the document vault...',
    read: false,
    category: 'document'
  },
  {
    id: '3',
    subject: 'Urgent: Capital Call Notice',
    from: 'Fund Administration',
    date: '2024-01-05',
    preview: 'This is to notify you of a capital call for the Blockchain Venture Fund...',
    read: true,
    category: 'urgent'
  }
]

export default function MessagesPage() {
  const router = useRouter()
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [composeMode, setComposeMode] = useState(false)
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  
  useEffect(() => {
    const isAuth = sessionStorage.getItem('investorAuth')
    if (!isAuth) {
      router.push('/investors/login')
    }
  }, [router])
  
  return (
    <>
      <Head>
        <title>Secure Messages - Fuerte Investor Portal</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <PortalLayout>
        <div className={styles.messagesContainer}>
          {/* Messages List */}
          <div className={styles.messagesList}>
            <div className={styles.messagesHeader}>
              <h2>Messages</h2>
              <div className={styles.headerActions}>
                <button 
                  className={styles.composeButton}
                  onClick={() => setComposeMode(true)}
                >
                  + New Message
                </button>
                <button
                  className={styles.aiAssistantToggle}
                  onClick={() => setShowAIAssistant(!showAIAssistant)}
                  title="AI Assistant"
                >
                  🤖
                </button>
              </div>
            </div>
            
            <div className={styles.messagesInbox}>
              {mockMessages.map(message => (
                <div
                  key={message.id}
                  className={`${styles.messageItem} ${!message.read ? styles.unread : ''} ${selectedMessage?.id === message.id ? styles.selected : ''}`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className={styles.messageHeader}>
                    <span className={styles.messageFrom}>{message.from}</span>
                    <span className={styles.messageDate}>{message.date}</span>
                  </div>
                  <div className={styles.messageSubject}>
                    {message.category === 'urgent' && <span className={styles.urgentBadge}>!</span>}
                    {message.subject}
                  </div>
                  <div className={styles.messagePreview}>{message.preview}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Message Content */}
          <div className={styles.messageContent}>
            {composeMode ? (
              <div className={styles.composeForm}>
                <h2>New Secure Message</h2>
                <form>
                  <div className={styles.formGroup}>
                    <label>To</label>
                    <input type="text" value="Investor Relations" readOnly />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Subject</label>
                    <input type="text" placeholder="Enter subject" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Message</label>
                    <textarea rows={10} placeholder="Type your message here..."></textarea>
                  </div>
                  <div className={styles.composeActions}>
                    <button type="submit" className={styles.sendButton}>
                      Send Encrypted Message
                    </button>
                    <button 
                      type="button" 
                      className={styles.cancelButton}
                      onClick={() => setComposeMode(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
                <p className={styles.encryptionNote}>
                  🔒 This message will be encrypted end-to-end
                </p>
              </div>
            ) : selectedMessage ? (
              <div className={styles.messageDetail}>
                <div className={styles.messageDetailHeader}>
                  <h2>{selectedMessage.subject}</h2>
                  <div className={styles.messageMetadata}>
                    <span>From: {selectedMessage.from}</span>
                    <span>Date: {selectedMessage.date}</span>
                  </div>
                </div>
                <div className={styles.messageBody}>
                  <p>{selectedMessage.preview}</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <div className={styles.messageActions}>
                  <button className={styles.replyButton}>↩ Reply</button>
                  <button className={styles.archiveButton}>📁 Archive</button>
                </div>
              </div>
            ) : (
              <div className={styles.noMessageSelected}>
                <p>Select a message to view</p>
              </div>
            )}
          </div>
          
          {/* AI Assistant Panel */}
          {showAIAssistant && (
            <div className={styles.aiAssistantPanel}>
              <AIChatbot
                isQualifiedUser={true}
                onClose={() => setShowAIAssistant(false)}
              />
            </div>
          )}
        </div>
      </PortalLayout>
    </>
  )
} 