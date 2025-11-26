export const ProjectsSkeleton = () => {
  return (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="
            border rounded-xl p-5 shadow bg-white dark:bg-gray-800
            flex flex-col
          "
        >
          <div className="aspect-video w-full mb-4 bg-gray-300 dark:bg-gray-700 rounded-lg" />

          <div className="h-6 w-2/3 bg-gray-300 dark:bg-gray-700 rounded mb-3" />

          <div className="space-y-2 grow">
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-4 w-11/12 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-4 w-10/12 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>

          <hr className="my-4 border-gray-200 dark:border-gray-700" />

          <div className="flex gap-3 justify-end pt-2">
            <div className="h-9 w-10 bg-gray-300 dark:bg-gray-700 rounded-lg" />
            <div className="h-9 w-20 bg-gray-300 dark:bg-gray-700 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};
