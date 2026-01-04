'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageToggle } from '@/components/LanguageToggle'
import { MobileMenu } from '@/components/MobileMenu'
import '@/lib/i18n'

export function Header() {
  const { t } = useTranslation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="glass border-b border-primary-100/50 shadow-soft sticky top-0 z-40 backdrop-blur-xl w-full max-w-full overflow-x-hidden">
      <nav className="container mx-auto px-4 py-4 w-full max-w-full">
        <div className="flex items-center justify-between w-full">
          <Link href="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 rounded-xl flex items-center justify-center group-hover:shadow-glow group-hover:scale-110 transition-all duration-300 shadow-md">
              <span className="text-white font-bold text-lg md:text-xl">V</span>
            </div>
            <span className="text-lg md:text-2xl font-bold gradient-text-primary group-hover:opacity-90 transition-all duration-300">
              <span className="hidden sm:inline">Varcas Enterprises</span>
              <span className="sm:hidden">Varcas</span>
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <ul className="hidden md:flex gap-8">
              <li>
                <Link href="/" className="text-neutral-700 hover:text-primary-600 font-semibold transition-all duration-300 hover:scale-105 relative group">
                  {t('nav.home')}
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-neutral-700 hover:text-primary-600 font-semibold transition-all duration-300 hover:scale-105 relative group">
                  {t('nav.services')}
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-neutral-700 hover:text-primary-600 font-semibold transition-all duration-300 hover:scale-105 relative group">
                  {t('nav.careers')}
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-700 hover:text-primary-600 font-semibold transition-all duration-300 hover:scale-105 relative group">
                  {t('nav.contact')}
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
                </Link>
              </li>
            </ul>
            <LanguageToggle />
            <button
              className="md:hidden text-neutral-700 hover:text-primary-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile menu"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  )
}

