'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslations from '@/content/translations/en.json'
import teTranslations from '@/content/translations/te.json'

const storedLanguage = typeof window !== 'undefined' ? localStorage.getItem('language') : null
const defaultLanguage = storedLanguage || 'en'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      te: { translation: teTranslations },
    },
    lng: defaultLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n

