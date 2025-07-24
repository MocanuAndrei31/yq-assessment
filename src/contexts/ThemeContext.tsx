import React, { useState, useEffect } from 'react';
import type {ReactNode} from 'react'
import { ThemeContext } from './ThemeContextDefinition';
import type { ThemeColor } from './ThemeContextDefinition';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeColor, setThemeColor] = useState<ThemeColor>(() => {
    const saved = localStorage.getItem('themeColor');
    return (saved as ThemeColor) || 'blue';
  });

  useEffect(() => {
    localStorage.setItem('themeColor', themeColor);
    
    const root = document.documentElement;
    const colors = {
      blue: { primary: '59 130 246', secondary: '147 51 234' },
      purple: { primary: '147 51 234', secondary: '236 72 153' },
      pink: { primary: '236 72 153', secondary: '249 115 22' },
      green: { primary: '34 197 94', secondary: '59 130 246' },
      orange: { primary: '249 115 22', secondary: '239 68 68' },
    };
    
    const selectedColors = colors[themeColor];
    root.style.setProperty('--color-primary', selectedColors.primary);
    root.style.setProperty('--color-secondary', selectedColors.secondary);
  }, [themeColor]);

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};