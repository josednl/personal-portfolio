import { EducationItem } from "@/lib/types/education";

export const EducationCard = ({ item }: { item: EducationItem }) => {
  const { school, degree, startYear, endYear, description } = item;

  return (
    <div className="relative pl-8 border-l border-gray-300 dark:border-gray-600">
      <div className="absolute -left-1.5 top-2 w-3 h-3 bg-blue-600 rounded-full"></div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{degree}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{school}</p>
      <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">
        {startYear} — {endYear || "Present"}
      </p>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  );
};
