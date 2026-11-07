import { EducationItem } from '@/lib/types/education';
import { useTranslation } from '@/lib/hooks/useTranslation';

export const EducationRow = ({ item }: { item: EducationItem }) => {
  const { school, degree, startYear, endYear, description } = item;
  const { t } = useTranslation();

  return (
    <li className="grid gap-3 py-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-8">
      <div className="min-w-0">
        <h3 className="font-display text-lg font-semibold text-text dark:text-text-dark">
          {degree}
        </h3>
        <p className="mt-1 text-sm text-text-light dark:text-text-light-dark">
          {school}
        </p>
        {description && (
          <p className="mt-3 max-w-[65ch] text-sm leading-relaxed text-text-light dark:text-text-light-dark">
            {description}
          </p>
        )}
      </div>

      <span className="font-space text-xs tabular-nums text-text-light dark:text-text-light-dark sm:pt-1 sm:text-right">
        {startYear} — {endYear || t('present')}
      </span>
    </li>
  );
};
