import { useContext } from 'react';
import { LayoutContext } from '../contexts/LayoutContext';

export function useLayout() {
  return useContext(LayoutContext);
}