import { useAppSettings } from "@/lib/context/AppSettingsContext";
import { translations } from "@/lib/translations/translations";

export const useTranslation = () => {
  const { language } = useAppSettings();

  const t = (key: string): string => {
    return translations[language]?.[key as keyof typeof translations[typeof language]] || key;
  };

  return { t, language };
};
