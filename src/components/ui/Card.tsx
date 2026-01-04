import { ReactNode, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'dark'
}

export function Card({
  children,
  className = '',
  padding = 'md',
  variant = 'default',
  ...props
}: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  const variantClasses = {
    default: 'glass-card rounded-2xl shadow-soft hover:shadow-large border border-primary-100/50 hover:border-primary-300/50 transition-all duration-500 hover-lift card-3d',
    dark: 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 hover:border-primary-500/40 transition-all duration-500 hover:shadow-primary-500/20',
  }

  return (
    <div
      className={`${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}
      style={variant === 'default' ? { transformStyle: 'preserve-3d' } : {}}
      {...props}
    >
      <div className={variant === 'default' ? 'relative z-10' : ''} style={variant === 'default' ? { transform: 'translateZ(20px)' } : {}}>
        {children}
      </div>
    </div>
  )
}

