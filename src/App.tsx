import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SmoothScrollLayout } from './components/layout/SmoothScrollLayout'
import { ErrorBoundary } from './components/ui/ErrorBoundary'
import { useI18nStore } from './store/useI18nStore'
import { HomePage } from './pages/HomePage'

const EquipmentPage = lazy(() =>
  import('./pages/EquipmentPage').then((m) => ({ default: m.EquipmentPage }))
)

function RouteFallback() {
  const t = useI18nStore((state) => state.t)
  return (
    <div className="min-h-[60vh] flex items-center justify-center" role="status" aria-label={t('a11y.loading')}>
      <div className="w-10 h-10 rounded-full border-2 border-[#4274D9]/20 border-t-[#4274D9] animate-spin" />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <SmoothScrollLayout>
        <main id="main-content">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/equipment"
                element={
                  <Suspense fallback={<RouteFallback />}>
                    <EquipmentPage />
                  </Suspense>
                }
              />
            </Routes>
          </ErrorBoundary>
        </main>
      </SmoothScrollLayout>
    </BrowserRouter>
  )
}

export default App
