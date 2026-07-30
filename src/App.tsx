import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Features } from './components/sections/Features'
import { Coverage } from './components/sections/Coverage'
import { PricingSection } from './components/Pricing/PricingSection'
import { Testimonials } from './components/sections/Testimonials'
import { Contact } from './components/sections/Contact'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { SmoothScrollLayout } from './components/layout/SmoothScrollLayout'
import { ErrorBoundary } from './components/ui/ErrorBoundary'

function App() {
  return (
    <SmoothScrollLayout>
      <main id="main-content">
        <ErrorBoundary>
          <ScrollProgress />
          <Navbar />
          <Hero />
          <About />
          <Features />
          <Coverage />
          <PricingSection />
          <Testimonials />
          <Contact />
          <Footer />
        </ErrorBoundary>
      </main>
    </SmoothScrollLayout>
  )
}

export default App
