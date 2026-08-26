import { useTranslation } from '@/lib/hooks/useTranslation';

export const SectionError = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center py-12">
      <p className="text-red-500 dark:text-red-400 mb-4">{t('loadError')}</p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        {t('retry')}
      </button>
    </div>
  );
};
