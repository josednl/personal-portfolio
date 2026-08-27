export const ProjectsSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-pulse motion-reduce:animate-none">
      <div className="lg:w-72 shrink-0 space-y-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className={`p-4 rounded-xl ${
              i === 1
                ? 'bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700'
                : ''
            }`}
          >
            <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
            <div className="flex gap-1.5">
              <div className="h-3 w-12 bg-gray-200 dark:bg-gray-600 rounded" />
              <div className="h-3 w-10 bg-gray-200 dark:bg-gray-600 rounded" />
              <div className="h-3 w-8 bg-gray-200 dark:bg-gray-600 rounded" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 min-w-0">
        <div className="aspect-video w-full bg-gray-300 dark:bg-gray-700 rounded-xl mb-6" />

        <div className="h-7 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-3" />

        <div className="space-y-2 mb-5">
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-600 rounded" />
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-600 rounded" />
          <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-600 rounded" />
        </div>

        <div className="flex gap-2 mb-6">
          <div className="h-6 w-16 bg-gray-200 dark:bg-gray-600 rounded-lg" />
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-600 rounded-lg" />
          <div className="h-6 w-14 bg-gray-200 dark:bg-gray-600 rounded-lg" />
          <div className="h-6 w-18 bg-gray-200 dark:bg-gray-600 rounded-lg" />
        </div>

        <div className="flex gap-3">
          <div className="h-10 w-28 bg-gray-300 dark:bg-gray-700 rounded-lg" />
          <div className="h-10 w-24 bg-blue-600 rounded-lg" />
        </div>
      </div>
    </div>
  );
};
