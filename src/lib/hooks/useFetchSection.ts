import { useAppSettings } from '@/lib/context/settingsContext';
import { useState, useEffect } from 'react';

export const useFetchSection = <T>(path: string) => {
  const { language } = useAppSettings();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [prevLanguage, setPrevLanguage] = useState(language);
  if (language !== prevLanguage) {
    setPrevLanguage(language);
    setLoading(true);
    setError(false);
    setData(null);
  }

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(path);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!cancelled) {
          setData(json[language]);
        }
      } catch {
        if (!cancelled) {
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [path, language]);

  return { data, loading, error };
};