import { createContext } from 'react';

interface LayoutContextType {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export const LayoutContext = createContext<LayoutContextType>({ 
  isCollapsed: false, 
  setIsCollapsed: () => {} 
});