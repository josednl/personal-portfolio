import NeuralBackground from '@/components/NeuralBackground';

export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full min-h-screen relative">
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
