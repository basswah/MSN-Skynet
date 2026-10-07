# 1. Functional Overview & Business Logic (What the project does)

- **Primary Purpose:** Skynet Syria is a high-performance, bilingual (Arabic RTL / English LTR) landing page and customer acquisition portal for "Skynet Syria", an Internet Service Provider (ISP) delivering high-speed wireless and fiber connectivity to rural Damascus areas and underserved communities. The application bridges the digital divide in regions with limited infrastructure by presenting transparent pricing tiers, coverage maps, robust feature breakdowns, and direct customer contact/onboarding channels.
- **Core Features:**
  - **Bilingual Internationalization (i18n):** Instant switching between Arabic (RTL) and English (LTR) with URL synchronization (`?lang=`) and persistence.
  - **Dynamic Theme System:** Seamless dark and light mode toggle with system preference detection and localStorage persistence.
  - **Smooth Inertial Scrolling:** Butter-smooth scroll navigation powered by Lenis with graceful fallback for reduced motion preferences.
  - **Interactive Pricing Calculator/Tiers:** Clear presentation of internet packages tailored for rural subscribers with speed metrics and feature breakdowns.
  - **Coverage & Network Visualization:** Visual representation of ISP network reach across rural Damascus districts.
  - **Testimonials & Social Proof:** Customer success stories and reviews from local subscribers.
  - **Responsive Navigation & Mobile Drawer:** Adaptive desktop navbar and mobile navigation menu with scroll-aware styling.
- **User Roles & Flows:**
  - **Prospective Subscribers (End Users):** Visitors from rural areas arriving at the landing page. They review coverage, compare high-speed internet pricing tiers, read customer testimonials, toggle languages/themes, and navigate to the contact/onboarding section to request service installation.
  - **System Administrators / ISP Team:** Receives contact inquiries and service subscription leads generated via the contact/onboarding section.
- **Business Rules:**
  - Default locale must be Arabic (`ar`) with `rtl` text direction for optimal local market alignment.
  - URL query parameters (`?lang=ar|en`) take precedence over stored preferences on initial page load.
  - All interactive elements must maintain accessibility standards (`focus-visible` rings, `aria-label` attributes) and support user motion preferences (`prefers-reduced-motion`).

# 2. Tech Stack & Tooling

- **Frontend Framework:** React 19 (`react`, `react-dom`) powered by Vite 8 (`vite`, `@vitejs/plugin-react`).
- **Language:** TypeScript ~6.0 (`typescript` in Strict Mode, zero `any` tolerance).
- **Styling & CSS:** Tailwind CSS v4 (`tailwindcss`, `@tailwindcss/vite`) with zero-config Vite integration, `clsx`, and `tailwind-merge`.
- **State Management:** Zustand 5 (`zustand`) with localStorage persistence middleware and URL query param synchronization.
- **Animation & Motion:** Framer Motion 12 (`framer-motion`) for spring physics, scroll-linked transforms, and staggered reveals.
- **Smooth Scrolling:** Lenis (`lenis`) for buttery-smooth inertial scrolling (`SmoothScrollLayout`).
- **Icons:** `@phosphor-icons/react` for crisp, consistent iconography across all components.
- **Build & Quality Assurance Tools:** Vitest (`vitest`), `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, JSDOM, ESLint (`eslint`, `@eslint/js`, `typescript-eslint`).
- **Database:** None (Static landing page application with client-side state and translation bundles).

# 3. Architecture & Design Patterns

- **Component-Based Modular Architecture:** Clean separation of concerns organized into domain-specific directories (`components/layout/`, `components/sections/`, `components/Pricing/`, `components/ui/`).
- **File Modularity & Separation of Concerns:** Strict enforcement of component size limits (max 150 lines per file), decoupling presentation UI from underlying state/logic, and isolating reusable UI primitives.
- **Design Patterns Applied:**
  - **Singleton Store Pattern:** Zustand global state stores (`useLanguageStore`, `useI18nStore`, `useThemeStore`, `useUIStore`) acting as centralized singletons for cross-component reactive state.
  - **Strategy / Adapter Pattern:** Translator factory (`createTranslator`) mapping i18n keys dynamically depending on the active locale (`ar`/`en`).
  - **Provider / Layout Pattern:** `SmoothScrollLayout` encapsulating Lenis smooth scrolling context and providing graceful fallback for reduced motion preferences (`usePrefersReducedMotion`).
  - **Error Boundary Pattern:** React error boundaries (`ErrorBoundary`, `ErrorFallback`) protecting UI subtrees against runtime crashes.
- **Adherence to SOLID Principles:**
  - *Single Responsibility Principle:* Each component, store, and service handles a singular concern (e.g., `useThemeStore` only manages theme state; `PricingCard` only renders a single package).
  - *Interface Segregation:* Strict, narrow TypeScript interfaces defined in `src/types/` (e.g., `ILocale`, `IFeature`, `PricingPackage`).

# 4. Directory Structure

```text
skynet-website/
├── public/                 # Static assets (logos, favicon, sitemap, robots.txt)
├── src/
│   ├── components/
│   │   ├── layout/         # Layout components (Navbar, Footer, SmoothScrollLayout, MobileNav, DesktopNav, etc.)
│   │   ├── sections/       # Landing page sections (Hero, About, Features, Coverage, Testimonials, Contact)
│   │   ├── Pricing/        # Pricing domain components (PricingSection, PricingCard, pricingData)
│   │   └── ui/             # Reusable UI primitives (MagneticButton, LanguageToggle, ThemeToggle, ScrollProgress, ScrollReveal, HeroVisual, etc.)
│   ├── core/
│   │   └── store/          # Cross-cutting state stores with persistence & DOM sync (useLanguageStore)
│   ├── hooks/              # Custom React hooks (useNavbar, usePointerCapabilities, usePrefersReducedMotion)
│   ├── services/           # Business services & localization (navigation.ts, i18n/translations.ts, ar.ts, en.ts)
│   ├── store/              # Domain and UI Zustand stores (useI18nStore, useThemeStore, useUIStore)
│   ├── test/               # Test setup and configuration (setup.ts)
│   ├── types/              # TypeScript interface definitions (index.ts, shared.ts, navigation.ts, feature.ts, testimonial.ts, pricing.ts)
│   ├── App.tsx             # Root application component assembling layout & sections
│   ├── main.tsx            # Application entry point mounting React root
│   └── index.css           # Global stylesheet & Tailwind directives
├── design-system/          # Design specifications and master reference guides
├── package.json            # Project dependencies and build/test scripts
├── tsconfig.json           # TypeScript configuration references
├── vite.config.ts          # Vite bundler configuration
└── eslint.config.js        # ESLint flat configuration
```

# 5. Data Flow & State Management

- **Global State Management (Zustand):**
  - `useLanguageStore`: Manages persistence (`localStorage` key `skynet-language`), URL query parameter sync (`?lang=ar|en`), and DOM synchronization (`document.documentElement.lang` and `dir='rtl'|'ltr'`).
  - `useI18nStore`: Wraps `useLanguageStore` and provides the reactive translation function `t(key)` and locale object `{ lang, dir }`. Changing language instantly updates translator references and re-renders subscribers.
  - `useThemeStore`: Manages dark/light mode preference with persistence (`skynet-theme`), system preference fallback (`prefers-color-scheme`), and DOM class toggling (`document.documentElement.classList.toggle('dark', ...)`).
  - `useUIStore`: Manages transient UI states such as scroll position (`isScrolled`) and mobile menu visibility (`isMobileMenuOpen`).
- **Data Fetching & Caching:** Static landing page architecture with no external database or remote backend APIs required; all textual content is managed via structured translation dictionaries (`ar.ts`, `en.ts`) and data fixtures (`pricingData.ts`).
- **Forms & Validation:** Client-side contact and interaction flows handled via localized state and standard React event handlers.

# 6. Key Entities & Database Schemas

*(Note: As this is a static landing page application, there is no active backend database or Supabase integration. Data models are strictly defined as TypeScript interfaces within `src/types/`)*:
- **`ILocale`:** Defines language (`'ar' | 'en'`) and text direction (`'rtl' | 'ltr'`).
- **`INavLink` / `INavItem`:** Navigation structure for menu items and anchor links.
- **`IFeature`:** Feature highlights detailing rural ISP capabilities (coverage, speed, stability, support).
- **`ITestimonial`:** Customer feedback entries from rural Damascus subscribers.
- **`PricingPackage`:** Internet tier structure (`id`, `titleKey`, `speed`, `priceKey`, `featuresKeys`, `isPopular`).

# 7. Development & Setup Notes

- **Environment Variables:** No secret API keys required. Static frontend configuration.
- **Node Version:** Node.js LTS recommended.
- **Commands:**
  - Install dependencies: `npm install`
  - Start development server: `npm run dev`
  - Build for production (Type check + Vite build): `npm run build`
  - Run unit tests: `npm run test` or `npm run test:watch`
  - Run linter: `npm run lint`
