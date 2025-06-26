import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import PortalLayout from '../../src/components/portal/PortalLayout'
import styles from '../../src/styles/portal.module.css'

interface Document {
  id: string
  name: string
  type: string
  date: string
  size: string
  category: string
}

const mockDocuments: Document[] = [
  // Capital Account Statements
  { id: '1', name: 'Q4 2023 Capital Account Statement', type: 'PDF', date: '2024-01-15', size: '2.4 MB', category: 'statements' },
  { id: '2', name: 'Q3 2023 Capital Account Statement', type: 'PDF', date: '2023-10-15', size: '2.2 MB', category: 'statements' },
  
  // Performance Reports
  { id: '3', name: 'December 2023 Performance Report', type: 'PDF', date: '2024-01-05', size: '1.8 MB', category: 'performance' },
  { id: '4', name: 'Q4 2023 Quarterly Report', type: 'PDF', date: '2024-01-10', size: '4.5 MB', category: 'performance' },
  
  // Legal Documents
  { id: '5', name: 'Limited Partnership Agreement', type: 'PDF', date: '2023-01-15', size: '3.2 MB', category: 'legal' },
  { id: '6', name: 'Subscription Agreement', type: 'PDF', date: '2023-01-15', size: '1.5 MB', category: 'legal' },
  
  // Tax Documents
  { id: '7', name: '2022 Schedule K-1', type: 'PDF', date: '2023-03-15', size: '856 KB', category: 'tax' },
  { id: '8', name: '2022 Tax Package', type: 'ZIP', date: '2023-03-15', size: '4.1 MB', category: 'tax' },
  
  // Due Diligence
  { id: '9', name: 'DDQ - Q4 2023 Update', type: 'PDF', date: '2024-01-20', size: '5.2 MB', category: 'ddq' },
  { id: '10', name: 'Form ADV Part 2A', type: 'PDF', date: '2023-03-30', size: '1.9 MB', category: 'ddq' },
]

export default function DocumentsPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  useEffect(() => {
    // Check authentication
    const isAuth = sessionStorage.getItem('investorAuth')
    if (!isAuth) {
      router.push('/investors/login')
    }
  }, [router])
  
  const categories = [
    { value: 'all', label: 'All Documents' },
    { value: 'statements', label: 'Capital Account Statements' },
    { value: 'performance', label: 'Performance Reports' },
    { value: 'legal', label: 'Legal Agreements' },
    { value: 'tax', label: 'Tax Documents' },
    { value: 'ddq', label: 'Due Diligence' },
  ]
  
  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })
  
  return (
    <>
      <Head>
        <title>Document Vault - Fuerte Investor Portal</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <PortalLayout>
        <div className={styles.documentsContainer}>
          {/* Header */}
          <div className={styles.documentsHeader}>
            <h1>Document Vault</h1>
            <p className={styles.documentsSubtext}>
              Secure access to all your investor documents
            </p>
          </div>
          
          {/* Controls */}
          <div className={styles.documentsControls}>
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={styles.categorySelect}
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Document Categories */}
          <div className={styles.categoryTabs}>
            {categories.map(cat => (
              <button
                key={cat.value}
                className={`${styles.categoryTab} ${selectedCategory === cat.value ? styles.active : ''}`}
                onClick={() => setSelectedCategory(cat.value)}
              >
                {cat.label}
                <span className={styles.categoryCount}>
                  ({mockDocuments.filter(d => cat.value === 'all' || d.category === cat.value).length})
                </span>
              </button>
            ))}
          </div>
          
          {/* Document List */}
          <div className={styles.documentsList}>
            <table className={styles.documentsTable}>
              <thead>
                <tr>
                  <th>Document Name</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Size</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.map(doc => (
                  <tr key={doc.id}>
                    <td className={styles.documentName}>
                      <span className={styles.documentIcon}>📄</span>
                      {doc.name}
                    </td>
                    <td>{doc.type}</td>
                    <td>{doc.date}</td>
                    <td>{doc.size}</td>
                    <td>
                      <button className={styles.downloadButton}>
                        ⬇ Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredDocuments.length === 0 && (
              <div className={styles.noDocuments}>
                <p>No documents found matching your criteria</p>
              </div>
            )}
          </div>
          
          {/* Security Notice */}
          <div className={styles.securityNotice}>
            <p>
              🔒 All documents are encrypted and transmitted over secure connections. 
              Downloads are logged for security purposes.
            </p>
          </div>
        </div>
      </PortalLayout>
    </>
  )
} 