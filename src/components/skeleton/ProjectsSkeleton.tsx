export const ProjectsSkeleton = () => {
  return (
    <div className="animate-pulse space-y-10 motion-reduce:animate-none">
      <div className="overflow-hidden rounded-card border border-border bg-surface shadow-soft dark:border-border-dark dark:bg-surface-dark">
        <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="space-y-5 p-6 sm:p-8 lg:p-10">
            <div className="h-3 w-32 rounded bg-border dark:bg-border-dark" />
            <div className="space-y-2 border-l-2 border-primary pl-4">
              <div className="h-3 w-20 rounded bg-border dark:bg-border-dark" />
              <div className="h-5 w-full rounded bg-border dark:bg-border-dark" />
              <div className="h-5 w-4/5 rounded bg-border dark:bg-border-dark" />
            </div>
            <div className="space-y-2">
              <div className="h-8 w-52 rounded bg-border dark:bg-border-dark" />
              <div className="h-4 w-full rounded bg-border dark:bg-border-dark" />
              <div className="h-4 w-5/6 rounded bg-border dark:bg-border-dark" />
            </div>
            <div className="flex gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-3 w-16 rounded bg-border dark:bg-border-dark"
                />
              ))}
            </div>
            <div className="flex gap-3">
              <div className="h-10 w-24 rounded-control bg-primary" />
              <div className="h-10 w-24 rounded-control bg-border dark:bg-border-dark" />
            </div>
          </div>
          <div className="bg-background p-3 dark:bg-background-dark sm:p-4 lg:border-l lg:border-border lg:p-5 lg:dark:border-border-dark">
            <div className="aspect-[4/3] w-full rounded-control bg-border dark:bg-border-dark lg:h-full lg:aspect-auto" />
          </div>
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between border-b border-border pb-4 dark:border-border-dark">
          <div className="h-3 w-28 rounded bg-border dark:bg-border-dark" />
          <div className="h-3 w-6 rounded bg-border dark:bg-border-dark" />
        </div>

        <div className="space-y-4 md:space-y-0">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-card border border-border bg-surface p-5 dark:border-border-dark dark:bg-surface-dark md:grid md:grid-cols-[2.5rem_minmax(0,1fr)_auto] md:gap-6 md:rounded-none md:border-x-0 md:border-b-0 md:border-t md:bg-transparent md:p-6 md:shadow-none dark:md:bg-transparent"
            >
              <div className="h-3 w-6 rounded bg-border dark:bg-border-dark" />
              <div className="mt-2 space-y-3 md:mt-0">
                <div className="h-6 w-44 rounded bg-border dark:bg-border-dark" />
                <div className="space-y-2">
                  <div className="h-2.5 w-16 rounded bg-border dark:bg-border-dark" />
                  <div className="h-4 w-full rounded bg-border dark:bg-border-dark" />
                  <div className="h-4 w-4/5 rounded bg-border dark:bg-border-dark" />
                </div>
                <div className="flex gap-4">
                  {[1, 2, 3].map((j) => (
                    <div
                      key={j}
                      className="h-3 w-14 rounded bg-border dark:bg-border-dark"
                    />
                  ))}
                </div>
              </div>
              <div className="mt-4 flex gap-2 md:mt-0">
                <div className="h-8 w-16 rounded-control bg-primary" />
                <div className="h-8 w-16 rounded-control bg-border dark:bg-border-dark" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
