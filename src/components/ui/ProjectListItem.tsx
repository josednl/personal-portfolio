import { ProjectItem } from '@/lib/types/project';

interface ProjectListItemProps {
  project: ProjectItem;
  isActive: boolean;
  onClick: () => void;
}

export const ProjectListItem = ({
  project,
  isActive,
  onClick,
}: ProjectListItemProps) => {
  const { title, technologies } = project;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
        isActive
          ? 'bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700'
          : 'hover:bg-white/50 dark:hover:bg-gray-800/50 border border-transparent'
      }`}
    >
      <h4
        className={`text-base font-semibold font-archivo mb-1.5 transition-colors ${
          isActive
            ? 'text-blue-600 dark:text-blue-400'
            : 'text-gray-900 dark:text-gray-100'
        }`}
      >
        {title}
      </h4>

      {technologies && technologies.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {technologies.slice(0, 3).map((tech, index, arr) => (
            <span
              key={tech}
              className="text-[11px] text-gray-500 dark:text-gray-400"
            >
              {tech}
              {index < arr.length - 1 && (
                <span className="ml-1.5 text-gray-300 dark:text-gray-600">
                  /
                </span>
              )}
            </span>
          ))}
          {technologies.length > 3 && (
            <span className="text-[11px] text-gray-400 dark:text-gray-500">
              +{technologies.length - 3}
            </span>
          )}
        </div>
      )}
    </button>
  );
};
