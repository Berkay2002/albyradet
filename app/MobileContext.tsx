// app/contexts/MobileContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';

const MobileStateContext = createContext({});

export const MobileStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isIpad, setIsIpad] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  const handleResize = () => {
    const width = window.innerWidth;
    setIsMobile(width <= 600);
    setIsIpad(width > 600 && width <= 1024);
    setIsDesktop(width > 1024);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <MobileStateContext.Provider value={{ isMobile, isIpad, isDesktop }}>
      {children}
    </MobileStateContext.Provider>
  );
};

export const useMobileState = () => useContext(MobileStateContext);
