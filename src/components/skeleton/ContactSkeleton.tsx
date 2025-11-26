export const ContactSkeleton = () => {
  return (
    <footer className="border-t border-gray-300 dark:border-gray-700 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

          <div>
            <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-4" />

            <div className="flex items-center mb-3">
              <div className="w-4 h-4 rounded bg-gray-300 dark:bg-gray-700 mr-2" />
              <div className="h-4 w-40 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>

            <div className="flex items-center mb-3">
              <div className="w-4 h-4 rounded bg-gray-300 dark:bg-gray-700 mr-2" />
              <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>

            <div className="flex items-center">
              <div className="w-4 h-4 rounded bg-gray-300 dark:bg-gray-700 mr-2" />
              <div className="h-4 w-28 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>
          </div>

          <div>
            <div className="h-4 w-28 bg-gray-300 dark:bg-gray-700 rounded mb-4" />

            <div className="flex space-x-5">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded bg-gray-300 dark:bg-gray-700"
                />
              ))}
            </div>
          </div>

          <div className="md:text-right">
            <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-2 md:ml-auto" />
            <div className="h-4 w-40 bg-gray-300 dark:bg-gray-700 rounded md:ml-auto" />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-700">
          <div className="h-4 w-40 bg-gray-300 dark:bg-gray-700 rounded mx-auto" />
        </div>
      </div>
    </footer>
  );
};
