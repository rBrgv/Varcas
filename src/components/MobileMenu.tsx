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
      className={`fixed inset-0 z-50 transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
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
                href="/services"
                className="block text-white hover:text-accent-400 font-medium transition-colors"
                onClick={onClose}
              >
                {t('nav.services')}
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
                href="/contact"
                className="block text-white hover:text-accent-400 font-medium transition-colors"
                onClick={onClose}
              >
                {t('nav.contact')}
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

