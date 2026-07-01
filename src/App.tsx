import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { PricingSection } from './components/Pricing/PricingSection'
import { Stats } from './components/sections/Stats'
import { Features } from './components/sections/Features'
import { Testimonials } from './components/sections/Testimonials'
import { Contact } from './components/sections/Contact'
import { ScrollProgress } from './components/ui/ScrollProgress'

function App() {
  return (
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
  )
}

export default App
