import { useEffect, useRef, useState } from 'react'

export function useParallax<T extends HTMLElement = HTMLDivElement>(
  speed = 0.1
) {
  const ref = useRef<T>(null)
  const [offsetY, setOffsetY] = useState(0)

  const handleScroll = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop
      const elementTop = rect.top + scrollPosition
      const viewportHeight = window.innerHeight

      const scrolledInView = scrollPosition + viewportHeight - elementTop

      if (scrolledInView > 0 && scrolledInView < viewportHeight + rect.height) {
        setOffsetY(scrolledInView * speed)
      } else {
        setOffsetY(0)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return { ref, offsetY }
}

