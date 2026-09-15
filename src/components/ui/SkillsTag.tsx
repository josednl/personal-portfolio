import { TechIcon } from '@/components/ui/TechIcon';

interface SkillsTagProps {
  technology: string;
}

export const SkillsTag = ({ technology }: SkillsTagProps) => {
  return (
    <li>
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 h-6 bg-gray-100 dark:bg-gray-700/60 rounded-full text-xs font-medium text-gray-600 dark:text-gray-200">
        <TechIcon name={technology} className="shrink-0" />
        {technology}
      </span>
    </li>
  );
};