import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const DEFAULT_LANG = 'ar' as const

interface ILanguageState {
  language: 'ar' | 'en'
  dir: 'rtl' | 'ltr'
  setLanguage: (lang: 'ar' | 'en') => void
}

function applyDomLanguage(lang: 'ar' | 'en') {
  document.documentElement.lang = lang
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
}

if (typeof document !== 'undefined') {
  try {
    const stored = localStorage.getItem('skynet-language')
    if (stored) {
      const parsed = JSON.parse(stored)
      applyDomLanguage(parsed.state.language)
    } else {
      applyDomLanguage(DEFAULT_LANG)
    }
  } catch {
    applyDomLanguage(DEFAULT_LANG)
  }
}

export const useLanguageStore = create<ILanguageState>()(
  persist(
    (set) => ({
      language: DEFAULT_LANG,
      dir: 'rtl',
      setLanguage: (lang: 'ar' | 'en') => {
        const dir = lang === 'ar' ? 'rtl' : 'ltr'
        applyDomLanguage(lang)
        set({ language: lang, dir })
      },
    }),
    {
      name: 'skynet-language',
      onRehydrateStorage: () => (state) => {
        if (state) applyDomLanguage(state.language)
      },
    },
  ),
)
