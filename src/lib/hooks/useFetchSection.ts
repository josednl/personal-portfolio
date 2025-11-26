import { useAppSettings } from "@/lib/context/AppSettingsContext";
import { useState, useEffect } from "react";

export const useFetchSection = <T>(path: string) => {
  const { language } = useAppSettings();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    // await new Promise((res) => setTimeout(res, 5000)); // Simulate delay
    fetch(path)
      .then(res => res.json())
      .then(json => {
        setData(json[language]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [path, language]);

  return { data, loading };
};
