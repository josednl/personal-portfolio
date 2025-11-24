export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-3">
        {children}
      </div>
    </main>
  )
}
