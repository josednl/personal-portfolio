export const SkillsSkeleton = () => {
  return (
    <div className="animate-pulse motion-reduce:animate-none">
      <div className="flex flex-wrap items-center gap-2.5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => (
          <div
            key={i}
            className="h-6 w-20 rounded-full bg-gray-300 dark:bg-gray-700"
          />
        ))}
      </div>
    </div>
  );
};