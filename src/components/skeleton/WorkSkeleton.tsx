export const WorkSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {[1, 2].map((i) => (
        <div key={i} className="relative pl-8 border-l border-gray-300">
          <div className="absolute -left-1.5 top-2 w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="h-5 w-48 bg-gray-300 rounded mb-2" />
          <div className="h-4 w-40 bg-gray-300 rounded mb-1" />
          <div className="h-4 w-5/6 bg-gray-300 rounded mb-1" />
          <div className="h-4 w-3/4 bg-gray-300 rounded" />
        </div>
      ))}
    </div>
  );
};
