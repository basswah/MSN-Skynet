import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react';
import Lenis from 'lenis';

interface SmoothScrollContextValue {
  lenis: Lenis | null;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
});

export function useSmoothScroll(): SmoothScrollContextValue {
  return useContext(SmoothScrollContext);
}

interface SmoothScrollLayoutProps {
  children: ReactNode;
  enabled?: boolean;
}

export function SmoothScrollLayout({
  children,
  enabled = true,
}: SmoothScrollLayoutProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current }}>
      <div data-lenis-prevent={false}>
        {children}
      </div>
    </SmoothScrollContext.Provider>
  );
}
