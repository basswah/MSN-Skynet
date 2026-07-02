import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { PricingSection } from './components/Pricing/PricingSection'
import { Stats } from './components/sections/Stats'
import { Features } from './components/sections/Features'
import { Testimonials } from './components/sections/Testimonials'
import { Contact } from './components/sections/Contact'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { SmoothScrollLayout } from './components/layout/SmoothScrollLayout'

function App() {
  return (
    <SmoothScrollLayout>
      <main>
        <ScrollProgress />
        <Navbar />
        <Hero />
        <Features />
        <PricingSection />
        <Stats />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </SmoothScrollLayout>
  )
}

export default App
