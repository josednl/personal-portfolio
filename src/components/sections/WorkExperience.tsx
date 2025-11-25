import { useEffect, useState } from "react";
import { Section } from "@/components/layout/Section";
import { useFetchSection } from "@/lib/hooks/useFetchSection";
import { WorkSkeleton } from "@/components/skeleton/WorkSkeleton";
import { WorkCard } from "@/components/ui/WorkCard";
import { WorkData } from "@/lib/types/work";

export const WorkExperience = () => {
  const { data, loading } = useFetchSection<WorkData>("/data/work.json");
  const [title, setTitle] = useState('Work Experience');

  useEffect(() => {
    if (data && data.title) {
      setTitle(data.title);
    }
  }, [data]);

  return (
    <Section id="work" title={title}>
      {loading && <WorkSkeleton />}

      {!loading && data && (
        <div className="space-y-10">
          {data.items.map((item) => (
            <WorkCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </Section>
  );
};
