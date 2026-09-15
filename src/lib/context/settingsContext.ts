import { createContext, useContext } from 'react';

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'es';
export type SiteFont = 'archivo' | 'space' | 'system' | null;

export interface AppSettingsContextProps {
  theme: Theme;
  toggleTheme: () => void;

  language: Language;
  setLanguage: (lang: Language) => void;

  fontSize: number;
  increaseFont: () => void;
  decreaseFont: () => void;

  font: SiteFont;
  setFont: (font: Exclude<SiteFont, null>) => void;
  resetFont: () => void;

  optimizedAnimations: boolean;
  toggleOptimizedAnimations: () => void;

  resetSettings: () => void;
}

export const AppSettingsContext =
  createContext<AppSettingsContextProps | null>(null);

export const useAppSettings = () => {
  const ctx = useContext(AppSettingsContext);
  if (!ctx)
    throw new Error('useAppSettings must be used within AppSettingsProvider');
  return ctx;
};
