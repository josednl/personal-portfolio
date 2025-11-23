import { Section } from "@/components/layout/Section";
import { useFetchSection } from "@/lib/hooks/useFetchSection";
import { WorkSkeleton } from "@/components/skeleton/WorkSkeleton";
import { WorkCard } from "@/components/ui/WorkCard";
import { WorkItem } from "@/lib/types/work";

export const WorkExperience = () => {
  const { data, loading } = useFetchSection<WorkItem[]>("/data/work.json");

  return (
    <Section id="work" title="Work Experience">
      {loading && <WorkSkeleton />}

      {!loading && data && (
        <div className="space-y-10">
          {data.map((item) => (
            <WorkCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </Section>
  );
};
