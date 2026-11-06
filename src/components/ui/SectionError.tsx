import { useTranslation } from '@/lib/hooks/useTranslation';

export const SectionError = () => {
  const { t } = useTranslation();

  return (
    <div className="py-12 text-center">
      <p className="mb-4 text-red-500 dark:text-red-400">{t('loadError')}</p>
      <button
        onClick={() => window.location.reload()}
        className="rounded-control bg-primary px-4 py-2 text-white transition-colors duration-200 hover:bg-primary-hover"
      >
        {t('retry')}
      </button>
    </div>
  );
};
