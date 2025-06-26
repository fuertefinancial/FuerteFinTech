import React from 'react'
import styles from '../../styles/portal.module.css'

interface NotificationWidgetProps {
  count: number
}

export default function NotificationWidget({ count }: NotificationWidgetProps) {
  return (
    <div className={styles.metricCard}>
      <h3>Notifications</h3>
      <div className={styles.notificationContent}>
        <div className={styles.notificationCount}>{count}</div>
        <p className={styles.notificationText}>New items require your attention</p>
        <a href="/investors/messages" className={styles.viewNotifications}>
          View All →
        </a>
      </div>
    </div>
  )
} 