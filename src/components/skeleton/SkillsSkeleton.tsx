export const SkillsSkeleton = () => {
  return (
    <div className="animate-pulse motion-reduce:animate-none">
      <div className="mb-8 space-y-2">
        <div className="h-4 w-full max-w-lg rounded bg-border dark:bg-border-dark" />
        <div className="h-4 w-2/3 max-w-sm rounded bg-border dark:bg-border-dark" />
      </div>

      <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((group) => (
          <div
            key={group}
            className="border-t border-border pt-4 dark:border-border-dark"
          >
            <div className="flex items-baseline justify-between gap-3">
              <div className="h-3 w-20 rounded bg-border dark:bg-border-dark" />
              <div className="h-2.5 w-5 rounded bg-border dark:bg-border-dark" />
            </div>
            <div className="mt-4 space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <div className="h-3.5 w-3.5 rounded bg-border dark:bg-border-dark" />
                  <div className="h-3.5 w-20 rounded bg-border dark:bg-border-dark" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
