import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IThemeState {
  isDarkMode: boolean
  toggleTheme: () => void
}

export const useThemeStore = create<IThemeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleTheme: () =>
        set((state) => {
          const next = !state.isDarkMode
          document.documentElement.classList.toggle('dark', next)
          return { isDarkMode: next }
        }),
    }),
    {
      name: 'skynet-theme',
      onRehydrateStorage: () => () => {
        const stored = localStorage.getItem('skynet-theme')
        if (stored) {
          try {
            const parsed = JSON.parse(stored)
            if (parsed?.state && typeof parsed.state.isDarkMode === 'boolean') {
              document.documentElement.classList.toggle('dark', parsed.state.isDarkMode)
              return
            }
          } catch {}
        }
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        document.documentElement.classList.toggle('dark', prefersDark)
      },
    }
  )
)
