import { WorkItem } from '@/lib/types/work';
import { TimelineEntry } from '@/components/ui/TimelineEntry';

export const WorkCard = ({ item }: { item: WorkItem }) => {
  const { company, role, startDate, endDate, description, tech } = item;

  return (
    <TimelineEntry
      heading={role}
      subtitle={company}
      dateRange={`${startDate} — ${endDate}`}
      description={description}
      tags={tech}
    />
  );
};
