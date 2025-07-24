import { createContext } from 'react';

export type ThemeColor = 'blue' | 'purple' | 'pink' | 'green' | 'orange';

export interface ThemeContextType {
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);