import { useState, useEffect } from 'react';

export interface UseResponsiveOptions {
  mobileBreakpoint?: number;
  tabletBreakpoint?: number;
}

export interface UseResponsiveReturn {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
}

/**
 * Custom hook for responsive screen size detection with proper cleanup
 */
export function useResponsive(options: UseResponsiveOptions = {}): UseResponsiveReturn {
  const { mobileBreakpoint = 640, tabletBreakpoint = 1024 } = options;
  
  const [screenWidth, setScreenWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return tabletBreakpoint + 1;
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    
    // Cleanup listener on unmount to prevent memory leaks
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    isMobile: screenWidth < mobileBreakpoint,
    isTablet: screenWidth >= mobileBreakpoint && screenWidth < tabletBreakpoint,
    isDesktop: screenWidth >= tabletBreakpoint,
    screenWidth,
  };
}
