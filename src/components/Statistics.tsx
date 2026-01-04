'use client'

import { useEffect, useRef, useState } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Card } from '@/components/ui'
import { ScrollReveal } from '@/components/ScrollReveal'

interface Stat {
  value: number
  suffix: string
  label: string
}

interface StatisticsProps {
  stats: Stat[]
  className?: string
}

function AnimatedNumber({
  stat,
  isVisible,
  delay,
}: {
  stat: Stat
  isVisible: boolean
  delay: number
}) {
  const [count, setCount] = useState(0)
  const duration = 2000
  const steps = 60
  const increment = stat.value / steps
  const stepDuration = duration / steps

  useEffect(() => {
    if (!isVisible) return

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const newValue = Math.min(
        Math.floor(increment * currentStep),
        stat.value
      )
      setCount(newValue)

      if (currentStep >= steps) {
        setCount(stat.value)
        clearInterval(timer)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [isVisible, stat.value, increment, steps, stepDuration])

  return (
    <ScrollReveal variant="scale" delay={delay}>
      <Card className="text-center p-6 bg-gradient-to-br from-primary-50 to-white border-primary-100/50 shadow-medium hover:shadow-large hover-lift">
        <p className="text-5xl md:text-6xl font-bold gradient-text-primary mb-2">
          {count}
          {stat.suffix}
        </p>
        <p className="text-lg text-neutral-700 font-medium">{stat.label}</p>
      </Card>
    </ScrollReveal>
  )
}

export function Statistics({ stats, className = '' }: StatisticsProps) {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>()

  return (
    <div ref={ref} className={`container mx-auto px-4 ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <AnimatedNumber
            key={stat.label}
            stat={stat}
            isVisible={isVisible}
            delay={index * 150}
          />
        ))}
      </div>
    </div>
  )
}

