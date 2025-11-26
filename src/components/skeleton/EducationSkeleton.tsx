export const EducationSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {[1, 2].map((i) => (
        <div key={i} className="relative pl-8 border-l border-gray-300 dark:border-gray-600">
          <div className="absolute -left-1.5 top-2 w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-5 w-48 rounded mb-2 bg-gray-300 dark:bg-gray-700" />
          <div className="h-4 w-40 rounded mb-1 bg-gray-300 dark:bg-gray-700" />
          <div className="h-4 w-5/6 rounded mb-1 bg-gray-300 dark:bg-gray-700" />
          <div className="h-4 w-3/4 rounded bg-gray-300 dark:bg-gray-700" />
        </div>
      ))}
    </div>
  );
};
