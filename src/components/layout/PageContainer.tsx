export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {children}
      </div>
    </main>
  )
}
