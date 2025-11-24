export const ProjectsSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="border rounded-lg p-4 shadow-sm bg-white dark:bg-gray-800"
        >
          <div className="h-40 rounded mb-4 bg-gray-300 dark:bg-gray-700" />
          <div className="h-6 w-40 rounded mb-2 bg-gray-300 dark:bg-gray-700" />
          <div className="h-4 w-full rounded mb-1 bg-gray-300 dark:bg-gray-700" />
          <div className="h-4 w-5/6 rounded bg-gray-300 dark:bg-gray-700" />
        </div>
      ))}
    </div>
  );
};
