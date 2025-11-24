export const EducationSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {[1, 2].map((i) => (
        <div key={i} className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2">
          <div className="h-5 w-48 rounded mb-2 bg-gray-300 dark:bg-gray-700" />
          <div className="h-4 w-40 rounded mb-1 bg-gray-300 dark:bg-gray-700" />
          <div className="h-4 w-full rounded bg-gray-300 dark:bg-gray-700" />
        </div>
      ))}
    </div>
  );
};
