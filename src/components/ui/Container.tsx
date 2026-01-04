import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`container mx-auto px-4 w-full max-w-full overflow-x-hidden ${className}`}>
      {children}
    </div>
  )
}

