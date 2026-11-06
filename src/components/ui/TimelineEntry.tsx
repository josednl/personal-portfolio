import { TechTag } from '@/components/ui/TechTag';

interface TimelineEntryProps {
  heading: string;
  subtitle: string;
  dateRange: string;
  description: string | null;
  tags?: string[];
}

export const TimelineEntry = ({
  heading,
  subtitle,
  dateRange,
  description,
  tags,
}: TimelineEntryProps) => {
  return (
    <div className="relative border-l border-border pl-8 dark:border-border-dark">
      <div className="absolute -left-1.5 top-2 h-3 w-3 rounded-full bg-primary" />

      <h3 className="font-display text-lg font-semibold text-text dark:text-text-dark">
        {heading}
      </h3>
      <p className="text-sm text-text-light dark:text-text-light-dark">{subtitle}</p>
      <p className="mb-2 text-sm text-text-light dark:text-text-light-dark">
        {dateRange}
      </p>
      {description && (
        <p className="mb-3 text-text dark:text-text-dark/80">{description}</p>
      )}

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TechTag key={tag} name={tag} />
          ))}
        </div>
      )}
    </div>
  );
};
