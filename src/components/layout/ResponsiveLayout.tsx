import React, { ReactNode } from 'react'
import { useDeviceCapabilities } from '../../hooks/useDeviceCapabilities'
import styles from './layout.module.css'

interface ResponsiveLayoutProps {
  children: ReactNode
  desktopLayout?: 'two-column' | 'three-column' | 'single'
  mobileLayout?: 'stack' | 'tabs'
  reverseOnMobile?: boolean
}

export default function ResponsiveLayout({
  children,
  desktopLayout = 'two-column',
  mobileLayout = 'stack',
  reverseOnMobile = false
}: ResponsiveLayoutProps) {
  const { isMobile } = useDeviceCapabilities()
  
  // Convert children to array for manipulation
  const childrenArray = React.Children.toArray(children)
  
  // Mobile layout
  if (isMobile) {
    const orderedChildren = reverseOnMobile ? [...childrenArray].reverse() : childrenArray
    
    if (mobileLayout === 'tabs') {
      return <TabLayout>{orderedChildren}</TabLayout>
    }
    
    return (
      <div className={styles.mobileStack}>
        {orderedChildren.map((child, index) => (
          <div key={index} className={styles.mobileStackItem}>
            {child}
          </div>
        ))}
      </div>
    )
  }
  
  // Desktop layouts
  const layoutClass = {
    'two-column': styles.twoColumn,
    'three-column': styles.threeColumn,
    'single': styles.single
  }[desktopLayout]
  
  return (
    <div className={`${styles.desktopLayout} ${layoutClass}`}>
      {childrenArray.map((child, index) => (
        <div key={index} className={styles.layoutItem}>
          {child}
        </div>
      ))}
    </div>
  )
}

// Tab layout for mobile
function TabLayout({ children }: { children: ReactNode[] }) {
  const [activeTab, setActiveTab] = React.useState(0)
  
  const tabLabels = ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4']
  
  return (
    <div className={styles.tabLayout}>
      <div className={styles.tabNav}>
        {React.Children.map(children, (_, index) => (
          <button
            key={index}
            className={`${styles.tabButton} ${activeTab === index ? styles.active : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tabLabels[index]}
          </button>
        ))}
      </div>
      
      <div className={styles.tabContent}>
        {children[activeTab]}
      </div>
    </div>
  )
} 