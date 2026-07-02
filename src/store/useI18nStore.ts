import { create } from 'zustand'
import type { ILocale } from '../types'
import { translations } from '../services/i18n/translations'
import { useLanguageStore } from '../core/store/useLanguageStore'

interface II18nState {
  locale: ILocale
  t: (key: string) => string
  setLanguage: (lang: 'ar' | 'en') => void
}

export const useI18nStore = create<II18nState>((set, get) => {
  const ls = useLanguageStore.getState()
  return {
    locale: { lang: ls.language, dir: ls.dir },
    t: (key: string): string => {
      const { locale } = get()
      return translations[locale.lang]?.[key] ?? key
    },
    setLanguage: (lang: 'ar' | 'en') => {
      useLanguageStore.getState().setLanguage(lang)
      const next = useLanguageStore.getState()
      set({ locale: { lang: next.language, dir: next.dir } })
    },
  }
})
