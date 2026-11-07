import { TechIcon } from '@/components/ui/TechIcon';

interface ProjectStackProps {
  technologies?: string[];
  limit?: number;
}

export const ProjectStack = ({
  technologies,
  limit,
}: ProjectStackProps) => {
  if (!technologies || technologies.length === 0) return null;

  const visible = limit ? technologies.slice(0, limit) : technologies;
  const remaining = limit ? technologies.length - visible.length : 0;

  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-2">
      {visible.map((technology) => (
        <li
          key={technology}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-text-light dark:text-text-light-dark"
        >
          <TechIcon name={technology} />
          {technology}
        </li>
      ))}
      {remaining > 0 && (
        <li className="text-xs font-medium text-text-light dark:text-text-light-dark">
          +{remaining}
        </li>
      )}
    </ul>
  );
};
