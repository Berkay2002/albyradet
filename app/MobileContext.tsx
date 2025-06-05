"use client"

import * as React from "react"

// Match Tailwind's default breakpoints
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

type Breakpoint = keyof typeof breakpoints

type ResponsiveState = {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  currentBreakpoint: Breakpoint | null
}

const initialState: ResponsiveState = {
  isMobile: false,
  isTablet: false,
  isDesktop: false,
  currentBreakpoint: null,
}

const ResponsiveContext = React.createContext<ResponsiveState>(initialState)

interface ResponsiveProviderProps {
  children: React.ReactNode
}

export function ResponsiveProvider({ children }: ResponsiveProviderProps) {
  const [state, setState] = React.useState<ResponsiveState>(initialState)

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      let currentBreakpoint: Breakpoint | null = null
      let isMobile = false
      let isTablet = false
      let isDesktop = false

      if (width >= breakpoints['2xl']) {
        currentBreakpoint = '2xl'
        isDesktop = true
      } else if (width >= breakpoints.xl) {
        currentBreakpoint = 'xl'
        isDesktop = true
      } else if (width >= breakpoints.lg) {
        currentBreakpoint = 'lg'
        isDesktop = true
      } else if (width >= breakpoints.md) {
        currentBreakpoint = 'md'
        isTablet = true
      } else if (width >= breakpoints.sm) {
        currentBreakpoint = 'sm'
        isMobile = true
      }

      setState({
        isMobile,
        isTablet,
        isDesktop,
        currentBreakpoint,
      })
    }

    // Set initial values
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize, { passive: true })

    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <ResponsiveContext.Provider
      value={{
        isMobile: state.isMobile,
        isTablet: state.isTablet,
        isDesktop: state.isDesktop,
        currentBreakpoint: state.currentBreakpoint,
      }}
    >
      {children}
    </ResponsiveContext.Provider>
  );
}
