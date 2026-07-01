import { create } from 'zustand'
import type { ILocale } from '../types'
import { LOCALE_MAP } from '../services/i18n/types'
import { translations } from '../services/i18n/translations'

interface II18nState {
  locale: ILocale
  t: (key: string) => string
  setLanguage: (lang: 'ar' | 'en') => void
}

export const useI18nStore = create<II18nState>((set, get) => ({
  locale: LOCALE_MAP['ar'],
  t: (key: string): string => {
    const { locale } = get()
    return translations[locale.lang]?.[key] ?? key
  },
  setLanguage: (lang: 'ar' | 'en') => {
    const locale = LOCALE_MAP[lang]
    document.documentElement.lang = lang
    document.documentElement.dir = locale.dir
    set({ locale })
  },
}))
