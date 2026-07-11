import { create } from 'zustand'
import type { ILocale } from '../types'
import { translations } from '../services/i18n/translations'
import { useLanguageStore } from '../core/store/useLanguageStore'

interface II18nState {
  locale: ILocale
  t: (key: string) => string
  setLanguage: (lang: 'ar' | 'en') => void
}

// Helper to generate a localized translation function
const createTranslator = (lang: 'ar' | 'en') => (key: string): string => {
  return translations[lang]?.[key] ?? key
}

export const useI18nStore = create<II18nState>((set) => {
  const ls = useLanguageStore.getState()
  
  return {
    locale: { lang: ls.language, dir: ls.dir },
    t: createTranslator(ls.language),
    setLanguage: (lang: 'ar' | 'en') => {
      // 1. Update the core language store (triggers DOM updates & localStorage)
      useLanguageStore.getState().setLanguage(lang)
      const next = useLanguageStore.getState()
      
      // 2. Update i18n store state with a NEW translator function reference.
      // Since 't' reference changes, all components subscribing to 't' will instantly re-render!
      set({ 
        locale: { lang: next.language, dir: next.dir },
        t: createTranslator(next.language)
      })
    },
  }
})
