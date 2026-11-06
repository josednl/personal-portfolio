import React, { useState, useEffect, useRef } from 'react';
import {
  Type,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  ChevronDown,
  PersonStanding,
} from 'lucide-react';
import { useAppSettings } from '@/lib/context/settingsContext';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { useArrowKeyNavigation } from '@/lib/hooks/useArrowKeyNavigation';
import { useFocusTrap } from '@/lib/hooks/useFocusTrap';
import type { SiteFont } from '@/lib/context/settingsContext';

const AccessibilityMenu: React.FC = () => {
  const {
    fontSize,
    increaseFont,
    decreaseFont,
    font,
    setFont,
    resetFont,
    resetSettings,
  } = useAppSettings();
  const { t } = useTranslation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFontMenuOpen, setIsFontMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const fontButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setIsFontMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsFontMenuOpen(false);
  };

  const handleEscape = () => {
    if (isFontMenuOpen) {
      setIsFontMenuOpen(false);
      fontButtonRef.current?.focus();
      return;
    }

    closeMenu();
  };

  useFocusTrap(isMenuOpen, menuPanelRef, {
    onClose: handleEscape,
    restoreFocusTo: menuTriggerRef,
  });
  useArrowKeyNavigation(isMenuOpen, menuPanelRef);

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
      return;
    }

    setIsFontMenuOpen(false);
    setIsMenuOpen(true);
  };

  const handleFontChange = (nextFont: SiteFont, event: React.MouseEvent) => {
    event.stopPropagation();
    if (nextFont === null) {
      resetFont();
    } else {
      setFont(nextFont);
    }
    setIsFontMenuOpen(false);
    fontButtonRef.current?.focus();
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
        ref={menuTriggerRef}
        type="button"
        className="rounded-control bg-primary p-3 text-white shadow-soft transition-[background-color,transform] duration-200 hover:scale-105 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-controls="accessibility-options"
        aria-haspopup="dialog"
        aria-label={t('accessibilityTitle')}
        title={t('accessibilityTitle')}
      >
        <PersonStanding size={24} aria-hidden="true" />
      </button>

      <div
        ref={menuPanelRef}
        id="accessibility-options"
        role="dialog"
        aria-modal="true"
        aria-labelledby="accessibility-options-title"
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
        className={`${
          isMenuOpen
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95 pointer-events-none'
        } absolute bottom-full right-0 mb-4 w-64 origin-bottom-right rounded-card border border-border bg-surface p-6 text-text shadow-soft transition-[opacity,transform] duration-200 ease-out dark:border-border-dark dark:bg-surface-dark dark:text-text-dark`}
      >
        <h3
          id="accessibility-options-title"
          className="mb-4 border-b border-border pb-2 font-display text-lg font-semibold dark:border-border-dark"
        >
          {t('accessibilityTitle')}
        </h3>

        <div className="relative mb-1">
          <button
            ref={fontButtonRef}
            type="button"
            className="flex w-full items-center justify-between rounded-control px-4 py-3 text-left transition-colors duration-200 hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:hover:bg-background-dark"
            onClick={(event) => {
              event.stopPropagation();
              setIsFontMenuOpen((prev) => !prev);
            }}
            aria-expanded={isFontMenuOpen}
            aria-controls="font-menu"
          >
            <span className="flex items-center">
              <Type className="mr-3" size={20} aria-hidden="true" />
              {getFontLabel(font)}
            </span>
            <ChevronDown
              aria-hidden="true"
              className={`ml-2 transition-transform ${
                isFontMenuOpen ? 'rotate-180' : 'rotate-0'
              }`}
              size={18}
            />
          </button>

          {isFontMenuOpen && (
            <div
              id="font-menu"
              className="absolute bottom-full left-0 z-10 w-full origin-bottom scale-y-100 rounded-control border border-border bg-surface p-4 text-text shadow-soft dark:border-border-dark dark:bg-surface-dark dark:text-text-dark"
            >
              <button
                type="button"
                className="mb-2 w-full rounded-control px-4 py-3 text-left transition-colors duration-200 hover:bg-background dark:hover:bg-background-dark"
                onClick={(event) => handleFontChange(null, event)}
              >
                {t('fontDefault')}
              </button>
              <button
                type="button"
                className="mb-2 w-full rounded-control px-4 py-3 text-left transition-colors duration-200 hover:bg-background dark:hover:bg-background-dark"
                onClick={(event) => handleFontChange('archivo', event)}
              >
                Archivo
              </button>
              <button
                type="button"
                className="mb-2 w-full rounded-control px-4 py-3 text-left transition-colors duration-200 hover:bg-background dark:hover:bg-background-dark"
                onClick={(event) => handleFontChange('space', event)}
              >
                Space Grotesk
              </button>
              <button
                type="button"
                className="w-full rounded-control px-4 py-3 text-left transition-colors duration-200 hover:bg-background dark:hover:bg-background-dark"
                onClick={(event) => handleFontChange('system', event)}
              >
                {t('fontSystem')}
              </button>
            </div>
          )}
        </div>

        <div className="mb-2 mt-4 flex items-center justify-between rounded-control bg-background px-4 py-3 dark:bg-background-dark">
          <span className="flex items-center text-sm font-medium text-text/80 dark:text-text-dark">
            {t('fontSize')} ({fontSize}px)
          </span>

          <div className="flex space-x-2">
            <button
              type="button"
              className="rounded-full p-1 transition-colors duration-200 hover:bg-border/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:hover:bg-border-dark/60"
              onClick={decreaseFont}
              aria-label={t('decreaseFontSize')}
              title={t('decreaseFontSize')}
            >
              <ZoomOut size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="rounded-full p-1 transition-colors duration-200 hover:bg-border/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:hover:bg-border-dark/60"
              onClick={increaseFont}
              aria-label={t('increaseFontSize')}
              title={t('increaseFontSize')}
            >
              <ZoomIn size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        <button
          type="button"
          className="mt-4 flex w-full items-center rounded-control px-4 py-3 text-left text-red-600 transition-colors duration-200 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:text-red-400 dark:hover:bg-red-900/20"
          onClick={resetSettings}
        >
          <RefreshCw className="mr-3" size={20} aria-hidden="true" />
          {t('resetSettings')}
        </button>
      </div>
    </div>
  );
};

export default AccessibilityMenu;
