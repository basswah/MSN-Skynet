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

// Helper to extract language from URL search params on initialization
function getLanguageFromUrl(): 'ar' | 'en' | null {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search)
    const lang = params.get('lang')
    if (lang === 'ar' || lang === 'en') {
      return lang
    }
  }
  return null
}

// Set URL query parameter smoothly without triggering page reload
function syncUrlLanguage(lang: 'ar' | 'en') {
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href)
    url.searchParams.set('lang', lang)
    window.history.replaceState({}, '', url.toString())
  }
}

// Initial sync during module load
if (typeof document !== 'undefined') {
  try {
    const urlLang = getLanguageFromUrl()
    if (urlLang) {
      applyDomLanguage(urlLang)
    } else {
      const stored = localStorage.getItem('skynet-language')
      if (stored) {
        const parsed = JSON.parse(stored)
        applyDomLanguage(parsed.state.language)
      } else {
        applyDomLanguage(DEFAULT_LANG)
      }
    }
  } catch {
    applyDomLanguage(DEFAULT_LANG)
  }
}

export const useLanguageStore = create<ILanguageState>()(
  persist(
    (set) => {
      const initialLang = getLanguageFromUrl() || DEFAULT_LANG
      const initialDir = initialLang === 'ar' ? 'rtl' : 'ltr'

      return {
        language: initialLang,
        dir: initialDir,
        setLanguage: (lang: 'ar' | 'en') => {
          const dir = lang === 'ar' ? 'rtl' : 'ltr'
          applyDomLanguage(lang)
          syncUrlLanguage(lang)
          set({ language: lang, dir })
        },
      }
    },
    {
      name: 'skynet-language',
      onRehydrateStorage: () => (state) => {
        // Respect URL language parameter above localStorage if provided
        const urlLang = getLanguageFromUrl()
        if (state) {
          if (urlLang && urlLang !== state.language) {
            state.setLanguage(urlLang)
          } else {
            applyDomLanguage(state.language)
            syncUrlLanguage(state.language)
          }
        }
      },
    },
  ),
)
