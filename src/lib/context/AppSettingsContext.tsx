import { useEffect, useState } from 'react';
import {
  AppSettingsContext,
  Language,
  Theme,
} from '@/lib/context/settingsContext';

export const AppSettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme) || 'light',
  );

  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem('language') as Language) || 'en',
  );

  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('fontSize');
    return saved ? parseInt(saved, 10) : 16;
  });

  const [optimizedAnimations, setOptimizedAnimations] = useState(() => {
    return localStorage.getItem('optimizedAnimations') === 'true';
  });

  // apply theme
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // apply language
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // apply font size
  useEffect(() => {
    document.documentElement.style.setProperty('font-size', `${fontSize}px`);
    localStorage.setItem('fontSize', fontSize.toString());
  }, [fontSize]);

  // apply prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => {
      document.documentElement.classList.toggle(
        'prefers-reduced-motion',
        mq.matches,
      );
    };
    handleChange();
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setLanguageWrapper = (lang: Language) => {
    setLanguage(lang);
  };

  const increaseFont = () => setFontSize((prev) => prev + 2);
  const decreaseFont = () => setFontSize((prev) => Math.max(prev - 2, 12));

  const toggleOptimizedAnimations = () => {
    setOptimizedAnimations((prev) => {
      localStorage.setItem('optimizedAnimations', (!prev).toString());
      return !prev;
    });
  };

  const resetSettings = () => {
    setTheme('light');
    setLanguage('en');
    setFontSize(16);
    setOptimizedAnimations(false);
    localStorage.setItem('optimizedAnimations', 'false');
  };

  return (
    <AppSettingsContext.Provider
      value={{
        theme,
        toggleTheme,
        language,
        setLanguage: setLanguageWrapper,
        fontSize,
        increaseFont,
        decreaseFont,
        optimizedAnimations,
        toggleOptimizedAnimations,
        resetSettings,
      }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
};
