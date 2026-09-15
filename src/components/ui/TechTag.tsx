import { TechIcon } from '@/components/ui/TechIcon';

interface TechTagProps {
  name: string;
}

export const TechTag = ({ name }: TechTagProps) => {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 h-6 bg-gray-100 dark:bg-gray-700/60 rounded-full text-xs font-medium text-gray-600 dark:text-gray-200">
      <TechIcon name={name} className="shrink-0" />
      {name}
    </span>
  );
};