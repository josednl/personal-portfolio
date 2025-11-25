import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type Language = "en" | "es";

interface AppSettingsContextProps {
  theme: Theme;
  toggleTheme: () => void;

  language: Language;
  setLanguage: (lang: Language) => void;

  fontSize: number;
  increaseFont: () => void;
  decreaseFont: () => void;
  resetSettings: () => void;
}

const AppSettingsContext = createContext<AppSettingsContextProps | null>(null);

export const AppSettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() =>
    (localStorage.getItem("theme") as Theme) || "light"
  );

  const [language, setLanguage] = useState<Language>(() =>
    (localStorage.getItem("language") as Language) || "en"
  );

  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem("fontSize");
    return saved ? parseInt(saved, 10) : 16;
  });

  // apply theme
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // apply language
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // apply font size
  useEffect(() => {
    document.documentElement.style.setProperty("font-size", `${fontSize}px`);
    localStorage.setItem("fontSize", fontSize.toString());
  }, [fontSize]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  const setLanguageWrapper = (lang: Language) => {
    setLanguage(lang);
  };

  const increaseFont = () => setFontSize(prev => prev + 2);
  const decreaseFont = () => setFontSize(prev => Math.max(prev - 2, 12));

  const resetSettings = () => {
    setTheme("light");
    setLanguage("en");
    setFontSize(16);
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
        resetSettings,
      }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
};

export const useAppSettings = () => {
  const ctx = useContext(AppSettingsContext);
  if (!ctx) throw new Error("useAppSettings must be used within AppSettingsProvider");
  return ctx;
};
