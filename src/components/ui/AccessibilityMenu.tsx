import React, { useState, useEffect, useRef } from 'react';
import {
  Moon,
  Sun,
  Globe,
  Type,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  ChevronDown,
  PersonStanding,
} from 'lucide-react';
import { useAppSettings } from '@/lib/context/settingsContext';
import { useTranslation } from '@/lib/hooks/useTranslation';
import type { SiteFont } from '@/lib/context/settingsContext';

const AccessibilityMenu: React.FC = () => {
  const {
    theme,
    toggleTheme,
    language,
    setLanguage,
    fontSize,
    increaseFont,
    decreaseFont,
    font,
    setFont,
    resetFont,
    optimizedAnimations,
    toggleOptimizedAnimations,
    resetSettings,
  } = useAppSettings();
  const { t } = useTranslation();

  const isDarkMode = theme === 'dark';

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isFontMenuOpen, setIsFontMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setIsLanguageMenuOpen(false);
        setIsFontMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    if (isMenuOpen) {
      setIsLanguageMenuOpen(false);
      setIsFontMenuOpen(false);
    }
  };

  // Update theme-color meta tag when theme changes
  useEffect(() => {
    const meta = document.getElementById('theme-color-meta');
    if (meta) {
      meta.setAttribute('content', theme === 'dark' ? '#0b0f14' : '#f6f7f5');
    }
  }, [theme]);

  const handleLanguageChange = (lang: 'en' | 'es', event: React.MouseEvent) => {
    event.stopPropagation();
    setLanguage(lang);
    setIsLanguageMenuOpen(false);
  };

  const handleFontChange = (nextFont: SiteFont, event: React.MouseEvent) => {
    event.stopPropagation();
    if (nextFont === null) {
      resetFont();
    } else {
      setFont(nextFont);
    }
    setIsFontMenuOpen(false);
  };

  const getFontLabel = (nextFont: SiteFont) => {
    switch (nextFont) {
      case 'archivo':
        return 'Archivo';
      case 'space':
        return 'Space Grotesk';
      case 'system':
        return t('fontSystem');
      default:
        return t('fontDefault');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={menuRef}>
      <button
        className="group relative overflow-hidden rounded-control bg-primary p-3 text-white shadow-soft transition-[background-color,transform] duration-200 hover:scale-105 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-controls="accessibility-options"
        title="Accessibility Settings"
      >
        <PersonStanding
          size={24}
          className="transition-transform duration-200 group-hover:rotate-12"
        />
        <span
          className="absolute inset-0 animate-pulse motion-reduce:animate-none opacity-25"
          aria-hidden="true"
        />
      </button>

      <div
        id="accessibility-options"
        className={`${
          isMenuOpen
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95 pointer-events-none'
        } absolute bottom-full right-0 mb-4 w-64 origin-bottom-right rounded-card border border-border bg-surface p-6 text-text shadow-soft transition-[opacity,transform] duration-200 ease-out dark:border-border-dark dark:bg-surface-dark dark:text-text-dark`}
      >
        <h3 className="mb-4 border-b border-border pb-2 font-display text-lg font-semibold dark:border-border-dark">
          {t('accessibilityTitle')}
        </h3>

        <button
          className="flex items-center w-full text-left py-3 px-4 rounded-control hover:bg-background dark:hover:bg-background-dark transition-colors duration-200 mb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          onClick={toggleTheme}
        >
          {isDarkMode ? (
            <Sun className="mr-3" size={20} />
          ) : (
            <Moon className="mr-3" size={20} />
          )}
          {isDarkMode ? t('lightMode') : t('darkMode')}
        </button>

        <div className="relative mb-1">
          <button
            className="flex items-center justify-between w-full text-left py-3 px-4 rounded-control hover:bg-background dark:hover:bg-background-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            onClick={(e) => {
              e.stopPropagation();
              setIsFontMenuOpen(false);
              setIsLanguageMenuOpen((prev) => !prev);
            }}
            aria-expanded={isLanguageMenuOpen}
            aria-controls="language-menu"
          >
            <span className="flex items-center">
              <Globe className="mr-3" size={20} />
              {language === 'es' ? t('spanish') : t('english')}
            </span>
            <ChevronDown
              className={`ml-2 transition-transform ${isLanguageMenuOpen ? 'rotate-180' : 'rotate-0'}`}
              size={18}
            />
          </button>

          {isLanguageMenuOpen && (
            <div
              id="language-menu"
              className="absolute bottom-full left-0 z-10 w-full origin-bottom scale-y-100 rounded-control border border-border bg-surface p-4 text-text shadow-soft dark:border-border-dark dark:bg-surface-dark dark:text-text-dark"
            >
              <button
                className="w-full text-left py-3 px-4 rounded-control hover:bg-background dark:hover:bg-background-dark transition-colors duration-200 mb-2"
                onClick={(e) => handleLanguageChange('es', e)}
              >
                Spanish
              </button>
              <button
                className="w-full text-left py-3 px-4 rounded-control hover:bg-background dark:hover:bg-background-dark transition-colors duration-200"
                onClick={(e) => handleLanguageChange('en', e)}
              >
                English
              </button>
            </div>
          )}
        </div>

        <div className="relative mb-1">
          <button
            className="flex items-center justify-between w-full text-left py-3 px-4 rounded-control hover:bg-background dark:hover:bg-background-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            onClick={(e) => {
              e.stopPropagation();
              setIsLanguageMenuOpen(false);
              setIsFontMenuOpen((prev) => !prev);
            }}
            aria-expanded={isFontMenuOpen}
            aria-controls="font-menu"
          >
            <span className="flex items-center">
              <Type className="mr-3" size={20} />
              {getFontLabel(font)}
            </span>
            <ChevronDown
              className={`ml-2 transition-transform ${isFontMenuOpen ? 'rotate-180' : 'rotate-0'}`}
              size={18}
            />
          </button>

          {isFontMenuOpen && (
            <div
              id="font-menu"
              className="absolute bottom-full left-0 z-10 w-full origin-bottom scale-y-100 rounded-control border border-border bg-surface p-4 text-text shadow-soft dark:border-border-dark dark:bg-surface-dark dark:text-text-dark"
            >
              <button
                className="w-full text-left py-3 px-4 rounded-control hover:bg-background dark:hover:bg-background-dark transition-colors duration-200 mb-2"
                onClick={(e) => handleFontChange(null, e)}
              >
                {t('fontDefault')}
              </button>
              <button
                className="w-full text-left py-3 px-4 rounded-control hover:bg-background dark:hover:bg-background-dark transition-colors duration-200 mb-2"
                onClick={(e) => handleFontChange('archivo', e)}
              >
                Archivo
              </button>
              <button
                className="w-full text-left py-3 px-4 rounded-control hover:bg-background dark:hover:bg-background-dark transition-colors duration-200 mb-2"
                onClick={(e) => handleFontChange('space', e)}
              >
                Space Grotesk
              </button>
              <button
                className="w-full text-left py-3 px-4 rounded-control hover:bg-background dark:hover:bg-background-dark transition-colors duration-200"
                onClick={(e) => handleFontChange('system', e)}
              >
                {t('fontSystem')}
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 mb-2 flex items-center justify-between rounded-control bg-background px-4 py-3 dark:bg-background-dark">
          <span className="flex items-center text-sm font-medium text-text/80 dark:text-text-dark">
            {t('fontSize')} ({fontSize}px)
          </span>

          <div className="flex space-x-2">
            <button
              className="rounded-full p-1 transition-colors duration-200 hover:bg-border/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:hover:bg-border-dark/60"
              onClick={decreaseFont}
              title="Decrease Font Size"
            >
              <ZoomOut size={18} />
            </button>
            <button
              className="rounded-full p-1 transition-colors duration-200 hover:bg-border/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:hover:bg-border-dark/60"
              onClick={increaseFont}
              title="Increase Font Size"
            >
              <ZoomIn size={18} />
            </button>
          </div>
        </div>

        <button
          className="flex items-center w-full text-left py-3 px-4 rounded-control hover:bg-background dark:hover:bg-background-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          onClick={toggleOptimizedAnimations}
        >
          <div
            className={`mr-3 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
              optimizedAnimations
                ? 'border-primary bg-primary'
                : 'border-text-light dark:border-text-light-dark'
            }`}
          >
            {optimizedAnimations && (
              <div className="w-2 h-2 bg-white rounded-full" />
            )}
          </div>
          {t('optimizedAnimations')}
        </button>

        <button
          className="flex items-center w-full text-left py-3 px-4 rounded-control hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 mt-4"
          onClick={resetSettings}
        >
          <RefreshCw className="mr-3" size={20} />
          {t('resetSettings')}
        </button>
      </div>
    </div>
  );
};

export default AccessibilityMenu;
