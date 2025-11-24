export const SkillsSkeleton = () => {
  return (
    <div className="animate-pulse space-y-8">
      {[1, 2, 3].map((i) => (
        <div key={i}>
          <div className="h-5 w-32 rounded mb-3 bg-gray-300 dark:bg-gray-700" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((j) => (
              <div key={j} className="h-6 w-20 rounded bg-gray-300 dark:bg-gray-700" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
