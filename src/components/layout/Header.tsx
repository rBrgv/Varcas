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
                <Link href="/services/hr" className="text-neutral-700 hover:text-hr-600 font-semibold transition-all duration-300 hover:scale-105 relative group">
                  HR Services
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-hr-500 to-hr-600 group-hover:w-full transition-all duration-300 rounded-full"></span>
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-neutral-700 hover:text-primary-600 font-semibold transition-all duration-300 hover:scale-105 relative group">
                  {t('nav.careers')}
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
                </Link>
              </li>
              <li>
                <Link href="/services/solar" className="text-neutral-700 hover:text-solar-600 font-semibold transition-all duration-300 hover:scale-105 relative group flex items-center gap-2">
                  <span>Varcas Solar</span>
                  <svg className="w-4 h-4 text-solar-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                  </svg>
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-solar-400 to-solar-600 group-hover:w-full transition-all duration-300 rounded-full"></span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-700 hover:text-primary-600 font-semibold transition-all duration-300 hover:scale-105 relative group">
                  {t('nav.contact')}
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
                </Link>
              </li>
            </ul>
            <div className="flex items-center gap-4">
              <LanguageToggle />
              <Link
                href="/admin"
                className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-neutral-600 hover:text-primary-600 border border-neutral-300 rounded-lg hover:border-primary-400 transition-all duration-300 hover:shadow-md"
                title="Admin Dashboard"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Admin</span>
              </Link>
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
        </div>
      </nav>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  )
}

