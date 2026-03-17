import React, { useState, useEffect, useRef } from 'react';
import {
  Moon,
  Sun,
  Globe,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  ChevronDown,
  Accessibility,
} from 'lucide-react';
import { useAppSettings } from '@/lib/context/AppSettingsContext';
import { useTranslation } from '@/lib/hooks/useTranslation';

const AccessibilityMenu: React.FC = () => {
  const {
    theme,
    toggleTheme,
    language,
    setLanguage,
    fontSize,
    increaseFont,
    decreaseFont,
    resetSettings,
  } = useAppSettings();
  const { t } = useTranslation();

  const isDarkMode = theme === 'dark';

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    if (isMenuOpen) setIsLanguageMenuOpen(false);
  };

  const handleLanguageChange = (lang: 'en' | 'es', event: React.MouseEvent) => {
    event.stopPropagation();
    setLanguage(lang);
    setIsLanguageMenuOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={menuRef}>
      <button
        className="bg-primary text-white rounded-sm p-3 shadow-lg hover:bg-primary/90 transition-all duration-200 transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 relative overflow-hidden group"
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-controls="accessibility-options"
        title="Accessibility Settings"
      >
        <Accessibility
          size={24}
          className="transition-transform duration-200 group-hover:rotate-12"
        />
        <span
          className="absolute inset-0 animate-pulse opacity-25"
          aria-hidden="true"
        />
      </button>

      <div
        id="accessibility-options"
        className={`${
          isMenuOpen
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95 pointer-events-none'
        } absolute bottom-full right-0 mb-4 w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
           rounded-xl shadow-xl p-6 transition-all duration-250 ease-out transform origin-bottom-right
           border border-gray-200 dark:border-gray-700`}
      >
        <h3 className="text-lg font-semibold mb-4 border-b pb-2 border-text/20 dark:border-text/10">
          {t('accessibilityTitle')}
        </h3>

        <button
          className="flex items-center w-full text-left py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 mb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
            className="flex items-center justify-between w-full text-left py-3 px-4 rounded-lg hover:bg-text/5 dark:hover:bg-gray-700 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            onClick={(e) => {
              e.stopPropagation();
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
               className="absolute left-0 bottom-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                rounded-lg p-4 w-full shadow-lg z-10 origin-bottom scale-y-100"
             >
               <button
                 className="w-full text-left py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 mb-2"
                 onClick={(e) => handleLanguageChange('es', e)}
               >
                 Spanish
               </button>
               <button
                 className="w-full text-left py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                 onClick={(e) => handleLanguageChange('en', e)}
               >
                 English
               </button>
             </div>
           )}
        </div>

        <div className="flex items-center justify-between mt-4 py-3 px-4 rounded-lg bg-text/5 dark:bg-text/10 mb-2">
          <span className="flex items-center text-sm font-medium text-text/80 dark:text-gray-100">
            {t('fontSize')} ({fontSize}px)
          </span>

          <div className="flex space-x-2">
            <button
              className="p-1 rounded-full hover:bg-text/10 dark:hover:bg-gray-700 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              onClick={decreaseFont}
              title="Decrease Font Size"
            >
              <ZoomOut size={18} />
            </button>
            <button
              className="p-1 rounded-full hover:bg-text/10 dark:hover:bg-gray-700 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              onClick={increaseFont}
              title="Increase Font Size"
            >
              <ZoomIn size={18} />
            </button>
          </div>
        </div>

        <button
          className="flex items-center w-full text-left py-3 px-4 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 mt-4"
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
