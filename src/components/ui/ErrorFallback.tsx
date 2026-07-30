import { useI18nStore } from '../../store/useI18nStore'
import { Warning } from '@phosphor-icons/react'

export function ErrorFallback() {
  const t = useI18nStore((state) => state.t)

  return (
    <div className="min-h-[50vh] flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
          <Warning size={32} weight="fill" className="text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          {t('error.title')}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          {t('error.description')}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2.5 bg-[#4274D9] text-white text-sm font-semibold rounded-xl hover:bg-[#3a64d2] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4274D9] focus-visible:ring-offset-2"
        >
          {t('error.retry')}
        </button>
      </div>
    </div>
  )
}
