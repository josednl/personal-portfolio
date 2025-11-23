export const ProjectsSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="border rounded-lg p-4 shadow-sm bg-white"
        >
          <div className="h-40 bg-gray-300 rounded mb-4" />
          <div className="h-6 w-40 bg-gray-300 rounded mb-2" />
          <div className="h-4 w-full bg-gray-300 rounded mb-1" />
          <div className="h-4 w-5/6 bg-gray-300 rounded" />
        </div>
      ))}
    </div>
  );
};
