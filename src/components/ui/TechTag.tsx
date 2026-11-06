import { TechIcon } from '@/components/ui/TechIcon';

interface TechTagProps {
  name: string;
}

export const TechTag = ({ name }: TechTagProps) => {
  return (
    <span className="inline-flex h-6 items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs font-medium text-text dark:border-border-dark dark:bg-surface-dark dark:text-text-dark">
      <TechIcon name={name} className="shrink-0" />
      {name}
    </span>
  );
};