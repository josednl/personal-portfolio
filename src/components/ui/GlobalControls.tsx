import { Moon, Sun } from 'lucide-react';
import { useAppSettings } from '@/lib/context/settingsContext';
import { useTranslation } from '@/lib/hooks/useTranslation';

const controlClass =
  'inline-flex h-10 w-10 items-center justify-center rounded-full text-text-light transition-colors duration-200 hover:bg-background hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:text-text-light-dark dark:hover:bg-background-dark dark:hover:text-text-dark';

export const GlobalControls = ({ className = '' }: { className?: string }) => {
  const { theme, toggleTheme, language, setLanguage } = useAppSettings();
  const { t } = useTranslation();

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <button
        type="button"
        onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
        aria-label={
          language === 'en' ? t('switchToSpanish') : t('switchToEnglish')
        }
        title={language === 'en' ? t('switchToSpanish') : t('switchToEnglish')}
        className={`${controlClass} text-[11px] font-semibold tracking-[0.12em]`}
      >
        {language === 'en' ? 'ES' : 'EN'}
      </button>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')}
        title={theme === 'dark' ? t('lightMode') : t('darkMode')}
        className={controlClass}
      >
        {theme === 'dark' ? (
          <Sun aria-hidden="true" size={18} />
        ) : (
          <Moon aria-hidden="true" size={18} />
        )}
      </button>
    </div>
  );
};
