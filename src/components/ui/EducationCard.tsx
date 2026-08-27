import { EducationItem } from '@/lib/types/education';
import { TimelineEntry } from '@/components/ui/TimelineEntry';

export const EducationCard = ({ item }: { item: EducationItem }) => {
  const { school, degree, startYear, endYear, description } = item;

  return (
    <TimelineEntry
      heading={degree}
      subtitle={school}
      dateRange={`${startYear} — ${endYear || 'Present'}`}
      description={description}
    />
  );
};
