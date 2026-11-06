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
      className={`w-full rounded-card p-4 text-left transition-[background-color,border-color,box-shadow] duration-200 ${
        isActive
          ? 'border border-border bg-surface shadow-soft dark:border-border-dark dark:bg-surface-dark'
          : 'border border-transparent hover:bg-surface/70 dark:hover:bg-surface-dark/70'
      }`}
    >
      <h4
        className={`mb-1.5 font-display text-base font-semibold transition-colors ${
          isActive
            ? 'text-primary dark:text-primary-dark'
            : 'text-text dark:text-text-dark'
        }`}
      >
        {title}
      </h4>

      {technologies && technologies.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {technologies.slice(0, 3).map((tech, index, arr) => (
            <span
              key={tech}
              className="text-[11px] text-text-light dark:text-text-light-dark"
            >
              {tech}
              {index < arr.length - 1 && (
                <span className="ml-1.5 text-border dark:text-border-dark">
                  /
                </span>
              )}
            </span>
          ))}
          {technologies.length > 3 && (
            <span className="text-[11px] text-text-light dark:text-text-light-dark">
              +{technologies.length - 3}
            </span>
          )}
        </div>
      )}
    </button>
  );
};
