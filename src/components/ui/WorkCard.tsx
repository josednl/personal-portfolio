import { WorkItem } from "@/lib/types/work";

export const WorkCard = ({ item }: { item: WorkItem }) => {
  const { company, role, startDate, endDate, description, tech } = item;

  return (
    <div className="relative pl-8 border-l border-gray-300 dark:border-gray-600">
      <div className="absolute -left-1.5 top-2 w-3 h-3 bg-blue-600 rounded-full"></div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{role}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{company}</p>
      <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">
        {startDate} — {endDate}
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-3">{description}</p>

      {tech && tech.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tech.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
