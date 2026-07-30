import { useState, useEffect, useRef } from 'react';

export function useDeviceCapabilities() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const mediaQueryRef = useRef<MediaQueryList | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // نتحقق من الشاشات الكبيرة (1024px فأكثر)
      mediaQueryRef.current = window.matchMedia('(min-width: 1024px)');
      setIsLargeScreen(mediaQueryRef.current.matches);
    }

    const handleChange = (event: MediaQueryListEvent) => {
      setIsLargeScreen(event.matches);
    };

    if (mediaQueryRef.current) {
      mediaQueryRef.current.addEventListener('change', handleChange);
    }

    return () => {
      if (mediaQueryRef.current) {
        mediaQueryRef.current.removeEventListener('change', handleChange);
      }
    };
  }, []);

  return { isLargeScreen };
}
