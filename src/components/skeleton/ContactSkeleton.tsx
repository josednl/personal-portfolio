export const ContactSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 w-48 bg-gray-300 rounded" />
      <div className="h-4 w-40 bg-gray-300 rounded" />
      <div className="h-4 w-32 bg-gray-300 rounded" />
      <div className="flex gap-3 pt-2">
        <div className="h-8 w-20 bg-gray-300 rounded" />
        <div className="h-8 w-20 bg-gray-300 rounded" />
      </div>
    </div>
  );
};
