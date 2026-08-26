import { useAppSettings } from '@/lib/context/AppSettingsContext';
import { useState, useEffect } from 'react';

export const useFetchSection = <T>(path: string) => {
  const { language } = useAppSettings();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    setError(false);
    fetch(path)
      .then((res) => res.json())
      .then((json) => {
        setData(json[language]);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [path, language]);

  return { data, loading, error };
};
