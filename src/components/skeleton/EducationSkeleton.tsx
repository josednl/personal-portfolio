export const EducationSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {[1, 2].map((i) => (
        <div key={i} className="border-l-4 border-gray-300 pl-4 py-2">
          <div className="h-5 w-48 bg-gray-300 rounded mb-2" />
          <div className="h-4 w-40 bg-gray-300 rounded mb-1" />
          <div className="h-4 w-full bg-gray-300 rounded" />
        </div>
      ))}
    </div>
  );
};
