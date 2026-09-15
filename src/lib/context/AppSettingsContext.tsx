import { useEffect, useState } from 'react';
import {
  AppSettingsContext,
  Language,
  SiteFont,
  Theme,
} from '@/lib/context/settingsContext';

const FONT_STACKS: Record<Exclude<SiteFont, null>, string> = {
  archivo: "'Archivo', sans-serif",
  space: "'Space Grotesk', sans-serif",
  system: 'system-ui, sans-serif',
};

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

  const [font, setFont] = useState<SiteFont>(() => {
    const saved = localStorage.getItem('font');
    return saved === 'archivo' || saved === 'space' || saved === 'system'
      ? saved
      : null;
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

  // apply font family
  useEffect(() => {
    if (font) {
      const stack = FONT_STACKS[font];
      document.documentElement.style.setProperty('--font-archivo', stack);
      document.documentElement.style.setProperty('--font-space', stack);
      document.documentElement.style.setProperty('--default-font-family', stack);
      localStorage.setItem('font', font);
    } else {
      document.documentElement.style.removeProperty('--font-archivo');
      document.documentElement.style.removeProperty('--font-space');
      document.documentElement.style.removeProperty('--default-font-family');
      localStorage.removeItem('font');
    }
  }, [font]);

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

  const resetFont = () => setFont(null);

  const resetSettings = () => {
    setTheme('light');
    setLanguage('en');
    setFontSize(16);
    setFont(null);
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
        font,
        setFont,
        resetFont,
        optimizedAnimations,
        toggleOptimizedAnimations,
        resetSettings,
      }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
};
