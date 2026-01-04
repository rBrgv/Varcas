'use client'

import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import '@/lib/i18n'

export function LanguageToggle() {
  const { i18n } = useTranslation()

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language')
    if (storedLanguage && storedLanguage !== i18n.language) {
      i18n.changeLanguage(storedLanguage)
    }
  }, [i18n])

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'te' : 'en'
    i18n.changeLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1.5 rounded-lg bg-primary-100 hover:bg-primary-200 text-primary-700 font-medium text-sm transition-colors"
      aria-label="Toggle language"
    >
      {i18n.language === 'en' ? 'తెలుగు' : 'English'}
    </button>
  )
}

