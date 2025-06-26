import { useEffect, useState } from 'react'

interface DeviceCapabilities {
  isMobile: boolean
  isHighEnd: boolean
  hasWebGL: boolean
  hasTouchScreen: boolean
  devicePixelRatio: number
  gpuTier: 'high' | 'medium' | 'low'
  connectionSpeed: 'fast' | 'slow' | 'unknown'
}

export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isMobile: false,
    isHighEnd: false,
    hasWebGL: false,
    hasTouchScreen: false,
    devicePixelRatio: 1,
    gpuTier: 'low',
    connectionSpeed: 'unknown'
  })
  
  useEffect(() => {
    const detectCapabilities = async () => {
      // Mobile detection
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768
      
      // Touch screen detection
      const hasTouchScreen = 'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0
      
      // WebGL detection
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      const hasWebGL = !!gl
      
      // Device pixel ratio
      const devicePixelRatio = window.devicePixelRatio || 1
      
      // GPU tier detection (simplified)
      let gpuTier: 'high' | 'medium' | 'low' = 'low'
      if (hasWebGL && gl && gl instanceof WebGLRenderingContext) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string
          // Simplified GPU detection
          if (renderer.includes('Apple') || renderer.includes('NVIDIA') || renderer.includes('AMD')) {
            gpuTier = 'high'
          } else if (renderer.includes('Intel') || renderer.includes('Mali')) {
            gpuTier = 'medium'
          }
        }
      }
      
      // High-end device detection
      const isHighEnd = !isMobile || (
        devicePixelRatio >= 2 &&
        navigator.hardwareConcurrency >= 4 &&
        gpuTier !== 'low' &&
        window.innerWidth >= 375
      )
      
      // Connection speed detection
      let connectionSpeed: 'fast' | 'slow' | 'unknown' = 'unknown'
      if ('connection' in navigator) {
        const connection = (navigator as any).connection
        const effectiveType = connection?.effectiveType
        if (effectiveType === '4g') {
          connectionSpeed = 'fast'
        } else if (effectiveType === '3g' || effectiveType === '2g') {
          connectionSpeed = 'slow'
        }
      }
      
      setCapabilities({
        isMobile,
        isHighEnd,
        hasWebGL,
        hasTouchScreen,
        devicePixelRatio,
        gpuTier,
        connectionSpeed
      })
    }
    
    detectCapabilities()
    
    // Re-detect on resize
    const handleResize = () => {
      detectCapabilities()
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return capabilities
} 