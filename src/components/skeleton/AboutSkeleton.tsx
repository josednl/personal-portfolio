export const AboutSkeleton = () => (
  <div className="animate-pulse motion-reduce:animate-none">
    <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-12">
      <div>
        <div className="mb-6 h-7 w-44 rounded-full bg-border dark:bg-border-dark" />
        <div className="h-14 w-4/5 rounded-control bg-border dark:bg-border-dark md:h-20" />
        <div className="mt-6 h-5 w-full max-w-[52ch] rounded bg-border dark:bg-border-dark" />
        <div className="mt-8 flex flex-wrap gap-3">
          <div className="h-12 w-36 rounded-control bg-border dark:bg-border-dark" />
          <div className="h-12 w-32 rounded-control bg-border dark:bg-border-dark" />
        </div>
      </div>
      <div className="mx-auto h-40 w-40 rounded-full bg-border dark:bg-border-dark md:mx-0 md:h-56 md:w-56" />
    </div>

    <div className="mt-12 max-w-[65ch] space-y-3">
      <div className="h-4 w-full rounded bg-border dark:bg-border-dark" />
      <div className="h-4 w-5/6 rounded bg-border dark:bg-border-dark" />
      <div className="h-4 w-3/4 rounded bg-border dark:bg-border-dark" />
    </div>
  </div>
);
