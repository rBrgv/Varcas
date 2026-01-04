'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  variant?: 'fade' | 'left' | 'right' | 'scale' | 'up'
  delay?: number
  className?: string
}

export function ScrollReveal({
  children,
  variant = 'up',
  delay = 0,
  className = '',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.1,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [])

  const animationClasses = {
    fade: 'animate-fade-in',
    left: 'animate-slide-in-left',
    right: 'animate-slide-in-right',
    scale: 'animate-scale-in',
    up: 'animate-fade-in-up',
  }

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? animationClasses[variant] : 'opacity-0'}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

