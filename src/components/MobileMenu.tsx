'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { LanguageToggle } from '@/components/LanguageToggle'
import { useEffect } from 'react'
import '@/lib/i18n'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t } = useTranslation()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <div
      className={`fixed inset-0 z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="absolute right-0 top-0 w-64 md:w-80 h-full bg-gradient-to-br from-primary-800 to-primary-900 shadow-lg p-6 flex flex-col">
        <div className="flex justify-end mb-8">
          <button onClick={onClose} className="text-white hover:text-accent-400 transition-colors">
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex-grow">
          <ul className="space-y-6 text-lg">
            <li>
              <Link
                href="/"
                className="block text-white hover:text-accent-400 font-medium transition-colors"
                onClick={onClose}
              >
                {t('nav.home')}
              </Link>
            </li>
            <li>
              <Link
                href="/services/hr"
                className="block text-white hover:text-hr-400 font-medium transition-colors"
                onClick={onClose}
              >
                HR Services
              </Link>
            </li>
            <li>
              <Link
                href="/careers"
                className="block text-white hover:text-accent-400 font-medium transition-colors"
                onClick={onClose}
              >
                {t('nav.careers')}
              </Link>
            </li>
            <li>
              <Link
                href="/services/solar"
                className="block text-white hover:text-solar-400 font-medium transition-colors flex items-center gap-2"
                onClick={onClose}
              >
                <span>Varcas Solar</span>
                <svg className="w-4 h-4 text-solar-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block text-white hover:text-accent-400 font-medium transition-colors"
                onClick={onClose}
              >
                {t('nav.contact')}
              </Link>
            </li>
            <li className="pt-4 mt-4 border-t border-white/20">
              <Link
                href="/admin"
                className="flex items-center gap-2 text-white hover:text-accent-400 font-medium transition-colors"
                onClick={onClose}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Admin Login</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-8">
          <LanguageToggle />
        </div>
      </div>
    </div>
  )
}

