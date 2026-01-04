import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'solar' | 'telecom' | 'hr' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  as?: React.ElementType
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled,
  as: Component = 'button',
  ...props
}: ButtonProps) {
  const baseClasses =
    'font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden hover-lift active:scale-95'

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white hover:from-primary-600 hover:via-primary-700 hover:to-primary-800 focus:ring-primary-500 shadow-lg hover:shadow-xl hover:shadow-primary-500/60 neon-border magnetic relative overflow-hidden group',
    secondary:
      'bg-gradient-to-r from-secondary-500 via-secondary-600 to-secondary-700 text-white hover:from-secondary-600 hover:via-secondary-700 hover:to-secondary-800 focus:ring-secondary-500 shadow-lg hover:shadow-xl hover:shadow-secondary-500/60 magnetic relative overflow-hidden group',
    solar:
      'bg-gradient-to-r from-solar-500 via-solar-600 to-solar-700 text-white hover:from-solar-600 hover:via-solar-700 hover:to-solar-800 focus:ring-solar-500 shadow-lg hover:shadow-xl hover:shadow-solar-500/60 magnetic relative overflow-hidden group',
    telecom:
      'bg-gradient-to-r from-telecom-500 via-telecom-600 to-telecom-700 text-white hover:from-telecom-600 hover:via-telecom-700 hover:to-telecom-800 focus:ring-telecom-500 shadow-lg hover:shadow-xl hover:shadow-telecom-500/60 magnetic relative overflow-hidden group',
    hr:
      'bg-gradient-to-r from-hr-500 via-hr-600 to-hr-700 text-white hover:from-hr-600 hover:via-hr-700 hover:to-hr-800 focus:ring-hr-500 shadow-lg hover:shadow-xl hover:shadow-hr-500/60 magnetic relative overflow-hidden group',
    outline:
      'border-2 border-primary-500 text-primary-700 hover:bg-primary-500 hover:text-white focus:ring-primary-500 hover:shadow-lg hover:shadow-primary-500/40 magnetic relative overflow-hidden group backdrop-blur-sm bg-white/10',
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <Component
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {variant !== 'outline' && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
      )}
    </Component>
  )
}

