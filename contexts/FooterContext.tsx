// contexts/FooterContext.tsx
"use client";
import { createContext, useContext, ReactNode, useState } from 'react';

interface FooterContextType {
  isFooterVisible: boolean;
  setFooterVisible: (visible: boolean) => void;
}

const FooterContext = createContext<FooterContextType | undefined>(undefined);

export const FooterControl = ({ children }: { children: ReactNode }) => {
  const [isFooterVisible, setFooterVisible] = useState(true);

  return (
    <FooterContext.Provider value={{ isFooterVisible, setFooterVisible }}>
      {children}
    </FooterContext.Provider>
  );
};

export const useFooter = () => {
  const context = useContext(FooterContext);
  if (context === undefined) {
    throw new Error('useFooter must be used within a FooterControl');
  }
  return context;
};