export const ContactSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 w-48 rounded bg-gray-300 dark:bg-gray-700" />
      <div className="h-4 w-40 rounded bg-gray-300 dark:bg-gray-700" />
      <div className="h-4 w-32 rounded bg-gray-300 dark:bg-gray-700" />
      <div className="flex gap-3 pt-2">
        <div className="h-8 w-20 rounded bg-gray-300 dark:bg-gray-700" />
        <div className="h-8 w-20 rounded bg-gray-300 dark:bg-gray-700" />
      </div>
    </div>
  );
};
