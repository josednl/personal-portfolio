import { useAppSettings } from '@/lib/context/AppSettingsContext';
import { translations } from '@/lib/translations/translations';

export const useTranslation = () => {
  const { language } = useAppSettings();

  const t = <T extends keyof typeof translations.en>(key: T): string => {
    return translations[language]?.[key] || translations.en?.[key] || key;
  };

  return { t, language };
};
