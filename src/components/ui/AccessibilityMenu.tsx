import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Globe, ZoomIn, ZoomOut, RefreshCw, ChevronDown, Accessibility } from 'lucide-react';
import { useAppSettings } from '@/lib/context/AppSettingsContext';
import { useTranslation } from "@/lib/hooks/useTranslation";

const AccessibilityMenu: React.FC = () => {
  const {
    theme,
    toggleTheme,
    language,
    setLanguage,
    fontSize,
    increaseFont,
    decreaseFont,
    resetSettings
  } = useAppSettings();
  const { t } = useTranslation();

  const isDarkMode = theme === "dark";

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
    setIsMenuOpen(prev => !prev);
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
        className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-controls="accessibility-options"
        title="Accessibility Settings"
      >
        <Accessibility size={24} />
      </button>

      <div
        id="accessibility-options"
        className={`${
          isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        } absolute bottom-full right-0 mb-4 w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
          rounded-xl shadow-xl p-4 transition-all duration-300 ease-out transform origin-bottom-right
          border border-gray-200 dark:border-gray-700`}
      >
        <h3 className="text-lg font-semibold mb-3 border-b pb-2 border-gray-200 dark:border-gray-700">
          {t("accessibilityTitle")}
        </h3>

        <button
          className="flex items-center w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mb-1"
          onClick={toggleTheme}
        >
          {isDarkMode ? <Sun className="mr-3" size={20} /> : <Moon className="mr-3" size={20} />}
          {isDarkMode ? t("lightMode") : t("darkMode")}
        </button>

        <div className="relative mb-1">
          <button
            className="flex items-center justify-between w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setIsLanguageMenuOpen(prev => !prev);
            }}
            aria-expanded={isLanguageMenuOpen}
            aria-controls="language-menu"
          >
            <span className="flex items-center">
              <Globe className="mr-3" size={20} />
              {language === 'es' ? t("spanish") : t("english")}
            </span>
            <ChevronDown
              className={`ml-2 transition-transform ${isLanguageMenuOpen ? 'rotate-180' : 'rotate-0'}`}
              size={18}
            />
          </button>

          {isLanguageMenuOpen && (
            <div
              id="language-menu"
              className="absolute left-0 bottom-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                rounded-lg p-2 w-full shadow-md z-10 origin-bottom scale-y-100"
            >
              <button
                className="w-full text-left py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                onClick={(e) => handleLanguageChange('es', e)}
              >
                Spanish
              </button>
              <button
                className="w-full text-left py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                onClick={(e) => handleLanguageChange('en', e)}
              >
                English
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-2 py-2 px-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 mb-1">
          <span className="flex items-center text-sm font-medium">
            {t("fontSize")} ({fontSize}px)
          </span>

          <div className="flex space-x-2">
            <button
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              onClick={decreaseFont}
              title="Decrease Font Size"
            >
              <ZoomOut size={18} />
            </button>
            <button
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              onClick={increaseFont}
              title="Increase Font Size"
            >
              <ZoomIn size={18} />
            </button>
          </div>
        </div>

        <button
          className="flex items-center w-full text-left py-2 px-3 rounded-lg hover:bg-red-100 dark:hover:bg-red-800/50 text-red-600 dark:text-red-400 transition-colors mt-3"
          onClick={resetSettings}
        >
          <RefreshCw className="mr-3" size={20} />
          {t("resetSettings")}
        </button>
      </div>
    </div>
  );
};

export default AccessibilityMenu;
