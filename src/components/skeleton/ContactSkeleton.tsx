export const ContactSkeleton = () => {
  return (
    <footer className="animate-pulse border-t border-border pt-10 motion-reduce:animate-none dark:border-border-dark md:pt-14">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <div className="h-3 w-24 rounded bg-border dark:bg-border-dark" />
          <div className="mt-5 space-y-3">
            <div className="h-10 w-72 max-w-full rounded bg-border dark:bg-border-dark" />
            <div className="h-10 w-56 max-w-full rounded bg-border dark:bg-border-dark" />
          </div>
          <div className="mt-5 space-y-2">
            <div className="h-4 w-full max-w-md rounded bg-border dark:bg-border-dark" />
            <div className="h-4 w-2/3 max-w-sm rounded bg-border dark:bg-border-dark" />
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:items-end">
          <div className="h-14 w-full rounded-control bg-primary sm:w-72" />
          <div className="flex flex-col gap-3 lg:items-end">
            <div className="h-3 w-28 rounded bg-border dark:bg-border-dark" />
            <div className="flex gap-2">
              <div className="h-9 w-24 rounded-control bg-border dark:bg-border-dark" />
              <div className="h-9 w-28 rounded-control bg-border dark:bg-border-dark" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 dark:border-border-dark sm:flex-row sm:items-center sm:justify-between">
        <div className="h-4 w-28 rounded bg-border dark:bg-border-dark" />
        <div className="h-4 w-48 rounded bg-border dark:bg-border-dark" />
      </div>
    </footer>
  );
};
