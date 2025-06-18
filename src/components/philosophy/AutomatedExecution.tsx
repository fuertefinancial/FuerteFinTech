import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './philosophy.module.css'

export default function AutomatedExecution() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [orders, setOrders] = useState<Array<{
    id: number
    symbol: string
    side: 'BUY' | 'SELL'
    price: number
    quantity: number
    status: string
    timestamp: string
  }>>([])
  
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    
    // Generate mock orders
    const symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'NVDA']
    const generateOrder = (id: number) => ({
      id,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      side: Math.random() > 0.5 ? 'BUY' as const : 'SELL' as const,
      price: Math.floor(Math.random() * 500) + 100,
      quantity: Math.floor(Math.random() * 1000) + 100,
      status: 'PENDING',
      timestamp: new Date().toISOString().split('T')[1].split('.')[0]
    })
    
    // Initial orders
    const initialOrders = Array.from({ length: 5 }, (_, i) => generateOrder(i))
    
    // Scroll-triggered animation
    ScrollTrigger.create({
      trigger: container,
      start: 'top center',
      end: 'bottom center',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress
        
        // Update order statuses based on scroll progress
        setOrders(initialOrders.map((order, index) => {
          const orderProgress = (progress * 5 - index) * 2
          let status = 'PENDING'
          
          if (orderProgress > 0.2) status = 'ROUTING'
          if (orderProgress > 0.5) status = 'EXECUTING'
          if (orderProgress > 0.8) status = 'FILLED'
          
          return { ...order, status }
        }))
        
        // Add new orders as scroll progresses
        if (progress > 0.7 && initialOrders.length < 8) {
          const newOrder = generateOrder(initialOrders.length)
          initialOrders.push(newOrder)
        }
      }
    })
    
    // Animate UI elements
    gsap.fromTo(
      container.querySelectorAll('.order-row'),
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: container,
          start: 'top 80%'
        }
      }
    )
    
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])
  
  return (
    <div ref={containerRef} className={styles.executionContainer}>
      <div className={styles.tradingInterface}>
        <div className={styles.interfaceHeader}>
          <h3 className={styles.interfaceTitle}>EXECUTION ENGINE v3.2</h3>
          <div className={styles.interfaceStats}>
            <span className={styles.statBadge}>LATENCY: 0.3ms</span>
            <span className={styles.statBadge}>UPTIME: 99.99%</span>
          </div>
        </div>
        
        <div className={styles.orderBook}>
          <div className={styles.orderHeader}>
            <span>SYMBOL</span>
            <span>SIDE</span>
            <span>QTY</span>
            <span>PRICE</span>
            <span>STATUS</span>
            <span>TIME</span>
          </div>
          
          {orders.map((order) => (
            <div key={order.id} className={`${styles.orderRow} order-row`}>
              <span className={styles.symbol}>{order.symbol}</span>
              <span className={order.side === 'BUY' ? styles.buy : styles.sell}>
                {order.side}
              </span>
              <span>{order.quantity}</span>
              <span>${order.price}</span>
              <span className={styles[`status${order.status}`]}>
                {order.status}
              </span>
              <span className={styles.timestamp}>{order.timestamp}</span>
            </div>
          ))}
        </div>
        
        <div className={styles.executionMetrics}>
          <div className={styles.metricCard}>
            <h4>Orders/Second</h4>
            <div className={styles.metricValue}>12,847</div>
          </div>
          <div className={styles.metricCard}>
            <h4>Fill Rate</h4>
            <div className={styles.metricValue}>99.7%</div>
          </div>
          <div className={styles.metricCard}>
            <h4>Slippage</h4>
            <div className={styles.metricValue}>0.02%</div>
          </div>
        </div>
      </div>
    </div>
  )
}
