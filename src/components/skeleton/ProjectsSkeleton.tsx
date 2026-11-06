export const ProjectsSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-pulse motion-reduce:animate-none">
      <div className="lg:w-72 shrink-0 space-y-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className={`rounded-card p-4 ${
              i === 1
                ? 'border border-border bg-surface shadow-soft dark:border-border-dark dark:bg-surface-dark'
                : ''
            }`}
          >
            <div className="mb-2 h-4 w-3/4 rounded bg-border dark:bg-border-dark" />
            <div className="flex gap-1.5">
              <div className="h-3 w-12 rounded bg-border dark:bg-border-dark" />
              <div className="h-3 w-10 rounded bg-border dark:bg-border-dark" />
              <div className="h-3 w-8 rounded bg-border dark:bg-border-dark" />
            </div>
          </div>
        ))}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-6 aspect-video w-full rounded-card bg-border dark:bg-border-dark" />

        <div className="mb-3 h-7 w-48 rounded bg-border dark:bg-border-dark" />

        <div className="mb-5 space-y-2">
          <div className="h-4 w-full rounded bg-border dark:bg-border-dark" />
          <div className="h-4 w-full rounded bg-border dark:bg-border-dark" />
          <div className="h-4 w-3/4 rounded bg-border dark:bg-border-dark" />
        </div>

        <div className="mb-6 flex gap-2">
          <div className="h-6 w-16 rounded-full bg-border dark:bg-border-dark" />
          <div className="h-6 w-20 rounded-full bg-border dark:bg-border-dark" />
          <div className="h-6 w-14 rounded-full bg-border dark:bg-border-dark" />
          <div className="h-6 w-18 rounded-full bg-border dark:bg-border-dark" />
        </div>

        <div className="flex gap-3">
          <div className="h-10 w-28 rounded-control bg-border dark:bg-border-dark" />
          <div className="h-10 w-24 rounded-control bg-primary" />
        </div>
      </div>
    </div>
  );
};
