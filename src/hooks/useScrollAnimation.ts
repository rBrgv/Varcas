import { useEffect, useRef, useState } from 'react'

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.1,
  rootMargin = '0px'
) {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        rootMargin,
        threshold,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin])

  return [ref, isVisible] as const
}

