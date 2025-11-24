import { useAppSettings } from "@/lib/context/AppSettingsContext";
import { useState, useEffect } from "react";

export const useFetchSection = <T>(path: string) => {
  const { language } = useAppSettings();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(path)
      .then(res => res.json())
      .then(json => {
        setData(json[language]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [path, language]);

  return { data, loading };
};
