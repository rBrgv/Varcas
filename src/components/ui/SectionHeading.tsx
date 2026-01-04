import { ReactNode } from 'react'

interface SectionHeadingProps {
  children: ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export function SectionHeading({
  children,
  className = '',
  as: Component = 'h2',
}: SectionHeadingProps) {
  const isCentered = className.includes('text-center')
  
  return (
    <div className={className}>
      <Component className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-700 mb-3 tracking-tight">
        {children}
      </Component>
      <div className={`w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 ${isCentered ? 'mx-auto' : ''}`}></div>
    </div>
  )
}

