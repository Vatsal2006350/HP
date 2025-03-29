import React, { createContext, useContext, useState } from 'react';

interface XPContextType {
  xp: number;
  addXP: (amount: number) => void;
}

const XPContext = createContext<XPContextType | undefined>(undefined);

export function XPProvider({ children }: { children: React.ReactNode }) {
  const [xp, setXP] = useState(0);

  const addXP = (amount: number) => {
    setXP((prevXP) => prevXP + amount);
  };

  return (
    <XPContext.Provider value={{ xp, addXP }}>
      {children}
    </XPContext.Provider>
  );
}

export function useXP() {
  const context = useContext(XPContext);
  if (context === undefined) {
    throw new Error('useXP must be used within an XPProvider');
  }
  return context;
} 