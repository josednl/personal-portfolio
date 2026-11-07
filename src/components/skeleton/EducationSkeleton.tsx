export const EducationSkeleton = () => {
  return (
    <div className="animate-pulse border-t border-border motion-reduce:animate-none dark:border-border-dark">
      {[1, 2].map((item) => (
        <div
          key={item}
          className="grid gap-3 border-b border-border py-6 dark:border-border-dark sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-8"
        >
          <div>
            <div className="h-5 w-56 max-w-full rounded bg-border dark:bg-border-dark" />
            <div className="mt-2 h-4 w-40 rounded bg-border dark:bg-border-dark" />
            <div className="mt-4 h-4 w-5/6 rounded bg-border dark:bg-border-dark" />
          </div>
          <div className="h-3 w-24 rounded bg-border dark:bg-border-dark" />
        </div>
      ))}
    </div>
  );
};
