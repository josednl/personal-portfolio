import { useTranslation } from '@/lib/hooks/useTranslation';

export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="relative w-full min-h-[100dvh] overflow-x-clip bg-background focus:outline-none dark:bg-background-dark"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-control focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        {t('skipToContent')}
      </a>

      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 -z-10"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-3 text-text dark:text-text-dark">
        {children}
      </div>

      <div id="page-end" aria-hidden="true" className="h-2 w-full" />
    </main>
  );
};
