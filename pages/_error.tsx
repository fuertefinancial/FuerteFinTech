import React from 'react'
import { NextPageContext } from 'next'
import Head from 'next/head'
import Link from 'next/link'

interface ErrorProps {
  statusCode: number
}

class Error extends React.Component<ErrorProps> {
  static getInitialProps({ res, err }: NextPageContext) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
  }

  render() {
    const { statusCode } = this.props
    
    return (
      <>
        <Head>
          <title>
            {statusCode
              ? `${statusCode} - Fuerte Financial Technologies`
              : 'Error - Fuerte Financial Technologies'}
          </title>
        </Head>
        
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0A0A10',
          color: '#C0C0C0',
          fontFamily: 'Inter, sans-serif',
          textAlign: 'center',
          padding: '20px'
        }}>
          <h1 style={{
            fontSize: '120px',
            fontWeight: 'bold',
            margin: '0',
            color: '#00BFFF',
            textShadow: '0 0 20px rgba(0, 191, 255, 0.5)'
          }}>
            {statusCode || 'Error'}
          </h1>
          
          <p style={{
            fontSize: '24px',
            marginTop: '20px',
            marginBottom: '40px'
          }}>
            {statusCode === 404
              ? 'Page not found'
              : statusCode === 500
              ? 'Internal server error'
              : 'An unexpected error occurred'}
          </p>
          
          <Link
            href="/"
            style={{
              display: 'inline-block',
              padding: '12px 32px',
              backgroundColor: '#00BFFF',
              color: '#0A0A10',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0, 191, 255, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 191, 255, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 191, 255, 0.3)'
            }}
          >
            Return Home
          </Link>
        </div>
      </>
    )
  }
}

export default Error 