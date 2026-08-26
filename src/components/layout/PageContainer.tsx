import NeuralBackground from '@/components/NeuralBackground';
import { useTranslation } from '@/lib/hooks/useTranslation';

export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();

  return (
    <main className="w-full min-h-screen relative">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        {t('skipToContent')}
      </a>
      <div
        className="absolute inset-0 -z-10 
        bg-linear-to-tr 
        from-[#fdf6ff] via-[#f5f3ff] to-[#e9d5ff] 
        dark:from-[#020617] 
        dark:via-[#050816] 
        dark:to-[#1e1b4b] 
        pointer-events-none"
      ></div>

      <div className="relative z-0">
        <div className="z-0">
          <NeuralBackground />
        </div>

        <div className="text-gray-900 dark:text-gray-100 max-w-4xl mx-auto px-6 py-3 relative z-10">
          {children}
        </div>
      </div>
    </main>
  );
};
