import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollAnimationOptions {
  trigger?: string
  start?: string
  end?: string
  scrub?: boolean | number
  pin?: boolean
  markers?: boolean
}

export function useScrollAnimation(
  target: string | React.RefObject<HTMLElement>,
  animation: gsap.TweenVars,
  options: ScrollAnimationOptions = {}
) {
  const {
    trigger,
    start = 'top center',
    end = 'bottom center',
    scrub = 1,
    pin = false,
    markers = false
  } = options

  useEffect(() => {
    if (typeof window === 'undefined') return

    const element = typeof target === 'string' 
      ? target 
      : target.current

    if (!element) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger || element,
        start,
        end,
        scrub,
        pin,
        markers
      }
    })

    tl.to(element, animation)

    return () => {
      tl.kill()
    }
  }, [target, trigger, start, end, scrub, pin, markers])
}

export function useChaosToOrderAnimation() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Chaos particles animation
    const particles = gsap.utils.toArray('.chaos-particle')
    
    particles.forEach((particle: any, i: number) => {
      const delay = i * 0.02
      
      // Initial chaotic state
      gsap.set(particle, {
        x: 'random(-300, 300)',
        y: 'random(-300, 300)',
        rotation: 'random(-180, 180)',
        scale: 'random(0.5, 1.5)',
        opacity: 0
      })
      
      // Animate to ordered state
      gsap.timeline({
        scrollTrigger: {
          trigger: '.chaos-section',
          start: 'top center',
          end: 'bottom center',
          scrub: 1
        }
      })
      .to(particle, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: 2,
        delay,
        ease: 'power3.inOut'
      })
      .to(particle, {
        x: () => Math.cos(i * 0.1) * 100,
        y: () => Math.sin(i * 0.1) * 100,
        duration: 3,
        ease: 'power2.inOut'
      }, '-=1')
    })

    // Text reveal animation
    const textElements = gsap.utils.toArray('.reveal-text')
    
    textElements.forEach((text: any) => {
      gsap.fromTo(text,
        {
          y: 100,
          opacity: 0,
          rotationX: -90
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
}

export function useParallaxBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return

    const layers = containerRef.current.querySelectorAll('.parallax-layer')
    
    layers.forEach((layer, i) => {
      const depth = layer.getAttribute('data-depth') || '1'
      const movement = parseFloat(depth) * 100
      
      gsap.to(layer, {
        y: -movement,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })
    })
  }, [])
  
  return containerRef
} 