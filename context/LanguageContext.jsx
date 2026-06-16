'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { content } from '@/data/content'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')

  // Load saved preference on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('portfolio-lang')
      if (saved === 'en' || saved === 'id') {
        setLang(saved)
      }
    } catch (_) {}
  }, [])

  function toggleLang() {
    const next = lang === 'id' ? 'en' : 'id'
    setLang(next)
    try {
      localStorage.setItem('portfolio-lang', next)
    } catch (_) {}
  }

  const t = content[lang]

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}